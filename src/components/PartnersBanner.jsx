import { Heart } from 'lucide-react'

export default function PartnersBanner({ onVoteClick }) {
  const partners = [
    {
      role: 'HEADLINE SPONSOR',
      name: 'Mai Dubai',
      style: { fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#dc2626', fontWeight: 700 }
    },
    {
      role: 'EXCLUSIVE RADIO PARTNER',
      name: 'RADIO 89.1 FM',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: '#e11d48', fontWeight: 900, letterSpacing: '0.02em' }
    },
    {
      role: 'EXCLUSIVE TV PARTNER',
      name: 'ZEE TV  |  ZEE CINEMA',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: '#ea580c', fontWeight: 800 }
    },
    {
      role: 'EXCLUSIVE NEWSPAPER PARTNER',
      name: 'Khaleej Times',
      style: { fontFamily: "serif", fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, fontStyle: 'italic' }
    },
    {
      role: 'DIGITAL PARTNER',
      name: 'SPOTLIGHT DIGITAL',
      isBadge: true
    },
    {
      role: 'GIFTING PARTNER',
      name: 'LUSH  •  SKIN REPUBLIC',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: '#0f172a', fontWeight: 800 }
    },
    {
      role: 'DANCE CATEGORY',
      name: 'SKECHERS',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', color: '#0284c7', fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.05em' }
    },
    {
      role: 'SPORTS CATEGORY',
      name: 'ANTA',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', color: '#dc2626', fontWeight: 900 }
    },
    {
      role: 'VENUE PARTNER',
      name: 'THE GRAND DOME',
      isBadge: true
    },
    {
      role: 'EVENT BROUGHT TO YOU BY',
      name: 'FILMFARE  |  STARZ',
      style: { fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: '#b91c1c', fontWeight: 900, letterSpacing: '0.04em' }
    }
  ]

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '20px',
        paddingBottom: '40px',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Partners Box with Centered Angled 'OUR PARTNERS' Ribbon on Top */}
        <div style={{ position: 'relative', marginTop: '16px', marginBottom: '32px' }}>
          {/* Slanted Amber 'OUR PARTNERS' Badge */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            <div
              style={{
                backgroundColor: '#f59e0b',
                backgroundImage: 'linear-gradient(90deg, #f59e0b 0%, #ea580c 100%)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '5px 26px',
                clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                boxShadow: '0 4px 10px rgba(234, 88, 12, 0.25)'
              }}
            >
              OUR PARTNERS
            </div>
          </div>

          {/* White Horizontal Container with Subtle Gray Border */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              padding: '24px 12px 14px 12px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: '980px',
                gap: '8px'
              }}
            >
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '6px 10px',
                    borderRight: idx !== partners.length - 1 ? '1px solid #f1f5f9' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '62px'
                  }}
                >
                  {/* Category Role Label */}
                  <div
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      color: '#64748b',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {partner.role}
                  </div>

                  {/* Brand Visual / Logo Simulation */}
                  {partner.isBadge ? (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.62rem',
                        fontWeight: 900,
                        letterSpacing: '0.05em'
                      }}
                    >
                      ★
                    </div>
                  ) : (
                    <div
                      style={{
                        ...partner.style,
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Purple 'Click Here To Vote' Button */}
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 8px' }}>
          <button
            type="button"
            onClick={onVoteClick}
            style={{
              display: 'inline-block',
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#6d28d9',
              backgroundImage: 'linear-gradient(90deg, #6d28d9 0%, #7c3aed 50%, #6d28d9 100%)',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.05rem, 3.8vw, 1.35rem)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              padding: '14px 20px',
              borderRadius: '6px',
              border: 'none',
              boxShadow: '0 6px 18px rgba(109, 40, 217, 0.35)',
              transition: 'transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease',
              textAlign: 'center',
              cursor: 'pointer',
              minHeight: '48px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.filter = 'brightness(1.08)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(109, 40, 217, 0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.filter = 'brightness(1)'
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(109, 40, 217, 0.35)'
            }}
          >
            Click Here To Vote
          </button>
        </div>
      </div>

      {/* Full-Width Bright Purple Banner Matching Screenshot */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#ab47bc',
          backgroundImage: 'linear-gradient(90deg, #a855f7 0%, #ab47bc 50%, #9333ea 100%)',
          padding: 'clamp(20px, 4vw, 28px) 16px',
          textAlign: 'center',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.05)'
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.35rem, 4.6vw, 2.45rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.01em',
            lineHeight: 1.25,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          className="fabulous-kiddies-banner-title"
        >
          Fabulous Kiddies Talent Contest is Here!
        </h2>
      </div>

      {/* Explanatory Tagline directly matching screenshot */}
      <div className="container" style={{ maxWidth: '980px', textAlign: 'center', paddingTop: 'clamp(20px, 4vw, 32px)' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 3.2vw, 1.25rem)',
            fontWeight: 700,
            color: '#1e293b',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          Prepare for the most thrilling talent discovery in the region! Fabulous Kiddies Talent Contest
          proudly presents Season 24 – Bigger, Better, and Ready to Illuminate the Stars!
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .fabulous-kiddies-banner-title {
            font-size: 1.6rem !important;
          }
        }
        @media (max-width: 480px) {
          .fabulous-kiddies-banner-title {
            font-size: 1.35rem !important;
          }
        }
      `}</style>
    </section>
  )
}
