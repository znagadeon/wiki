---
tags:
  - js
---

# 자료구조와 자료형

## 원시값의 메서드

- 원시값이 메서드를 사용하는 과정
	- 엔진에서 암시적으로 래퍼 객체를 생성한다. 이 객체는 해당 원시값을 알고 있다.
	- 래퍼 객체가 메서드를 실행한다.
	- 변형된 값이 반환되고 래퍼 객체는 삭제된다.

## 숫자형

- `toString`에 base(2 ~ 36)를 전달할 수 있다.
	```js
	console.log((255).toString(16)); // ff
	console.log(parseInt('ff', 16)); // 255
	```
- `Object.is`: SameValueZero 알고리즘 사용
	```js
	console.log(Object.is(NaN, NaN)); // true
	console.log(Object.is(0, -0)); // false
	```

## 문자열

- [부분 문자열 추출](https://ko.javascript.info/string#ref-441)
- `'a'.localeCompare('b')`: 현재 언어권에서 문자열의 순서를 비교하기

## 배열

- `push`, `pop` 연산은 빠르다.
- `shift`, `unshift` 연산은 느리다.
- `for ... of` 문법은 배열(정확히는 iterable 객체)에만 사용 가능
	- `for ... in`은 객체에 최적화되어 있기 때문에, `for ... of`보다 10~100배 느리다.

## 배열과 메서드

- `Symbol.isConcatSpreadable`
	```js
	const arr = [1, 2];
	const arrLike = {
		0: 3,
		1: 4,
		[Symbol.isConcatSpreadable]: true
		length: 2,
	};

	console.log(arr.concat(arrLike)); // [1, 2, 3 ,4]
	```
- `Array.prototype.includes`는 `NaN`을 찾을 수 있다.(`indexOf`는 못찾음)
- `Array.isArray([]) === true`

## iterable 객체

```js
const range = {
	from: 1,
	to: 5,

	[Symbol.iterator]() {
		return {
			current: this.from,
			last: this.to,
			next() {
				if (this.current <= this.last) {
					return { done: false, value: this.current++ };
				} else {
					return { done: true };
				}
			},
		};
	},

	// 혹은
	[Symbol.iterator]() {
		this.current = from;
		return this;
	},
	next() {
		if (this.current <= this.to) {
			return { done: false, value: this.current++ };
		} else {
			return { done: true };
		}
	}
}

for (let num of range) {
	console.log(num); // 순서대로 1, 2, 3, 4 5
}

// 혹은
const iterator = range[Symbol.iterator]();
while (true) {
	const next = iterator.next();
	if (next.done) break;
	console.log(next.value);
}
```

- iterable vs array-like
	- iterable: `Symbol.iterator` 구현된 객체
	- array-like: 인덱스가 있고, `length` 프로퍼티가 있는 객체
- `Array.from`: iterable/array-like 객체를 받아 실제 배열로 반환

## 맵과 셋

- 맵은 문자열이 아닌 다른 값도 키로 사용할 수 있다. (SameValueZero 알고리즘 사용)
- `for (let entry of map.entries())`에서 `map.entries()`를 `map`으로 적어도 동일하게 작동한다.
- `set.entries()`는 `[value, value]` 배열을 포함하는 이터러블 객체를 반환한다. 이를 통해 맵과 쉽게 호환 가능하다.

## 위크맵과 위크셋

- 위크맵은 키로 쓰인 객체가 **가비지 컬렉션의 대상이 된다**.
	- [사용례](https://ko.javascript.info/weakmap-weakset#ref-774)
- 위크맵은 항상 키를 객체로 받는다.
- 위크셋에는 객체만 저장할 수 있다.

## 구조 분해 할당

```js
// 내용 바꿔치기
[a, b] = [b, a]

// 배열 구조 분해 할당
const [name = 'Guest', isAdmin = true] = ['Alice'];

// 객체 구조 분해 할당
const { width: w = 150, height: h } = { height: 200 };

// 미리 선언한 변수에 할당하기: 괄호 필요
let test;
({ test } = { test: 1 });

// 중첩 구조
const {
	size: { width, height },
	users: [user1, user2],
} = {
	size: { width: 100, height: 200 },
	users: ['John', 'Alice'],
}; // width, height, user1, user2가 선언됨
```

## Date 객체와 날짜

- `Date` 객체에 음수값을 전달해서 1970년 이전 날짜를 표현할 수 있다.
- [벤치마크 테스트](https://ko.javascript.info/date#ref-1174)

## JSON과 메서드

- `JSON.stringify(value, replacer, space)`의 `replacer` 옵션
	- 직렬화하고 싶은 키 배열
	- 함수
		```js
		JSON.stringify(obj, (key, value) => {
			return key === 'ignoreThisKey' ? undefined : value;
		}, 2);
		```
- `toJSON` 메서드
	```js
	const obj = {
		number: 1,
		toJSON() {
			return this.number;
		},
	};

	console.log(JSON.stringify(obj)); // 1
	```
- `JSON.parse(json, reviver)`의 `reviver` 옵션
	```js
	JSON.parse(json, (key, value) => {
		if (key === 'date') return new Date(value);
		return value;
	});
	```

<PageTags />
