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

  const theme = {
    primary: '#8B2635',
    light: '#A63446',
    lighter: '#FFF5F7',
    accent: '#B85C69'
  };

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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: theme.primary }}></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Generating your routine...</p>
        </div>
      </div>
    );
  }

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
            <a href="/quiz" className="text-gray-600 hover:text-gray-900 transition-colors">Retake Quiz</a>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-20">
            <div className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Your Results</div>
            <h1 className="text-6xl font-light mb-6 leading-tight" style={{ 
              color: theme.primary,
              fontFamily: 'Georgia, serif'
            }}>
              Your personalized routine
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Based on your <strong className="text-gray-900">{routine.skinType}</strong> skin
              {routine.sensitivity && routine.sensitivity !== 'Never' && ` with ${routine.sensitivity.toLowerCase()} sensitivity`}
            </p>
          </div>

          {/* Warnings */}
          {routine.warnings.length > 0 && (
            <div className="mb-16 p-8 rounded-lg border-l-4" style={{ 
              backgroundColor: '#FFF9E6',
              borderColor: '#F59E0B'
            }}>
              <h3 className="font-medium text-lg mb-4 text-gray-900">
                Important Notes
              </h3>
              <ul className="space-y-2 text-gray-700">
                {routine.warnings.map((warning: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Morning Routine */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-4xl font-light" style={{ 
                color: theme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                Morning Routine
              </h2>
            </div>
            
            <div className="space-y-10">
              {routine.am.map((item: any) => (
                <div key={item.step} className="group">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-sm font-light text-gray-400 min-w-[32px]">
                      {String(item.step).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                      {item.name}
                    </h3>
                  </div>
                  <div className="ml-12">
                    <p className="text-base text-gray-900 mb-2 font-medium">{item.product}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening Routine */}
          <div className="mb-16" style={{ backgroundColor: theme.lighter }}>
            <div className="p-12 rounded-lg">
              <div className="mb-8 pb-4 border-b" style={{ borderColor: theme.accent + '30' }}>
                <h2 className="text-4xl font-light" style={{ 
                  color: theme.primary,
                  fontFamily: 'Georgia, serif'
                }}>
                  Evening Routine
                </h2>
              </div>
              
              <div className="space-y-10">
                {routine.pm.map((item: any) => (
                  <div key={item.step} className="group">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-sm font-light text-gray-400 min-w-[32px]">
                        {String(item.step).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {item.name}
                      </h3>
                    </div>
                    <div className="ml-12">
                      <p className="text-base text-gray-900 mb-2 font-medium">{item.product}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-16">
            <div className="mb-8 pb-4 border-b border-gray-200">
              <h3 className="text-3xl font-light" style={{ 
                color: theme.primary,
                fontFamily: 'Georgia, serif'
              }}>
                Quick Tips
              </h3>
            </div>
            <ul className="space-y-4 text-gray-700 leading-relaxed">
              <li className="flex items-start gap-3">
                <span style={{ color: theme.primary }}>•</span>
                <span>Give new products 6-8 weeks to see results</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: theme.primary }}>•</span>
                <span>Always patch test new actives before full application</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: theme.primary }}>•</span>
                <span>Consistency is more important than perfection</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: theme.primary }}>•</span>
                <span>If irritation occurs, scale back to basics and rebuild slowly</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center pt-12 border-t border-gray-200">
            <a 
              href="/quiz" 
              className="inline-block px-12 py-4 rounded-full text-white font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: theme.primary }}
            >
              Retake Quiz
            </a>
            <p className="text-sm text-gray-500 mt-6">
              Questions? <a href="/" className="underline hover:text-gray-900">Visit our homepage</a>
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
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