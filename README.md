# Lab8_Starter

## Author(s):
- Taorui Wang

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
No, because unit tests are not built for application/feature level testing where individual components will interact with each other.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, because we are testing a small scalable feature without many moving parts.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
It will run the tests without a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.click('img[alt="settings"]');
});