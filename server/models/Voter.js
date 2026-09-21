import mongoose from 'mongoose';

const VoterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    authStatus: {
      type: String,
      default: 'Authenticated'
    },
    location: {
      type: String,
      default: 'United States'
    },
    accountType: {
      type: String
    },
    contestantId: {
      type: String,
      default: 'FK-101'
    },
    contestantNo: {
      type: String,
      default: '001'
    },
    platform: {
      type: String,
      default: 'web'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Voter = mongoose.models.Voter || mongoose.model('Voter', VoterSchema);
