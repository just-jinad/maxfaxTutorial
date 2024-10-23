// // import dbConnect from '../app/utils/dbConnect';
// // import User from '../app/models/User';
// const dbConnect = require('../app/utils/dbConnect'); // Adjust this path if necessary
// const User = require('../app/models/User');
// const seedAdmin = async () => {
//   await dbConnect();

//   const adminUser = { username: 'maxfAx', password: 'password123' };

//   const existingUser = await User.findOne({ username: adminUser.username });
//   if (existingUser) {
//     console.log('Admin user already exists.');
//     return;
//   }

//   const user = new User(adminUser);
//   await user.save();
//   console.log('Admin user created successfully!');
// };

// seedAdmin()
//   .then(() => {
//     console.log('Seeding completed.');
//     process.exit();
//   })
//   .catch((error) => {
//     console.error('Error seeding admin user:', error);
//     process.exit(1);
//   });
