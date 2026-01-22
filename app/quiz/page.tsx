'use client';

import { useState } from 'react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState<{
  skinType: string;
  sensitivity: string;
  acneType: string;
  currentProducts: string[];
}>({
  skinType: '',
  sensitivity: '',
  acneType: '',
  currentProducts: []
});
  const [showSkinTypeHelper, setShowSkinTypeHelper] = useState(false);

  const totalQuestions = 4;

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Navigation */}
    <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
  <div className="flex items-center justify-between px-4 py-4">
    <div className="text-2xl tracking-tight" style={{ color: '#FC8DB2' }}>
      ClearStart
    </div>
    <div className="flex gap-4 pr-4">
      <a href="/" className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
        Home
      </a>
      <button className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
        Quiz
      </button>
      <button className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
        About
      </button>
    </div>
  </div>
</nav>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mt-8 px-6">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#FC8DB2] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-12">
          
          {/* Question 1: Skin Type */}
          {currentQuestion === 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What's your skin type?</h2>
              <div className="space-y-4">
                {['Oily', 'Dry', 'Combination', 'Not sure!'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === 'Not sure!') {
                        setShowSkinTypeHelper(true);
                      } else {
                        setAnswers({ ...answers, skinType: option });
                      }
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left text-lg font-semibold text-black transition ${
                      answers.skinType === option
                        ? 'border-[#FC8DB2] bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Does your skin get irritated easily?</h2>
              <div className="space-y-4">
                {['Easily', 'Sometimes', 'Not often', 'Never'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, sensitivity: option })}
                    className={`w-full p-4 rounded-xl border-2 text-left text-lg font-semibold text-black transition ${
                      answers.sensitivity === option
                        ? 'border-[#FC8DB2] bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What type of acne do you have?</h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 gap-4">
                {['Cystic', 'Closed comedones (CCs)', 'Blackheads', 'Hormonal', 'Acne scars', 'None of the above'].map((option) => (
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
                    className={`p-6 rounded-xl border-2 text-center text-lg font-semibold text-black transition ${
                      answers.acneType?.includes(option)
                        ? 'border-[#FC8DB2] bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What products are you currently using?</h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="space-y-3">
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
                    className={`w-full p-4 rounded-xl border-2 text-left text-lg font-semibold text-black transition ${
                      answers.currentProducts?.includes(option)
                        ? 'border-[#FC8DB2] bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
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
              className={`px-8 py-3 rounded-xl font-medium transition ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#FC8DB2] text-white rounded-xl font-medium hover:bg-[#E07BA0] transition"
            >
              {currentQuestion === totalQuestions - 1 ? 'Get Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Skin Type Helper Modal */}
      {showSkinTypeHelper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-lg">
            <h3 className="text-2xl text-black font-bold mb-4">How to find your skin type</h3>
            <div className="space-y-4 text-black">
              <p><strong>Oily:</strong> Shiny throughout the day, large pores, prone to breakouts</p>
              <p><strong>Dry:</strong> Skin feels tight, flaky patches, small pores, sometimes looks dull</p>
              <p><strong>Combination:</strong> Oily T-zone (forehead, nose, chin), dry cheeks, can't figure out if you're oily to dry</p>
            </div>
            <button
              onClick={() => setShowSkinTypeHelper(false)}
              className="mt-6 w-full py-3 bg-[#FC8DB2] text-white rounded-xl font-medium hover:bg-[#E07BA0]"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}