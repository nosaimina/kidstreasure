import { Award, Star, Sparkles, CheckCircle } from 'lucide-react'
import { JUDGES } from '../data/contestants'

export default function JudgesSection() {
  return (
    <section
      id="judges"
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(40px, 6vw, 70px) 0 clamp(36px, 5vw, 60px) 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Header with themed slanted badge */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 44px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#ede9fe',
              color: '#7c3aed',
              padding: '6px 18px',
              borderRadius: '30px',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px'
            }}
          >
            <Award size={16} />
            <span>Official Grand Jury</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
              fontWeight: 900,
              color: '#0f172a',
              marginBottom: '10px'
            }}
          >
            Meet Our Celebrity Judges
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)',
              color: '#64748b',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Our esteemed panel brings decades of industry experience across fashion runways, Broadway stages,
            and recording studios to mentor and evaluate the nation's young stars.
          </p>
        </div>

        {/* 3 Judges Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(18px, 3vw, 30px)'
          }}
        >
          {JUDGES.map((judge, idx) => {
            const ribbonBg =
              judge.ribbonColor === 'blue'
                ? '#0288d1'
                : judge.ribbonColor === 'pink'
                ? '#d81b60'
                : '#f59e0b'

            return (
              <div
                key={judge.name}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Judge Photo Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '280px',
                    backgroundColor: '#f8fafc',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={judge.image}
                    alt={judge.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block'
                    }}
                  />

                  {/* Slanted Category Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: -6,
                      backgroundColor: ribbonBg,
                      color: '#ffffff',
                      padding: '5px 16px 5px 16px',
                      clipPath: 'polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      zIndex: 2,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {judge.category}
                  </div>
                </div>

                {/* Judge Info Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '14px' }}>
                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        marginBottom: '4px',
                        lineHeight: 1.2
                      }}
                    >
                      {judge.name}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: ribbonBg
                      }}
                    >
                      {judge.role}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#64748b',
                      marginBottom: '16px',
                      lineHeight: 1.4
                    }}
                  >
                    {judge.credits}
                  </p>

                  <blockquote
                    style={{
                      backgroundColor: '#f8fafc',
                      borderLeft: `4px solid ${ribbonBg}`,
                      padding: '12px 14px',
                      borderRadius: '0 10px 10px 0',
                      fontSize: '0.88rem',
                      color: '#334155',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                      margin: 0,
                      flex: 1
                    }}
                  >
                    "{judge.quote}"
                  </blockquote>

                  {/* Evaluation Focus Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '0.75rem',
                      color: '#64748b',
                      fontWeight: 700
                    }}
                  >
                    <CheckCircle size={14} color="#10b981" />
                    <span>Official Finalist Scoring Panel</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
