/* eslint-disable no-dupe-class-members */
import winston from 'winston';

const logsPath = `${process.cwd()}/server/Logs/Serviceslogs.txt`;

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString('en-IN');
};

class LoggerConstructor {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: logsPath,
          prettyPrint: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        })
      ],
      format: winston.format.printf(info => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
        message = info.obj ? `${message}data:${JSON.stringify(info.obj)} | ` : message;
        message = this.log_data ? `${message}log_data:${JSON.stringify(this.log_data)} | ` : message;
        return message;
      })
    });
    this.logger = logger;
  }

  setLogData(logData) {
    this.log_data = logData;
  }

  async info(message) {
    this.logger.log('info', message);
  }

  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    });
  }

  async warning(message) {
    this.logger.log('warning', message);
  }

  async warning(message, obj) {
    this.logger.log('warning', message, {
      obj
    });
  }

  async error(message) {
    this.logger.log('error', message);
  }

  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    });
  }
}
export default LoggerConstructor;
