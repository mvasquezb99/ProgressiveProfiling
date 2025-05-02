import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
})

export default mongoose.models.UserSchema || mongoose.model('User', UserSchema);
