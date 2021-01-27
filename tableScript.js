//Valeurs en dur (peuvent être chargés avant le DOM)
let tableData = [
    {item: 'meuble', qty: 1, unitprice: 700},
    {item: 'peinture', qty: 2, unitprice: 40},
    {item: 'pinceaux', qty: 5, unitprice: 5},
    {item: 'ampoules', qty: 6, unitprice: 25},
    {item: 'sucres', qty: 3, unitprice: 0.5},
]

//dès que le DOM est chargé :
$(document).ready(function () {

    //Initialisation des variables
    let itemInput = $("#item")
    let qtyInput = $("#qty")
    let unitPriceInput = $("#unit-price")
    //Ce input hidden contiendra la position dans le tableau de l'élement à modifier.
    let indexHiddenInput = $("#orderId")

    //initialisation du tableau avec TABULATOR
    const table = new Tabulator("#table", {
        data: tableData,
        //Les colones sont automatiquement générées en fonction des data.
        autoColumns: true,
        selectable: 1,
        //Au clic sur une ligne
        rowClick: function (e, row) {
            onRowClick(row)
        },
    })

    $("#addButton").click(function () {
        itemValue = itemInput.val()
        qtyValue = qtyInput.val()
        unitPriceValue = unitPriceInput.val()
        //Si les valeurs entrées ne sont pas vides on peux ajouter les données au tableau
        if (itemValue !== "" && qtyValue !== "" && unitPriceValue !== "") {
            let data = {item: itemValue, qty: qtyValue, unitprice: unitPriceValue}
            table.addData(data)
        } else {
            alert("Veuillez entrer une valeur dans chacun des champs")
        }
    })

    //cette fonction est appelée en cas de clic sur une ligne du tableau
    function onRowClick(row) {
        //récupération des données de la ligne du tableau
        let data = row.getData()
        itemInput.val(data.item)
        qtyInput.val(data.qty)
        unitPriceInput.val(data.unitprice)
        //On met dans le input caché la la position de la ligne dans le tableau
        indexHiddenInput.val(row.getPosition())
    }

})