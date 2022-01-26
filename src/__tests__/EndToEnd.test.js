import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(90000);
    browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    console.log('Page opened')
    await page.waitForSelector('.event');
    console.log('Link opened')
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .show-details');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .hide-details');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  afterAll(async () => {
    await browser.close();
  });
});