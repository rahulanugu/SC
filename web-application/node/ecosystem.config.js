module.exports = {
  apps : [{
    name: "app",
    script: 'index.js',
    output: './out.log',
    error: './error.log',
    merge_logs: true,
  }]
};
