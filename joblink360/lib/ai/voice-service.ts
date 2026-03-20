// lib/ai/voice-service.ts
export class VoiceService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;
  private onResultCallback: ((text: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private supported: boolean = false;
  
  constructor() {
    // Check browser support
    if (typeof window !== 'undefined') {
      this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      this.synthesis = window.speechSynthesis;
      
      if (this.supported) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (this.onResultCallback) {
            this.onResultCallback(transcript);
          }
        };
        
        this.recognition.onend = () => {
          this.isListening = false;
          if (this.onEndCallback) {
            this.onEndCallback();
          }
        };
        
        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isListening = false;
          if (this.onEndCallback) {
            this.onEndCallback();
          }
        };
      }
    }
  }
  
  isSupported(): boolean {
    return this.supported;
  }
  
  startListening(onResult: (text: string) => void, onEnd?: () => void): void {
    if (!this.supported || !this.recognition) {
      console.warn('Speech recognition not supported');
      return;
    }
    
    this.onResultCallback = onResult;
    this.onEndCallback = onEnd;
    this.isListening = true;
    this.recognition.start();
  }
  
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
  
  speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }
    
    // Cancel any ongoing speech
    this.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to use a female voice for Amanda
    const voices = this.synthesis.getVoices();
    const femaleVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    
    this.synthesis.speak(utterance);
  }
  
  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
  
  isSpeaking(): boolean {
    return this.synthesis ? this.synthesis.speaking : false;
  }
  
  isVoiceSupported(): boolean {
    return this.supported;
  }
}

export const voiceService = new VoiceService();
