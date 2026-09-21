import { Sparkles, Heart, Trophy, Shield, ArrowUp, Share2, Globe, MessageCircle } from 'lucide-react'

export default function Footer({ onOpenVote }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '60px 0 30px 0',
        borderTop: '4px solid #7c3aed'
      }}
    >
      <div className="container">
        {/* Top Footer Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  letterSpacing: '0.08em',
                  color: '#ffffff'
                }}
              >
                FABULOUS KIDDIES
              </span>
              <span
                style={{
                  background: '#7c3aed',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}
              >
                5.0
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.2rem',
                color: '#c084fc',
                marginTop: '-8px',
                marginBottom: '16px'
              }}
            >
              talent contest
            </div>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
              The nation's premier youth talent and style showcase, celebrating positive creativity,
              confidence, and dreams in every child.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="#social-share"
                title="Share Contest"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                <Share2 size={18} />
              </a>
              <a
                href="#global-broadcast"
                title="Online Broadcast"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                <Globe size={18} />
              </a>
              <a
                href="#community-chat"
                title="Community & Updates"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.04em' }}>
              CONTEST NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <a href="#spotlight" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Kiddies Vogue Spotlight
                </a>
              </li>
              <li>
                <a href="#voting" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Live Contestant Voting
                </a>
              </li>
              <li>
                <a href="#judges" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Celebrity Judges
                </a>
              </li>
              <li>
                <a href="#timeline" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Timeline & Gala Date
                </a>
              </li>
              <li>
                <a href="#faqs" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Voting & Eligibility FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.04em' }}>
              OFFICIAL CATEGORIES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ color: '#38bdf8' }}>• Fashion & Runway</li>
              <li style={{ color: '#f43f5e' }}>• Personality & Charm</li>
              <li style={{ color: '#fbbf24' }}>• Entertainment & Stage Acting</li>
              <li style={{ color: '#c084fc' }}>• Vocals & Singing</li>
              <li style={{ color: '#34d399' }}>• Dance & Acrobatics</li>
            </ul>
          </div>

          {/* Support & Voting Info Box */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '24px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>
              Public Voting Active
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px', lineHeight: 1.5 }}>
              Cast your vote daily to support our young contestants and help decide the Season 24 champions!
            </p>
            <button
              type="button"
              onClick={onOpenVote}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '10px', cursor: 'pointer' }}
            >
              Cast Daily Vote
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem'
          }}
        >
          <div>
            © 2026 Fabulous Kiddies 5.0 Talent Contest. All Rights Reserved. Verified Safe Media for Kids.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '30px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
