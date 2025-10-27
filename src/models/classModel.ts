import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
}, {
  timestamps: true
});

const ClassModel = mongoose.models.Class || mongoose.model("Class", classSchema);
export default ClassModel;
