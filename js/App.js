const baseUrl = "https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api";
const myHeaders = {
    'X-Client-Id': 3667,
    "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec"
};
const myHeadersForPUT = {
    'X-Client-Id': 3667,
    "X-Auth-Token": "1c84e562cacd1d7bbdc02ef320618dec",
    'Content-Type': 'application/json'
};

fetch(baseUrl + "/board", {headers: myHeaders})
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        let board = new Board(response.id, response.name);
        document.querySelector(".insert").appendChild(board.element);
        setupColumns(board, response.columns);
    });

function setupColumns(board, columns) {
    columns.forEach(function (column) {
        let newColumn = new Column(column.id, column.name, column.cards);
        board.createColumn(newColumn);
        setupCards(newColumn);
    })
}

function setupCards(column) {
    column.cards.forEach(function (card) {
        column.addCard(new Card(card.id, card.name, card.bootcamp_kanban_column_id))
    })
}

function generateTemplate(name, data, basicElement) {
    let template = document.getElementById(name).innerHTML;
    let element = document.createElement(basicElement || "div");
    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);
    return element;
}

function initSortable(id, group) {
    let el = document.getElementById(id);
    Sortable.create(el, {
        group: group,
        sort: true
    })
}
