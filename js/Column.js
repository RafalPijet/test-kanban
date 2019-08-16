function Column(id, name, cards) {
    let self = this;
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.element = generateTemplate("column-template", {id: this.id, name: this.name});
    this.element.querySelector(".column").addEventListener("click", function (event) {

        if (event.target.classList.contains("btn-delete")) {
            self.removeColumn();
        }

        if (event.target.classList.contains("add-card")) {
            self.addCard(new Card(prompt("Enter the description of new card:")))
        }
    })
}

Column.prototype = {
    removeColumn: function () {
        this.element.parentNode.removeChild(this.element)
    },
    addCard: function (card) {
        this.element.querySelector("ul").appendChild(card.element)
    }
};
