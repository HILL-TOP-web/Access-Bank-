/**
 * ===============================
 * SERVER ENTRY POINT
 * ===============================
 */

import http from 'http'
import app from './app.js'

/**
 * CONFIG
 */
import { env } from './config/env.js'
import { connectDB } from './config/db.js'

/**
 * ===============================
 * PROCESS-LEVEL SAFETY
 * ===============================
 */

// Catch uncaught exceptions (sync errors)
process.on('uncaughtException', (err) => {
  console.error('🔥 UNCAUGHT EXCEPTION')
  console.error(err.name, err.message)
  process.exit(1)
})

/**
 * ===============================
 * START SERVER
 * ===============================
 */

const startServer = async () => {
  try {
    // 1️⃣ Connect to Database
    await connectDB()

    // 2️⃣ Create HTTP server
    const server = http.createServer(app)

    // 3️⃣ Listen on Render / Local port
    server.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`)
      console.log(`🌍 Environment: ${env.NODE_ENV}`)
    })

    /**
     * ===============================
     * GRACEFUL SHUTDOWN
     * ===============================
     */
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM RECEIVED. Shutting down gracefully...')
      server.close(() => {
        console.log('💤 Process terminated')
      })
    })

  } catch (error) {
    console.error('❌ Server failed to start:', error)
    process.exit(1)
  }
}

startServer()

/**
 * ===============================
 * UNHANDLED PROMISE REJECTIONS
 * ===============================
 */

process.on('unhandledRejection', (err) => {
  console.error('🔥 UNHANDLED REJECTION')
  console.error(err.name, err.message)
  process.exit(1)
})
