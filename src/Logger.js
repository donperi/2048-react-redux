class Logger {
  static debug(...args) {
    if (process.env.DEBUG) {
      console.debug(...args);
    }
  }
}

export default Logger;
