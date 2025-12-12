import mongoose from 'mongoose';
import app from './app';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/schooldb';
const PORT = 3000;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(' Connected to MongoDB');
        if (require.main === module) {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    })
    .catch((err) => console.error(' Database Connection Error:', err));