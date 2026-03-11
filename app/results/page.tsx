'use client';

import { useEffect, useState } from 'react';

type QuizAnswers = {
  skinType: string;
  sensitivity: string;
  acneType: string;
  currentProducts: string[];
  budget: string;
  severity: string;
};

const theme = {
  primary: '#6A89A7',
  light: '#88BDF2',
  lighter: '#BDDDFC',
  accent: '#647b92ff',
  muted: '#7d96aeff',
};

export default function Results() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [routine, setRoutine] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'am' | 'pm'>('am');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      generateRoutine(parsedAnswers);
    }
  }, []);

  const generateRoutine = (answers: QuizAnswers) => {
    const isOily = answers.skinType === 'Oily';
    const isDry = answers.skinType === 'Dry';
    const isCombo = answers.skinType === 'Combination';
    const isSensitive = answers.sensitivity === 'Easily' || answers.sensitivity === 'Sometimes';
    const hasCystic = answers.acneType.includes('Cystic');
    const hasScars = answers.acneType.includes('scars');
    const onRetinoid = answers.currentProducts.includes('Tretinoin') || answers.currentProducts.includes('Differin');

    const amRoutine = [];

    if (isOily) {
      amRoutine.push({ step: amRoutine.length + 1, name: 'Cleanser', product: 'Gentle foaming cleanser', why: 'Removes excess oil without stripping your barrier' });
    } else {
      amRoutine.push({ step: amRoutine.length + 1, name: 'Cleanser', product: 'Rinse with water only', why: 'Preserves your skin barrier in the morning. Use a gentle cream cleanser if you prefer' });
    }

    if (isOily) {
      amRoutine.push({ step: amRoutine.length + 1, name: 'Serum', product: 'Niacinamide 10%', why: 'Reduces oil production, minimizes pores, and fades dark spots' });
    } else if (isDry) {
      amRoutine.push({ step: amRoutine.length + 1, name: 'Serum', product: 'Hyaluronic Acid', why: 'Draws moisture into skin and keeps it plump and hydrated' });
    }

    amRoutine.push({
      step: amRoutine.length + 1, name: 'Moisturizer',
      product: isOily ? 'Lightweight gel moisturizer' : isCombo ? 'Gel moisturizer' : 'Cream moisturizer',
      why: 'Keeps skin hydrated and supports your moisture barrier'
    });

    amRoutine.push({ step: amRoutine.length + 1, name: 'SPF', product: 'Broad spectrum SPF 30+', why: 'Protects from UV damage and prevents post-acne dark spots from darkening further' });

    const pmRoutine = [
      {
        step: 1, name: 'Cleanser',
        product: isOily ? 'Gentle foaming cleanser' : 'Cream or gel cleanser',
        why: 'Removes sunscreen, oil, and buildup from the day'
      },
      {
        step: 2, name: 'Treatment',
        product: onRetinoid ? 'Continue your current retinoid' : hasScars ? 'Tretinoin 0.025%' : 'Adapalene 0.1%',
        why: onRetinoid ? 'Keep with what you have — consistency matters most' : 'Speeds cell turnover, clears pores, and prevents new breakouts'
      },
      {
        step: 3, name: 'Moisturizer',
        product: isSensitive ? 'Rich, fragrance-free moisturizer' : isOily ? 'Lightweight gel moisturizer' : 'Cream moisturizer',
        why: 'Seals in hydration and helps your skin recover overnight'
      }
    ];

    const warnings: string[] = [];
    if (!onRetinoid && (hasScars || hasCystic)) warnings.push('Introduce retinoids slowly, start 2x a week and build up over 4–6 weeks');
    if (isSensitive) warnings.push('Patch test new products on your inner arm before applying to your face');
    if (!answers.currentProducts.includes('None')) warnings.push("Don't use retinoids and AHAs/BHAs on the same night, alternate instead");

    setRoutine({ am: amRoutine, pm: pmRoutine, warnings, skinType: answers.skinType, sensitivity: answers.sensitivity });
  };

  if (!answers || !routine) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 36, height: 36, border: `2px solid ${theme.primary}`, borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 14, color: '#999' }}>Building your routine...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .tab-btn {
          padding: 10px 24px;
          border: none;
          background: none;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          color: #999;
        }
        .tab-btn.active {
          background: ${theme.primary};
          color: white;
        }
        .tab-btn:not(.active):hover { color: #1a1a1a; }

        .step-item {
          padding: 28px 0 28px 24px;
          border-left: 2px solid rgba(106,137,167,0.2);
          margin-bottom: 8px;
          transition: border-color 0.2s;
        }
        .step-item:hover { border-left-color: ${theme.primary}; }

        .product-slot {
          margin-top: 14px;
          padding: 12px 16px;
          background: ${theme.lighter};
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .product-name {
          font-size: 13px;
          font-weight: 500;
          color: ${theme.primary};
        }
        .product-meta {
          font-size: 12px;
          color: ${theme.muted};
        }
        .product-link {
          font-size: 12px;
          color: ${theme.primary};
          text-decoration: none;
          border-bottom: 1px solid rgba(106,137,167,0.3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .product-link:hover { border-color: ${theme.primary}; }

        .retake-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${theme.primary}; color: white;
          padding: 13px 28px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          font-family: inherit;
        }
        .retake-btn:hover { background: #4e6e8a; transform: translateY(-1px); }

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
          <a href="/quiz" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>Retake Quiz</a>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '120px 48px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 16 }}>
            Your Results
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.5px' }}>
            Your personalized routine
          </h1>
          <p style={{ fontSize: 16, color: '#777', lineHeight: 1.7 }}>
            Based on your <strong style={{ color: '#1a1a1a', fontWeight: 500 }}>{routine.skinType}</strong> skin
            {routine.sensitivity && routine.sensitivity !== 'Never' && (
              <> with <strong style={{ color: '#1a1a1a', fontWeight: 500 }}>{routine.sensitivity.toLowerCase()}</strong> sensitivity</>
            )}
          </p>
        </div>

        {/* WARNINGS */}
        {routine.warnings.length > 0 && (
          <div style={{
            margin: '32px 0',
            padding: '20px 24px',
            backgroundColor: '#ebf4ffff',
            borderLeft: '3px solid #0b0bf5ff',
            borderRadius: '0 6px 6px 0',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#B45309', marginBottom: 12 }}>
              Heads up
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {routine.warnings.map((w: string, i: number) => (
                <div key={i} style={{ fontSize: 13, color: '#78350F', lineHeight: 1.65 }}>— {w}</div>
              ))}
            </div>
          </div>
        )}

        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, padding: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8, width: 'fit-content', margin: '40px 0 20px' }}>
          <button className={`tab-btn ${activeTab === 'am' ? 'active' : ''}`} onClick={() => setActiveTab('am')}>Morning</button>
          <button className={`tab-btn ${activeTab === 'pm' ? 'active' : ''}`} onClick={() => setActiveTab('pm')}>Evening</button>
        </div>

        {/* ROUTINE STEPS */}
        <div style={{ marginTop: 8 }}>
          {(activeTab === 'am' ? routine.am : routine.pm).map((item: any) => (
            <div className="step-item" key={item.step}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: theme.muted, marginBottom: 6 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a', marginBottom: 5 }}>
                {item.product}
              </div>
              <div style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>
                {item.why}
              </div>
              {item.recommendedProduct && (
                <div className="product-slot">
                  <div>
                    <div className="product-name">{item.recommendedProduct.name}</div>
                    {item.recommendedProduct.price && <div className="product-meta">{item.recommendedProduct.price}</div>}
                  </div>
                  {item.recommendedProduct.url && (
                    <a href={item.recommendedProduct.url} target="_blank" rel="noopener noreferrer" className="product-link">View →</a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* TIPS */}
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 20 }}>
            Quick Tips
          </div>
          {[
            'Give new products 6–8 weeks before judging results',
            'Patch test new actives on your inner arm first',
            'Consistency matters more than perfection',
            'If irritation flares up, strip back to basics and reintroduce slowly',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'flex-start' }}>
              <span style={{ color: theme.accent, fontSize: 12, paddingTop: 2, flexShrink: 0 }}>—</span>
              <span style={{ fontSize: 14, color: '#666', lineHeight: 1.65 }}>{tip}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <a href="/quiz" className="retake-btn">Retake Quiz →</a>
          <a href="/" style={{ fontSize: 13, color: '#999', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: 1 }}>
            Back to homepage
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '32px 48px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#bbb', lineHeight: 1.7 }}>
            Educational content only — not medical advice. Consult a dermatologist for persistent skin concerns.
          </p>
          <p style={{ fontSize: 11, color: '#ccc', marginTop: 6 }}>© 2026 ClearStart</p>
        </div>
      </footer>

    </div>
  );
}