const ExcelJS = require('exceljs');

class RedirectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "RedirectionError";
  }
}


describe('OceanPayment', () => {
    beforeAll(async () => {
      /*await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });*/
      await page.goto('https://alim1.com', {"waitUntil" : "networkidle0"});
      const url = page.url();
      console.log(url);
      if(url != 'https://alim1.com') throw new RedirectionError("URL Redirection");
    });

    it('Prep work', async () => {
      var id = 'test';
      let productType = await page.evaluate(() => {
        let el = document.querySelector('li[class="select2-selection__choice"]');
        return el ? el.innerText : false;
      })
      //console.log(productType);
    },2147483647);

    /*it('Prep work', async () => {
        var id = [];
        var website = [];

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('suggestion(confirm).xlsx');
        const worksheet = workbook.getWorksheet('商户转正信息统计表.xls');
        let i = 2;
        let cell = 'B' + i;
        while (worksheet.getCell(cell).value != null) {
            id.push(worksheet.getCell(cell).value);
            i++;
            cell = 'B' + i;
        }

        i = 2;
        cell = 'C' + i;
        while (worksheet.getCell(cell).value != null) {
            website.push(worksheet.getCell(cell).value);
            i++;
            cell = 'C' + i;
        }

        console.log(id);
        console.log(website);
    },1000000);*/
});