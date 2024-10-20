const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const { registerValidation, loginValidation } = require('../validation/userValidation');

const register = async (call, callback) => {
  try {
    const { error } = registerValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    const { username, email, password } = call.request;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return callback({
        code: grpc.status.ALREADY_EXISTS,
        details: 'User already exists',
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    callback(null, { message: 'User registered successfully' });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error registering user',
    });
  }
};

const login = async (call, callback) => {
  try {
    const { error } = loginValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    const { email, password } = call.request;

    const user = await User.findOne({ email });
    console.log("user in user control",user)
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        details: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });

    callback(null, { token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error logging in',
    });
  }
};

const viewProfile = async (call, callback) => {
  try {
    const user = await User.findById(call.request.userId).select('-password');
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'User not found',
      });
    }

    callback(null, { user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error fetching user profile',
    });
  }
};

module.exports = {
  register,
  login,
  viewProfile,
};