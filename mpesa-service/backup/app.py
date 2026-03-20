from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import logging
from dotenv import load_dotenv
from datetime import datetime
import base64
from requests.auth import HTTPBasicAuth

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# M-PESA API URLs
SANDBOX_URL = "https://sandbox.safaricom.co.ke"
PRODUCTION_URL = "https://api.safaricom.co.ke"

def get_base_url():
    """Get base URL based on environment"""
    return SANDBOX_URL if os.getenv('MPESA_ENVIRONMENT', 'sandbox') == 'sandbox' else PRODUCTION_URL

def get_access_token():
    """Get OAuth access token from Safaricom"""
    consumer_key = os.getenv('MPESA_CONSUMER_KEY')
    consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
    
    if not consumer_key or not consumer_secret:
        raise Exception("MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET must be set")
    
    auth_string = f"{consumer_key}:{consumer_secret}"
    auth_bytes = auth_string.encode('ascii')
    auth_base64 = base64.b64encode(auth_bytes).decode('ascii')
    
    url = f"{get_base_url()}/oauth/v1/generate?grant_type=client_credentials"
    
    headers = {
        'Authorization': f'Basic {auth_base64}'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception(f"Failed to get access token: {response.text}")

def stk_push(phone_number, amount, account_reference, transaction_desc):
    """Initiate STK Push"""
    access_token = get_access_token()
    
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    
    business_shortcode = os.getenv('MPESA_SHORTCODE', '174379')
    passkey = os.getenv('MPESA_PASSKEY', '')
    
    password_str = f"{business_shortcode}{passkey}{timestamp}"
    password = base64.b64encode(password_str.encode()).decode('ascii')
    
    url = f"{get_base_url()}/mpesa/stkpush/v1/processrequest"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'BusinessShortCode': business_shortcode,
        'Password': password,
        'Timestamp': timestamp,
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': amount,
        'PartyA': phone_number,
        'PartyB': business_shortcode,
        'PhoneNumber': phone_number,
        'CallBackURL': f"{os.getenv('BASE_URL', 'https://mpesa-service.vercel.app')}/api/mpesa/callback",
        'AccountReference': account_reference[:12],
        'TransactionDesc': transaction_desc[:13]
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"STK Push failed: {response.text}")

def stk_query(checkout_request_id):
    """Query STK Push status"""
    access_token = get_access_token()
    
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    
    business_shortcode = os.getenv('MPESA_SHORTCODE', '174379')
    passkey = os.getenv('MPESA_PASSKEY', '')
    
    password_str = f"{business_shortcode}{passkey}{timestamp}"
    password = base64.b64encode(password_str.encode()).decode('ascii')
    
    url = f"{get_base_url()}/mpesa/stkpushquery/v1/query"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'BusinessShortCode': business_shortcode,
        'Password': password,
        'Timestamp': timestamp,
        'CheckoutRequestID': checkout_request_id
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"STK Query failed: {response.text}")

# In-memory storage for transactions (replace with database in production)
transactions = {}

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'M-PESA Payment Gateway',
        'environment': os.getenv('MPESA_ENVIRONMENT', 'sandbox'),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/mpesa/stkpush', methods=['POST'])
def handle_stk_push():
    """Initiate STK Push payment"""
    try:
        data = request.json
        phone = data.get('phone')
        amount = data.get('amount')
        reference = data.get('reference', f'ORDER-{datetime.now().strftime("%Y%m%d%H%M%S")}')
        description = data.get('description', 'JobLink360 Payment')
        
        logger.info(f"Initiating STK Push - Phone: {phone}, Amount: {amount}, Ref: {reference}")
        
        # Validate inputs
        if not phone or not amount:
            return jsonify({'success': False, 'error': 'Phone and amount are required'}), 400
        
        # Initiate STK Push
        response = stk_push(phone, amount, reference, description)
        
        # Store transaction
        checkout_id = response.get('CheckoutRequestID')
        if checkout_id:
            transactions[checkout_id] = {
                'phone': phone,
                'amount': amount,
                'reference': reference,
                'status': 'pending',
                'timestamp': datetime.now().isoformat()
            }
        
        return jsonify({
            'success': True,
            'checkout_request_id': checkout_id,
            'response_code': response.get('ResponseCode'),
            'response_description': response.get('ResponseDescription'),
            'merchant_request_id': response.get('MerchantRequestID')
        })
        
    except Exception as e:
        logger.error(f"STK Push error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/mpesa/query', methods=['POST'])
def handle_query():
    """Check payment status"""
    try:
        data = request.json
        checkout_id = data.get('checkout_request_id')
        
        if not checkout_id:
            return jsonify({'success': False, 'error': 'CheckoutRequestID is required'}), 400
        
        logger.info(f"Querying status for: {checkout_id}")
        
        response = stk_query(checkout_id)
        
        result_code = response.get('ResultCode')
        
        # Map result codes to status
        if result_code == '0':
            status = 'completed'
        elif result_code == '1032':
            status = 'cancelled'
        elif result_code == '1037':
            status = 'timeout'
        else:
            status = 'failed'
        
        # Update transaction status
        if checkout_id in transactions:
            transactions[checkout_id]['status'] = status
        
        return jsonify({
            'success': True,
            'status': status,
            'result_code': result_code,
            'result_desc': response.get('ResultDesc'),
            'mpesa_receipt': response.get('MpesaReceiptNumber'),
            'amount': response.get('Amount'),
            'transaction_date': response.get('TransactionDate'),
            'phone': response.get('PhoneNumber')
        })
        
    except Exception as e:
        logger.error(f"Query error: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/mpesa/callback', methods=['POST'])
def handle_callback():
    """Handle M-PESA callback"""
    try:
        data = request.json
        logger.info(f"Callback received: {data}")
        
        # Extract payment details
        if data.get('Body') and data['Body'].get('stkCallback'):
            callback_data = data['Body']['stkCallback']
            
            result_code = callback_data.get('ResultCode')
            checkout_id = callback_data.get('CheckoutRequestID')
            result_desc = callback_data.get('ResultDesc')
            
            logger.info(f"Payment callback - CheckoutID: {checkout_id}, Result: {result_code}")
            
            # Update transaction status
            if checkout_id in transactions:
                transactions[checkout_id]['status'] = 'completed' if result_code == 0 else 'failed'
                transactions[checkout_id]['result_desc'] = result_desc
            
            # If payment successful, extract receipt
            if result_code == 0:
                metadata = callback_data.get('CallbackMetadata', {}).get('Item', [])
                receipt = next((item['Value'] for item in metadata if item['Name'] == 'MpesaReceiptNumber'), None)
                amount = next((item['Value'] for item in metadata if item['Name'] == 'Amount'), None)
                phone = next((item['Value'] for item in metadata if item['Name'] == 'PhoneNumber'), None)
                
                if checkout_id in transactions:
                    transactions[checkout_id]['receipt'] = receipt
                    transactions[checkout_id]['amount_paid'] = amount
                    transactions[checkout_id]['phone_paid'] = phone
            
            # Always return success to M-PESA
            return jsonify({"ResultCode": 0, "ResultDesc": "Success"})
        
        return jsonify({"ResultCode": 1, "ResultDesc": "Failed"})
        
    except Exception as e:
        logger.error(f"Callback error: {str(e)}")
        return jsonify({"ResultCode": 1, "ResultDesc": "Failed"}), 500

@app.route('/api/mpesa/transactions', methods=['GET'])
def get_transactions():
    """Get all transactions"""
    return jsonify({
        'success': True,
        'transactions': transactions
    })

@app.route('/api/mpesa/transaction/<checkout_id>', methods=['GET'])
def get_transaction(checkout_id):
    """Get specific transaction"""
    if checkout_id in transactions:
        return jsonify({
            'success': True,
            'transaction': transactions[checkout_id]
        })
    else:
        return jsonify({'success': False, 'error': 'Transaction not found'}), 404

# ===== CRITICAL FOR VERCEL =====
# This exposes the app for Vercel's serverless functions
application = app

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
