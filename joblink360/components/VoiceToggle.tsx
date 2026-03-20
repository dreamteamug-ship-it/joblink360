// components/VoiceToggle.tsx
'use client';
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceToggleProps {
  onVoiceModeChange?: (enabled: boolean) => void;
  defaultEnabled?: boolean;
}

export function VoiceToggle({ onVoiceModeChange, defaultEnabled = false }: VoiceToggleProps) {
  const [voiceEnabled, setVoiceEnabled] = useState(defaultEnabled);
  const [voiceSupported, setVoiceSupported] = useState(false);
  
  useEffect(() => {
    // Check if browser supports speech recognition
    const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    const hasSpeechSynthesis = 'speechSynthesis' in window;
    setVoiceSupported(hasSpeechRecognition && hasSpeechSynthesis);
  }, []);
  
  const toggleVoice = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    if (onVoiceModeChange) {
      onVoiceModeChange(newState);
    }
    // Save preference to localStorage
    localStorage.setItem('amanda-voice-enabled', String(newState));
  };
  
  if (!voiceSupported) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
        <VolumeX size={14} className="text-zinc-500" />
        <span className="text-xs text-zinc-500">Voice not supported</span>
      </div>
    );
  }
  
  return (
    <button
      onClick={toggleVoice}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300
        ${voiceEnabled 
          ? 'bg-amber-500/20 border border-amber-500/50 text-amber-500' 
          : 'bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-300'
        }
      `}
      title={voiceEnabled ? 'Voice mode ON - Click to disable' : 'Voice mode OFF - Click to enable'}
    >
      {voiceEnabled ? (
        <>
          <Mic size={14} className="animate-pulse" />
          <Volume2 size={14} />
          <span className="text-xs font-medium">Voice ON</span>
        </>
      ) : (
        <>
          <MicOff size={14} />
          <VolumeX size={14} />
          <span className="text-xs font-medium">Voice OFF</span>
        </>
      )}
    </button>
  );
}
