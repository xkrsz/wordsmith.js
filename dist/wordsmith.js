/*
wordsmith.js 0.1.2
Copyright 2016 Krzysztof Kraszewski
Free to use under MIT licence.
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wordsmith = function () {
  function Wordsmith(data) {
    _classCallCheck(this, Wordsmith);

    this.tag = data.tag ? data.tag : 'body';
    this.typingSpeed = data.typingSpeed ? data.typingSpeed : 1;
    this.elementCounter = -1;
    this.isTyping = false;
    this.endAfterTyping = false;

    this.tag.classList.add('wordsmith');
  }

  _createClass(Wordsmith, [{
    key: 'typingDelay',
    value: function typingDelay() {
      return (Math.floor(Math.random() * 111) + 10) / this.typingSpeed;
    }
  }, {
    key: 'type',
    value: function type(sentence) {
      var that = this;
      var t = that.tag;

      sentence = sentence.replace(/\r?\n|\r/g, '');

      typeSentence(sentence.split(''), function (isDone) {});

      function typeSentence(s, cb) {
        that.isTyping = true;

        if (!s.length) {
          that.isTyping = false;
          if (that.endAfterTyping) that.end();
          return cb(true);
        }

        var c = s.shift();

        if (c === '<') {
          return parseTag(s, cb);
        }
        t.innerHTML += c;
        setTimeout(typeSentence.bind(null, s, cb), that.typingDelay());

        function parseTag(s, cb) {
          that.elementCounter++;
          var tag = '<' + s.slice(0, s.indexOf('>') + 1).join('');
          s = s.slice(s.indexOf('>') + 1);
          var tagName = tag.slice(1, tag.indexOf(' '));

          // Check if it is a tag which is closed somewhere else
          if (s.join('').indexOf('</' + tagName + '>') > -1) {
            // Append tag without content
            t.innerHTML += tag + '</' + tagName + '>';
            // Get content in tag
            var sInTag = s.join('').slice(0, s.join('').indexOf('</' + tagName + '>')).split('');
            // Type content in tag
            console.log();
            typeInTag(t.querySelectorAll('*')[that.elementCounter], sInTag, function () {
              // Delete typed content
              s = s.slice(s.join('').indexOf('</' + tagName + '>') + 3 + tagName.length);
              return typeSentence(s, cb);
            });
          } else if (tag.indexOf('<pausefor') > -1) {
            that.elementCounter--;
            if (tag[9] === '!') {
              return setTimeout(typeSentence.bind(null, s, cb), Number(tag.slice(9, -1)));
            } else {
              return setTimeout(typeSentence.bind(null, s, cb), Number(tag.slice(10, -1) / that.typingSpeed));
            }
          } else {
            t.innerHTML += tag;
            return typeSentence(s, cb);
          }
        }

        function typeInTag(tag, sInTag, cb) {
          if (!sInTag.length) return cb();

          tag.innerHTML += sInTag.shift();
          return setTimeout(typeInTag.bind(null, tag, sInTag, cb), that.typingDelay());
        }
      }
    }
  }, {
    key: 'end',
    value: function end() {
      var that = this;
      if (that.endAfterTyping || !that.isTyping) {
        that.tag.classList.remove('wordsmith');
      } else if (that.isTyping) {
        that.endAfterTyping = true;
      }
    }
  }]);

  return Wordsmith;
}();

window.Wordsmith = Wordsmith;