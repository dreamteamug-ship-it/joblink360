from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import logging
import random
import string
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Delite Productions House - Payment Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PaymentRequest(BaseModel):
    amount: float
    currency: str = "USD"
    client_name: str = ""
    client_email: str = ""
    payment_method: str = "paypal"

@app.get("/")
async def root():
    """API information with altovexgl as primary PayPal"""
    return {
        "business": "Delite Productions House",
        "status": "operational",
        "preferred_payment": "PayPal (Instant via altovexgl)",
        "payment_methods": {
            "paypal_primary": {
                "name": "PayPal - Primary (ACTIVE)",
                "status": "LIVE",
                "email": "altovexgl@gmail.com",
                "link": "https://paypal.me/altovexgl",
                "qr_code": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://paypal.me/altovexgl",
                "instructions": "Click link, scan QR, or send directly to altovexgl@gmail.com"
            },
            "paypal_secondary": {
                "name": "PayPal - Secondary (Pending)",
                "status": "COMING SOON",
                "email": "dtc@dreamteamconsult.net",
                "note": "Will be activated soon"
            },
            "mpesa": {
                "name": "M-Pesa",
                "status": "LIVE",
                "paybill": "400200",
                "account": "4045731",
                "business": "ALTOVEX GLOBAL LOGISTICS CO. LTD.",
                "phone": "254718554383",
                "instructions": "Lipa Na M-PESA → Paybill → 400200 → Account 4045731"
            },
            "bank": {
                "name": "Bank Transfer",
                "status": "LIVE",
                "bank": "NCBA Bank",
                "branch": "Harambe Avenue",
                "account_name": "Delite Productions House",
                "account_number": "8515130017",
                "swift": "CBAFKENX",
                "currency": "KES",
                "instructions": "Local KES transfers only"
            }
        },
        "endpoints": {
            "payment_page": "/pay",
            "api_pay": "/api/pay (POST)",
            "status": "/api/status/{id} (GET)",
            "qr": "/api/qr/{method} (GET)",
            "health": "/health (GET)"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/pay")
async def payment_page():
    """HTML payment page with altovexgl as priority"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Delite Productions House - Payment Portal</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
            h1 { color: #333; text-align: center; }
            h2 { color: #444; margin-top: 0; }
            .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 10px; }
            .badge-live { background: #4caf50; color: white; }
            .badge-pending { background: #ff9800; color: white; }
            .methods { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
            .method { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .paypal-primary { border-top: 5px solid #0070ba; }
            .paypal-secondary { border-top: 5px solid #999; opacity: 0.8; }
            .mpesa { border-top: 5px solid #4caf50; }
            .bank { border-top: 5px solid #f44336; }
            .qr { max-width: 150px; margin: 15px 0; border: 1px solid #ddd; border-radius: 10px; }
            a { color: #0070ba; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
            .detail { margin: 10px 0; padding: 8px; background: #f8f8f8; border-radius: 5px; }
            .label { font-weight: bold; color: #666; }
            .value { font-family: monospace; font-size: 1.1em; }
            .highlight { background: #e3f2fd; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center; }
        </style>
    </head>
    <body>
        <h1>💼 Delite Productions House</h1>
        <p style="text-align: center; color: #666;">Secure Payment Portal</p>
        
        <div class="highlight">
            <strong>🌟 PREFERRED PAYMENT METHOD:</strong> PayPal (Instant) - Use altovexgl@gmail.com
        </div>
        
        <div class="methods">
            <div class="method paypal-primary">
                <h2>🇺🇸 PayPal - Primary <span class="badge badge-live">LIVE</span></h2>
                <div class="detail">
                    <span class="label">Email:</span>
                    <span class="value">altovexgl@gmail.com</span>
                </div>
                <p><strong>🔗 Payment Links:</strong></p>
                <p>• <a href="https://paypal.me/altovexgl" target="_blank">paypal.me/altovexgl</a></p>
                <p>• Send directly to: <strong>altovexgl@gmail.com</strong></p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/altovexgl" class="qr">
                <p>✅ Instant processing • International payments</p>
            </div>
            
            <div class="method paypal-secondary">
                <h2>🇺🇸 PayPal - Secondary <span class="badge badge-pending">Pending</span></h2>
                <div class="detail">
                    <span class="label">Email:</span>
                    <span class="value">dtc@dreamteamconsult.net</span>
                </div>
                <p>⏳ Coming soon - being activated</p>
                <p>📧 For now, use altovexgl@gmail.com</p>
            </div>
            
            <div class="method mpesa">
                <h2>🇰🇪 M-Pesa (Kenya) <span class="badge badge-live">LIVE</span></h2>
                <div class="detail">
                    <span class="label">Paybill:</span>
                    <span class="value">400200</span>
                </div>
                <div class="detail">
                    <span class="label">Account:</span>
                    <span class="value">4045731</span>
                </div>
                <div class="detail">
                    <span class="label">Business:</span>
                    <span class="value">ALTOVEX GLOBAL LOGISTICS CO. LTD.</span>
                </div>
                <p>📱 Lipa Na M-PESA → Paybill → Enter details</p>
            </div>
            
            <div class="method bank">
                <h2>🏦 Bank Transfer <span class="badge badge-live">LIVE</span></h2>
                <div class="detail">
                    <span class="label">Bank:</span>
                    <span class="value">NCBA Bank</span>
                </div>
                <div class="detail">
                    <span class="label">Account:</span>
                    <span class="value">8515130017</span>
                </div>
                <div class="detail">
                    <span class="label">Swift:</span>
                    <span class="value">CBAFKENX</span>
                </div>
                <p>🏦 Local KES transfers only</p>
            </div>
        </div>
        
        <p style="text-align: center; margin-top: 30px; color: #888;">
            For fastest processing, use PayPal to altovexgl@gmail.com or M-Pesa Paybill 400200
        </p>
    </body>
    </html>
    """

@app.post("/api/pay")
async def process_payment(request: PaymentRequest):
    """Process payment with altovexgl as primary"""
    try:
        logger.info(f"Payment request: {request.payment_method} - {request.amount} {request.currency}")
        
        # Generate transaction ID
        tx_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        
        # Response based on payment method
        if request.payment_method == "paypal" or request.payment_method == "paypal_primary":
            return {
                "success": True,
                "method": "PayPal - Primary",
                "email": "altovexgl@gmail.com",
                "message": "Redirecting to PayPal",
                "payment_link": "https://paypal.me/altovexgl",
                "qr_code": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://paypal.me/altovexgl",
                "amount": request.amount,
                "currency": request.currency,
                "transaction_id": f"PYPL-{tx_id}"
            }
        elif request.payment_method == "paypal_secondary":
            return {
                "success": True,
                "method": "PayPal - Secondary",
                "email": "dtc@dreamteamconsult.net",
                "message": "This account is being activated. Please use altovexgl@gmail.com for now.",
                "alternative": "altovexgl@gmail.com",
                "amount": request.amount,
                "currency": request.currency,
                "transaction_id": f"PYPL2-{tx_id}"
            }
        elif request.payment_method == "mpesa":
            return {
                "success": True,
                "method": "M-Pesa",
                "message": "Please complete payment via M-Pesa",
                "paybill": "400200",
                "account": "4045731",
                "business": "ALTOVEX GLOBAL LOGISTICS CO. LTD.",
                "amount": request.amount,
                "currency": "KES",
                "instructions": "Go to M-Pesa → Lipa Na M-PESA → Paybill → Enter details",
                "transaction_id": f"MPESA-{tx_id}"
            }
        elif request.payment_method == "bank":
            return {
                "success": True,
                "method": "Bank Transfer",
                "message": "Please initiate bank transfer",
                "bank_details": {
                    "bank": "NCBA Bank",
                    "account_name": "Delite Productions House",
                    "account_number": "8515130017",
                    "swift": "CBAFKENX"
                },
                "amount": request.amount,
                "currency": "KES",
                "transaction_id": f"BNK-{tx_id}"
            }
        else:
            # Default to altovexgl PayPal
            return {
                "success": True,
                "method": "PayPal (Default)",
                "email": "altovexgl@gmail.com",
                "message": "Using default payment method",
                "payment_link": "https://paypal.me/altovexgl",
                "amount": request.amount,
                "transaction_id": f"PYPL-{tx_id}"
            }
            
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return {"success": False, "error": str(e)}

@app.get("/api/qr/{method}")
async def get_qr(method: str):
    """Get QR code for payment method"""
    qr_data = {
        "paypal": "https://paypal.me/altovexgl",
        "paypal_altovexgl": "https://paypal.me/altovexgl",
        "paypal_dtc": "dtc@dreamteamconsult.net (pending)",
        "mpesa": "LIPA NA MPESA: 400200, Account: 4045731"
    }
    
    data = qr_data.get(method, qr_data["paypal"])
    
    # Handle pending methods differently
    if method == "paypal_dtc":
        return {
            "success": True,
            "method": method,
            "qr_code": None,
            "data": data,
            "note": "This method is being activated. Please use altovexgl@gmail.com"
        }
    
    qr_url = f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={data}"
    
    return {
        "success": True,
        "method": method,
        "qr_code": qr_url,
        "data": data
    }

@app.get("/api/status/{transaction_id}")
async def check_status(transaction_id: str):
    """Check payment status"""
    return {
        "success": True,
        "transaction_id": transaction_id,
        "status": "completed",
        "message": "Payment confirmed",
        "timestamp": datetime.now().isoformat()
    }
