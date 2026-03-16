import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-titan-deep border-t border-titan-gold/10'>
      <div className='max-w-[1440px] mx-auto px-6 md:px-12 py-16'>
        <div className='grid md:grid-cols-4 gap-12 mb-12'>
          <div className='md:col-span-2'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-10 h-10 border-2 border-titan-gold rounded-sm flex items-center justify-center rotate-45'>
                <span className='font-display text-titan-gold text-sm -rotate-45'>JL</span>
              </div>
              <div>
                <h3 className='font-display text-lg embossed-gold'>JOBLINK 360</h3>
                <p className='text-[9px] tracking-[3px] text-titan-silver uppercase'>Titanium Intelligence</p>
              </div>
            </div>
            <p className='text-titan-silver text-sm leading-relaxed max-w-md'>
              Empowering the African digital workforce through AI-driven employment matching, 
              training, and community development.
            </p>
            <div className='mt-6 flex items-center gap-2 text-[10px] text-titan-silver'>
              <div className='w-2 h-2 rounded-full bg-green-500' />
              <span>All systems operational</span>
            </div>
          </div>

          <div>
            <h4 className='font-accent text-[10px] uppercase tracking-widest text-titan-gold mb-6'>Platform</h4>
            <ul className='space-y-3 text-sm text-titan-silver'>
              <li><Link href='/dashboard' className='hover:text-titan-gold transition-colors'>Dashboard</Link></li>
              <li><Link href='/training' className='hover:text-titan-gold transition-colors'>Training</Link></li>
              <li><Link href='/register' className='hover:text-titan-gold transition-colors'>Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='font-accent text-[10px] uppercase tracking-widest text-titan-gold mb-6'>Legal</h4>
            <ul className='space-y-3 text-sm text-titan-silver'>
              <li><span className='hover:text-titan-gold transition-colors cursor-pointer'>Privacy Policy</span></li>
              <li><span className='hover:text-titan-gold transition-colors cursor-pointer'>Terms of Service</span></li>
              <li><span className='hover:text-titan-gold transition-colors cursor-pointer'>Kenya Law Compliance</span></li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-titan-gold/10 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-[10px] text-titan-silver/50 uppercase tracking-wider'>
            © 2026 Delite Production House. MIT License.
          </p>
          <div className='flex items-center gap-6 text-[10px] text-titan-silver/50 uppercase tracking-wider'>
            <span>Version 2.1.0</span>
            <span>•</span>
            <span>Titanium ERP Core</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
