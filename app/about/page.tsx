export default function About() {
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
            <a href="/" className="px-6 py-2 rounded-full text-gray-700 text-base font-medium hover:bg-gray-50 transition-all">
              Home
            </a>
            <a href="/quiz" className="px-6 py-2 rounded-full text-gray-700 text-base font-medium hover:bg-gray-50 transition-all">
              Quiz
            </a>
            <button className="px-6 py-2 bg-pink-50 rounded-full text-gray-900 text-base font-medium hover:bg-pink-100 transition-all">
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-8 py-20">
        <h1 
          className="text-6xl font-bold mb-12 text-center" 
          style={{ 
            color: '#FC8DB2',
            textShadow: '2px 2px 4px rgba(252, 141, 178, 0.08)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }}
        >
          About ClearStart
        </h1>

        <div className="space-y-12 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              What is ClearStart?
            </h2>
            <p className="text-lg">
              Acne can get overwhelming. ClearStart is a personalized skincare guide designed to simplify the stress and confusion of acne, hopefully giving you a clear start. By answering a few questions about your skin, you'll receive a customized morning and evening routine tailored to your needs, no 10 step routine, just what works for you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Why ClearStart
            </h2>
            <p className="text-lg">
              As someone who’s gone down countless rabbit holes trying to improve acne, I understand the struggle. ClearStart was built to not only simplify skincare but also normalize and educate on acne, a tool I wish I had when I was struggling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Who It's For
            </h2>
            <p className="text-lg mb-4">
              ClearStart is for anyone dealing with acne who wants a simple, personalized starting point. Whether you're new to skincare or looking to refine your routine, this tool is designed to help you build a solid foundation.
            </p>
          </section>

          <section className="bg-pink-50/50 backdrop-blur-sm rounded-2xl border border-pink-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Important Disclaimer
            </h2>
            <p className="text-lg">
              ClearStart is an educational tool and portfolio project. The recommendations provided are based on general skincare principles and are not a substitute for professional medical advice. If you have severe acne or skin conditions, please consult a dermatologist.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Get Started
            </h2>
            <p className="text-lg mb-6">
              Ready to find your routine? Take the quiz and get personalized recommendations in just 3 minutes.
            </p>
            <a 
              href="/quiz" 
              className="inline-block bg-black px-12 py-4 rounded-full text-lg font-medium text-white hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              Take Quiz
            </a>
          </section>
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