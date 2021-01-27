//Variables et constantes qui peuvent être chargés avant le DOM
const tableData = [
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

    //initialisation du tableau avec TABULATOR
    const table = new Tabulator("#table", {
        data: tableData,
        //initialisation des collones, éditables, avec des paramètres d'édition (min, step etc)
        columns: [{title: "item", field: "item", width: 200, editor: "input"},
            {
                title: "qty", field: "qty", editor: "number", editorParams: {
                    min: 1
                }
            },
            {
                title: "unitprice", field: "unitprice", editor: "number", editorParams: {
                    min: 0,
                    step: 0.01
                }
            },
        ],
        index: "id",
        layout: "fitDataTable",
        selectable: true,
        responsiveLayout: "hide",
    })

    //listener du clic sur le bouton d'ajout de données au tableau
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

    $("#deleteButton").click(function () {
        let rowsToDelete = table.getSelectedRows()
        table.deleteRow(rowsToDelete)
    })

})