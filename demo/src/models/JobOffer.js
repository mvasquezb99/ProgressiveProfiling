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
  publicationDate: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  duration:{
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  extra: {
    type: String,
    required: true,
  },
  benefits: {
    type: Array,
    required: true,
  },
});

export default mongoose.models.JobOffer || mongoose.model('JobOffer', JobOfferSchema);