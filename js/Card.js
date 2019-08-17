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

        if (event.target.classList.contains("edit-card")) {
            let newDescription = prompt("Enter new description of card:");

            if (newDescription.length) {
                let data = {name: newDescription, bootcamp_kanban_column_id: self.columnId};
                imBusy(true);
                fetch(baseUrl + "/card/" + self.id, {
                    method: "PUT",
                    headers: myHeadersForPUT,
                    body: JSON.stringify(data)
                })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function () {
                        self.name = newDescription;
                        self.element.querySelector(".card-description").innerText = self.name;
                        imBusy(false);
                    })
            }
        }
    });
    this.element.querySelector(".card").addEventListener("drop", function (event) {
        event.stopPropagation();
        let columnId = self.element.parentElement.id;
        let data = new FormData();
        data.append("name", self.description);
        data.append("bootcamp_kanban_column_id", columnId);
        fetch(baseUrl + "/card", {
            method: "POST", headers: myHeaders, body: data
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (response) {

            });
        fetch(baseUrl + "/card/" + self.id, {
            method: "DELETE",
            headers: myHeaders
        })
            .then(function (response) {
                return response.json()
            });
    })
}

Card.prototype.removeCard = function () {
    let self = this;
    imBusy(true);
    fetch(baseUrl + "/card/" + self.id, {method: "DELETE", headers: myHeaders})
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            self.element.parentNode.removeChild(self.element);
            imBusy(false);
        });
};
