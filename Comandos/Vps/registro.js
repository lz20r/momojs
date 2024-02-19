
// const axios = require('axios');

// // Replace these with your actual API URL and key
// const PTERODACTYL_HOST = 'http://panel.cinammon.es/api/aplication/users;';
// const API_KEY = 'ptla_rh7osE55ylsGtIDxJpiRhNmd3IRulKwbfQqDgx4Iklr';

// // User details you want to add
// const userData = {
//     "username": "newuser",
//     "email": "newuser@example.com",
//     "first_name": "New",
//     "last_name": "User",
//     "password": "a_strong_password"
// };

// // Axios instance with Pterodactyl API configuration
// const api = axios.create({
//     baseURL: `${PTERODACTYL_HOST}/api/application`,
//     headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//         'Accept': 'Application/vnd.pterodactyl.v1+json',
//     },
// });

// // Function to create a user
// async function createUser(userData) {
//     try {
//         const response = await api.post('/users', userData);
//         console.log('User Created:', response.data);
//     } catch (error) {
//         console.error('Error creating user:', error.response ? error.response.data : error.message);
//     }
// } 

// // Create the user
// createUser(userData);
 