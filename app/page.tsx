'use client'


import React, { useState, useEffect, useRef } from 'react';

export default function ClearStartRedesign() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTikTokBadge, setShowTikTokBadge] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Toggle between color themes - change this to switch themes!
  const [theme] = useState<'red' | 'blue'>('red'); // Options: 'red' or 'blue'
  
  const colors:  Record<'red' | 'blue', { primary: string; light: string; lighter: string; accent: string }> = {
    red: {
      primary: '#8B2635',
      light: '#A63446',
      lighter: '#FFF5F7',
      accent: '#B85C69'
    },
    blue: {
      primary: '#1E3A5F',
      light: '#2C5282',
      lighter: '#F0F4F8',
      accent: '#4A6FA5'
    }
  };
  
  const currentTheme = colors[theme];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Show TikTok badge after scrolling past hero
      setShowTikTokBadge(window.scrollY > window.innerHeight * 0.5);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Intersection observer for fade-in animations
      const sections = document.querySelectorAll<HTMLElement>('.fade-in-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible && section.dataset.id) {
          setVisibleSections(prev => new Set([...prev, section.dataset.id]));
        }
      });
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300"
        style={{ 
          width: `${scrollProgress}%`,
          backgroundColor: currentTheme.primary
        }}
      />
      
      {/* Floating TikTok Badge */}
      <div 
        className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${
          showTikTokBadge ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <a 
          href="https://tiktok.com/@yourusername" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: currentTheme.primary }}
        >
          <div className="text-white">
            <div className="text-2xl font-light">60k+</div>
            <div className="text-xs opacity-90">on TikTok</div>
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-lg">→</span>
          </div>
        </a>
      </div>

      {/* Minimalist Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="text-xl tracking-tight font-medium" style={{ color: currentTheme.primary }}>
            ClearStart
          </div>
          <div className="flex gap-8 text-sm items-center">
            <a href="#story" className="text-gray-600 hover:text-gray-900 transition-colors">My Story</a>
            <a href="/quiz" className="px-6 py-2 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-105" style={{ backgroundColor: currentTheme.primary }}>
              Take Quiz
            </a>
          </div>
        </div>
      </nav>

      {/* Hero - Start of Story */}
      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white"></div>

        <div className="relative z-10 max-w-4xl text-center">
            <div className="text-sm tracking-widest text-gray-400 uppercase">
              Clear Start
          </div>

          <h1 className="text-8xl md:text-7xl mb-8 tracking-tight font-light drop-shadow-md" style={{
            color: currentTheme.primary,
            lineHeight: 1.1,
            fontFamily: 'Georgia, serif'
          }}>
            Acne is confusing, <br />
            Your routine shouldn't be.
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            no more trial and error, get answers and routines that make sense.
          </p>

        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm animate-bounce" style={{ animationDuration: '3s' }}>
          Scroll to continue ↓
        </div>


      </section>
    

      {/* Section 1: The Struggle */}
      <section 
        id="story"
        className="fade-in-section min-h-screen flex items-center px-8 py-32 transition-all duration-1000 ease-out"
        data-id="section1"
        style={{ 
          backgroundColor: currentTheme.lighter,
          opacity: visibleSections.has('section1') ? 1 : 0,
          transform: visibleSections.has('section1') ? 'translateY(0)' : 'translateY(80px)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="text-8xl font-light mb-4" style={{ color: currentTheme.light, opacity: 0.3 }}>01</div>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-5xl font-light mb-6" style={{ 
                color: currentTheme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                My Struggle
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                I went from clear skin to persistent texture and acne. 
                Spending hours on Reddit and TikTok finding new products to try for my skin, only to be left more confused and frustrated.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Trying new products and routines was pointless when I didn't understand
                 <em>why</em> or how to address MY specific acne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Overwhelm */}
      <section 
        className="fade-in-section min-h-screen flex items-center px-8 py-32 bg-white transition-all duration-1000"
        data-id="section2"
        style={{ 
          opacity: visibleSections.has('section2') ? 1 : 0,
          transform: visibleSections.has('section2') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center"> 
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-5xl font-light mb-6" style={{ 
                color: currentTheme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                The information overload
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>"Try retinol!" "No, try benzoyl peroxide!" "Actually, you need salicylic acid!"</p>
                <p>"Use a 10-step routine!" "Wait, that's too many products!"</p>
                <p>"It's your diet!" "It's your hormones!" "It's stress!"</p>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed pt-6 border-t border-gray-200">
                Everyone had an opinion. No one had answers that worked for <em>me</em>.
              </p>
              <div className="pt-6">
                <div className="p-6 rounded-lg transition-all hover:shadow-md" style={{ backgroundColor: currentTheme.lighter }}>
                  <p className="text-sm text-gray-600 mb-2 font-medium">THE REALITY:</p>
                  <p className="text-gray-700">
                    I spent <strong>$800+</strong> on products in one year. Only <strong>2</strong> actually 
                    helped. The rest collected dust in my bathroom.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-8xl font-light mb-4 text-right" style={{ color: currentTheme.light, opacity: 0.3 }}>02</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Turning Point */}
      <section 
        className="fade-in-section min-h-screen flex items-center px-8 py-32 transition-all duration-1000"
        data-id="section3"
        style={{ 
          backgroundColor: currentTheme.lighter,
          opacity: visibleSections.has('section3') ? 1 : 0,
          transform: visibleSections.has('section3') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="text-8xl font-light mb-4" style={{ color: currentTheme.light, opacity: 0.3 }}>03</div>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-5xl font-light mb-6" style={{ 
                color: currentTheme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                Here's my routine
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                After months of trial and error, I finally found what worked. Not through 
                expensive dermatologists or trendy TikTok hacks.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Through <strong>research</strong>, <strong>patience</strong>, and understanding 
                that skincare isn't one-size-fits-all.
              </p>
              <div className="space-y-3 pt-6">
                <div className="flex items-start gap-3 transition-all hover:translate-x-2">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: currentTheme.primary }}></div>
                  <p className="text-gray-700">2 Step AM routine: moisturizer, SPF</p>
                </div>
                <div className="flex items-start gap-3 transition-all hover:translate-x-2">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: currentTheme.primary }}></div>
                  <p className="text-gray-700">Strategic PM routine: cleanser, treatment, moisturizer</p>
                </div>
                <div className="flex items-start gap-3 transition-all hover:translate-x-2">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: currentTheme.primary }}></div>
                  <p className="text-gray-700">No more than 5 products total. That's it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 5: The Mission */}
      <section
        className="fade-in-section min-h-screen flex items-center px-8 py-32 transition-all duration-1000"
        data-id="section5"
        style={{
          backgroundColor: currentTheme.lighter,
          opacity: visibleSections.has('section5') ? 1 : 0,
          transform: visibleSections.has('section5') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-5xl font-light mb-6" style={{
                color: currentTheme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                Let me help you
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                I built ClearStart because I wish it existed when I was struggling.
                Stopping you from wasting time and money, giving real answers.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Over the past year, I've built a community of <strong>60,000+ people on TikTok</strong> who
                are on the same journey, normalizing acne, sharing what actually works, and building confidence
                through honest skincare education.
              </p>
              <div className="pt-8 space-y-4">
                <div className="p-6 rounded-lg border-2 transition-all hover:shadow-lg" style={{ borderColor: currentTheme.primary }}>
                  <h3 className="font-medium mb-2" style={{ color: currentTheme.primary }}>What you'll get:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Personalized routine based on YOUR skin type</li>
                    <li>• Active ingredients explained in plain English</li>
                    <li>• Realistic timelines (no false promises)</li>
                    <li>• Budget-friendly options at every price point</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <a
                    href="https://tiktok.com/@jlovesskincare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-all hover:translate-x-1"
                    style={{ color: currentTheme.primary }}
                  >
                    <span>Follow my skincare journey on TikTok</span>
                    <span>→</span>
                  </a>
                  <p className="text-xs text-gray-500 mt-1">60k+ people normalizing acne together</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-8xl font-light mb-4 text-right" style={{ color: currentTheme.light, opacity: 0.3 }}>04</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Take the Quiz */}
      <section className="min-h-screen flex items-center justify-center px-8 py-32 text-white" style={{ backgroundColor: currentTheme.primary }}>
        <div className="max-w-3xl text-center">
          <h2 className="text-6xl md:text-7xl font-light mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Ready to find your routine?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Take 3 minutes to answer questions about your skin. Get personalized 
            recommendations backed by research, not marketing.
          </p>
          <a 
            href="/quiz" 
            className="inline-block bg-white px-12 py-5 rounded-full text-lg font-medium transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{ color: currentTheme.primary }}
          >
            Start the Quiz
          </a>
          <p className="text-sm mt-8 opacity-75">No signup • No email • 100% free • Just honest advice</p>
          
          <div className="mt-16 pt-16 border-t border-white/20">
            <p className="text-sm opacity-75 mb-6">Why trust this?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="transition-all hover:scale-110">
                <div className="text-3xl font-light mb-1">60k+</div>
                <div className="opacity-75">TikTok followers</div>
              </div>
              <div className="transition-all hover:scale-110">
                <div className="text-3xl font-light mb-1">6 mo</div>
                <div className="opacity-75">of research</div>
              </div>
              <div className="transition-all hover:scale-110">
                <div className="text-3xl font-light mb-1">100+</div>
                <div className="opacity-75">studies reviewed</div>
              </div>
              <div className="transition-all hover:scale-110">
                <div className="text-3xl font-light mb-1">500+</div>
                <div className="opacity-75">people helped</div>
              </div>
            </div>
            <div className="mt-8">
              <a 
                href="https://tiktok.com/@yjlovesskincare" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-all border-b border-white/30 pb-1 hover:border-white/60"
              >
                <span>Join the community on TikTok</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-xl font-medium mb-2" style={{ color: currentTheme.primary }}>ClearStart</div>
              <p className="text-sm text-gray-500">Skincare made simple by [Jia Amarnani]</p>
              <p className="text-xs text-gray-400 mt-1">Software Engineer & Skincare Enthusiast</p>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#story" className="hover:text-gray-900 transition-colors">My Story</a>
              <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
              <a href="/quiz" className="hover:text-gray-900 transition-colors">Quiz</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-2">
              <strong>Important:</strong> This is educational content, not medical advice. 
              Always consult a dermatologist for medical concerns or persistent skin issues.
            </p>
            <p className="text-xs text-gray-400">© 2026 ClearStart • Made with love</p>
          </div>
        </div>
      </footer>
    </div>
  );
}