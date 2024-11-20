import { chromium } from 'playwright'
import { getChromePath } from './newwork.pcTypePath'

export const networkRouterChinaBlack = async ({
  chromeHeadless = 'Close',
} = {}) => {
  const browser = await chromium.launch({
    headless: chromeHeadless.includes('Close'),
    executablePath: getChromePath(),
  })
  try {
    const page = await browser.newPage()
    await page.goto('http://192.168.0.1/index.html#band')
    const passwordXpath =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[3]/div/input'
    const ipChangeXpath =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span'

    const passwordElement = page.waitForSelector(passwordXpath)
    const isPasswordElement = passwordElement.then(() => 'passwordElement')

    const ipChangeElement = page.waitForSelector(ipChangeXpath)
    const isIpChangeElement = ipChangeElement.then(() => 'ipChangeElement')

    const result = await Promise.race([isPasswordElement, isIpChangeElement])
    const 연결됨 =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[3]/div/label'
    const 설치 =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/div[1]/input'
    if (result === 'passwordElement') {
      await page.type(passwordXpath, 'admin')
      await page.click(
        'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[4]/div[2]/input',
      )
      await page.waitForSelector(연결됨)
      await page.goto('' + 'http://192.168.0.1/index.html#band')
    }
    const AUS_Band =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/div[2]/div[1]/table/tbody/tr[5]/td[1]/input'
    const AUS2_Band =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/div[2]/div[1]/table/tbody/tr[6]/td[1]/input'
    await page.waitForSelector(AUS_Band)
    await page.waitForSelector(AUS2_Band)
    const isRadioBtnChecked = await page.$eval(
      AUS_Band,
      (el: HTMLInputElement) => el.checked,
    )

    if (isRadioBtnChecked) {
      await page.click(AUS2_Band)
    } else {
      await page.click(AUS_Band)
    }

    await page.waitForSelector(설치)
    await page.click(설치)
    await page.goto('http://192.168.0.1/')
    const mainDataLinkButton =
      'xpath=//html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[4]/a'
    await page.waitForSelector(mainDataLinkButton)
    await browser.close()
    // await wait(2000)
    return { message: 'LDW931 Router Connect SUCCESS' }
  } catch (e) {
    console.error(e.message)
    await browser.close()
    throw new Error('LDW931 Router Connect FAIR')
  }
}

// networkRouterEdu({ chromeHeadless: '' })
// const test = new RouterIpChanger();
// test.startRouterChanger();
