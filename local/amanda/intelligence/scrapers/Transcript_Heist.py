import sys
from youtube_transcript_api import YouTubeTranscriptApi

def harvest_intelligence(video_id, output_name):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([t['text'] for t in transcript])
        with open(f"local/amanda/assets/knowledge_base/course_raw/{output_name}.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print(f"? HARVESTED: {output_name}")
    except Exception as e:
        print(f"? FAILED: {str(e)}")

if __name__ == "__main__":
    # Example IDs: 'Earn Money in Kenya/Nigeria' niche
    v_id = sys.argv[1] if len(sys.argv) > 1 else "dQw4w9WgXcQ"
    o_name = sys.argv[2] if len(sys.argv) > 2 else "YouTube_Intel_Raw"
    harvest_intelligence(v_id, o_name)
