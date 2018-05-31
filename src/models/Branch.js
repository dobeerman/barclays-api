import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  'Identification': { type: String, index: true },
  'Name': String,
  'Photo': String,
});

export default mongoose.model('Branch', schema);
