import mongoose from 'mongoose';

const freeTrialSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student', unique: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Parent' },
  bookedAt: { type: Date, default: Date.now },
});

export default mongoose.models.FreeTrial || mongoose.model('FreeTrial', freeTrialSchema);