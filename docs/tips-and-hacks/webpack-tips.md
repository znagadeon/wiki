---
tags:
  - webpack
  - js
---

# Webpack 미세 팁 모음

## Vue와 Pug를 함께 사용하기

예제에서는 `raw-loader`와 `pug-plain-loader`를 사용하라고 되어 있는데, 그럼 `include` 같은 고급(?) 문법을 못 쓰게 막아버린다.

```js
{
	test: /\.pug$/,
	oneOf: [{
		resourceQuery: /^\?vue/,
		use: ['pug-plain-loader']
	}, {
		use: ['pug-loader']
	}],
}
```

- [참고 링크](https://vue-loader.vuejs.org/guide/pre-processors.html#pug)

## *.mjs 확장자 import error 해결

웹팩을 도입하기 전 아주 레거시 파일들 때문에 웹팩 빌드가 안 돼서 웹팩으로 빌드할 파일을 `*.mjs`, 아닌 파일을 `*.js`로 사용한 적이 있다. 바벨 로더가 잘 동작하긴 하는데 이 파일을 다른 js 파일에서 임포트할 때 `Can't import the named export 'myModule' from non ecmascript module` 에러가 발생한다. 웹팩에 아래 설정을 추가하면 해결된다.

```js
{
	test: /\.mjs$/,
	type: 'javascript/auto',
	// ...
}
```

<PageTags />
