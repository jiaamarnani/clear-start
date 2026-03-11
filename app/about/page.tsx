'use client';

const theme = {
  primary: '#6A89A7',
  light: '#88BDF2',
  lighter: '#BDDDFC',
  accent: '#647b92ff',
  muted: '#7d96aeff',
};

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF8', fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-link { transition: color 0.2s ease; font-size: 13px; color: #666; text-decoration: none; }
        .nav-link:hover { color: #1a1a1a; }

        .section-rule { width: 36px; height: 2px; background: ${theme.primary}; margin-bottom: 20px; border-radius: 2px; }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${theme.primary}; color: white;
          padding: 14px 28px; border-radius: 6px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          font-family: inherit;
        }
        .btn-primary:hover { background: #4e6e8a; transform: translateY(-1px); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '22px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'rgba(250,250,248,0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <a href="/" style={{ fontSize: 20, fontWeight: 500, color: theme.primary, textDecoration: 'none', letterSpacing: '-0.3px' }}>
          ClearStart
        </a>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="/" className="nav-link">Home</a>
          <a href="/quiz" className="nav-link">Quiz</a>
          <span style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>About</span>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px 120px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <div className="section-rule" />
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '2.5px', textTransform: 'uppercase', color: theme.muted, marginBottom: 16 }}>
            About
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: 20 }}>
            About ClearStart
          </h1>
          <p style={{ fontSize: 17, color: '#777', lineHeight: 1.8 }}>
            A free, personalized skincare education tool for anyone dealing with acne.
          </p>
        </div>

        {/* SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {[
            {
              title: 'What is ClearStart?',
              body: "Acne can get overwhelming. ClearStart is a personalized skincare guide designed to simplify the stress and confusion of acne, hopefully giving you a clear start. By answering a few questions about your skin, you'll receive a customized morning and evening routine tailored to your needs — no 10-step routine, just what works for you.",
            },
            {
              title: 'Why ClearStart?',
              body: "As someone who's gone down countless rabbit holes trying to improve acne, I understand the struggle. ClearStart was built to not only simplify skincare but also normalize and educate on acne — a tool I wish I had when I was struggling.",
            },
            {
              title: "Who It's For",
              body: "ClearStart is for anyone dealing with acne who wants a simple, personalized starting point. Whether you're new to skincare or looking to refine your routine, this tool is designed to help you build a solid foundation.",
            },
          ].map((s, i) => (
            <div key={s.title} style={{ padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, letterSpacing: '-0.2px' }}>{s.title}</h2>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}

          {/* DISCLAIMER — highlighted */}
          <div style={{ padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div style={{ padding: '24px 28px', background: theme.lighter, borderRadius: 8, borderLeft: `3px solid ${theme.accent}` }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: theme.primary, marginBottom: 12 }}>
                Important Disclaimer
              </h2>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>
                ClearStart is an educational tool and portfolio project. The recommendations provided are based on general skincare principles and are not a substitute for professional medical advice. If you have severe acne or skin conditions, please consult a dermatologist.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '40px 0' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 14, letterSpacing: '-0.2px' }}>Get Started</h2>
            <p style={{ fontSize: 15, color: '#666', lineHeight: 1.8, marginBottom: 28 }}>
              Ready to find your routine? Take the quiz and get personalized recommendations in just 2 minutes.
            </p>
            <a href="/quiz" className="btn-primary">Take the Quiz →</a>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '32px 48px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#bbb', lineHeight: 1.7 }}>Educational content only — not medical advice. Consult a dermatologist for persistent skin concerns.</p>
          <p style={{ fontSize: 11, color: '#ccc', marginTop: 6 }}>© 2026 ClearStart</p>
        </div>
      </footer>

    </div>
  );
}