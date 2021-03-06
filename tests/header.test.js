const Page = require('./helpers/page');
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000/blogs');
});

afterEach(async () =>{
  await page.close();
});

test('the header has the correct text', async () => {
  const text = await page.getContentsOf('.brand-logo');
  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow',async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts.google.com/)
});

test('When sighned in, show logut button', async () => {
  await page.login();

  const text = await page.getContentsOf('a[href="/auth/logout"]');

  expect(text).toEqual('Logout');
});
