# wordsmith.js
> JS plugin for writing things. Written in vanilla JavaScript.

## Usage
```js
const ws = new Wordsmith({
    tag: document.getElementById('text'),
    typingSpeed: 1.5
})
ws.type(`
This is a text that will be written smoothly inside a specified element.
<pausefor1000>
<br>
This will be written one second later.
`)
```