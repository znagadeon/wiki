# RGBA를 RGB로 바꾸는 법

```js
const rgba = { red: 127, blue: 127, green: 127, alpha: 0.5 };
const background = { red: 0, blue: 0, green: 0 };
const rgb = {
	red: rgba.red * rgba.alpha + background.red * (1-rgba.alpha),
	blue: rgba.blue * rgba.alpha + background.blue * (1-rgba.alpha),
	green: rgba.green * rgba.alpha + background.green * (1-rgba.alpha),
};
```

- [쉽게 계산할 수 있는 사이트](http://marcodiiga.github.io/rgba-to-rgb-conversion)
