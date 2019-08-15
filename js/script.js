"use strict";
(function () {
    document.addEventListener("DOMContentLoaded", function () {

        function randomString() {
            const chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
            let randomString = "";

            for (let i = 0; i < chars.length; i++) {
                randomString += chars[Math.floor(Math.random() * chars.length)]
            }
            return randomString;
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

        function Card(description) {
            let self = this;
            this.id = randomString();
            this.description = description;
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

        function Column(name) {
            let self = this;
            this.id = randomString();
            this.name = name;
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

        function Board(name) {
            let self = this;
            this.id = randomString();
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

        document.querySelector(".insert").appendChild(new Board("My Board").element);
        document.querySelector(".add-board").addEventListener("click", function () {
            let name = prompt("Enter the name of board:");
            document.querySelector(".insert").appendChild(new Board(name).element);
        })

    })
})();
