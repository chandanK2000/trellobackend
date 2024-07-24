const Account = require('../models/Registeraccount');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//for register account
exports.registerAccount = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

 
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    let account = await Account.findOne({ email });
    if (account) {
      return res.status(400).json({ msg: 'Account already exists' });
    }

    // Create new account with default values for other fields
    account = new Account({
      firstName,
      lastName,
      email,
      password,
      bio: 0,
      nation: '',
      gender: 'Not specified',
      image: '',
      profession: '',
      address: '',
    });

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(password, salt);

    await account.save();

    res.status(201).json({ msg: `${account.firstName} Account registered successfully`});
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};






// Login account controller
// exports.loginAccount = async (req, res) => {
//   const { email, password } = req.body;

//   // Simple validation
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'Please enter all fields' });
//   }

//   try {
//     let account = await Account.findOne({ email });
//     if (!account) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, account.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     const payload = {
//       id: account._id,
//       firstName: account.firstName,
//       lastName: account.lastName,
//       email: account.email
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     const successMessage = `${account.firstName} ${account.lastName} logged in successfully`;

//     res.status(200).json({
//       msg: successMessage,
//       token
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
exports.loginAccount = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Find account by email
    let account = await Account.findOne({ email });
    if (!account) {
      console.log('Account not found for email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      id: account._id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: account._id,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email
      }
    });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


// Delete user account
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Check if the user is deleting their own account
  if (id !== userId) {
    return res.status(403).json({ msg: 'You can only delete your own account' });
  }

  try {
    const account = await Account.findByIdAndDelete(userId);

    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    res.status(200).json({
      msg: 'Account deleted successfully',
      deletedUser: account
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};



// Edit user profile
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, bio, nation, gender, image, profession, address } = req.body;
  const userId = req.user.id;

  // Check if the user is editing their own account
  if (id !== userId) {
    return res.status(403).json({ msg: 'You can only edit your own account' });
  }

  // Validate email format
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }
  }

  try {
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }
    if (bio) updates.bio = bio;
    if (nation) updates.nation = nation;
    if (gender) updates.gender = gender;
    if (image) updates.image = image;
    if (profession) updates.profession = profession;
    if (address) updates.address = address;

    const account = await Account.findByIdAndUpdate(userId, updates, { new: true });

    if (!account) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    res.status(200).json({
      msg: 'Account updated successfully',
      user: account
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

