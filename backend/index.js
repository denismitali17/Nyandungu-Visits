import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { router as authRoutes } from './routes/auth.js';
import { router as newsletterRoutes } from './routes/newsletter.js';
import { router as bookingRoutes } from './routes/booking.js';
import { router as adminRoutes } from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import { dbConnect } from './config/database.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "img.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 404 Route handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  app.close(() => {
    console.log('Process terminated');
  });
});

startServer();

