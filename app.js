import express from 'express'
import morgan from 'morgan'

/**
 * ROUTES
 */
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import walletRoutes from './routes/wallet.routes.js'
import transactionRoutes from './routes/transaction.routes.js'

/**
 * MIDDLEWARES
 */
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

/**
 * ===============================
 * GLOBAL MIDDLEWARES
 * ===============================
 */
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

/**
 * ===============================
 * HEALTH CHECK
 * ===============================
 */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    service: 'Backend API',
    uptime: process.uptime(),
    timestamp: new Date()
  })
})

/**
 * ===============================
 * API ROUTES
 * ===============================
 */
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/wallets', walletRoutes)
app.use('/api/transactions', transactionRoutes)

/**
 * ===============================
 * ERROR HANDLING
 * ===============================
 */

// 404 handler
app.use(notFound)

// Central error handler
app.use(errorHandler)

export default app
