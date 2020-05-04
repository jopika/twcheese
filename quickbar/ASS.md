### use optimal build (recommended for playing)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('ASS'))
|| $.ajax('https://jopika.github.io/twcheese/launch/ASS.js?'
+~~((new Date())/3e5),{cache:1});void 0;
```

### use es modules (recommended for development)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('ASS'))
|| $.getScript('https://jopika.github.io/twcheese/launch/esm/ASS.js');
void 0;
```
