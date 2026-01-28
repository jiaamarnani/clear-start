export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-white to-white"></div>
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-semibold tracking-tight" style={{ 
            color: '#FC8DB2',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }}>
            ClearStart
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-pink-50 rounded-full text-gray-900 text-base font-medium hover:bg-pink-100 transition-all">
              Home
            </button>
            <a href="/quiz" className="px-6 py-2 rounded-full text-gray-700 text-base font-medium hover:bg-gray-50 transition-all">
              Quiz
            </a>
            <a href="/about" className="px-6 py-2 rounded-full text-gray-700 text-base font-medium hover:bg-gray-50 transition-all">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-20 pb-8">
        <div className="text-center mb-20">
          <h1 
            className="text-8xl font-bold tracking-tight mb-10" 
            style={{ 
              color: '#FC8DB2',
              textShadow: '2px 2px 4px rgba(252, 141, 178, 0.08)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            ClearStart
          </h1>
          <p className="text-2xl text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto" style={{ lineHeight: '1.7' }}>
            Acne is overwhelming, finding a routine doesn't have to be.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/quiz" className="inline-block bg-black px-10 py-4 rounded-full text-base font-medium text-white hover:bg-gray-900 transition-all" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Get Started
            </a>
            <button className="inline-block px-10 py-4 rounded-full text-base font-medium text-gray-700 hover:bg-gray-50 transition-all" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Three Steps Section */}
        <div className="mb-32">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 text-center mb-16" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>How It Works</h2>
          
          <div className="flex items-start justify-center gap-20 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-base font-bold text-pink-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>01</span>
                <h3 className="text-5xl font-semibold text-black">Answer</h3>
              </div>
              <p className="text-base text-gray-600 pl-12 leading-relaxed" style={{ lineHeight: '1.7' }}>
                Tell us about your skin, sensitivity and current products. 
              </p>
            </div>

            {/* Divider */}
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            {/* Step 2 */}
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-base font-bold text-pink-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>02</span>
                <h3 className="text-5xl font-semibold text-black">Learn</h3>
              </div>
              <p className="text-base text-gray-600 pl-12 leading-relaxed" style={{ lineHeight: '1.7' }}>
                Understand your acne, simply.
              </p>
            </div>

            {/* Divider */}
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            {/* Step 3 */}
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-base font-bold text-pink-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>03</span>
                <h3 className="text-5xl font-semibold text-black">Glow</h3>
              </div>
              <p className="text-base text-gray-600 pl-12 leading-relaxed" style={{ lineHeight: '1.7' }}>
                Get a custom AM/PM routine that's simple, safe and realistic.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <p className="text-sm text-gray-500 mb-6 tracking-wide" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>READY TO START?</p>
            <a 
              href="/quiz" 
              className="inline-block bg-black px-20 py-5 rounded-full text-xl font-medium text-white hover:bg-gray-900 hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              Take Quiz
            </a>
            <p className="text-xs text-gray-400 mt-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>Takes 3 minutes • No signup required</p>
          </div>
        </div>
      </div>

  {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-8 py-12 text-center">
          <p className="text-sm text-gray-500 mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>Purely Educational - Not Medical Advice</p>
          <p className="text-xs text-gray-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>© 2026 ClearStart</p>
        </div>
      </footer>
    </div>
  );
}