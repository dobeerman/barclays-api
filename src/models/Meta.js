import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  path: { type: String, required: true },
  LastUpdated: String,
  TotalResults: Number,
  Agreement: String,
  License: String,
  TermsOfUse: String,
  etag: { type: String, required: true, default: '' }
});

export default mongoose.model('Meta', schema);
