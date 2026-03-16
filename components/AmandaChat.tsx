'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'amanda'
  text: string
  timestamp: Date
}

export default function AmandaChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'amanda',
      text: 'Hello! I am Amanda AI, your Joblink 360 assistant. I can help you find jobs, navigate training modules, or answer questions about Titanium ERP. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()
      
      const amandaMessage: Message = {
        role: 'amanda',
        text: data.reply || 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, amandaMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: 'amanda',
        text: 'I am having trouble connecting to the Titanium ERP core. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <div 
        className={\ixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] glass-panel border border-titan-gold/30 rounded-lg shadow-2xl z-[60] transition-all duration-300 origin-bottom-right \\}
      >
        <div className='bg-gradient-to-r from-titan-maroon/80 to-titan-blue/80 px-5 py-4 border-b border-titan-gold/20 rounded-t-lg'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 border border-titan-gold/50 rounded-full flex items-center justify-center bg-titan-dark/50'>
                <span className='text-titan-gold text-lg'>⚡</span>
              </div>
              <div>
                <h3 className='font-display text-sm text-titan-gold tracking-wider'>AMANDA AI</h3>
                <div className='flex items-center gap-2 mt-0.5'>
                  <div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
                  <span className='text-[9px] text-green-400 uppercase tracking-wider'>Online • Titanium ERP</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className='text-titan-silver hover:text-titan-gold transition-colors p-1'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>

        <div className='h-[350px] overflow-y-auto p-4 space-y-4 bg-titan-dark/50'>
          {messages.map((msg, i) => (
            <div 
              key={i}
              className={\lex \\}
            >
              <div className={\max-w-[85%] p-3 rounded-lg \\}>
                <p className='text-sm leading-relaxed'>{msg.text}</p>
                <p className={\	ext-[9px] mt-2 \\}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className='flex justify-start'>
              <div className='bg-titan-blue/30 text-titan-silver p-3 rounded-lg rounded-bl-none border border-titan-blue/50'>
                <div className='flex gap-1'>
                  <div className='w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce' style={{ animationDelay: '0ms' }} />
                  <div className='w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce' style={{ animationDelay: '150ms' }} />
                  <div className='w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce' style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className='p-4 border-t border-titan-gold/10 bg-titan-dark/80 rounded-b-lg'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Ask Amanda anything...'
              className='flex-1 bg-titan-dark/50 border border-titan-gold/20 rounded px-4 py-2.5 text-sm text-titan-cream placeholder-titan-silver/40 focus:outline-none focus:border-titan-gold/50 transition-colors'
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className='bg-titan-gold text-titan-dark px-4 py-2.5 font-accent font-bold text-xs uppercase tracking-wider hover:bg-titan-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
              </svg>
            </button>
          </div>
          <p className='text-[9px] text-titan-silver/30 mt-2 text-center'>
            Powered by Titanium ERP Intelligence
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={\ixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-[70] transition-all duration-300 \\}
      >
        {isOpen ? (
          <svg className='w-6 h-6 text-titan-gold' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <span className='text-titan-gold text-2xl'>⚡</span>
        )}
      </button>
    </>
  )
}
