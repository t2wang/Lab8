const ExcelJS = require('exceljs');

describe('OceanPayment', () => {
    beforeAll(async () => {
      /*await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });*/
      await page.goto('https://exmail.qq.com/login');
    });

    it('Prep work', async () => {
        await page.waitForTimeout(30000);
        var link = await page.$$eval('td', allAs => allAs.map((td => td.innerHTML)));
        console.log(link);
    },2147483647);
});