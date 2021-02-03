const { Builder, By, Key, until } = require('selenium-webdriver');



(async function () {

    const driver = await new Builder().forBrowser('firefox').build();

    await driver.get('https://www.bing.fr/');
    await driver.findElement(By.id('sb_form_q')).sendKeys('ORT Lyon', Key.RETURN);
    console.log("Titre avant", await driver.getTitle());
    await driver.wait(until.titleIs('ORT Lyon - Bing'), 10000);
    console.log("Titre après", await driver.getTitle());

    const val = await (await driver.findElement(By.id('sb_form_q'))).getAttribute('value');
    console.log("Valeur zone : ", val);

    const testDate = [{article: "monArticle", prix: 10, quantite: 3}];
})()
