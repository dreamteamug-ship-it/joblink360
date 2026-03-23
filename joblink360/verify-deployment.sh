#!/bin/bash
# Verify Titanium Sovereign System deployment

echo "?? Verifying Titanium Sovereign System deployment..."

# Check if command center page exists
if [ -f "app/command-center/page.tsx" ]; then
    echo "? Command Center page exists"
else
    echo "? Command Center page missing"
fi

# Check if Odoo theme files exist
if [ -f "odoo-modules/titanium_theme/static/src/css/titanium.css" ]; then
    echo "? Titanium CSS exists"
else
    echo "? Titanium CSS missing"
fi

if [ -f "odoo-modules/titanium_theme/views/assets.xml" ]; then
    echo "? Odoo XML exists"
else
    echo "? Odoo XML missing"
fi

# Check git status
echo "?? Git status:"
git status --porcelain

echo "?? Verification complete!"
