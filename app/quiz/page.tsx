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
  const theme = {
    primary: '#8B2635',
    light: '#A63446',
    lighter: '#FFF5F7',
    accent: '#B85C69'
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      window.location.href = '/results';
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isQuestionAnswered = () => {
    switch(currentQuestion) {
      case 0: return answers.skinType !== '';
      case 1: return answers.sensitivity !== '';
      case 2: return answers.acneType !== '';
      case 3: return answers.currentProducts.length > 0;
      case 4: return answers.budget !== '';
      case 5: return answers.severity !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="text-xl tracking-tight font-medium" style={{ color: theme.primary }}>
            ClearStart
          </div>
          <div className="flex gap-8 text-sm items-center">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-900 font-medium">Quiz</a>
          </div>
        </div>
      </nav>

      {/* Progress Indicator - Minimalist dots */}
      <div className="fixed top-24 left-8 z-40 hidden md:flex flex-col gap-3">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <div
            key={idx}
            className="transition-all duration-300"
            style={{
              width: currentQuestion === idx ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: currentQuestion >= idx ? theme.primary : '#E5E7EB',
              opacity: currentQuestion >= idx ? 1 : 0.3
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-24 px-8 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Question Number */}
          <div className="text-sm text-gray-400 mb-8 font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
            Question {currentQuestion + 1} of {totalQuestions}
          </div>

          {/* Question Content */}
          <div className="mb-12">
            
            {/* Question 1: Skin Type */}
            {currentQuestion === 0 && (
              <div>
                <h2 className="text-4xl font-light mb-8 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  What's your skin type?
                </h2>
                <div className="space-y-4">
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
                      className="group w-full p-6 text-left text-lg transition-all border-b border-gray-200 hover:border-gray-400"
                      style={{
                        borderBottomColor: answers.skinType === option ? theme.primary : undefined,
                        borderBottomWidth: answers.skinType === option ? '2px' : '1px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`transition-colors ${answers.skinType === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {option}
                        </span>
                        {answers.skinType === option && (
                          <span style={{ color: theme.primary }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2: Sensitivity */}
            {currentQuestion === 1 && (
              <div>
                <h2 className="text-4xl font-light mb-8 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  Does your skin get irritated easily?
                </h2>
                <div className="space-y-4">
                  {['Easily', 'Sometimes', 'Not often', 'Never'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setAnswers({ ...answers, sensitivity: option })}
                      className="group w-full p-6 text-left text-lg transition-all border-b border-gray-200 hover:border-gray-400"
                      style={{
                        borderBottomColor: answers.sensitivity === option ? theme.primary : undefined,
                        borderBottomWidth: answers.sensitivity === option ? '2px' : '1px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`transition-colors ${answers.sensitivity === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {option}
                        </span>
                        {answers.sensitivity === option && (
                          <span style={{ color: theme.primary }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3: Acne Type */}
            {currentQuestion === 2 && (
              <div>
                <h2 className="text-4xl font-light mb-3 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  What type of acne do you have?
                </h2>
                <p className="text-gray-500 mb-8 text-sm">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Cystic (deep, painful)',
                    'Whiteheads/Blackheads',
                    'Red bumps (pustules/papules)',
                    'Textured bumps',
                    'Fungal acne (small uniform bumps, itchy)',
                    'Hormonal (around jawline/chin)',
                    'Acne scars',
                    'None of the above'
                  ].map((option) => {
                    const isSelected = answers.acneType?.includes(option);
                    return (
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
                        className="group w-full p-4 text-left text-base transition-all border-b border-gray-200 hover:border-gray-400"
                        style={{
                          borderBottomColor: isSelected ? theme.primary : undefined,
                          borderBottomWidth: isSelected ? '2px' : '1px'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`transition-colors text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                            {option}
                          </span>
                          {isSelected && (
                            <span style={{ color: theme.primary }}>✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 4: Current Products */}
            {currentQuestion === 3 && (
              <div>
                <h2 className="text-4xl font-light mb-3 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  What products are you currently using?
                </h2>
                <p className="text-gray-500 mb-8 text-sm">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Tretinoin', 'Differin (Adapalene)', 'Benzoyl Peroxide', 'Salicylic Acid', 'AHAs/BHAs', 'None'].map((option) => {
                    const isSelected = answers.currentProducts?.includes(option);
                    return (
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
                        className="group w-full p-4 text-left text-base transition-all border-b border-gray-200 hover:border-gray-400"
                        style={{
                          borderBottomColor: isSelected ? theme.primary : undefined,
                          borderBottomWidth: isSelected ? '2px' : '1px'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`transition-colors text-sm ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                            {option}
                          </span>
                          {isSelected && (
                            <span style={{ color: theme.primary }}>✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 5: Budget */}
            {currentQuestion === 4 && (
              <div>
                <h2 className="text-4xl font-light mb-8 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  What's your budget for skincare?
                </h2>
                <div className="space-y-4">
                  {[
                    'Budget-friendly (drugstore)',
                    'Mid-range ($20-50/product)',
                    'Open to splurging',
                    'Price doesn\'t matter'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setAnswers({ ...answers, budget: option })}
                      className="group w-full p-6 text-left text-lg transition-all border-b border-gray-200 hover:border-gray-400"
                      style={{
                        borderBottomColor: answers.budget === option ? theme.primary : undefined,
                        borderBottomWidth: answers.budget === option ? '2px' : '1px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`transition-colors ${answers.budget === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {option}
                        </span>
                        {answers.budget === option && (
                          <span style={{ color: theme.primary }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 6: Severity */}
            {currentQuestion === 5 && (
              <div>
                <h2 className="text-4xl font-light mb-8 text-gray-900 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  How would you rate your acne?
                </h2>
                <div className="space-y-4">
                  {[
                    'Mild (occasional breakouts)',
                    'Moderate (frequent breakouts)',
                    'Severe (persistent, widespread)'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setAnswers({ ...answers, severity: option })}
                      className="group w-full p-6 text-left text-lg transition-all border-b border-gray-200 hover:border-gray-400"
                      style={{
                        borderBottomColor: answers.severity === option ? theme.primary : undefined,
                        borderBottomWidth: answers.severity === option ? '2px' : '1px'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`transition-colors ${answers.severity === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {option}
                        </span>
                        {answers.severity === option && (
                          <span style={{ color: theme.primary }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`text-sm transition-colors ${
                currentQuestion === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ← Back
            </button>
            
            <div className="text-xs text-gray-400">
              {currentQuestion + 1}/{totalQuestions}
            </div>

            <button
              onClick={handleNext}
              disabled={!isQuestionAnswered()}
              className="px-8 py-3 rounded-full text-white text-sm font-medium transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: theme.primary }}
            >
              {currentQuestion === totalQuestions - 1 ? 'Get Results →' : 'Next →'}
            </button>
          </div>

        </div>
      </div>

      {/* Skin Type Helper Modal */}
      {showSkinTypeHelper && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg p-12 max-w-lg">
            <h3 className="text-3xl font-light mb-8 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              How to find your skin type
            </h3>
            <div className="space-y-6 text-gray-700">
              <div>
                <div className="font-medium text-gray-900 mb-1">Oily</div>
                <p className="text-sm leading-relaxed">Shiny throughout the day, large pores, prone to breakouts</p>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Dry</div>
                <p className="text-sm leading-relaxed">Feels tight, flaky patches, small pores, sometimes looks dull</p>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Combination</div>
                <p className="text-sm leading-relaxed">Oily T-zone (forehead, nose, chin), dry cheeks</p>
              </div>
            </div>
            <button
              onClick={() => setShowSkinTypeHelper(false)}
              className="mt-10 w-full py-3 rounded-full text-white font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: theme.primary }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}