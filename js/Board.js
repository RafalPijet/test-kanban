function Board(id, name) {
    let self = this;
    this.id = id;
    this.name = name;
    this.element = generateTemplate("board-template", {id: this.id, name: this.name});
    this.element.querySelector(".board").addEventListener("click", function (event) {

        if (event.target.classList.contains("create-column")) {
            self.createColumn(new Column(prompt("Enter the name of new column:")))
        }
    })
}

Board.prototype.createColumn = function (column) {
    this.element.querySelector(".column-container").appendChild(column.element);
    initSortable(column.id, "task");
};
