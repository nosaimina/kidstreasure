import { useState } from 'react'
import confetti from 'canvas-confetti'

// 100% crash-proof inline SVGs matching Facebook, Instagram, TikTok, and X
function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.48V8.71a8.31 8.31 0 0 0 4.91 1.57v-3.59a4.85 4.85 0 0 1-1-.001z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function VoteDialog({ isOpen, onClose, contestant, onConfirmVote, onSelectPlatform }) {
  const [clickedId, setClickedId] = useState(null)

  if (!isOpen) return null

  const socialOptions = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FacebookIcon />,
      bgColor: '#1877F2',
      bgGradient: '#1877F2',
      votes: 1
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <InstagramIcon />,
      bgColor: '#E1306C',
      bgGradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      votes: 1
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <TikTokIcon />,
      bgColor: '#000000',
      bgGradient: '#000000',
      votes: 1
    },
    {
      id: 'twitter',
      name: 'Twitter (X)',
      icon: <TwitterIcon />,
      bgColor: '#000000',
      bgGradient: '#000000',
      votes: 1
    }
  ]

  const handleVote = (item, e) => {
    // Visual click effect
    setClickedId(item.id)

    try {
      const rect = e?.currentTarget?.getBoundingClientRect() || { left: 100, top: 100, width: 50, height: 50 }
      const x = (rect.left + rect.width / 2) / (window.innerWidth || 1000)
      const y = (rect.top + rect.height / 2) / (window.innerHeight || 1000)

      confetti({
        particleCount: 35,
        spread: 50,
        origin: { x, y },
        colors: [item.bgColor, '#ffc107', '#007bff', '#ffffff']
      })
    } catch (err) {
      console.error(err)
    }

    setTimeout(() => {
      setClickedId(null)
      if (onSelectPlatform) {
        onSelectPlatform(item)
      }
    }, 450)
  }

  const handleClose = () => {
    setClickedId(null)
    onClose()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          padding: 'clamp(20px, 5vw, 24px) clamp(16px, 5vw, 32px) clamp(16px, 4vw, 20px) clamp(16px, 5vw, 32px)',
          maxWidth: 'min(380px, 94vw)',
          width: '100%',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          border: '1px dashed #888888',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Title matching media */}
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#212529',
            marginBottom: '18px',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Vote using:
        </h3>

        {/* Social Options List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          {socialOptions.map((item) => {
            const isClicked = clickedId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleVote(item, e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  maxWidth: '260px',
                  minHeight: '46px',
                  padding: '10px 14px',
                  backgroundColor: isClicked ? '#f8fafc' : '#ffffff',
                  border: '1px solid',
                  borderColor: isClicked ? item.bgColor : '#dee2e6',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                  color: '#212529',
                  transform: isClicked ? 'scale(0.93)' : 'scale(1)',
                  boxShadow: isClicked ? `0 0 0 4px ${item.bgColor}33` : 'none',
                  userSelect: 'none',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  if (clickedId !== item.id) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa'
                    e.currentTarget.style.borderColor = '#adb5bd'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (clickedId !== item.id) {
                    e.currentTarget.style.backgroundColor = '#ffffff'
                    e.currentTarget.style.borderColor = '#dee2e6'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {/* Social Icon Box */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    backgroundColor: item.bgColor,
                    background: item.bgGradient,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: isClicked ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  {item.icon}
                </div>

                {/* Text alongside icon */}
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#212529'
                  }}
                >
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Close Button matching media style */}
        <div style={{ marginTop: '8px' }}>
          <button
            type="button"
            onClick={handleClose}
            style={{
              backgroundColor: '#efefef',
              border: '1px solid #767676',
              borderRadius: '2px',
              padding: '6px 20px',
              minHeight: '34px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#000000',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e5e5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#efefef')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
