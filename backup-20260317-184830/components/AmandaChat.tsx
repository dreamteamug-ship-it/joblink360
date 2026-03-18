'use client'
import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  "Find remote customer service jobs",
  "What skills do I need for data entry?",
  "Show me jobs under KES 50,000",
  "How do I write a CV with no experience?",
  "Which jobs accept high school leavers?"
]

const RESPONSES: Record<string, string> = {
  remote: "I found several remote opportunities for you!\n\n🔹 **Virtual Assistant** - KES 35,000-60,000/mo\n🔹 **Customer Service Rep** - KES 40,000-55,000/mo\n🔹 **Data Entry Clerk** - KES 30,000-45,000/mo\n\nWant me to help you apply to any of these?",
  skills: "Great question! Here are essential skills employers look for:\n\n✅ **Communication** - Clear writing and speaking\n✅ **Computer literacy** - Email, Word, spreadsheets\n✅ **Time management** - Meeting deadlines\n✅ **Problem-solving** - Thinking on your feet\n\nWould you like free resources to learn any of these?",
  salary: "Here are jobs under KES 50,000/month:\n\n💰 **Mpesa Agent** - KES 25,000-35,000\n💰 **Security Guard** - KES 20,000-30,000\n💰 **House Manager** - KES 30,000-45,000\n💰 **Delivery Rider** - KES 25,000-40,000 + tips",
  cv: "Here's how to create a CV with no experience:\n\n📝 **Education section first** - Highlight coursework\n📝 **Skills section** - What you CAN do\n📝 **Volunteer work** - Shows initiative\n📝 **Personal statement** - Your goals and motivation\n\nI can help you draft one! What's your highest education level?",
  highschool: "Many great jobs accept high school leavers:\n\n✨ **Sales Representative**\n✨ **Mpesa Agent**\n✨ **Security Guard**\n✨ **Cleaner/Janitor**\n✨ **Delivery Rider**\n✨ **Farm Worker**\n\nAll these have clear career paths to higher-paying roles!"
}

export default function AmandaChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'amanda'; text: string }[]>([
    { role: 'amanda', text: "Hi! I'm Amanda, your JobLink360 career assistant. How can I help you today? 🌟" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getResponse = (query: string): string => {
    const q = query.toLowerCase()
    if (q.includes('remote') || q.includes('work from home') || q.includes('online')) return RESPONSES.remote
    if (q.includes('skill') || q.includes('need') || q.includes('learn')) return RESPONSES.skills
    if (q.includes('under') || q.includes('salary') || q.includes('kes') || q.includes('pay')) return RESPONSES.salary
    if (q.includes('cv') || q.includes('resume') || q.includes('experience')) return RESPONSES.cv
    if (q.includes('high school') || q.includes('leaver') || q.includes('form 4')) return RESPONSES.highschool
    return "I'd be happy to help! You can ask me about:\n\n• Job recommendations\n• Required skills\n• Salary information\n• CV writing tips\n• Career guidance\n\nWhat would you like to know?"
  }

  const handleSend = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return

    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'amanda', text: getResponse(msg) }])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-titan-maroon to-titan-blue rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50 border-2 border-titan-gold/50"
        aria-label="Open Amanda chat"
      >
        <svg className="w-7 h-7 text-titan-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    )
  }

  return (
    <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] glass-panel border border-titan-gold/30 rounded-lg shadow-2xl z-[60] transition-all duration-300 origin-bottom-right">
      <div className="bg-gradient-to-r from-titan-maroon/80 to-titan-blue/80 px-5 py-4 border-b border-titan-gold/20 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-titan-gold/20 flex items-center justify-center">
              <span className="text-titan-gold font-bold text-lg">A</span>
            </div>
            <div>
              <h3 className="text-titan-cream font-semibold">Amanda</h3>
              <p className="text-titan-cream/60 text-xs">AI Career Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-titan-cream/60 hover:text-titan-cream transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-titan-deep/40">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-titan-maroon text-titan-cream rounded-br-none'
                : 'bg-titan-dark/80 text-titan-cream border border-titan-gold/20 rounded-bl-none'
            }`}>
              {msg.text.split('\n').map((line, j) => (
                <p key={j} className={line.startsWith('•') || line.startsWith('🔹') || line.startsWith('✅') || line.startsWith('💰') || line.startsWith('✨') || line.startsWith('📝') ? 'ml-2' : ''}>
                  {line.replace(/\*\*(.*?)\*\*/g, (_, text) => text)}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-titan-dark/80 border border-titan-gold/20 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-titan-gold/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t border-titan-gold/20 bg-titan-dark/60 rounded-b-lg">
        <div className="flex flex-wrap gap-1 mb-2">
          {SUGGESTIONS.slice(0, 3).map((s, i) => (
            <button key={i} onClick={() => handleSend(s)} className="text-xs px-2 py-1 bg-titan-gold/10 text-titan-gold/80 rounded-full hover:bg-titan-gold/20 transition-colors truncate max-w-[120px]">
              {s.split(' ').slice(0, 3).join(' ')}...
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Amanda..."
            className="flex-1 bg-titan-dark/80 border border-titan-gold/20 rounded-lg px-4 py-2 text-sm text-titan-cream placeholder:text-titan-cream/40 focus:outline-none focus:border-titan-gold/50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-4 py-2 bg-titan-maroon text-titan-cream rounded-lg hover:bg-titan-maroon/80 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
