import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import expressWinston from 'express-winston';

const dailyRotate = new DailyRotateFile({
    dirname: 'logs', 
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '7d'
});

export const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack, ...meta }) => {
            const base = `${timestamp} [${level}] ${message}`;
            const err = stack ? `\n${stack}` : '';
            const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
            return base + err + metaStr;
        })
    ),
    transports: [
        dailyRotate,
        // new transports.Console()
    ],
    exitOnError: false
});

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  meta: true,
  colorize: false
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger
});

