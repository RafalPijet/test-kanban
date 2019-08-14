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


    })
})();
