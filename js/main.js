"use strict";

// ### Variables
let pressedKeys = 0;

let cardOwner = document.querySelector(".owner__name");
const cardOwnerInput = document.querySelector("#username");

let cardNumber = document.querySelector(".card__number");
const cardNumberInput = document.querySelector("#cardNo");

let cardMonth = document.querySelector(".card__month");
const cardMonthInput = document.querySelector("#month");
let cardYear = document.querySelector(".card__year");
const cardYearInput = document.querySelector("#year");

let cvcNumber = document.querySelector(".card__verification-num");
const cvcInput = document.querySelector("#cvcNo");


// ### Functions

// Callback function for input event
function handleByInput(e) {

    //console.log("Current Target: ", e.currentTarget.id);

    let currentTargetId = e.currentTarget.id;

    if (currentTargetId === "username") {
        cardOwner.innerText = cardOwnerInput.value !== "" ? cardOwnerInput.value : "Jane Appleseed";
    } else if (currentTargetId === "cardNo") {
        cardNumber.innerText = cardNumberInput.value !== "" ? cardNumberInput.value : "0000 0000 0000 0000";
    } else if (currentTargetId === "month") {
        cardMonth.innerText = cardMonthInput.value !== "" ? cardMonthInput.value : "00";
    } else if (currentTargetId === "year") {
        cardYear.innerText = cardYearInput.value !== "" ? cardYearInput.value : "00";
    } else if (currentTargetId === "cvcNo") {
        cvcNumber.innerText = cvcInput.value !== "" ? cvcInput.value : "000";
    }

};


// Callback function for copy event
function handleByCopy(e) {

    const selection = document.getSelection();
    e.clipboardData.setData("text/plan", selection.toString());

    e.preventDefault();
};


// ### Eventlistener

// Triggers update on input
cardOwnerInput.addEventListener("input", handleByInput);
cardNumberInput.addEventListener("input", handleByInput);
cardMonthInput.addEventListener("input", handleByInput);
cardYearInput.addEventListener("input", handleByInput);
cvcInput.addEventListener("input", handleByInput);

// Triggers if copied from clipboard
cardOwnerInput.addEventListener("copy", handleByCopy);
cardNumberInput.addEventListener("copy", handleByCopy);
cardMonthInput.addEventListener("copy", handleByCopy);
cardYearInput.addEventListener("copy", handleByCopy);
cvcInput.addEventListener("copy", handleByCopy);

