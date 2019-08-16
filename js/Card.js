function Card(id, description, columnId) {
    let self = this;
    this.id = id;
    this.description = description;
    this.columnId = columnId;
    this.element = generateTemplate("card-template", {description: this.description}, "li");
    this.element.querySelector(".card").addEventListener("click", function (event) {
        event.stopPropagation();

        if (event.target.classList.contains("btn-delete")) {
            self.removeCard();
        }
    })
}

Card.prototype.removeCard = function () {
    this.element.parentNode.removeChild(this.element);
};
