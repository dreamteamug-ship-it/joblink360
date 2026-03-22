{
    'name': 'Titanium ERP Brain',
    'version': '7.5',
    'category': 'Sovereign Intelligence',
    'summary': 'AI-Driven ERP System with Swarm Intelligence',
    'description': """
        Titanium ERP - The Sovereign Intelligence Brain
        - 90% AI Automation
        - 26-Country Swarm Integration
        - Lori Matchmaker Engine
        - Capital Connect AI Scoring
    """,
    'author': 'DreamTeQ Sovereign',
    'website': 'https://deliteproductions.vercel.app',
    'depends': ['base', 'crm', 'sale', 'stock', 'project', 'hr_recruitment'],
    'data': [
        'security/titanium_security.xml',
        'views/titanium_dashboard.xml',
        'views/titanium_views.xml',
        'views/crm_views.xml',
        'views/fleet_views.xml',
        'views/project_views.xml',
        'data/ai_scoring_rules.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
