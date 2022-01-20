import puppeteerExtra from "puppeteer-extra"
import stealthPlugins from "puppeteer-extra-plugin-stealth"
import dotenv from "dotenv"

dotenv.config()

const addMember = async (emailString) => {
  puppeteerExtra.use(stealthPlugins())
  const browser = await puppeteerExtra.launch({
    headless: false,          // can't login to google with headless true
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // google login

  await page.goto('https://accounts.google.com/signin/v2/identifier')
  await page.type('#identifierId', process.env.ADMIN_EMAIL);
  await page.keyboard.press('Enter')
  
  await page.waitForTimeout(2000)
  await page.waitForSelector('input[type="password"][aria-label="Enter your password"]')
  await page.type('input[type="password"][aria-label="Enter your password"]', process.env.ADMIN_PASSWORD)
  await page.keyboard.press('Enter')
  
  // adding members to google group

  await page.waitForSelector('div.B1tEqd')
  await page.goto(`https://groups.google.com/g/${process.env.GROUP_NAME}/members`)

  await page.waitForSelector('div.uArJ5e.UQuaGc.AeAAkf.YM2B4c')
  await page.click('div.uArJ5e.UQuaGc.AeAAkf.YM2B4c')
  
  await page.waitForSelector('div[jsname="RZ9Y8c"]')
  await page.click('div[jsname="RZ9Y8c"]')

  await page.waitForTimeout(500)

  await page.waitForSelector('input[aria-label="Group members"]')
  await page.type('input[aria-label="Group members"]',emailString)
  
  await page.waitForSelector('div[aria-label="Add members"][jsname="j6LnYe"]')
  await page.click('div[aria-label="Add members"][jsname="j6LnYe"]')
}

export {
  addMember,
}