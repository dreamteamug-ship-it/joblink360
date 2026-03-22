# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
import json

class TitaniumAPI(http.Controller):
    
    @http.route('/api/titanium/sync', type='json', auth='user', methods=['POST'])
    def sync_swarm_data(self, **kwargs):
        """API endpoint to trigger swarm data sync"""
        bridge = request.env['titanium.ai.bridge'].sudo().search([], limit=1)
        if bridge:
            bridge.action_sync_swarm_data()
            return {'status': 'success', 'message': 'Sync initiated'}
        return {'status': 'error', 'message': 'Bridge not configured'}
    
    @http.route('/api/titanium/health', type='json', auth='public', methods=['GET'])
    def health_check(self):
        """Health check endpoint"""
        return {
            'status': 'healthy',
            'service': 'Titanium ERP Brain',
            'version': '7.5',
            'intelligence': 'DeepSeek/Claude/Gemini Integrated'
        }
    
    @http.route('/api/titanium/lori/matches', type='json', auth='public', methods=['GET'])
    def get_lori_matches(self):
        """Get active Lori matches"""
        matches = request.env['stock.picking'].sudo().search([
            ('origin', 'ilike', 'Lori Match')
        ], limit=10)
        
        return {
            'status': 'success',
            'matches': [{
                'id': m.id,
                'name': m.name,
                'origin': m.location_id.name if m.location_id else '',
                'destination': m.location_dest_id.name if m.location_dest_id else '',
                'date': str(m.scheduled_date) if m.scheduled_date else ''
            } for m in matches]
        }
    
    @http.route('/api/titanium/sovereign/leads', type='json', auth='public', methods=['GET'])
    def get_sovereign_leads(self):
        """Get AI-processed sovereign leads"""
        leads = request.env['crm.lead'].sudo().search([
            ('tag_ids.name', '=', 'Sovereign')
        ], limit=20)
        
        return {
            'status': 'success',
            'leads': [{
                'id': l.id,
                'name': l.name,
                'expected_revenue': l.expected_revenue,
                'stage': l.stage_id.name if l.stage_id else ''
            } for l in leads]
        }
