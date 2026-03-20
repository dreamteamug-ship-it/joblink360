import os
import sys
from youtube_transcript_api import YouTubeTranscriptApi

def rip_intel(url, output_folder=r'C:\Users\25479\joblink360\joblink360\local\amanda\assets\knowledge_base\raw'):
    try:
        if not os.path.exists(output_folder): os.makedirs(output_folder)
        video_id = url.split("v=")[1].split("&")[0]
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([e['text'] for e in transcript])
        file_name = f"YT_{video_id}.txt"
        with open(os.path.join(output_folder, file_name), "w", encoding="utf-8") as f:
            f.write(text)
        print(f"SUCCESS: {file_name} saved.")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) > 1: rip_intel(sys.argv[1])
