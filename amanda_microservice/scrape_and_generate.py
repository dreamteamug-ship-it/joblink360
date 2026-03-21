from youtube_transcript_api import YouTubeTranscriptApi
from bs4 import BeautifulSoup
import requests
import json
import os

OUT_DIR = 'scraped_content'
os.makedirs(OUT_DIR, exist_ok=True)

def fetch_youtube_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([t['text'] for t in transcript])
        return text
    except Exception:
        return ''

def fetch_page_text(url):
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, 'html.parser')
    paragraphs = [p.get_text(strip=True) for p in soup.find_all('p')]
    return '\\n\\n'.join(paragraphs)

def save_course(course_json, filename):
    path = os.path.join(OUT_DIR, filename)
    with open(path, 'w', encoding='utf8') as f:
        json.dump(course_json, f, ensure_ascii=False, indent=2)
    return path

if __name__ == '__main__':
    vid = 'Yq0QkCxoTHM'
    transcript = fetch_youtube_transcript(vid)
    course = {
        'title': 'Auto-generated course from YouTube',
        'source': f'https://youtube.com/watch?v={vid}',
        'content': transcript[:10000]
    }
    print('Saving course...')
    save_course(course, 'course_youtube_sample.json')
    print('Done.')
