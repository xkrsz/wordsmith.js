# Writer
> JS plugin for writing things. Written in vanilla JavaScript.

## Usage
```js
const writer = new Writer({
    tag: document.getElementById('text'),
    typingSpeed: 1.5
})
writer.type(`
This is a text that will be written smoothly inside a specified element.
<pausefor1000>
<br>
This will be written one second later.
`)
```