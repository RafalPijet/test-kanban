function Board(id, name) {
    let self = this;
    this.id = id;
    this.name = name;
    this.element = generateTemplate("board-template", {id: this.id, name: this.name});
    this.element.querySelector(".board").addEventListener("click", function (event) {

        if (event.target.classList.contains("create-column")) {
            let name = prompt("Enter the name of new column:");
            let data = new FormData();

            if (name.length) {
                data.append("name", name);

                fetch(baseUrl + "/column", {
                    method: "POST",
                    headers: myHeaders,
                    body: data
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        let column = new Column(response.id, name);
                        self.createColumn(column);
                    })
            }
        }
    })
}

Board.prototype.createColumn = function (column) {
    this.element.querySelector(".column-container").appendChild(column.element);
    initSortable(column.id, "task");
};
