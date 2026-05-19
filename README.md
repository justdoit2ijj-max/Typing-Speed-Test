# Frontend Mentor - Typing Speed Test solution

This repository is a solution for the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). The project was built using Vite, Tailwind CSS, and vanilla JavaScript to create a responsive typing test app with difficulty and mode selection.

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
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Build a typing speed test application that allows users to:

- select difficulty levels
- choose between timed mode and passage mode
- view typing accuracy and words-per-minute (WPM)
- see real-time feedback on correct and incorrect characters
- use a responsive layout across desktop and mobile screen sizes

### Screenshot

Screenshot not included yet. Add an image to the repository and update this section with the correct file path.

### Links

- Solution URL: [https://github.com/justdoit2ijj-max/Typing-Speed-Test](https://github.com/justdoit2ijj-max/Typing-Speed-Test)
- Live Site URL: Not deployed

## My process

### Built with

- HTML5
- CSS with Tailwind CSS
- JavaScript (vanilla)
- Vite development tooling
- Fetch API for loading challenge passages
- Responsive layout and interactive UI states

### What I learned

This project helped me strengthen the following skills:

- building interactive UI behavior with vanilla JavaScript
- managing timer state and live input validation
- loading challenge data from a local `data.json` file using `fetch`
- dynamically comparing typed characters with the reference passage
- applying responsive styles using Tailwind CSS and custom CSS

Example of the character-checking logic used in the app:

```js
const letters = challenge.querySelectorAll('span');
for (let i = 0; i < letters.length; i++) {
  if (!challengeInput.value[i]) {
    letters[i].style.color = '';
  } else if (challengeInput.value[i] === challengeText[i]) {
    letters[i].style.color = 'hsl(140, 63%, 57%)';
  } else {
    letters[i].style.color = 'hsl(354, 63%, 57%)';
  }
}
```

### Continued development

Future improvements for this project include:

- adding accessibility enhancements for keyboard users and screen readers
- improving the visual presentation of results and high score tracking
- adding persistence for user settings and scores
- deploying the app to a public hosting provider

### Useful resources

- [Frontend Mentor](https://www.frontendmentor.io/) - challenge details and design specification
- [Vite](https://vitejs.dev/) - build tool documentation
- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework
- [MDN Web Docs](https://developer.mozilla.org/) - DOM manipulation and fetch API reference

### AI Collaboration

No AI tools were used for this project.

## Author

- GitHub - [justdoit2ijj-max](https://github.com/justdoit2ijj-max)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

- Frontend Mentor for providing the challenge and design specification
- Tailwind CSS documentation for responsive styling guidance
- Vite for a fast local development setup
