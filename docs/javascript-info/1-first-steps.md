---
tags:
  - js
---

# 자바스크립트 기본

## 자료형

- `typeof null === 'object'`

## 형 변환

- `isNaN(Number(undefined)) === true`
- `Number(null) === 0`

## 비교 연산자

- `==`는 비교하려는 양쪽 값의 자료형이 다르면 두 값을 숫자형으로 묵시적 형변환한다.
	```js
	const a = 0;
	const b = '0';

	console.log(a == b); // true
	console.log(Boolean(a) == Boolean(b)); // false, Boolean(b) === true
	```
	- 단, `null`이나 `undefined`는 형변환하지 않는다. `>=` 등의 대소 비교 연산자에서는 형변환한다.
	- 특수 규칙: `null == undefined`

## null 병합 연산자 '??'

```js
const x = a ?? b;
const x = (a !== undefined && a !== null) ? a : b;
```

- `??`는 [우선순위가 낮은 연산자](https://ko.javascript.info/nullish-coalescing-operator#ref-748)이므로, 복잡한 연산에서는 괄호를 사용하는 것이 좋다.
- `??`는 `||`, `&&`와 함께 사용할 수 없다. 괄호로 감싸서 해당 제약을 회피할 수 있다.
	```js
	const x = a && b ?? c; // error
	const y = a && (b ?? c);
	```

## while과 for 반복문

- 이름 붙은 반복문
	```js
	outer: for (let i=0; i<10; i++) {
		for (let j=0; j<10; j++) {
			break outer;
		}
	}
	```
