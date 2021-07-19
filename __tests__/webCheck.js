const puppeteer = require('puppeteer');
const ExcelJS = require('exceljs');

var account = [];
var terminal = [];
var website = [];

var dataAccount = ["账户"];
var dataTerminal = ["终端号"];
var dataSite = ["网站"];
var validation = ["结果"];

class RedirectionError extends Error {
    constructor(message) {
      super(message);
      this.name = "RedirectionError";
    }
}

class NoResponseError extends Error {
    constructor(message) {
      super(message);
      this.name = "NoResponseError";
    }
}

class InternalRedirError extends Error {
    constructor(message) {
      super(message);
      this.name = "InternalRedir";
    }
}


(async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('来源网址.xlsx');
    const worksheet = workbook.getWorksheet('来源网址');
    let i = 2;
    let cell = 'A' + i;
    while (worksheet.getCell(cell).value != null) {
      account.push(worksheet.getCell(cell).value);
      i++;
      cell = 'A' + i;
    }

    i = 2;
    cell = 'B' + i;
    while (worksheet.getCell(cell).value != null) {
      terminal.push(worksheet.getCell(cell).value);
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

    //console.log(account);
    //console.log(terminal);
    //console.log(website);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const newWorkbook = new ExcelJS.Workbook();
    const newSheet = newWorkbook.addWorksheet('My Sheet');

    for (let index = 0; index < website.length; index++) {
        const element = website[index];
        try {
            dataAccount.push(account[index]);
            dataTerminal.push(terminal[index]);
            dataSite.push(website[index]);
            newSheet.getColumn(1).values = dataAccount;
            newSheet.getColumn(2).values = dataTerminal;
            newSheet.getColumn(3).values = dataSite;
            var site = "https://" + element.toString() + '/';
            if(site.includes("www.")){
                const position = site.indexOf("www.");
                site = site.substring(0, position) + site.substring(position + 4);
            }
            console.log(site);
            var result = await page.goto(`${site}`);
            //console.log(result);
            //await page.waitForNavigation({ waitUntil: 'networkidle0' });

            //await page.goto(element, {"waitUntil" : "networkidle0"});
            var url = page.url();

            if(url.includes("www.")){
                const position = url.indexOf("www.");
                url = url.substring(0, position) + url.substring(position + 4);
            }

            console.log(url);

            if(site == url.substring(0, site.length) && site.length < url.length){
                validation.push("Internal Redirection");
                throw new InternalRedirError("Internal Redirection");
            }else if(url != site){
                validation.push("URL Redirection");
                throw new RedirectionError("URL Redirection");
            }else if(result.status() == 404) {
                validation.push("Website No Response");
                throw new NoResponseError("Website No Response");
            }else{
                validation.push("Valid");
            }

        } catch (error) {
            //console.log(typeof(error));
            console.log(error.message);
            if(error.message.includes("ERR_HTTP2_PROTOCOL_ERROR")){
                validation.push("人工复核");
            }else if(error.message.includes("timeout")){
                validation.push("Timeout");
            }else if(error.message.includes("ERR_CONNECTION") || error.message.includes("ERR_CERT") || error.message.includes("ERR_SSL")){
                validation.push("Invalid/Expired Link && Invalid SSL");
            }
            //if(error.toString().includes('invalid')) console.log('404');
        }
        //console.log("reach here");
        newSheet.getColumn(4).values = validation;
        await newWorkbook.xlsx.writeFile("links.xlsx");
    }

    await browser.close();
})();