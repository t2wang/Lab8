describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const allEntry = await page.$$('journal-entry');
    await allEntry[0].click();
    await page.waitForNavigation();
    const url = page.url();
    expect(url.includes("/#entry1")).toBe(true);
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const header = await page.$('h1');
    const title = await header.getProperty('innerHTML');
    expect(title._remoteObject.value).toBe("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
    */
    const ref = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    }
    const entry = await page.$('entry-page');
    const content = await entry.getProperty('entry');//this.entry-page = entry
    const message = await content.jsonValue();
    expect(message).toEqual(ref);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.$('body');
    expect(body._remoteObject.description).toBe("body.single-entry");
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img[alt="settings"]');
    const url = page.url();
    expect(url.includes("/#settings")).toBe(true);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$('h1');
    const title = await header.getProperty('innerHTML');
    expect(title._remoteObject.value).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.$('body');
    expect(body._remoteObject.description).toBe("body.settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = page.url();
    expect(url.includes("/#entry1")).toBe(true);
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() =>{
    await page.goBack();
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries', async() =>{
    const header = await page.$('h1');
    const title = await header.getProperty('innerHTML');
    expect(title._remoteObject.value).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async() =>{
    const body = await page.$('body');
    expect(body._remoteObject.description).toBe("body");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() =>{
    const allEntry = await page.$$('journal-entry');
    await allEntry[1].click();
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url.includes("/#entry2")).toBe(true);
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() =>{
    const header = await page.$('h1');
    const title = await header.getProperty('innerHTML');
    expect(title._remoteObject.value).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const ref = { 
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    }
    const entry = await page.$('entry-page');
    const content = await entry.getProperty('entry');//this.entry-page = entry
    const message = await content.jsonValue();
    expect(message).toEqual(ref);
  }, 10000);

  // create your own test 17
  it('Test17: Verify that we can go back to main page back by clicking the title', async() =>{
    const title = await page.$('h1');
    await title.click();
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // create your own test 18
  it('Test18: Verify that by going forward we return to previous page', async()=>{
    await page.goBack();
    await page.goForward();
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // create your own test 19
  it('Test19: Verify that the content is correct when clicking on the fourth entry', async()=>{
    const allEntry = await page.$$('journal-entry');
    await allEntry[3].click();
    await page.waitForTimeout(500);
    const ref = { 
      title: 'You\'re a wizard, Harry',
      date: '4/28/2021',
      content: "Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!",
      image: {
        src: 'https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg',
        alt: 'harry looking up at the sorting hat'
      },
      audio: 'https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk'
    }
    const entry = await page.$('entry-page');
    const content = await entry.getProperty('entry');//this.entry-page = entry
    const message = await content.jsonValue();
    expect(message).toEqual(ref);
  }, 10000);

  // create your own test 20
  it('Test20: Verify the title is correct when clicking on the second entry', async() =>{
    const header = await page.$('h1');
    const title = await header.getProperty('innerHTML');
    expect(title._remoteObject.value).toBe("Entry 4");
  })
});