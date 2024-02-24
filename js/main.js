"use strict";

// ### Variables
// Variable to check status for continue display 
let confirmed = [ 
    { id: 0, item: "username", isValid: false},
    { id: 1, item: "cardnumber", isValid: false},
    { id: 2, item: "month", isValid: false},
    { id: 3, item: "year", isValid: false},
    { id: 4, item: "cvc", isValid: false}
];

//console.log("BEGINN", confirmed);

// V Live Update
// output
const cardOwner = document.querySelector(".owner__name");
const cardNumber = document.querySelector(".card__number");
const cardMonth = document.querySelector(".card__month");
const cardYear = document.querySelector(".card__year");
const cvcNumber = document.querySelector(".card__verification-num");

// input
const cardOwnerInput = document.querySelector("#username");
const cardNumberInput = document.querySelector("#cardNo");
const cardMonthInput = document.querySelector("#month");
const cardYearInput = document.querySelector("#year");
const cvcNumberInput = document.querySelector("#cvcNo");

// states
const confirmDisplay = document.querySelector("#ccForm");
const continueDisplay = document.querySelector(".continue__box"); 

// buttons
const confirmBtn = document.getElementById("confirmBtn");
const continueBtn = document.getElementById("continueBtn");


// ### Functions
// V Live Update
// Callback function for input event
function handleByInput(event) {

    let currentTargetId = event.currentTarget.id;

    if (currentTargetId === "username") {
        cardOwner.innerText = cardOwnerInput.value !== "" ? cardOwnerInput.value : "Jane Appleseed";
    } else if (currentTargetId === "cardNo") {
        cardNumber.innerText = cardNumberInput.value !== "" ? cardNumberInput.value : "0000 0000 0000 0000";
    } else if (currentTargetId === "month") {
        cardMonth.innerText = cardMonthInput.value !== "" ? cardMonthInput.value : "00";
    } else if (currentTargetId === "year") {
        cardYear.innerText = cardYearInput.value !== "" ? cardYearInput.value : "00";
    } else if (currentTargetId === "cvcNo") {
        cvcNumber.innerText = cvcNumberInput.value !== "" ? cvcNumberInput.value : "000";
    }

};


// V Validation
// Helper functions for validation
// Setting error message
function setError(input, message) {

    if (input.id === "month" || input.id === "year") {
        const fieldSet = input.parentElement.parentElement.parentElement;
        const errorDisplay = fieldSet.querySelector(".error-msg-display");
        input.setAttribute("class", "input--error");
        errorDisplay.className = "error-msg-display";
        errorDisplay.innerText = message;
    } else {
        const inputBox = input.parentElement;
        const errorDisplay = inputBox.querySelector(".error-msg-display");
        input.setAttribute("class", "input--error");
        errorDisplay.className = "error-msg-display";
        errorDisplay.innerText = message;
    }
};

// Setting success state
function setSuccess(input) {

    if (input.id === "month" || input.id === "year") {
        const fieldSet = input.parentElement.parentElement.parentElement;
        const errorDisplay = fieldSet.querySelector(".error-msg-display");
        input.removeAttribute("class");
        errorDisplay.className = "error-msg-display visually-hidden";
        errorDisplay.innerText = "";
    } else {
        const inputBox = input.parentElement;
        const errorDisplay = inputBox.querySelector(".error-msg-display");
        input.removeAttribute("class");
        errorDisplay.className = "error-msg-display visually-hidden";
        errorDisplay.innerText = "";
    }

};

// Checking pattern
function checkPattern(input) {
    const regExPattern = new RegExp(input.pattern);
    return regExPattern.test(input.value);
};

// Go to next screen after finishing the form successfully
function processToContinue(list) {
    
    //console.log(confirmed);
    let checkList = list;
    let counter = 0;
    
    checkList.find(item => {
        if (item.isValid === true) {
            counter++;
            //console.log(counter);
        };
    });

    if (counter === 5 && checkList.length === 5) {
        //console.log("ALL TRUE", confirmed);
        confirmDisplay.classList.add("visually-hidden");
        continueDisplay.classList.remove("visually-hidden");
    }

};

// Reset of confirmed status to fals
function resetToConfirm(list) {

    list.forEach((item) => item.isValid = false);
    //console.log("ALL FALSE AGAIN", confirmed);

};


// Function for validation
const validateInputs = () => {

    const cardOwnerValue = cardOwnerInput.value.trim();
    const cardNumberValue = cardNumberInput.value.trim();
    const cardMonthValue = cardMonthInput.value.trim();
    const cardYearValue = cardYearInput.value.trim();
    const cvcNumberValue = cvcNumberInput.value.trim();

    if (cardOwnerValue === "") {
        setError(cardOwnerInput, "Can't be blank!");
        confirmed[0].isValid = false;
    } else if (!checkPattern(cardOwnerInput)) {
        setError(cardOwnerInput, "Wrong format, letters, 'space' and '-' only!");
        confirmed[0].isValid = false;
    } else {
        setSuccess(cardOwnerInput);
        confirmed[0].isValid = true;
    }

    if (cardNumberValue === "") {
        setError(cardNumberInput, "Can't be blank!");
        confirmed[1].isValid = false;
    } else if (!checkPattern(cardNumberInput)) {
        setError(cardNumberInput, "Wrong format, numbers and 'space' only!");
        confirmed[1].isValid = false;
    } else {
        setSuccess(cardNumberInput);
        confirmed[1].isValid = true;
    }

    if (cardMonthValue === "") {
        setError(cardMonthInput, "Can't be blank!");
        confirmed[2].isValid = false;
    } else if (!checkPattern(cardMonthInput)) {
        setError(cardMonthInput, "Wrong format, numbers only!");
        confirmed[2].isValid = false;
    } else {
        setSuccess(cardMonthInput);
        confirmed[2].isValid = true;
    }

    if (cardYearValue === "") {
        setError(cardYearInput, "Can't be blank!");
        confirmed[3].isValid = false;
    } else if (!checkPattern(cardYearInput)) {
        setError(cardYearInput, "Wrong format, numbers only!")
        confirmed[3].isValid = false;
    } else {
        setSuccess(cardYearInput);
        confirmed[3].isValid = true;
    }

    if (cvcNumberValue === "") {
        setError(cvcNumberInput, "Can't be blank!");
        confirmed[4].isValid = false;
    } else if (!checkPattern(cvcNumberInput)) {
        setError(cvcNumberInput, "Wrong format, numbers only!");
        confirmed[4].isValid = false;
    } else {
        setSuccess(cvcNumberInput);
        confirmed[4].isValid = true;
    }

    processToContinue(confirmed);
};


// V Form Reset
// Function for reset
const resetForm = (formId) => {

    console.log("RESET all", formId);

    // Getting form by id
    const formElement = document.querySelector(formId);
    
    // Function to empty a single field
    const resetSingleField = (fieldToReset) => {
        let input = fieldToReset.querySelector("input");
        input.value = "";
    };

    // Function to get all fields by class
    const resetAllFields = (formToReset) => {
        const fields = Array.from(formToReset.querySelectorAll(".input__box"));

        fields.forEach((field) => {
            resetSingleField(field);
        });
    };

    // Eventlistener on continue button
    continueBtn.addEventListener("click", () => {

        resetToConfirm(confirmed);

        cardOwner.innerText = "Jane Appleseed";
        cardNumber.innerText = "0000 0000 0000 0000";
        cardMonth.innerText = "00";
        cardYear.innerText = "00";
        cvcNumber.innerText = "000";

        confirmDisplay.classList.remove("visually-hidden");
        continueDisplay.classList.add("visually-hidden");
        
        resetAllFields(formElement);
    });

};


//### Call for functions
resetForm("#ccForm");


// ### Eventlistener
// V Live Update
// Triggers update on input
cardOwnerInput.addEventListener("input", handleByInput);
cardNumberInput.addEventListener("input", handleByInput);
cardMonthInput.addEventListener("input", handleByInput);
cardYearInput.addEventListener("input", handleByInput);
cvcNumberInput.addEventListener("input", handleByInput);

confirmDisplay.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInputs();
});
