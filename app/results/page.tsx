'use client';

import { useEffect, useState } from 'react';

type QuizAnswers = {
  skinType: string;
  sensitivity: string;
  acneType: string;
  currentProducts: string[];
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
  
  // Step 1: Cleanser (only for oily skin in AM)
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

  // Step 2: Serum (optional, skin-type specific)
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

  // Step 3: Moisturizer
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

  // Step 4: SPF
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
      <div className="min-h-screen flex items-center justify-centerbg-gradient-to-br from-pink-50 via-white to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FC8DB2] mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your routine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%)', fontFamily: 'Georgia, serif' }}>
<nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-2xl tracking-tight" style={{ color: '#FC8DB2' }}>
            ClearStart
          </div>
          <div className="flex gap-4 pr-4">
            <a href="/" className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
              Home
            </a>
            <a href="/quiz" className="px-6 py-1.5 bg-gray-100 rounded-full text-gray-900 text-lg font-medium hover:bg-gray-200 transition shadow-sm">
              Retake Quiz
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4" style={{
                    color: '#FC8DB2',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                      Your Personalized Routine
                </h1>
          <p className="text-xl text-gray-700">
            Based on your <span className="font-semibold">{routine.skinType}</span> skin
            {routine.sensitivity && ` with ${routine.sensitivity.toLowerCase()} sensitivity`}
          </p>
        </div>

        {routine.warnings.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-3 text-gray-900">⚠️ Important Notes:</h3>
            <ul className="space-y-2">
              {routine.warnings.map((warning: string, idx: number) => (
                <li key={idx} className="text-gray-700">• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">☀️ Morning Routine</h2>
          <div className="space-y-6">
            {routine.am.map((item: any) => (
              <div key={item.step} className="border-l-4 border-[#FC8DB2] pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-[#FC8DB2]">{item.step}</span>
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                </div>
                <p className="text-lg text-gray-900 mb-1">{item.product}</p>
                <p className="text-gray-600 italic">{item.why}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">🌙 Evening Routine</h2>
          <div className="space-y-6">
            {routine.pm.map((item: any) => (
              <div key={item.step} className="border-l-4 border-[#FC8DB2] pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-[#FC8DB2]">{item.step}</span>
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                </div>
                <p className="text-lg text-gray-900 mb-1">{item.product}</p>
                <p className="text-gray-600 italic">{item.why}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pink-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">💡 Quick Tips</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Give new products 6-8 weeks to see results</li>
            <li>• Always patch test new actives before full application</li>
            <li>• Consistency is more important than perfection</li>
            <li>• If irritation occurs, scale back to basics and rebuild slowly</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <a href="/quiz" className="inline-block bg-white px-12 py-4 rounded-2xl text-xl font-bold tracking-wide shadow-lg hover:shadow-xl transition border-2 border-gray-200 hover:scale-105 text-black">
            Retake Quiz
          </a>
        </div>
      </div>

      <div className="text-center pb-8">
        <p className="text-sm text-gray-600">Purely Educational - Not Medical Advice</p>
      </div>
    </div>
  );
}