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

### To enable animated cursor add this css
```css
.wordsmith:after {
    content: '|';
    background-color: #fff;
    animation: .5s linear infinite alternate blink
}

@keyframes blink {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}
```