import { useState } from 'react'

export default function HeroSpotlight({ contestants }) {
  // Strictly 3 spotlight showcase cards
  const heroContestants = contestants.slice(0, 3)
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section
      id="spotlight"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '16px',
        paddingBottom: '24px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Media Header: Logo & Jumping Kids Celebration Banner */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '18px' }}>
        {/* Subtle Playful Confetti & Kids Motif */}
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto 10px auto',
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
            backgroundColor: '#ffffff'
          }}
        >
          <img
            src="/images/kids_jumping_banner.jpg"
            alt="Fabulous Kiddies Talent Contestants Jumping and Celebrating"
            style={{
              width: '100%',
              height: '130px',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              display: 'block'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.9) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  letterSpacing: '0.12em',
                  color: '#0f172a',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                FABULOUS KIDDIES
              </h1>
              <span
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em'
                }}
              >
                5.0
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.3rem',
                color: '#6b21a8',
                fontWeight: 700,
                marginTop: '0px'
              }}
            >
              talent contest
            </p>
          </div>
        </div>

        {/* The Signature Purple Gradient Angled Ribbon Banner */}
        <div style={{ display: 'inline-block', margin: '4px 0 12px 0', maxWidth: '100%' }}>
          <div className="slanted-ribbon-purple" style={{ fontSize: 'clamp(0.95rem, 3.8vw, 1.45rem)', padding: '8px clamp(16px, 4vw, 36px)' }}>
            KIDDIES VOGUE ESSENTIALS
          </div>
        </div>
      </div>

      {/* 3 Compact Spotlight Display Cards (Smaller, No Contestant No, No Vote Button) */}
      <div className="container" id="contestants">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px',
            alignItems: 'center',
            maxWidth: '960px',
            margin: '0 auto',
            position: 'relative'
          }}
          className="hero-columns-grid"
        >
          {heroContestants.map((contestant) => {
            const isHovered = hoveredId === contestant.id
            const ribbonClass =
              contestant.ribbonColor === 'blue'
                ? 'ribbon-blue'
                : contestant.ribbonColor === 'pink'
                ? 'ribbon-pink'
                : 'ribbon-gold'

            return (
              <div
                key={contestant.id}
                onMouseEnter={() => setHoveredId(contestant.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '16px',
                  padding: '12px 8px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  backgroundColor: '#ffffff',
                  boxShadow: isHovered
                    ? '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0,0,0,0.04)'
                    : '0 2px 10px rgba(0, 0, 0, 0.03)',
                  border: '1px solid',
                  borderColor: isHovered ? '#cbd5e1' : '#f1f5f9',
                  overflow: 'hidden'
                }}
                className="hero-spotlight-card"
              >
                {/* Slanted Category Vertical Ribbon */}
                <div
                  className={`vertical-ribbon ${contestant.ribbonSide || 'left'} ${ribbonClass}`}
                  style={{
                    width: '38px',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <span className="vertical-ribbon-text">
                    {contestant.ribbonText}
                  </span>
                </div>

                {/* Compact Contestant Image Container */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 8px 0 18px'
                  }}
                >
                  <img
                    src={contestant.image}
                    alt={contestant.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: isHovered
                        ? 'drop-shadow(0 10px 14px rgba(0,0,0,0.12))'
                        : 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
                      transition: 'transform 0.3s ease, filter 0.3s ease',
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)'
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-columns-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }
          .hero-spotlight-card {
            padding: 8px 4px !important;
          }
        }
        @media (max-width: 620px) {
          .hero-columns-grid {
            grid-template-columns: 1fr !important;
            max-width: 360px !important;
            margin: 0 auto !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
