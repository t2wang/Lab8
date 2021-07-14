const ExcelJS = require('exceljs');

var id = [];
var website = [];

var dataId = [];
var dataSite = [];

describe('OceanPayment', () => {
    beforeAll(async () => {
      /*await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });*/
      await page.goto('https://oms.oceanpayment.com');

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile('商户转正信息统计表.xlsx');
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

      //console.log(id);
      //console.log(website);
    });

    it('Prep work', async () => {
      await page.waitForTimeout(20000);
      const url = page.url();
      //expect(url.includes("/index")).toBe(true);
    },1000000);

    it('Navigate', async () => {

      await page.click('i[id="Merchant Onboardarrows"]');
      await page.waitForTimeout(1000);
      await page.click('a[id="node-2233"]');
      const url = page.url();
      //expect(url.includes("/merchant")).toBe(true);

    },1000000);

    it('Populate', async () => {

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('My Sheet');

      for (let index = 0; index < id.length; index++) {
        var currId = id[index] + '';
        var currSite = website[index] + '';
      
        await page.waitForTimeout(2000);
        await page.click('input[class="select2-search__field"]');
        //await page.$eval('.select2-search__field', (el, value) => el.value = value, currId);
        await page.keyboard.type(currId + "");
        await page.waitForTimeout(2000);
        await page.click('li[class="select2-results__option select2-results__option--highlighted"]');
        //await page.waitForTimeout(1000);
        const input = await page.$$('input[class="select2-search__field"]');
        await input[4].click();
        await page.keyboard.type(currSite + "");
        await page.waitForTimeout(2000);
        await page.click('li[class="select2-results__option select2-results__option--highlighted"]');
        //await page.waitForTimeout(1000);
        await page.click('input[value="Submit"]');
        await page.waitForTimeout(4000);
        //expect(url.includes("/merchant")).toBe(true);

        let buttonType = await page.evaluate(() => {
          let el = document.querySelector('button[id="mcBusinessStatusBtn"]');
          if(el == null) return false;
          else return el.innerHTML == "Channel App(UDW)";
        })

        var links;
        var content;
        var account;
        if(buttonType){
          await page.click('button[id="mcBusinessStatusBtn"]');
          await page.waitForTimeout(5000);
          await page.click('a[href="#suggestionConfirm"]');
  
          var link = await page.$$eval('div > p', allAs => allAs.map((p => p.innerHTML)));
  
          //link = link.splice(45, 50);
          //console.log(link);
  
          let i = 0;
          while (!(link[i] + "").startsWith("https") && i < link.length) {
            i++;
          }
  
          if(i == link.length){
            links = [];
            content = [];
          }else{
            links = link[i];
            content = links.split("<br>");
            content = content.splice(0, content.length - 1);
          }
          //console.log(content);
  
          account = Array(content.length).fill(currId + "");
          //console.log(account);
  
          dataId = dataId.concat(account);
          //console.log(dataId);
          dataSite = dataSite.concat(content);
          //console.log(dataSite);
  
          //sheet.getColumn(1).values = account;
          //sheet.getColumn(2).values = content;
          sheet.getColumn(1).values = dataId;
          sheet.getColumn(2).values = dataSite;
          await workbook.xlsx.writeFile("links.xlsx");
  
          await page.click('button[id="backBtn"]');
          await page.waitForTimeout(1000);
        }else{
          account = [currId + ""];
          content = ["Manual Operation required"];
          dataId = dataId.concat(account);
          dataSite = dataSite.concat(content);
          sheet.getColumn(1).values = dataId;
          sheet.getColumn(2).values = dataSite;
          await workbook.xlsx.writeFile("links.xlsx");
        }

        /*await page.click('button[id="mcBusinessStatusBtn"]');
        await page.waitForTimeout(5000);
        await page.click('a[href="#suggestionConfirm"]');

        var link = await page.$$eval('div > p', allAs => allAs.map((p => p.innerHTML)));

        //link = link.splice(45, 50);
        //console.log(link);

        let i = 0;
        while (!(link[i] + "").startsWith("https") && i < link.length) {
          i++;
        }

        var links;
        var content;
        if(i == link.length){
          links = [];
          content = [];
        }else{
          links = link[i];
          content = links.split("<br>");
          content = content.splice(0, content.length - 1);
        }
        //console.log(content);

        const account = Array(content.length).fill(currId + "");
        //console.log(account);

        dataId = dataId.concat(account);
        //console.log(dataId);
        dataSite = dataSite.concat(content);
        //console.log(dataSite);

        //sheet.getColumn(1).values = account;
        //sheet.getColumn(2).values = content;
        sheet.getColumn(1).values = dataId;
        sheet.getColumn(2).values = dataSite;
        await workbook.xlsx.writeFile("links.xlsx");

        await page.click('button[id="backBtn"]');
        await page.waitForTimeout(1000);*/

        //const clear = await page.$$('span[class="select2-selection__clear"]');

        await page.click('button[onclick="resetForm()"]');
        //await clear[0].click();
        await page.waitForTimeout(1000);
        //await clear[1].click();
        let check = await page.evaluate(() => {
          let el = document.querySelector('li[class="select2-selection__choice"]');
          return el != null;
        });
        while (check) {
          await page.click('button[onclick="resetForm()"]');
          await page.waitForTimeout(1000);
          check = await page.evaluate(() => {
            let el = document.querySelector('li[class="select2-selection__choice"]');
            return el != null;
          });
        }
      }
    },2147483647);


    /*it('Search', async () => {

      await page.click('button[id="mcBusinessStatusBtn"]');
      await page.waitForTimeout(1000);
      await page.click('a[href="#suggestionConfirm"]');
      expect(url.includes("/channel")).toBe(true);

    },1000000);
  
    it('should be titled "index', async () => {
        //await page.waitForTimeout(45000);

        var link = await page.$$eval('div > p', allAs => allAs.map((p => p.innerHTML)));
        //const link = await page.$$('br');

        link = link.splice(47, 50);
        console.log(link);

        let i = 0;
        while (link[i] == '') {
          i++;
        }

        var links = link[i];
        console.log(links);
        var content = links.split("<br>");
        content = content.splice(0, content.length - 1);
        console.log(content);

        const account = Array(content.length).fill(214424);
        console.log(account);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.getColumn(1).values = account;
        sheet.getColumn(2).values = content;
        await workbook.xlsx.writeFile("links.xlsx");

        const url = page.url();
        expect(url.includes("/login")).toBe(true);
    },1000000);*/
});