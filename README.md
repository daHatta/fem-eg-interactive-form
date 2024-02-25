# Frontend Mentor - Interactive card details form solution

This is my solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![Interactive card details form solution](./screenshot.jpg)

### Links

- Solution URL: [https://github.com/daHatta/fem-eg-interactive-form](https://github.com/daHatta/fem-eg-interactive-form)
- Live Site URL: [https://dahatta.github.io/fem-eg-interactive-form](https://dahatta.github.io/fem-eg-interactive-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JS
- Regular Expressions

### What I learned

This exercise had some nice challenges for all used languages.

I combind the expiration date into a fieldset which share a single output container for error messages:

```html
<fieldset>
  <legend class="fieldset__legend">Exp. Date (MM/YY)</legend>
  <div class="date__box">
    <div class="input__box">
      <<label for="month" class="input__label visually-hidden">Month</label>
      <input
        id="month"
        maxlength="2"
        name="month"
        type="text"
        pattern="^[0-9]+$"
        required
        placeholder="MM"
        autocomplete="off"
      />>
    </div>
    <div class="input__box">
      <!-- ... -->
    </div>
  </div>
  <span class="error-msg-display visually-hidden">Contains error message.</span>
</fieldset>
```

In order to get a border with a gradient for the input fields, I needed a special hack:

```css
/* ... */
input[type="number"]:focus-visible {
  background: linear-gradient(white, white) padding-box, linear-gradient(
        to right,
        $clr-pry-input-border-active
      ) border-box;
  border-radius: 8px;
  border: 1px solid transparent;
}
```

Regular expressions are essential for validation. I wrote a function to check the values of input elements:

```js
// Checking pattern
function checkPattern(input) {
  const regExPattern = new RegExp(input.pattern);
  return regExPattern.test(input.value);
}
```

I also used a state-variable to check the validation process to get the point when the user has to see the next screen:

```js
// Variable to check status for continue display
let confirmed = [
  { id: 0, item: "username", isValid: false },
  { id: 1, item: "cardnumber", isValid: false },
  { id: 2, item: "month", isValid: false },
  { id: 3, item: "year", isValid: false },
  { id: 4, item: "cvc", isValid: false },
];
```

### Continued development

My next exercise will be something with more JavaScript again.

### Useful resources

- [A Modern Sass Folder Structure](https://dev.to/dostonnabotov/a-modern-sass-folder-structure-330f) - This article by **Technophile** helped me to build up an architecture for sass.
- [Gradient Borders](https://codyhouse.co/nuggets/css-gradient-borders) - Great article about Gradient Borders by **CodyHouse**.
- [JavaScript Tips & Tricks #1: Live Update Using JavaScript](https://www.youtube.com/watch?v=J4e3e1lbXfs) - Nice tutorial by **Christian Hur** about forms.
- [JavaScript Client-side Form Validation](https://www.youtube.com/watch?v=rsd4FNGTRBw) - Nice tutorial about form validation by **Florin Pop**.
- [Javascript form validation tutorial](https://github.com/codebubb/javascript-form-validation-tutorial/blob/main/script.js) - Another great inspiration about form validation by **James Bubb**.
- [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) - Documentation about used Array _from()_ function by **Modzilla**.
- [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) - Documentation about used Array _find()_ function by **Modzilla**.
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) - Documentation about used Array _foreach()_ function by **Modzilla**.
- [Reular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) - Helpful source about regular expressions by **Modzilla**.
- [RegEX generator](https://regexr.com/) - Useful tool to test regular expressions by **gskinner**.
- [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk) - Font _Space Grotesk_ used in this project.

## Author

- Frontend Mentor - [@daHatta](https://www.frontendmentor.io/profile/daHatta)
