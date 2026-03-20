import csv
import os
def generate_seed_data():
    seed_data = [
        ["Job_Title", "Region", "Demand_Score", "Primary_Skill", "AI_Integration_Level"],
        ["Cloud Systems Architect", "Nairobi, KE", "94", "Terraform", "High"],
        ["IoT Solutions Engineer", "Lusaka, ZM", "88", "Python", "Medium"]
    ]
    with open("Continental_Demand.csv", mode="w", newline="") as f:
        csv.writer(f).writerows(seed_data)
    print("? Seed CSV Ready.")

try:
    import requests
    print("Scanning YouTube API...")
    raise Exception("API Offline") # Force fallback for testing
except Exception as e:
    print(f"Fallback Active: {e}")
    generate_seed_data()
