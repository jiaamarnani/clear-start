'use client';

import { useEffect, useState, useRef } from 'react';

const theme = {
  primary: '#6A89A7',
  light: '#88BDF2',
  lighter: '#BDDDFC',
  accent: '#647b92ff',
  muted: '#7d96aeff',
};

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Story() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .prose-p {
          font-size: 16px;
          color: #555;
          line-height: 1.85;
          margin-bottom: 20px;
        }
        .prose-p:last-child { margin-bottom: 0; }

        .section-num {
          font-size: 72px;
          font-weight: 600;
          color: ${theme.primary};
          opacity: 0.15;
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -3px;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(0,0,0,0.07);
          margin: 72px 0;
        }

        .pull-quote {
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 400;
          font-style: italic;
          color: ${theme.primary};
          line-height: 1.6;
          border-left: 3px solid ${theme.accent};
          padding-left: 28px;
          margin: 36px 0;
        }

        .section-h2 {
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 28px;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 40px 0;
        }
        .ba-photo {
          aspect-ratio: 3/4;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: ${theme.lighter};
        }
        .ba-photo img { width: 100%; height: 100%; object-fit: cover; }
        .ba-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          background: ${theme.lighter};
          border: 2px dashed rgba(106,137,167,0.25);
        }
        .ba-placeholder-text { font-size: 12px; color: ${theme.muted}; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }
        .ba-placeholder-sub { font-size: 11px; color: ${theme.light}; }
        .ba-label {
          position: absolute; bottom: 12px; left: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          background: white; color: #1a1a1a;
          padding: 5px 10px; border-radius: 4px;
        }
        .ba-caption { font-size: 13px; color: #888; line-height: 1.65; text-align: center; margin-top: 8px; }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${theme.primary}; color: white;
          padding: 14px 28px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          font-family: inherit;
        }
        .cta-btn:hover { background: #4e6e8a; transform: translateY(-1px); }

        .tiktok-link {
          font-size: 14px; font-weight: 500;
          color: ${theme.primary}; text-decoration: none;
          border-bottom: 1px solid rgba(106,137,167,0.3);
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .tiktok-link:hover { border-color: ${theme.primary}; }

        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #1a1a1a; }

        @media (max-width: 640px) { .ba-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: scrolled ? 'rgba(250,250,248,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <a href="/" style={{ fontSize: 20, fontWeight: 500, color: theme.primary, textDecoration: 'none', letterSpacing: '-0.3px' }}>
          ClearStart
        </a>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="/" className="nav-link" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>Home</a>
          <a href="/quiz" className="cta-btn" style={{ padding: '10px 22px', fontSize: 13 }}>Take the Quiz</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '140px 48px 72px' }}>
        <div style={{ opacity: 0, animation: 'fadeUp 0.7s 0.1s forwards' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 20 }}>
            My Story
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.5px', color: '#1a1a1a', marginBottom: 28 }}>
            I spent two years confused about my own skin.{' '}
            <span style={{ color: theme.primary, fontWeight: 400, fontStyle: 'italic' }}>This is what I learned.</span>
          </h1>
          <p style={{ fontSize: 17, color: '#777', lineHeight: 1.8, fontWeight: 400 }}>
            I'm Jia. I built ClearStart because the resource I needed when my skin was at it's worst didn't exist. I wasted a lot of time and money figuring that out, so I want to bridge that gap.
          </p>
        </div>
      </div>

      {/* STORY BODY */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 48px 120px' }}>

        {/* BEFORE / AFTER */}
        <FadeIn>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 20 }}>
            The difference
          </div>
          <div className="ba-grid">
            {['Before', 'After'].map(label => (
              <div key={label}>
                <div className="ba-photo">
                  <img src={`/${label.toLowerCase()}.jpg`} alt={label} />
                  <div className="ba-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="ba-caption">My skin after understanding my acne before treating it.</p>
        </FadeIn>

        <div className="divider" />

        <FadeIn delay={0.05}>
          <div className="section-num">01</div>
          <h2 className="section-h2">It started with clear skin</h2>
          <p className="prose-p">I didn't always have acne until I started to get more into skincare and makeup at around 16.
             As I tried new products and started experimenting with skincare, my skin did not react well. 
             Rather than cystic pimples and typical acne, my skin was flooded with texture and bumps which I now know are closed comedones.</p>
          <p className="prose-p">Like any other teen, I turned to TikTok for advice, however blindly purchasing products and following
            routines only made my skin worse, leaving me confused and my skin worse.</p>
        </FadeIn>

        <div className="divider" />

        <FadeIn delay={0.05}>
          <div className="section-num">02</div>
          <h2 className="section-h2">The information made it worse</h2>
          <p className="prose-p">The problem wasn't a lack of recommendations, it was too much of it. 
            Try retinol, use an AHA, actually use a BHA. Add niacinamide and a Vit C in the morning. The list was endless.</p>
          <p className="prose-p">I tried at least 1 new product every week.
             Spending unreasonable amounts of money and overwhelming my skin.</p>
          <div className="pull-quote">"I wasted so much money on products that weren't designed for my skin"</div>
          <p className="prose-p">Dermatologist visits didn't help either, instead fed into the plethora of products I was "supposed" to use.</p>
        </FadeIn>

        <div className="divider" />

        <FadeIn delay={0.05}>
          <div className="section-num">03</div>
          <h2 className="section-h2">What actually helped</h2>
          <p className="prose-p">I stopped buying and started researching</p>
          <p className="prose-p">Instead of looking at products, I focused on the ingredients. What they do, why they are used, and how often to use them.
             Next I understood my specific acne, why it was happening, and what triggered it.</p>
          <p className="prose-p">Building a routine seemed easy now that I understood my skin.</p>
        </FadeIn>

        <div className="divider" />

        <FadeIn delay={0.05}>
          <div className="section-num">04</div>
          <h2 className="section-h2">64,000 people who feel the same</h2>
          <p className="prose-p">When my skin was at my worst, I yearned for a community, so I built that.
           I started posting what I was learning on TikTok, what worked for my skin, what products I genuinely liked and acne tips I wish I knew before.</p>
          <p className="prose-p">Over 64,000 people now follow my journey and hopefully learn form it!</p>
          <div style={{ marginTop: 32, padding: '24px 28px', background: theme.lighter, borderRadius: 8, borderLeft: `3px solid ${theme.accent}` }}>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 14 }}>Join the community here!</div>
            <a href="https://tiktok.com/@jlovesskincare" target="_blank" rel="noopener noreferrer" className="tiktok-link">@jlovesskincare →</a>
          </div>
        </FadeIn>

        <div className="divider" />

        <FadeIn delay={0.05}>
          <div className="section-num">05</div>
          <h2 className="section-h2">Why I built ClearStart</h2>
          <p className="prose-p">ClearStart is the tool I needed at 16. When I felt like my skin would never get better.
            A way to understand your specific acne, what caused it, and how to treat it.</p>
          <p className="prose-p">No marketing schemes or sponsored products just education based on research and my own experience.I started posting what I was learning on TikTok. Not a polished routine, just honest updates about what was on my face and what I was figuring out.</p>
          <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <a href="/quiz" className="cta-btn">Take the Quiz →</a>
            <a href="/" style={{ fontSize: 13, color: '#999', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: 1 }}>Back to home</a>
          </div>
        </FadeIn>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '32px 48px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#bbb', lineHeight: 1.7 }}>Educational content only — not medical advice. Consult a dermatologist for persistent skin concerns.</p>
          <p style={{ fontSize: 11, color: '#ccc', marginTop: 6 }}>© 2026 ClearStart</p>
        </div>
      </footer>

    </div>
  );
}