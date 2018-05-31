import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  Identification: { type: String, index: true },
  Location: {
    type: { type: String },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  PostalAddress: {
    AddressLine: [String],
    BuildingNumber: String,
    StreetName: String,
    TownName: String,
    CountrySubDivision: [String],
    Country: String,
    PostCode: String,
  },
});

export default mongoose.model('Atm', schema);
