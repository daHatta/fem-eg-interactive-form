"use strict";

// ### Variables

let errors = [];

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
const cvcInput = document.querySelector("#cvcNo");

// states
const formDisplay = document.querySelector("#ccForm");
const successDisplay = document.querySelector(".response__box");  

// ### Functions

// V Live Update
// Callback function for input event
function handleByInput(event) {

    //console.log("Current Target: ", e.currentTarget.id);

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
        cvcNumber.innerText = cvcInput.value !== "" ? cvcInput.value : "000";
    }

};

// Callback function for copy event
function handleByCopy(event) {

    const selection = document.getSelection();
    event.clipboardData.setData("text/plan", selection.toString());

    event.preventDefault();
};

// V Validation
// Function for validation
const validateForm = (formId) => {

    //console.log("FORM ID ", formId);

    // Select form
    const formElement = document.querySelector(formId);

    // Validation options
    const validationOptions = [
        {
            attribute: "data-letters",
            isValid: (input) => {
                const patternRegex = new RegExp(input.dataset.letters);
                return patternRegex.test(input.value);
            },
            errorMessage: () => "Letters, 'Space', '-' only!",
        },
        {
            attribute: "data-format",
            isValid: (input) => {
                const patternRegex = new RegExp(input.dataset.format);
                return patternRegex.test(input.value);
            },
            errorMessage: () => "Wrong format. Numbers and 'Space' only!" 
        },
        {
            attribute: "required",
            isValid: input => input.value.trim() !== "",
            errorMessage: () => "Can't be blank!",
        }
    ];

    // Function to validate a single field
    const validateSingleField = (fieldToValidate) => {

        const label = fieldToValidate.querySelector("label");
        const input = fieldToValidate.querySelector("input");
        
        let errorMessage = "";
        let inputId = input.getAttribute("id");
        
        // Use specific output field depending on specific ids 
        if (inputId === "month" || inputId === "year") {
            errorMessage = fieldToValidate.parentElement.nextElementSibling;
        } else {
            errorMessage = fieldToValidate.querySelector(".input__error-msg");
        }

        let fieldError = false;

        // Check input field using validation options
        for (const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                input.setAttribute("class", "input--error");
                
                errorMessage.classList.remove("visually-hidden");
                errorMessage.textContent = option.errorMessage(input, label);
                
                fieldError = true;
            }
        }

        // Remove error class by removing class attribute if value is correct
        if (!fieldError) {
            input.removeAttribute("class");
            errorMessage.textContent = "";
            errorMessage.classList.add("visually-hidden");
        }

        // Search for errors by class name
        errors = formElement.querySelectorAll(".input--error");

        if (errors.length === 0 ) {
            formDisplay.classList.add("visually-hidden");
            successDisplay.classList.remove("visually-hidden");
        }

    };

    // Function to validate all fields
    const validateAllFields = (formToValidate) => {

        const fields = Array.from(formToValidate.querySelectorAll(".input__box"));
        //console.log("FIELDS from Form", fields);
        fields.forEach((field) => {
            //console.log("FIELD ", field);
            validateSingleField(field);
        });
    };

    // No browser validation
    formElement.setAttribute("novalidate", "");
    
    // Enable validation for each control whilst updating form
    Array.from(formElement.elements).forEach(element => 
            element.addEventListener("blur", event => {

                let form = event.srcElement.parentElement.parentElement;
                validateAllFields(form);
            })
    );
    

    // Eventlistener on submit of form
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        //console.log("FORM ELEMENT", formElement)
        validateAllFields(formElement);
    });

};

// V Form Reset
// Function for reset
const resetForm = (formId) => {

    // Getting form, response-display and reset button
    const formElement = document.querySelector(formId);
    
    // Function to reset a single field
    const resetSingleField = (fieldToReset) => {
        let input = fieldToReset.querySelector("input");
        input.value = "";
    };

    // Function to reset all fields
    const resetAllFields = (formToReset) => {
        const fields = Array.from(formToReset.querySelectorAll(".input__box"));

        fields.forEach((field) => {
            resetSingleField(field);
        });
    };

    // Eventlistener on reset button of form
    resetBtn.addEventListener("click", (event) => {

        cardOwner.innerText = "Jane Appleseed";
        cardNumber.innerText = "0000 0000 0000 0000";
        cardMonth.innerText = "00";
        cardYear.innerText = "00";
        cvcNumber.innerText = "000";

        formDisplay.classList.remove("visually-hidden");
        successDisplay.classList.add("visually-hidden");
        
        resetAllFields(formElement);
    });

};


// ### Function calls

// V Form Validation
validateForm("#ccForm");
// V From Reset
resetForm("#ccForm");


// ### Eventlistener

// V Live Update
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

