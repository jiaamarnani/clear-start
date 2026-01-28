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

export default function Results() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [routine, setRoutine] = useState<any>(null);

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

    // Morning Routine
    const amRoutine = [];
    
    if (isOily) {
      amRoutine.push({
        step: amRoutine.length + 1,
        name: 'Cleanser',
        product: 'Gentle foaming cleanser',
        why: 'Removes excess oil without stripping'
      });
    } else {
      amRoutine.push({
        step: amRoutine.length + 1,
        name: 'Cleanser',
        product: 'Skip cleanser in the AM (just rinse with water)',
        why: 'Preserves your skin barrier. If you prefer to cleanse, use a gentle cream cleanser'
      });
    }

    if (isOily) {
      amRoutine.push({
        step: amRoutine.length + 1,
        name: 'Serum (Optional)',
        product: 'Niacinamide 10%',
        why: 'Optional: Reduces oil production, minimizes pores, and fades dark spots'
      });
    } else if (isDry) {
      amRoutine.push({
        step: amRoutine.length + 1,
        name: 'Serum (Optional)',
        product: 'Hyaluronic Acid',
        why: 'Optional: Draws moisture into skin and keeps it plump and hydrated'
      });
    }

    let moisturizerProduct = '';
    if (isOily) {
      moisturizerProduct = 'Lightweight gel moisturizer';
    } else if (isCombo) {
      moisturizerProduct = 'Gel moisturizer';
    } else {
      moisturizerProduct = 'Cream moisturizer';
    }
    
    amRoutine.push({
      step: amRoutine.length + 1,
      name: 'Moisturizer',
      product: moisturizerProduct,
      why: 'Keeps skin hydrated and repairs moisture barrier'
    });

    amRoutine.push({
      step: amRoutine.length + 1,
      name: 'SPF',
      product: 'Broad spectrum SPF 30+',
      why: 'Protects from sun damage and prevents dark spots'
    });

    // Evening Routine
    const pmRoutine = [
      {
        step: 1,
        name: 'Cleanser',
        product: isOily ? 'Gentle foaming cleanser' : 'Cream or gel cleanser',
        why: 'Removes dirt, oil, and makeup'
      },
      {
        step: 2,
        name: 'Treatment',
        product: onRetinoid ? 'Continue your current retinoid' : hasScars ? 'Start tretinoin 0.025%' : 'Adapalene 0.1%',
        why: onRetinoid ? 'Keep using what works!' : 'Speeds cell turnover and prevents breakouts'
      },
      {
        step: 3,
        name: 'Moisturizer',
        product: isSensitive ? 'Rich, fragrance-free moisturizer' : isOily ? 'Lightweight gel moisturizer' : 'Cream moisturizer',
        why: 'Seals in hydration and supports skin barrier'
      }
    ];

    const warnings = [];
    if (!onRetinoid && (hasScars || hasCystic)) {
      warnings.push('Start retinoids slowly (2x/week) to avoid irritation');
    }
    if (isSensitive) {
      warnings.push('Patch test new products on your inner arm first');
    }
    if (!answers.currentProducts.includes('None')) {
      warnings.push("Don't mix retinoids with AHAs/BHAs in the same routine");
    }

    setRoutine({
      am: amRoutine,
      pm: pmRoutine,
      warnings,
      skinType: answers.skinType,
      sensitivity: answers.sensitivity
    });
  };

  if (!answers || !routine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>Generating your routine...</p>
        </div>
      </div>
    );
  }

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
              Retake Quiz
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{
            color: '#FC8DB2',
            textShadow: '2px 2px 4px rgba(252, 141, 178, 0.08)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }}>
            Your Personalized Routine
          </h1>
          <p className="text-xl text-gray-600">
            Based on your <span className="font-semibold text-gray-900">{routine.skinType}</span> skin
            {routine.sensitivity && routine.sensitivity !== 'Never' && ` with ${routine.sensitivity.toLowerCase()} sensitivity`}
          </p>
        </div>

        {/* Warnings */}
        {routine.warnings.length > 0 && (
          <div className="bg-amber-50/50 backdrop-blur-sm border-2 border-amber-200 rounded-2xl p-8 mb-12">
            <h3 className="font-semibold text-lg mb-4 text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
              Important Notes
            </h3>
            <ul className="space-y-2">
              {routine.warnings.map((warning: string, idx: number) => (
                <li key={idx} className="text-gray-700 leading-relaxed">• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Morning Routine */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 p-10 mb-8">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Morning Routine
          </h2>
          <div className="space-y-8">
            {routine.am.map((item: any) => (
              <div key={item.step} className="border-l-2 border-pink-300 pl-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-lg font-bold text-pink-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    {String(item.step).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    {item.name}
                  </h3>
                </div>
                <p className="text-base text-gray-900 mb-1 leading-relaxed">{item.product}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Routine */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 p-10 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Evening Routine
          </h2>
          <div className="space-y-8">
            {routine.pm.map((item: any) => (
              <div key={item.step} className="border-l-2 border-pink-300 pl-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-lg font-bold text-pink-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    {String(item.step).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                    {item.name}
                  </h3>
                </div>
                <p className="text-base text-gray-900 mb-1 leading-relaxed">{item.product}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-pink-50/50 backdrop-blur-sm rounded-2xl border border-pink-100 p-8 mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Quick Tips
          </h3>
          <ul className="space-y-3 text-gray-700 leading-relaxed">
            <li>• Give new products 6-8 weeks to see results</li>
            <li>• Always patch test new actives before full application</li>
            <li>• Consistency is more important than perfection</li>
            <li>• If irritation occurs, scale back to basics and rebuild slowly</li>
          </ul>
        </div>

        {/* Retake Button */}
        <div className="text-center">
          <a href="/quiz" className="inline-block bg-black px-16 py-4 rounded-full text-lg font-medium text-white hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Retake Quiz
          </a>
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