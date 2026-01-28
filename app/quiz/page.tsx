'use client';

import { useState } from 'react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    skinType: string;
    sensitivity: string;
    acneType: string;
    currentProducts: string[];
    budget: string;
    severity: string;
  }>({
    skinType: '',
    sensitivity: '',
    acneType: '',
    currentProducts: [],
    budget: '',
    severity: ''
  });
  const [showSkinTypeHelper, setShowSkinTypeHelper] = useState(false);

  const totalQuestions = 6;

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers to localStorage FOR NOW and navigate to results
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      window.location.href = '/results';
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

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
            <button className="px-6 py-2 bg-pink-50 rounded-full text-gray-900 text-base font-medium hover:bg-pink-100 transition-all">
              Quiz
            </button>
            <a href="/about" className="px-6 py-2 rounded-full text-gray-700 text-base font-medium hover:bg-gray-50 transition-all">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="relative z-10 max-w-2xl mx-auto mt-12 px-6">
        <div className="flex justify-between mb-3 text-sm text-gray-500" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div 
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ 
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
              background: '#FC8DB2'
            }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 p-12">
          
          {/* Question 1: Skin Type */}
          {currentQuestion === 0 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-10" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                What's your skin type?
              </h2>
              <div className="space-y-3">
                {['Oily', 'Dry', 'Combination', 'Not sure'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === 'Not sure') {
                        setShowSkinTypeHelper(true);
                      } else {
                        setAnswers({ ...answers, skinType: option });
                      }
                    }}
                    className={`w-full p-5 rounded-xl border-2 text-left text-lg transition-all ${
                      answers.skinType === option
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Sensitivity */}
          {currentQuestion === 1 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-10" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Does your skin get irritated easily?
              </h2>
              <div className="space-y-3">
                {['Easily', 'Sometimes', 'Not often', 'Never'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, sensitivity: option })}
                    className={`w-full p-5 rounded-xl border-2 text-left text-lg transition-all ${
                      answers.sensitivity === option
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Acne Type */}
          {currentQuestion === 2 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                What type of acne do you have?
              </h2>
              <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Select all that apply
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Cystic (deep, painful)',
                  'Whiteheads/Blackheads',
                  'Red bumps (pustules/papules)',
                  'Textured bumps',
                  'Fungal acne (small uniform bumps, itchy)',
                  'Hormonal (around jawline/chin)',
                  'Acne scars',
                  'None of the above'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const current = answers.acneType || '';
                      const types = current ? current.split(', ') : [];
                      if (types.includes(option)) {
                        setAnswers({ ...answers, acneType: types.filter(t => t !== option).join(', ') });
                      } else {
                        setAnswers({ ...answers, acneType: [...types, option].join(', ') });
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      answers.acneType?.includes(option)
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Current Products */}
          {currentQuestion === 3 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                What products are you currently using?
              </h2>
              <p className="text-gray-500 mb-8 text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                Select all that apply
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Tretinoin', 'Differin (Adapalene)', 'Benzoyl Peroxide', 'Salicylic Acid', 'AHAs/BHAs', 'None'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const current = answers.currentProducts || [];
                      if (current.includes(option)) {
                        setAnswers({ ...answers, currentProducts: current.filter(p => p !== option) });
                      } else {
                        setAnswers({ ...answers, currentProducts: [...current, option] });
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      answers.currentProducts?.includes(option)
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 5: Budget */}
          {currentQuestion === 4 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-10" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                What's your budget for skincare?
              </h2>
              <div className="space-y-3">
                {[
                  'Budget-friendly (drugstore)',
                  'Mid-range ($20-50/product)',
                  'Open to splurging',
                  'Price doesn\'t matter'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, budget: option })}
                    className={`w-full p-5 rounded-xl border-2 text-left text-lg transition-all ${
                      answers.budget === option
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 6: Severity */}
          {currentQuestion === 5 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-900 mb-10" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                How would you rate your acne?
              </h2>
              <div className="space-y-3">
                {[
                  'Mild (occasional breakouts)',
                  'Moderate (frequent breakouts)',
                  'Severe (persistent, widespread)'
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, severity: option })}
                    className={`w-full p-5 rounded-xl border-2 text-left text-lg transition-all ${
                      answers.severity === option
                        ? 'border-pink-400 bg-pink-50/50 text-gray-900'
                        : 'border-gray-200 hover:border-pink-200 hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`px-10 py-3 rounded-full font-medium transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-10 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              {currentQuestion === totalQuestions - 1 ? 'Get Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Skin Type Helper Modal */}
      {showSkinTypeHelper && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-10 max-w-md border border-pink-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              How to find your skin type
            </h3>
            <div className="space-y-4 text-gray-700">
              <p><strong className="text-gray-900">Oily:</strong> Shiny throughout the day, large pores, prone to breakouts</p>
              <p><strong className="text-gray-900">Dry:</strong> Feels tight, flaky patches, small pores, sometimes looks dull</p>
              <p><strong className="text-gray-900">Combination:</strong> Oily T-zone (forehead, nose, chin), dry cheeks</p>
            </div>
            <button
              onClick={() => setShowSkinTypeHelper(false)}
              className="mt-8 w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}