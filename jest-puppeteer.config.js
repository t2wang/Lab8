// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: false,
    //slowMo: 300,
    defaultViewport: null,
    args: ['--start-maximized']
  }
}