import type { Logger } from "winston";
import winston from "winston";
import colors from "colors";

/** Improved Logger structure with enhanced flexibility and readability */

type LogLevel = "critical" | "warning" | "success";

type LoggerConfig = {
  level: LogLevel;
  color: (message: string) => string;
};

type LoggerType = {
  log: (level: LogLevel, message: string) => void;
  critical: (message: string) => void;
  warning: (message: string) => void;
  success: (message: string) => void;
};

const logLevels: { [key in LogLevel]: LoggerConfig } = {
  critical: {
    level: "critical",
    color: (message: string) => colors.red.bold(message),
  },
  warning: {
    level: "warning",
    color: (message: string) => colors.bgYellow.bold(message),
  },
  success: {
    level: "success",
    color: (message: string) => colors.cyan.bold(message),
  },
};

const logMessage = (level: LogLevel, message: string) => {
  console.log(logLevels[level].color(`[${level.toUpperCase()}] ${message}`));
};

const loggerConfig: Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "application-log/combined.log",
    }),
    new winston.transports.File({
      filename: "application-log/error.log",
      level: "error",
    }),
  ],
});

const logger: LoggerType = {
  log: (level: LogLevel, message: string) => {
    logMessage(level, message);
    loggerConfig.info({
      message,
    });
  },
  critical: (message: string) => {
    logMessage("critical", message);
    loggerConfig.error({
      message,
    });
  },
  warning: (message: string) => {
    logMessage("warning", message);
  },
  success: (message: string) => {
    logMessage("success", message);
  },
};

export { logger };
