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
        await page.waitForTimeout(20000);
        var link = await page.$eval('body > div#mainmail > div#contentDiv.body > div#mailContentContainer.qmbox > blockquote > div > div.FoxDiv20210713112148009214 > left > table#topTable > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td'/*, allAs => allAs.map((td => td.innerHTML))*/);
        console.log(link);
    },2147483647);
});