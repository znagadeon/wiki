---
tags:
  - js
---

# 모듈

## 모듈 소개

- 모듈(`<script type="module">`)은 HTTP, HTTPS 프로토콜을 통해서만 동작한다.
- 모듈은 항상 엄격 모드로 실행된다.
- 각 모듈 간에는 블록 레벨 스코프가 적용된다. 다른 모듈의 변수/함수 등을 `import` 없이 사용할 수 없다.
	```html
	<script type="module">
		const name = "Alice";
	</script>
	<script type="module">
		console.log(name); // 에러 발생
	</script>
	```
- 모듈은 최초 호출 시 단 한 번만 실행된다. 해당 모듈을 사용하는 모듈이 여러 개라도 여러 번 평가되지 않는다.
- `import.meta`: 현재 모듈에 대한 메타정보
- 모듈 스크립트는 항상 지연 실행된다(`defer`와 동일하게 동작).
- 모듈은 `async` 속성을 인라인 스크립트에서도 사용할 수 있다.
	```html
	<!-- my-module.js가 로드되면 바로 실행 -->
	<script type="module" async>
		import { myModule } from './my-module.js';

		// ...
	</script>
	```
- 외부 스크립트 모듈
	- `src`가 같다면 한 번만 실행된다.
	- 외부 스크립트 모듈은 항상 CORS 헤더가 필요하다.
- `nomodule`: `type="module"`을 해석할 수 없는 브라우저에서 필요
	```html
	<script type="module">
		// type="module"을 해석 가능하면 이 스크립트를 실행
	</script>
	<script nomodule>
		// 아니라면 이 스크립트를 실행
	</script>
	```

## 모듈 내보내고 가져오기

- `as` 사용하기
	```js
	import { hello as hi } from './hello.js';
	export { hello as hi };
	```
- 가져온 모듈을 바로 다시 내보내기
	```js
	export { myClass } from './my-class.js';
	```

## 동적으로 모듈 가져오기

```js
import(modulePath)
	.then((obj) => {
		console.log(obj.default); // default export로 내보낸 값
	}).catch((err) => {/* 해당하는 모듈이 없는 경우 */});
```

<PageTags />
