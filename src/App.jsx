import React, { useState, useEffect, Component } from 'react'
import HeroSpotlight from './components/HeroSpotlight'
import PartnersBanner from './components/PartnersBanner'
import VotingCardsSection from './components/VotingCardsSection'
import JudgesSection from './components/JudgesSection'
import VoteDialog from './components/VoteDialog'
import LoginForm from './components/Login'
import AdminAuditDashboard from './components/AdminAuditDashboard'
import { INITIAL_CONTESTANTS } from './data/contestants'

function App() {
  const [contestants, setContestants] = useState(() => {
    try {
      const saved = localStorage.getItem('fk_contestants_v3')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Ensure 6 contestants
        if (Array.isArray(parsed) && parsed.length === 6) {
          return parsed
        }
      }
    } catch (e) {
      console.error(e)
    }
    return INITIAL_CONTESTANTS.slice(0, 6)
  })

  // URL & Hash route resolver for /admin/audit-log, #/admin/audit-log, #login, etc.
  const getRouteFromUrl = () => {
    const path = (window.location.pathname || '').toLowerCase()
    const hash = (window.location.hash || '').toLowerCase()
    if (path.includes('/admin') || hash.includes('admin')) {
      return 'admin'
    }
    if (hash === '#login') {
      return 'login'
    }
    return 'home'
  }

  // Page view state: 'home' | 'login' | 'admin'
  const [currentPage, setCurrentPage] = useState(getRouteFromUrl)

  // Dialog & selection state
  const [voteDialogOpen, setVoteDialogOpen] = useState(false)
  const [selectedVoteContestant, setSelectedVoteContestant] = useState(() => contestants[0])
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  // Synchronize with browser hash & history for reliable SPA routing
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPage(getRouteFromUrl())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleNavigation)
    window.addEventListener('popstate', handleNavigation)
    return () => {
      window.removeEventListener('hashchange', handleNavigation)
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [])

  // Persist contestants state when updated
  useEffect(() => {
    try {
      localStorage.setItem('fk_contestants_v3', JSON.stringify(contestants))
    } catch (e) {
      console.error(e)
    }
  }, [contestants])

  // 1. When clicking VOTE anywhere -> pulls up the VoteDialog
  const handleOpenVote = (contestant = null) => {
    const target = contestant || selectedVoteContestant || contestants[0]
    setSelectedVoteContestant(target)
    setVoteDialogOpen(true)
  }

  // 2. When clicking any option in the dialog -> shows the Login Form on separate page
  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform)
    setVoteDialogOpen(false)
    window.location.hash = 'login'
    setCurrentPage('login')
    window.scrollTo(0, 0)
    if (document.body) document.body.scrollTop = 0
    if (document.documentElement) document.documentElement.scrollTop = 0
  }

  // Return back to main contest page
  const handleBackToHome = () => {
    if (window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/')
    }
    window.location.hash = ''
    setCurrentPage('home')
    window.scrollTo(0, 0)
    if (document.body) document.body.scrollTop = 0
    if (document.documentElement) document.documentElement.scrollTop = 0
  }

  // Navigate to Admin Audit Dashboard
  const handleGoToAdmin = () => {
    window.location.hash = '#/admin/audit-log'
    setCurrentPage('admin')
    window.scrollTo(0, 0)
  }

  // Handle vote increment when user logs in with their password
  const handleConfirmVote = (votesToAdd = 1, contestantId) => {
    const targetId = contestantId || selectedVoteContestant?.id || contestants[0]?.id
    if (!targetId) return

    setContestants((prev) =>
      prev.map((c) => {
        if (c.id === targetId) {
          return { ...c, votes: c.votes + votesToAdd }
        }
        return c
      })
    )
  }

  // Render Admin Audit Dashboard Route (/admin/audit-log)
  if (currentPage === 'admin') {
    return <AdminAuditDashboard onBackToHome={handleBackToHome} />
  }

  // Render separate Login / Voter Verification Page
  if (currentPage === 'login') {
    return (
      <LoginForm
        contestant={selectedVoteContestant || contestants[0]}
        platform={selectedPlatform}
        onConfirmVote={handleConfirmVote}
        onBack={handleBackToHome}
      />
    )
  }

  // Render Main Contest Page
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Top Accent Gradient Border */}
      <div className="top-accent-bar" />

      {/* Main Content */}
      <main style={{ flex: 1, paddingTop: '5px' }}>
        {/* Spotlight Showcase (Smaller cards, no vote button or contestant number) */}
        <HeroSpotlight contestants={contestants} />

        {/* Partners Strip, Vote CTA, and Purple Announcement Banner */}
        <PartnersBanner onVoteClick={() => handleOpenVote()} />

        {/* Dedicated Judges Section under Partners */}
        <JudgesSection />

        {/* 6 Contestant Cards with Contestant No, Beauty Badge, and Vote Button matching reference */}
        <VotingCardsSection
          contestants={contestants}
          onOpenVote={handleOpenVote}
        />
      </main>


      {/* Social Vote Dialog - Opens when Vote is clicked */}
      <VoteDialog
        isOpen={voteDialogOpen}
        onClose={() => setVoteDialogOpen(false)}
        contestant={selectedVoteContestant}
        onConfirmVote={handleConfirmVote}
        onSelectPlatform={handleSelectPlatform}
      />
    </div>
  )
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#0f172a', marginBottom: '12px' }}>Something went wrong.</h2>
          <p style={{ color: '#dc2626', marginBottom: '20px' }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.hash = ''
              window.location.reload()
            }}
            style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function RootApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
