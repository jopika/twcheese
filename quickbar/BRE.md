### use optimal build (recommended for playing)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('BRE'))
|| $.ajax('https://jopika.github.io/twcheese/launch/BRE.js?'
+~~((new Date())/3e5),{cache:1});void 0;
```

### use es modules (recommended for development)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('BRE'))
|| $.getScript('https://jopika.github.io/twcheese/launch/esm/BRE.js');
void 0;
```
