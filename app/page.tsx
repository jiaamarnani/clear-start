'use client';

import { useEffect, useState } from 'react';

const theme = {
  primary: '#6A89A7',
  light: '#88BDF2',
  lighter: '#BDDDFC',
  accent: '#647b92ff',
  muted: '#7d96aeff',
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .fade-up {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.25s; }
        .delay-3 { transition-delay: 0.4s; }
        .delay-4 { transition-delay: 0.55s; }

        .step-col {
          transition: opacity 0.2s ease;
        }
        .step-col:hover { opacity: 0.85; }

        .btn-primary {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover {
          background: #4e6e8a !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(106, 137, 167, 0.25);
        }

        .btn-outline {
          transition: background 0.2s ease, color 0.2s ease;
        }
        .btn-outline:hover {
          background: rgba(106, 137, 167, 0.06) !important;
        }

        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: #1a1a1a; }

        /* subtle decorative line accent */
        .section-rule {
          width: 36px;
          height: 2px;
          background: ${theme.primary};
          margin-bottom: 20px;
          border-radius: 2px;
        }

        .ticker-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(106,137,167,0.12);
          border-bottom: 1px solid rgba(106,137,167,0.12);
          padding: 11px 0;
        }
        .ticker-track {
          display: inline-flex;
          gap: 0;
          animation: ticker 28s linear infinite;
          white-space: nowrap;
        }
        .ticker-item {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${theme.muted};
          padding: 0 32px;
        }
        .ticker-sep {
          color: rgba(106,137,167,0.25);
          font-size: 10px;
          align-self: center;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          nav { padding: 18px 24px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '22px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: scrolled ? 'rgba(250,250,248,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          transition: 'all 0.35s ease',
        }}
      >
        <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 22, fontWeight: 400, color: theme.primary, letterSpacing: '0.5px' }}>
          ClearStart
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#how-it-works" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>How It Works</a>
          <a href="#about" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>About</a>
          <a href="/mystory" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>My Story</a>
          <a
            href="/quiz"
            className="btn-primary"
            style={{
              backgroundColor: theme.primary, color: 'white',
              padding: '10px 22px', borderRadius: 6,
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}
          >
            Take the Quiz
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '160px 48px 100px', textAlign: 'center' }}>
          {/* eyebrow */}
          <div className={`fade-up delay-1 ${visible ? 'visible' : ''}`}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 11, fontWeight: 500, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: theme.primary,
              border: `1px solid ${theme.accent}55`,
              padding: '6px 14px', borderRadius: 100, marginBottom: 36,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: theme.primary, display: 'inline-block' }} />
              Acne Education Platform
            </span>
          </div>

          <h1
            className={`fade-up delay-2 ${visible ? 'visible' : ''}`}
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 'clamp(46px, 5vw, 72px)',
              fontWeight: 400, lineHeight: 1.05,
              letterSpacing: '-0.5px', color: '#1a1a1a',
              marginBottom: 28,
            }}
          >
            Acne is confusing,<br />
            <em style={{ fontStyle: 'italic', color: theme.primary }}>your routine</em>{' '}shouldn't be.
          </h1>

          <p
            className={`fade-up delay-3 ${visible ? 'visible' : ''}`}
            style={{ fontSize: 16, color: '#666', lineHeight: 1.75, maxWidth: 480, marginBottom: 40, margin: '0 auto 40px', fontWeight: 400 }}
          >
            Take our 2-minute skin quiz. Understand your acne type, identify triggers, and get a personalized routine backed by research and real testing.
          </p>

          <div className={`fade-up delay-4 ${visible ? 'visible' : ''}`} style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/quiz"
              className="btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: theme.primary, color: 'white',
                padding: '14px 28px', borderRadius: 6,
                fontSize: 14, fontWeight: 500, textDecoration: 'none',
              }}
            >
              Take the Quiz
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </a>
            <a
              href="/story"
              className="btn-outline"
              style={{
                display: 'inline-block',
                color: theme.primary,
                padding: '14px 22px', borderRadius: 6,
                border: `1.5px solid ${theme.accent}88`,
                fontSize: 14, fontWeight: 400, textDecoration: 'none',
              }}
            >
              My Story
            </a>
          </div>

          <div className={`fade-up delay-4 ${visible ? 'visible' : ''}`} style={{ display: 'flex', gap: 6, marginTop: 28, alignItems: 'center', justifyContent: 'center' }}>
            {['Free', '2 min quiz', 'No signup'].map((t, i) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#999' }}>
                {i > 0 && <span style={{ color: '#ddd', marginRight: 6 }}>·</span>}
                {t}
              </span>
            ))}
          </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className="ticker-item">Personalized Routines</span>
              <span className="ticker-sep">—</span>
              <span className="ticker-item">Acne Type Analysis</span>
              <span className="ticker-sep">—</span>
              <span className="ticker-item">Ingredient Education</span>
              <span className="ticker-sep">—</span>
              <span className="ticker-item">Trigger Identification</span>
              <span className="ticker-sep">—</span>
              <span className="ticker-item">Zero Conflicts of Interest</span>
              <span className="ticker-sep">—</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ maxWidth: 1160, margin: '0 auto', padding: '100px 48px' }}>
        <div className="section-rule" />
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.primary, marginBottom: 16 }}>
          The Process
        </div>
        <h2 style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 'clamp(34px, 3.5vw, 54px)', fontWeight: 400, color: '#1a1a1a', marginBottom: 16, lineHeight: 1.1 }}>
          Three steps to <em style={{ fontStyle: 'italic', color: theme.primary }}>clarity</em>
        </h2>
        <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 500, marginBottom: 60, fontWeight: 400 }}>
          No more guessing. No expensive consultations. Clear, evidence-based guidance for how your skin behaves.
        </p>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid rgba(0,0,0,0.07)`, marginTop: 64 }}>
          {[
            { n: '01', title: 'Take the Quiz',       body: 'Answer simple questions about your skin type taking just 2 minutes.' },
            { n: '02', title: 'Get Your Analysis',   body: 'We identify likely triggers of your acne type, and recommend proven active ingredients and products for your skin.' },
            { n: '03', title: 'Follow Your Routine', body: 'Receive a step-by-step AM/PM routine with product-type guidance, application order, and ingredient breakdowns.' },
          ].map((s, i) => (
            <div
              key={s.n}
              className="step-col"
              style={{
                padding: '48px 40px 48px 0',
                borderRight: i < 2 ? `1px solid rgba(0,0,0,0.07)` : 'none',
                paddingLeft: i > 0 ? 40 : 0,
              }}
            >
              <div style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                fontSize: 64, fontWeight: 400,
                color: theme.accent, opacity: 0.35,
                lineHeight: 1, marginBottom: 20,
                letterSpacing: '-2px',
              }}>
                {s.n}
              </div>
              <div style={{ fontSize: 17, fontWeight: 500, color: '#1a1a1a', marginBottom: 12 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.75, fontWeight: 400 }}>{s.body}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <a
            href="/quiz"
            className="btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: theme.primary, color: 'white',
              padding: '14px 28px', borderRadius: 6,
              fontSize: 14, fontWeight: 500, textDecoration: 'none',
            }}
          >
            Get My Routine →
          </a>
        </div>
      </section>

      {/* ── WHY CLEARSTART ── */}
      <section id="about" style={{ background: theme.lighter, borderTop: `1px solid ${theme.accent}25`, borderBottom: `1px solid ${theme.accent}25` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '100px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-rule" />
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.primary, marginBottom: 16 }}>
                Our Philosophy
              </div>
              <h2 style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 'clamp(32px, 3vw, 50px)', fontWeight: 400, color: '#1a1a1a', marginBottom: 20, lineHeight: 1.15 }}>
                Not another <em style={{ fontStyle: 'italic', color: theme.primary }}>skincare brand</em>
              </h2>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8, marginBottom: 36, fontWeight: 400 }}>
                ClearStart is an education platform. My goal is to help you understand your acne so you can make informed decisions about your skin, for life, not because its trending.
              </p>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.8, fontWeight: 400 }}>
                Evidence-based skincare education with zero conflicts of interest.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { title: 'Education First',            body: "We teach you why your skin behaves the way it does, not just what to buy." },
                { title: 'Science-Backed',             body: 'Every recommendation references review and research. No trends, no marketing language.' },
                { title: 'Zero Conflicts of Interest', body: "We don't sell products, have ads, or take brand partnerships. The goal is simply to help you." },
              ].map((w, i) => (
                <div
                  key={w.title}
                  style={{
                    padding: '22px 24px',
                    background: 'white',
                    borderLeft: `3px solid ${theme.accent}`,
                    borderRadius: i === 0 ? '8px 8px 0 0' : i === 2 ? '0 0 8px 8px' : 0,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', marginBottom: 5 }}>{w.title}</div>
                  <div style={{ fontSize: 13, color: '#777', lineHeight: 1.65, fontWeight: 400 }}>{w.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '100px 48px' }}>
        <div className="section-rule" />
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.primary, marginBottom: 16 }}>
          Community
        </div>
        <h2 style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 'clamp(32px, 3vw, 50px)', fontWeight: 400, color: '#1a1a1a', marginBottom: 48, lineHeight: 1.15 }}>
          Real skin. Real people.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {[
            { num: '64K+',  label: 'TikTok community normalizing acne together' },
            { num: '2 min', label: 'Simple quiz completion with no account needed' },
            { num: '100%',  label: 'Free, always. No paywall, no catch.' },
          ].map(s => (
            <div key={s.num} style={{
              padding: '32px 28px',
              border: `1px solid ${theme.accent}35`,
              borderRadius: 10,
              background: 'white',
            }}>
              <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 48, fontWeight: 400, color: theme.primary, marginBottom: 8, letterSpacing: '-1px' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6, fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: theme.primary }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '100px 48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 'clamp(38px, 4.5vw, 64px)', fontWeight: 400, color: 'white', lineHeight: 1.1, marginBottom: 18, letterSpacing: '-0.5px' }}>
            Ready to understand <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>your skin?</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 44, fontWeight: 400 }}>
            I stopped guessing and started treating my acne with clarity and confidence. With ClearStart, you can too.
          </p>
          <a
            href="/quiz"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', color: theme.primary,
              padding: '16px 36px', borderRadius: 6,
              fontSize: 15, fontWeight: 500, textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            Take the Quiz, It's Free! →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#1a1a1a', padding: '52px 48px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: 21, fontWeight: 400, color: 'rgba(255,255,255,0.75)', marginBottom: 6, letterSpacing: '0.5px' }}>ClearStart</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, fontWeight: 400 }}>Skincare education for real skin. No sales, no gimmicks — just science.</div>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', maxWidth: 400, lineHeight: 1.7, textAlign: 'right', fontWeight: 400 }}>
            Educational content only, not medical advice. Consult a dermatologist for persistent concerns.<br />
            © 2026 ClearStart
          </div>
        </div>
      </footer>

    </div>
  );
}