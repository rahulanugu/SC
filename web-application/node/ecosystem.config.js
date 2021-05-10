module.exports = {
  apps : [{
    name: "app",
    script: 'index.js',
    output: './out.log',
    error: './error.log',
    log: './combined.outerr.log',
    merge_logs: true,
  }]
};
