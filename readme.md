# "real tech or fake jargon?" by ishween sehmbhi

## What would I do differently or what other features would I implement?
- Currently, my app has no way of telling if the options for "real tech" (or incorrect answers) contain any duplicates. I could probably add logic to double check for duplicates using an array method like filter.

- I'd use an array of objects instead of an array of strings to represent the items in realTech and fakeTech. I'd add a property for some *fun facts* in each popup (a string as a key-value pair in that object). For instance, if the user clicks Turing thinking it's a fake language, there can be an object property as follows that can be delivered to the user in a pop up.
    - funFact: "Turing is a programming language developed in 1982 at UofT!" (That wasn't really fun, sorry.)

- There's also no way to currently check if the user didn't click any radio button. Currently, it defaults to assuming that the user answered incorrectly if nothing is selected.

- I'd probably style things better.

### Credits
- GIFs used are from Tenor - https://tenor.com/
- Alerts are from sweetalert2 - https://sweetalert2.github.io/
- Fonts are from Google Fonts# realtechorfakejargon
