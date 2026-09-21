import React from 'react'

export default function VotingCardsSection({ contestants, onOpenVote }) {
  // Ensure we have 6 cards
  const displayContestants = contestants.slice(0, 6)

  return (
    <section
      id="voting-grid"
      style={{
        backgroundColor: '#f8fafc',
        padding: '40px 0 50px 0',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 16px' }}>
        {/* 6 Cards Grid matching the attached reference media */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="media-contestants-grid"
        >
          {displayContestants.map((c, index) => {
            const contestantNo = c.contestantNumber || `00${index + 1}`

            return (
              <div
                key={c.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="simple-media-card"
              >
                {/* 1. Header Bar: Contestant 00X */}
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #dee2e6',
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#212529',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Contestant {contestantNo}
                </div>

                {/* 2. Middle Body: Badge, Image, and Blue Vote Button */}
                <div
                  style={{
                    padding: '20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    backgroundColor: '#ffffff'
                  }}
                >
                  {/* Category Yellow Badge */}
                  <div
                    style={{
                      backgroundColor: '#ffc107',
                      color: '#000000',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      padding: '4px 16px',
                      borderRadius: '4px',
                      marginBottom: '14px',
                      display: 'inline-block',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {c.badge || 'Beauty'}
                  </div>

                  {/* Contestant Image */}
                  <div
                    style={{
                      width: '100%',
                      height: '190px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '18px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <img
                      src={c.image}
                      alt={`Contestant ${contestantNo}`}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Bright Blue Vote Button */}
                  <button
                    type="button"
                    onClick={() => onOpenVote(c)}
                    style={{
                      backgroundColor: '#007bff',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '11px 20px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0, 123, 255, 0.3)',
                      transition: 'background-color 0.2s ease, transform 0.1s ease',
                      width: '100%',
                      maxWidth: '260px',
                      minHeight: '44px',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0069d9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff'
                    }}
                  >
                    VOTE For Contestant {contestantNo}
                  </button>
                </div>

                {/* 3. Footer Bar: Votes : XX */}
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderTop: '1px solid #dee2e6',
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: '0.98rem',
                    fontWeight: 600,
                    color: '#495057'
                  }}
                >
                  Votes : {c.votes}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .simple-media-card:hover {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08) !important;
        }
        @media (max-width: 900px) {
          .media-contestants-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .media-contestants-grid {
            grid-template-columns: 1fr !important;
            max-width: 380px !important;
            margin: 0 auto !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
