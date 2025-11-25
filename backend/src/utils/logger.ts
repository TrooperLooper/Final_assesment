import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.metadata(),
    format.printf(({ timestamp, level, message, metadata, stack }) => {
      let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (metadata && Object.keys(metadata).length > 0) {
        log += ` | ${JSON.stringify(metadata)}`;
      }

      if (stack) {
        log += `\n${stack}`;
      }
      
      return log;
    })
  ),

  transports: [
    new transports.File({ 
      filename: "logs/error.log", 
      level: "error",
      maxsize: 5242880, 
      maxFiles: 5
    }),
    new transports.File({ 
      filename: "logs/combined.log",
      maxsize: 5242880, 
      maxFiles: 5
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      )
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    level: "debug"
  }));
}

export default logger;