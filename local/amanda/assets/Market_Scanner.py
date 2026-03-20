import csv
from jobspy import scrape_jobs

# THE HUNT: Find the exact jobs we are training for
jobs = scrape_jobs(
    site_name=["linkedin", "upwork", "indeed"],
    search_term="AI Prompt Engineer",
    location="Remote",
    results_wanted=20,
    hours_old=72, # Only the freshest demand
    country_freedom=True,
)

# SAVE TO KNOWLEDGE BASE
jobs.to_csv("C:/JobLink360_Assets/Knowledge_Base/Live_Market_Demand.csv", index=False)
print(f"Target Acquired: {len(jobs)} actual jobs scraped for reverse-engineering.")
