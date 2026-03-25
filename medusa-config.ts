import {loadEnv, defineConfig} from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
    projectConfig: {
        // workerMode: process.env.WORKER_MODE || "shared",
        databaseUrl: process.env.DATABASE_URL,
        databaseDriverOptions: {
            ssl: false,
            sslmode: "disable",
        },
        redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
        http: {
            storeCors: process.env.STORE_CORS!,
            adminCors: process.env.ADMIN_CORS!,
            authCors: process.env.AUTH_CORS!,
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        }
    },
    admin: {
        // disable: process.env.ADMIN_DISABLED === "true" || false,
        // Configure Vite for Docker environment
        vite: (config) => {
            return {
                server: {
                    host: "0.0.0.0",
                    allowedHosts: [
                        "meduza-shop.up.railway.app",
                        "localhost",
                        ".localhost",
                        "127.0.0.1",
                    ],
                    hmr: {
                        port: 5173,
                        clientPort: 5173,
                    },
                },
            }
        },
    },
})
