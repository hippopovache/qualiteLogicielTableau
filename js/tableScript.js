//Constantes qui peuvent être chargés avant le DOM
const tableData = [
    {item: 'meuble', qty: 1, unitprice: 700, totalht: 700},
    {item: 'peinture', qty: 2, unitprice: 40, totalht: 80},
    {item: 'pinceaux', qty: 5, unitprice: 5, totalht: 25},
    {item: 'ampoules', qty: 6, unitprice: 25, totalht: 150},
    {item: 'sucres', qty: 3, unitprice: 0.5, totalht: 1.5},
];
const tva = 0.2;

//dès que le DOM est chargé :
$(document).ready(function () {

    //Initialisation des variables
    let itemInput = $("#item");
    let qtyInput = $("#qty");
    let unitPriceInput = $("#unit-price");


    //initialisation du tableau avec TABULATOR
    const table = new Tabulator("#table", {
        //data: tableData,
        //initialisation des collones, éditables, avec des paramètres d'édition (min, step etc)
        columns: [{title: "item", field: "item", width: 200, editor: "input"},
            {
                title: "qty", field: "qty", editor: "number", editorParams: {
                    min: 1,
                }
            },
            {
                title: "unitpriceHT", field: "unitprice", editor: "number", editorParams: {
                    min: 0,
                    step: 0.01,
                }
            },
            {
                title: "total ht", field: "totalht"
            },
        ],
        index: "id",
        pagination:"local",
        paginationSize:10,
        layout: "fitDataTable",
        selectable: true,
        responsiveLayout: "hide",
    });

    //Listeners
    //listener du clic sur le bouton d'ajout de données au tableau
    $("#add-button").click(function () {
        let itemValue = itemInput.val();
        let qtyValue = qtyInput.val();
        let unitPriceValue = unitPriceInput.val();
        let totalHt = qtyValue * unitPriceValue;
        //Si les valeurs entrées ne sont pas vides on peux ajouter les données au tableau
        if (itemValue !== "" && qtyValue !== "" && unitPriceValue !== "") {
            let data = {item: itemValue, qty: qtyValue, unitprice: unitPriceValue, totalht: totalHt};
            table.addData(data);
        } else {
            alert("Veuillez entrer une valeur dans chacun des champs");
        }
        itemInput.val('');
        qtyInput.val('');
        unitPriceInput.val('');
    });

    //listener du clic du le bouton de suppression de données au tableau
    $("#delete-button").click(function () {
        let rowsToDelete = table.getSelectedRows();
        table.deleteRow(rowsToDelete);
    });

    //Listener du clic sur le bouton de calcul du total
    $("#calcul-button").click(function () {
        let rows = table.getRows();
        let total = 0;

        rows.forEach(function (row) {
            total += row.getData().unitprice * row.getData().qty;
        });
        total = roundCent(total)
        let totalTva = roundCent(total * tva);
        let totalTtc = roundCent(total * (1 + tva));

        //Ecriture des totaux généraux arrondis au centime
        $('#total').html(total);
        $('#total-tva').html(totalTva);
        $('#total-ttc').html(totalTtc);
    });

    //fonction qui arrondit au centime
    function roundCent(value) {
        return Math.round(value * 100) / 100;
    }

})