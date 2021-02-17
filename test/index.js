const {Builder, By, Key, until} = require('selenium-webdriver');
const fetch = require('node-fetch');
const assert = require('chai').assert

const testElements = [{item: "monArticle", qty: 1, unitprice: 10, totalht: 10}, {
    item: "monArticle2",
    qty: 2,
    unitprice: 20,
    totalht: 40
}, {
    item: "monArticle3",
    qty: 3,
    unitprice: 30,
    totalht: 90
}];


(async function () {
    const driver = await new Builder().forBrowser('firefox').build();

    let localUrl = __dirname.substring(0, __dirname.length - 5);
    localUrl = localUrl + "\\index.html"

    await driver.get(localUrl);

    await driver.wait(until.titleIs('Qualité du logiciel'), 10000);

    //test d'ajout des éléments de testElements
    for (const testElement of testElements) {
        await driver.findElement(By.id('item')).sendKeys(testElement.item);
        await driver.findElement(By.id('qty')).sendKeys(testElement.qty);
        await driver.findElement(By.id('unit-price')).sendKeys(testElement.unitprice);
        await driver.findElement(By.id('add-button')).click()
    }
    await driver.findElement(By.id('calcul-button')).click()
    let totalht = await driver.findElement(By.id('total')).getText()
    try {
        assert.equal(totalht, '140')
    } catch (e) {
        console.log(e)
    }


})()
