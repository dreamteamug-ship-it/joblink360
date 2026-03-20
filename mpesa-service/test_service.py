import requests
import json
import time
import sys

# Configuration
BASE_URL = "http://localhost:5001"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        print(f"✅ Health Check: {response.json()}")
        return True
    except requests.exceptions.ConnectionError:
        print("❌ Service not running. Start with: python app.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_stk_push(phone="254712345678", amount=10):
    """Test STK Push"""
    payload = {
        "phone": phone,
        "amount": amount,
        "reference": f"TEST-{int(time.time())}"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/mpesa/stkpush",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        result = response.json()
        print(f"\n📤 STK Push initiated:")
        print(f"   Phone: {phone}")
        print(f"   Amount: KES {amount}")
        print(f"   Response: {json.dumps(result, indent=2)}")
        
        if result.get('success') and result.get('checkout_request_id'):
            return result['checkout_request_id']
    except Exception as e:
        print(f"❌ Error: {e}")
    
    return None

def test_query(checkout_id):
    """Test query endpoint"""
    payload = {"checkout_request_id": checkout_id}
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/mpesa/query",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        result = response.json()
        print(f"\n🔍 Payment Status Query:")
        print(f"   Checkout ID: {checkout_id}")
        print(f"   Result: {json.dumps(result, indent=2)}")
        
    except Exception as e:
        print(f"❌ Error: {e}")

def test_transactions():
    """Test get transactions"""
    try:
        response = requests.get(f"{BASE_URL}/api/mpesa/transactions", timeout=10)
        result = response.json()
        print(f"\n📋 All Transactions:")
        print(f"   {json.dumps(result, indent=2)}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("=" * 50)
    print("🧪 M-PESA MICROSERVICE TEST SUITE")
    print("=" * 50)
    
    if len(sys.argv) > 1 and sys.argv[1] == "--phone":
        phone = sys.argv[2] if len(sys.argv) > 2 else "254712345678"
        amount = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        
        if test_health():
            checkout_id = test_stk_push(phone, amount)
            if checkout_id:
                print(f"\n⏳ Waiting 5 seconds before checking status...")
                time.sleep(5)
                test_query(checkout_id)
                test_transactions()
    else:
        if test_health():
            print("\n📝 Usage:")
            print("   python test_service.py --phone 254712345678 10")
