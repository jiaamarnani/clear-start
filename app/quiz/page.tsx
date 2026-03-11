'use client';

import { useState } from 'react';

const theme = {
  primary: '#6A89A7',
  light: '#88BDF2',
  lighter: '#BDDDFC',
  accent: '#647b92ff',
  muted: '#7d96aeff',
};

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
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      window.location.href = '/results';
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
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

  const progressPct = (currentQuestion / totalQuestions) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .option-btn {
          width: 100%;
          padding: 18px 0;
          text-align: left;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .option-btn:hover { border-bottom-color: rgba(106,137,167,0.4); }
        .option-btn.selected { border-bottom: 2px solid ${theme.primary}; }

        .option-label {
          font-size: 16px;
          color: #666;
          transition: color 0.2s ease;
        }
        .option-btn.selected .option-label { color: #1a1a1a; font-weight: 500; }

        .option-check {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .option-btn.selected .option-check { background: ${theme.primary}; border-color: ${theme.primary}; }
        .option-check-inner { width: 7px; height: 7px; border-radius: 50%; background: white; }

        .next-btn {
          background: ${theme.primary}; color: white;
          border: none; padding: 13px 32px; border-radius: 6px;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          font-family: inherit;
        }
        .next-btn:hover:not(:disabled) { background: #4e6e8a; transform: translateY(-1px); }
        .next-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .back-btn {
          background: none; border: none;
          font-size: 13px; color: #999; cursor: pointer;
          font-family: inherit; transition: color 0.2s; padding: 0;
        }
        .back-btn:hover:not(:disabled) { color: #1a1a1a; }
        .back-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #1a1a1a; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'rgba(250,250,248,0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <a href="/" style={{ fontSize: 20, fontWeight: 500, color: theme.primary, textDecoration: 'none', letterSpacing: '-0.3px' }}>
          ClearStart
        </a>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="/" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>Home</a>
          <span style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>Quiz</span>
        </div>
      </nav>

      {/* PROGRESS BAR */}
      <div style={{ position: 'fixed', top: 65, left: 0, right: 0, zIndex: 99, height: 2, backgroundColor: 'rgba(0,0,0,0.06)' }}>
        <div style={{ height: '100%', width: `${progressPct}%`, backgroundColor: theme.primary, transition: 'width 0.4s ease' }} />
      </div>

      {/* SIDEBAR PROGRESS */}
      <div style={{ position: 'fixed', top: '50%', left: 36, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 40 }}>
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <div key={idx} style={{
            height: currentQuestion === idx ? 28 : 8,
            width: 3, borderRadius: 2,
            backgroundColor: idx <= currentQuestion ? theme.primary : 'rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      {/* MAIN */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 48px 80px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>

          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 32 }}>
            {currentQuestion + 1} / {totalQuestions}
          </div>

          {/* Q1: Skin Type */}
          {currentQuestion === 0 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                What's your skin type?
              </h2>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 40 }}>
                Not sure?{' '}
                <button onClick={() => setShowSkinTypeHelper(true)} style={{ background: 'none', border: 'none', color: theme.primary, cursor: 'pointer', fontSize: 13, padding: 0, textDecoration: 'underline', fontFamily: 'inherit' }}>
                  Find out here
                </button>
              </p>
              <div>
                {['Oily', 'Dry', 'Combination', 'Not sure'].map((option) => (
                  <button
                    key={option}
                    className={`option-btn ${answers.skinType === option ? 'selected' : ''}`}
                    onClick={() => {
                      if (option === 'Not sure') { setShowSkinTypeHelper(true); }
                      else { setAnswers({ ...answers, skinType: option }); }
                    }}
                  >
                    <span className="option-label">{option}</span>
                    <span className="option-check">{answers.skinType === option && <span className="option-check-inner" />}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2: Sensitivity */}
          {currentQuestion === 1 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 40, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                Does your skin get irritated easily?
              </h2>
              <div>
                {['Easily', 'Sometimes', 'Not often', 'Never'].map((option) => (
                  <button key={option} className={`option-btn ${answers.sensitivity === option ? 'selected' : ''}`} onClick={() => setAnswers({ ...answers, sensitivity: option })}>
                    <span className="option-label">{option}</span>
                    <span className="option-check">{answers.sensitivity === option && <span className="option-check-inner" />}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q3: Acne Type */}
          {currentQuestion === 2 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                What type of acne do you have?
              </h2>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 40 }}>Select all that apply</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                {['Cystic (deep, painful)', 'Whiteheads / Blackheads', 'Red bumps (pustules/papules)', 'Textured bumps', 'Fungal acne (small, itchy)', 'Hormonal (jawline/chin)', 'Acne scars', 'None of the above'].map((option) => {
                  const isSelected = answers.acneType?.includes(option);
                  return (
                    <button key={option} className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        const types = answers.acneType ? answers.acneType.split(', ') : [];
                        setAnswers({ ...answers, acneType: types.includes(option) ? types.filter(t => t !== option).join(', ') : [...types, option].join(', ') });
                      }}
                    >
                      <span className="option-label" style={{ fontSize: 14 }}>{option}</span>
                      <span className="option-check">{isSelected && <span className="option-check-inner" />}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Q4: Current Products */}
          {currentQuestion === 3 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                What products are you currently using?
              </h2>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 40 }}>Select all that apply</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                {['Tretinoin', 'Differin (Adapalene)', 'Benzoyl Peroxide', 'Salicylic Acid', 'AHAs / BHAs', 'None'].map((option) => {
                  const isSelected = answers.currentProducts?.includes(option);
                  return (
                    <button key={option} className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        const current = answers.currentProducts || [];
                        setAnswers({ ...answers, currentProducts: current.includes(option) ? current.filter(p => p !== option) : [...current, option] });
                      }}
                    >
                      <span className="option-label" style={{ fontSize: 14 }}>{option}</span>
                      <span className="option-check">{isSelected && <span className="option-check-inner" />}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Q5: Budget */}
          {currentQuestion === 4 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 40, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                What's your budget for skincare?
              </h2>
              <div>
                {['Budget-friendly (drugstore)', 'Mid-range ($20–50/product)', 'Open to splurging', "Price doesn't matter"].map((option) => (
                  <button key={option} className={`option-btn ${answers.budget === option ? 'selected' : ''}`} onClick={() => setAnswers({ ...answers, budget: option })}>
                    <span className="option-label">{option}</span>
                    <span className="option-check">{answers.budget === option && <span className="option-check-inner" />}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q6: Severity */}
          {currentQuestion === 5 && (
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 40, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                How would you rate your acne?
              </h2>
              <div>
                {['Mild (occasional breakouts)', 'Moderate (frequent breakouts)', 'Severe (persistent, widespread)'].map((option) => (
                  <button key={option} className={`option-btn ${answers.severity === option ? 'selected' : ''}`} onClick={() => setAnswers({ ...answers, severity: option })}>
                    <span className="option-label">{option}</span>
                    <span className="option-check">{answers.severity === option && <span className="option-check-inner" />}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 52, paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <button className="back-btn" onClick={handleBack} disabled={currentQuestion === 0}>← Back</button>
            <button className="next-btn" onClick={handleNext} disabled={!isQuestionAnswered()}>
              {currentQuestion === totalQuestions - 1 ? 'Get Results →' : 'Next →'}
            </button>
          </div>

        </div>
      </div>

      {/* SKIN TYPE MODAL */}
      {showSkinTypeHelper && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={() => setShowSkinTypeHelper(false)}
        >
          <div style={{ background: '#FAFAF8', borderRadius: 12, padding: '48px', maxWidth: 480, width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 32, lineHeight: 1.2, letterSpacing: '-0.3px' }}>
              How to find your skin type
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { type: 'Oily', desc: 'Shiny throughout the day, larger pores, prone to breakouts' },
                { type: 'Dry', desc: 'Feels tight or flaky, small pores, can look dull' },
                { type: 'Combination', desc: 'Oily T-zone (forehead, nose, chin) with drier cheeks' },
              ].map(s => (
                <div key={s.type} style={{ paddingBottom: 24, borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>{s.type}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowSkinTypeHelper(false)} style={{ marginTop: 32, width: '100%', padding: '13px 0', backgroundColor: theme.primary, color: 'white', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}