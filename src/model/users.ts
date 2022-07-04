import mongoose, { Callback } from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 16;
const UserSchema = new Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  createdAt: { type: Date, required: false, default: new Date() },
});
UserSchema.pre("save", function (next) {
  let user: any = this;
  if (!user.isModified("password") === undefined) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (errors, hash) => {
      if (errors) return next(errors);
      user.password = hash;
      next();
    });
  });
});
const Users = mongoose.model("users", UserSchema);
export default Users;

export const comparePassword = (candidatePassword: any, hash: any, callback: Callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}