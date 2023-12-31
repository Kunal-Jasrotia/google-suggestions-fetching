const puppeteer = require('puppeteer');
let fetchData = async (keywords) => {
    let finalResult = {}
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto('https://www.google.com/', { waitUntil: "domcontentloaded", timeout: 0 });
    await page.setViewport({ width: 1080, height: 1024 });
    for (let i = 0; i < keywords.length; i++) {
        const element = keywords[i].trim();
        await new Promise(r => setTimeout(r, 1000))
        // Type into search box
        await page.type('#APjFqb', element);
        await new Promise(r => setTimeout(r, 1000))
        await page.waitForSelector('#Alh6id > div.erkvQe > div > ul > li')
        //getting the list of suggestion
        let allSuggestions = await page.$$eval('#Alh6id > div.erkvQe > div > ul > li', res => res.map(e => {
            let Result = e.querySelector('div > div.pcTkSc > div.lnnVSe > div.wM6W7d span').textContent
            return Result
        }))
        await new Promise(r => setTimeout(r, 1000))
        finalResult[element] = allSuggestions
        // clearing the search bar
        await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf.emcav > div.RNNXgb > div > div.dRYYxd > div.BKRPef > div > span')
    }
    await browser.close();
    return finalResult
}
module.exports = fetchData