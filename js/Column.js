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

        if (event.target.classList.contains("edit-column")) {
            let newName = prompt("Enter new name of column:");

            if (newName.length) {
                let data = {name: newName};
                fetch(baseUrl + "/column/" + self.id, {
                    method: "PUT",
                    headers: myHeadersForPUT,
                    body: JSON.stringify(data)
                })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function () {
                        self.name = newName;
                        self.element.querySelector(".column-title").innerText = self.name;
                    })
            }
        }

        if (event.target.classList.contains("add-card")) {
            let description = prompt("Enter the description of new card:");
            let data = new FormData();

            if (description.length) {
                data.append("name", description);
                data.append("bootcamp_kanban_column_id", self.id);

                fetch(baseUrl + "/card", {
                    method: "POST",
                    headers: myHeaders,
                    body: data
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (response) {
                        self.addCard(new Card(response.id, description, self.id))
                    })
            }
        }
    })
}

Column.prototype = {
    removeColumn: function () {
        let self = this;
        fetch(baseUrl + "/column/" + self.id, {method: "DELETE", headers: myHeaders})
            .then(function (response) {
                return response.json()
            })
            .then(function () {
                self.element.parentNode.removeChild(self.element)
            })

    },
    addCard: function (card) {
        this.element.querySelector("ul").appendChild(card.element)
    }
};
