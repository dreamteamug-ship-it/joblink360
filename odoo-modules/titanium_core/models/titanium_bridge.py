# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import json
import requests
import logging

_logger = logging.getLogger(__name__)

class TitaniumAIBridge(models.Model):
    _name = 'titanium.ai.bridge'
    _description = 'Titanium AI Bridge - Swarm Intelligence Connector'
    _rec_name = 'name'
    
    name = fields.Char('Connection Name', required=True, default='Sovereign Swarm')
    supabase_url = fields.Char('Supabase URL', required=True, 
        default='https://wqrgdanpdjebrcblayas.supabase.co')
    supabase_key = fields.Char('Supabase Service Key', required=True)
    last_sync = fields.Datetime('Last Sync')
    sync_status = fields.Selection([
        ('idle', 'Idle'),
        ('syncing', 'Syncing'),
        ('success', 'Success'),
        ('error', 'Error')
    ], default='idle')
    sync_count = fields.Integer('Records Synced')
    error_message = fields.Text('Last Error')
    
    def action_sync_swarm_data(self):
        """Sync data from Sovereign Swarm (Supabase) to Titanium ERP"""
        self.sync_status = 'syncing'
        
        try:
            self._sync_sovereign_opportunities()
            self._sync_lori_matches()
            self.sync_status = 'success'
            self.last_sync = fields.Datetime.now()
        except Exception as e:
            self.sync_status = 'error'
            self.error_message = str(e)
            _logger.error(f"Sync failed: {e}")
    
    def _sync_sovereign_opportunities(self):
        """Fetch and create sovereign opportunities as CRM leads"""
        headers = {
            'apikey': self.supabase_key,
            'Authorization': f'Bearer {self.supabase_key}'
        }
        
        url = f"{self.supabase_url}/rest/v1/sovereign_opportunities?select=*&status=eq.pending&sovereign_score=gte.80"
        
        try:
            response = requests.get(url, headers=headers, timeout=30)
            if response.status_code == 200:
                opportunities = response.json()
                for opp in opportunities:
                    self._create_crm_lead(opp)
                    self.sync_count += 1
        except Exception as e:
            _logger.error(f"Sync error: {e}")
    
    def _create_crm_lead(self, data):
        """Create CRM lead from sovereign opportunity"""
        lead_model = self.env['crm.lead']
        
        lead = lead_model.create({
            'name': data.get('title', 'Sovereign Opportunity'),
            'description': data.get('description', ''),
            'partner_name': f"Sovereign Lead - {data.get('country', 'Africa')}",
            'expected_revenue': self._parse_amount(data.get('budget', '0')),
            'stage_id': self._get_stage_id('new'),
            'user_id': self.env.user.id,
        })
        
        if data.get('amanda_payload'):
            lead.write({
                'x_amanda_analysis': json.dumps(data['amanda_payload'])
            })
        
        self._update_supabase_status(data['id'], 'synced_to_titanium')
        return lead
    
    def _sync_lori_matches(self):
        """Fetch Lori matches and create fleet deliveries"""
        headers = {
            'apikey': self.supabase_key,
            'Authorization': f'Bearer {self.supabase_key}'
        }
        
        url = f"{self.supabase_url}/rest/v1/lori_matchmaker?select=*&status=eq.pending&profit_margin=gte.20"
        
        try:
            response = requests.get(url, headers=headers, timeout=30)
            if response.status_code == 200:
                matches = response.json()
                for match in matches:
                    self._create_delivery_order(match)
                    self.sync_count += 1
        except Exception as e:
            _logger.error(f"Lori sync error: {e}")
    
    def _create_delivery_order(self, data):
        """Create delivery order from Lori match"""
        picking_model = self.env['stock.picking']
        
        picking = picking_model.create({
            'name': f"Lori Match: {data.get('cargo_type')}",
            'origin': f"Sovereign Swarm - {data.get('origin_country')}",
            'location_dest_id': self._get_location_id(data.get('destination_country')),
            'picking_type_id': self._get_picking_type_id('outgoing'),
            'note': f"Weight: {data.get('weight_tonnage')} tons | Profit: {data.get('profit_margin')}%",
            'scheduled_date': fields.Datetime.now(),
        })
        
        self._update_supabase_status(data['id'], 'dispatched_to_titanium')
        return picking
    
    def _get_location_id(self, location_name):
        location_map = {
            'Kenya': 1, 'Uganda': 2, 'Tanzania': 3, 'Rwanda': 4,
        }
        return location_map.get(location_name, 1)
    
    def _get_picking_type_id(self, type_name):
        picking_type = self.env['stock.picking.type'].search([('name', 'ilike', type_name)], limit=1)
        return picking_type.id if picking_type else 1
    
    def _parse_amount(self, amount_str):
        import re
        numbers = re.findall(r'\d+', str(amount_str))
        if numbers:
            return float(numbers[0])
        return 0.0
    
    def _update_supabase_status(self, record_id, status):
        headers = {
            'apikey': self.supabase_key,
            'Authorization': f'Bearer {self.supabase_key}',
            'Content-Type': 'application/json'
        }
        url = f"{self.supabase_url}/rest/v1/sovereign_opportunities?id=eq.{record_id}"
        data = json.dumps({'status': status})
        try:
            requests.patch(url, headers=headers, data=data, timeout=10)
        except:
            pass
    
    def _get_stage_id(self, stage_name):
        stage = self.env['crm.stage'].search([('name', 'ilike', stage_name)], limit=1)
        return stage.id if stage else 1
