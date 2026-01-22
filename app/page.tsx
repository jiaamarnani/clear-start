//Landing page

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      {/* background blob decal */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-2xl tracking-tight" style={{ 
            color: '#FC8DB2',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3), 8px 8px 24px rgba(252, 141, 178, 0.2)',
            fontFamily: 'Georgia, serif'
          }}>
            ClearStart
          </div>
          <div className="flex gap-4 pr-4">
            <button className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
              Home
            </button>
            <a href="/quiz" className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
              Quiz
            </a>
            <button className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
              About
            </button>
          </div>
        </div>
      </nav>

      {/* heading */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-8">
        <div className="text-center mb-10">
          <h1 
            className="text-8xl font-black tracking-tight mb-3" 
            style={{ 
              color: '#FC8DB2',
              textShadow: '2px 3px 5px rgba(0, 0, 0, 0.3), 8px 8px 24px rgba(252, 141, 178, 0.2)',
              fontFamily: 'Didot, "Bodoni MT", "Noto Serif Display", serif'
            }}
          >
            ClearStart
          </h1>
          <p className="text-2xl text-gray-900">
            Acne is overwhelming, finding a routine doesn't have to be.
          </p>
        </div>

       {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="h-64 perspective-1000">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
              {/* Front */}
              <div className="absolute w-full h-full bg-[#FFD8E9] rounded-3xl p-8 shadow-lg backface-hidden">
                <div className="text-gray-600 text-lg font-medium mb-3">01</div>
                <h3 className="text-2xl font-semibold text-black mb-16">Answer a few questions</h3>
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border-3 border-black">
                  <span className="text-3xl font-bold text-black">+</span>
                </div>
              </div>
              {/* Back */}
              <div className="absolute w-full h-full bg-[#FC8DB2] rounded-3xl p-8 shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-black text-center text-xl font-medium">Tell us about your skin, sensitivity and current products.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="h-64 perspective-1000">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
              {/* Front */}
              <div className="absolute w-full h-full bg-[#FFD8E9] rounded-3xl p-8 shadow-lg backface-hidden">
                <div className="text-gray-600 text-lg font-medium mb-3">02</div>
                <h3 className="text-2xl font-semibold text-black mb-16">Learn about your skin</h3>
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border-3 border-black">
                  <span className="text-3xl font-bold text-black">+</span>
                </div>
              </div>
              {/* Back */}
              <div className="absolute w-full h-full bg-[#FC8DB2] rounded-3xl p-8 shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-black text-center text-xl font-medium">Understand your acne, simply.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="h-64 perspective-1000">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
              {/* Front */}
              <div className="absolute w-full h-full bg-[#FFD8E9] rounded-3xl p-8 shadow-lg backface-hidden">
                <div className="text-gray-600 text-lg font-medium mb-3">03</div>
                <h3 className="text-2xl font-semibold text-black mb-16">Get your routine</h3>
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border-3 border-black">
                  <span className="text-3xl font-bold text-black">+</span>
                </div>
              </div>
              {/* Back */}
              <div className="absolute w-full h-full bg-[#FC8DB2] rounded-3xl p-8 shadow-lg backface-hidden rotate-y-180 flex items-center justify-center">
                <p className="text-black text-center text-xl font-medium">Get a custom AM/PM routine that's simple, safe and realistic.</p>
              </div>
            </div>
          </div>
        </div>

        {/* take quiz button */}
        <div className="text-center">
          <a href="/quiz" className="inline-block bg-white px-16 py-6 rounded-2xl text-3xl font-bold tracking-wider shadow-xl hover:shadow-2xl transition border-2 border-black hover:scale-105 text-black">     
            TAKE QUIZ
          </a>
        </div>
      </div>

      {/* disclaimer */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-sm text-gray-600">Purely Educational - Not Medical Advice</p>
      </div>
    </div>
  );
}