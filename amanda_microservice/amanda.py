from fastapi import FastAPI
import requests
app = FastAPI()

@app.get('/')
def root():
    return {'status':'amanda ready'}

# Simple endpoint to push a certificate to Odoo (example)
@app.post('/push_certificate/')
def push_certificate(user_id: int, course_id: int, cert_url: str, qr_url: str):
    ODOO_URL = 'http://odoo:8069/jsonrpc'
    ODOO_DB = 'postgres'
    ODOO_PASS = 'odoo'
    payload = {
        'jsonrpc': '2.0',
        'method': 'call',
        'params': {
            'service': 'object',
            'method': 'execute_kw',
            'args': [
                ODOO_DB,
                1,
                ODOO_PASS,
                'documents.document',
                'create',
                [{
                    'name': f'Certificate for {user_id}',
                    'file_url': cert_url,
                    'qr_code_url': qr_url
                }]
            ]
        },
        'id': 1
    }
    res = requests.post(ODOO_URL, json=payload, timeout=10)
    return res.json()
