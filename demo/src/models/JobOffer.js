import mongoose from 'mongoose';

const JobOfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupations: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,

  // TODO: add more ...
});

export default mongoose.models.JobOffer || mongoose.model('JobOffer', JobOfferSchema);
