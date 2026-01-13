import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        data: {
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      await user.deleteOne();
      res.json({
        success: true,
        message: 'User account deleted successfully',
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
