// components/AmandaWidget.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { voiceService } from '@/lib/ai/voice-service';
import { VoiceToggle } from './VoiceToggle';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export function AmandaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load voice preference from localStorage
  useEffect(() => {
    const savedVoice = localStorage.getItem('amanda-voice-enabled');
    if (savedVoice !== null) {
      setVoiceEnabled(savedVoice === 'true');
    }
  }, []);
  
  useEffect(() => {
    setMounted(true);
    
    // Check voice support on mount
    const hasVoice = voiceService.isSupported();
    if (!hasVoice && voiceEnabled) {
      setVoiceEnabled(false);
    }
  }, []);
  
  useEffect(() => {
    if (isOpen && messages.length === 0 && mounted) {
      const welcomeMessage = voiceEnabled 
        ? "?? Habari! I am Amanda, your AI tutor. I can hear you! Click the microphone and speak, or type your question below."
        : "?? Habari! I am Amanda, your AI tutor. What would you like to learn about?";
      
      setMessages([{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
      
      if (voiceEnabled) {
        voiceService.speak(welcomeMessage);
      }
    }
  }, [isOpen, mounted]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleVoiceModeChange = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    // Add a system message when voice is toggled
    const voiceStatus = enabled 
      ? "?? Voice mode activated. Click the microphone to speak, or type your question."
      : "?? Voice mode deactivated. You can type your questions instead.";
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: voiceStatus,
      timestamp: new Date()
    }]);
    
    if (enabled) {
      voiceService.speak(voiceStatus);
    } else {
      voiceService.stopSpeaking();
    }
  };
  
  const startVoiceInput = () => {
    if (!voiceEnabled) return;
    
    setIsListening(true);
    voiceService.startListening(
      (transcript) => {
        setIsListening(false);
        if (transcript.trim()) {
          setInput(transcript);
          // Auto-send after voice input
          setTimeout(() => sendMessage(transcript), 500);
        }
      },
      () => {
        setIsListening(false);
      }
    );
  };
  
  const stopVoiceInput = () => {
    voiceService.stopListening();
    setIsListening(false);
  };
  
  const speakResponse = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    voiceService.speak(text, () => {
      setIsSpeaking(false);
    });
  };
  
  const sendMessage = async (messageText?: string) => {
    const userMessage = messageText || input;
    if (!userMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date()
    }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/amanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, voiceMode: voiceEnabled })
      });
      
      const data = await response.json();
      const assistantResponse = data.response || "Samahani, I'm having trouble connecting.";
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantResponse,
        timestamp: new Date()
      }]);
      
      // Speak the response if voice is enabled
      if (voiceEnabled && assistantResponse !== "Samahani, I'm having trouble connecting.") {
        speakResponse(assistantResponse);
      }
      
    } catch (error) {
      console.error('Amanda API error:', error);
      const errorMsg = "Samahani, I'm having trouble connecting. Please try again.";
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMsg,
        timestamp: new Date()
      }]);
      if (voiceEnabled) speakResponse(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!mounted) return null;
  
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50 group"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}
      
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[450px] h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">Amanda AI Tutor</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  {voiceEnabled ? (
                    <>
                      <Mic size={10} className="animate-pulse" />
                      Voice mode active
                    </>
                  ) : (
                    'Text mode active'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VoiceToggle onVoiceModeChange={handleVoiceModeChange} defaultEnabled={voiceEnabled} />
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">{msg.content}</div>
                  {msg.timestamp && (
                    <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            {isListening && (
              <div className="flex justify-start">
                <div className="bg-amber-500/20 border border-amber-500/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mic size={16} className="text-amber-500 animate-pulse" />
                    <span className="text-sm text-amber-500">Listening...</span>
                  </div>
                </div>
              </div>
            )}
            {isSpeaking && (
              <div className="flex justify-start">
                <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-green-500 animate-pulse" />
                    <span className="text-sm text-green-500">Amanda is speaking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              {voiceEnabled && (
                <button
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                  className={`p-3 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={voiceEnabled ? "Type or speak..." : "Ask Amanda..."}
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:border-gray-600"
                disabled={isLoading || isListening}
                ref={inputRef}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || isListening || !input.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
            {voiceEnabled && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                ?? Click the microphone, speak, and Amanda will respond by voice
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
