// app/lms/page.tsx
export default function LMSPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-8">Learning Management System</h1>
        <p className="text-zinc-400 mb-8">50+ AI-powered courses to transform your career</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">Course {i}</h3>
              <p className="text-zinc-400 text-sm mb-4">Learn AI fundamentals and start earning</p>
              <div className="flex justify-between items-center">
                <span className="text-green-500">✓ Available</span>
                <button className="bg-amber-600 px-4 py-2 rounded-lg text-sm">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}