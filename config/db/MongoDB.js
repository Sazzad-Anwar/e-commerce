const mongoose = require('mongoose');

const connectDB = async (databaseName) => {
    try {
        if (process.env.NODE_ENV === 'development') {
            const conn = await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);

        } else {
            const conn = await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGO_PORT}/?authSource=admin`, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
        }

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDB;