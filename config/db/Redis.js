const redis = require('redis');
const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});

client.on('connect', () => {
    console.log(`Redis client has connected`.green.underline);
});

// client.on('ready', () => {
//     console.log(`Client connected to Redis and ready to use.`.green.underline);
// });

// client.on('error', (err) => {
//     console.log(`${err.message}`.red);
// })

// client.on('end', () => {
//     console.log(`Client disconnected from redis`.green.underline);
// });

// process.on('SIGINT', () => {
//     client.quit();
// });

module.exports = client;