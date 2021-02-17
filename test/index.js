const {Builder, By, Key, until} = require('selenium-webdriver');
const fetch = require('node-fetch');
const assert = require('chai').assert;
const faker = require('faker/locale/fr');

(async function () {
    console.log('Name: ', faker.name.firstName(), faker.name.lastName());
    console.log('Product: ', faker.commerce.product(), faker.commerce.productName(), faker.commerce.price())
    console.log('Email : ', faker.internet.email())
    console.log('Test', faker.fake('{{name.firstName}}.{{name.lastName}}_{{random.number({"min":20, "max":900})}}@toto.com'))
})();


const testElements = [{
    item: "monArticle", qty: 17, unitprice: 45.415, totalht: this.qty * this.unitprice
}, {
    item: "monArticle2",
    qty: 13,
    unitprice: 12.257,
    totalht: this.qty * this.unitprice
}, {
    item: "monArticle3",
    qty: 12,
    unitprice: 12.415,
    totalht: this.qty * this.unitprice
}];

const testMultipleElements = [];
for (let i = 0; i < 1000; i++) {
    testMultipleElements.push({
        item: faker.commerce.product(), qty: faker.random.number({
            'min': 1,
            'max': 10
        }), unitprice: faker.finance.amount(0.1, 100, 2)//faker.random.float(null, 0.1, null)
    })
}

(async function () {
    const driver = await new Builder().forBrowser('firefox').build();

    let localUrl = __dirname.substring(0, __dirname.length - 5);
    localUrl = localUrl + "\\index.html"

    await driver.get(localUrl);

    await driver.wait(until.titleIs('Qualité du logiciel'), 10000);

    //test d'ajout des éléments de testElements
    /*for (const testElement of testElements) {
        await driver.findElement(By.id('item')).sendKeys(testElement.item);
        await driver.findElement(By.id('qty')).sendKeys(testElement.qty);
        await driver.findElement(By.id('unit-price')).sendKeys(testElement.unitprice);
        await driver.findElement(By.id('add-button')).click()
    }*/
    let i = 0
    console.time("Start")
    for (const testElement of testMultipleElements) {
        await driver.findElement(By.id('item')).sendKeys(testElement.item);
        await driver.findElement(By.id('qty')).sendKeys(testElement.qty);
        await driver.findElement(By.id('unit-price')).sendKeys(testElement.unitprice);
        await driver.findElement(By.id('add-button')).click()
        if (i % 100 === 0) {
            console.timeEnd()
            console.time()
        }
        i++
    }
    console.timeEnd("End")


    await driver.findElement(By.id('calcul-button')).click()
    let totalTtc = await driver.findElement(By.id('total-ttc')).getText()
    try {
        assert.equal(totalTtc, '1296.46')
    } catch (e) {
        console.log(e)
    }


})()
