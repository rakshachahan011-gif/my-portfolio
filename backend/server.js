import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!mongoUri) {
  console.warn('No MONGODB_URI set. Contact form messages will not be saved.');
}

mongoose.connect(mongoUri || 'mongodb://localhost:27017/raksha-portfolio').catch((err) => {
  console.warn('MongoDB connection failed:', err.message);
});

app.use('/api/contact', contactRoutes);

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
