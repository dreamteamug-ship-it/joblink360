import sys
try:
    import intasend
    print("? intasend package found")
    print(f"Version: {intasend.__version__ if hasattr(intasend, '__version__') else 'unknown'}")
except ImportError as e:
    print(f"? intasend package NOT found: {e}")
    print("\nInstalling intasend...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "intasend"])
    print("? Installation complete")
