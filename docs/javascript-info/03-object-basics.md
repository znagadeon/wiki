---
tags:
  - js
---

# 객체: 기본

## 객체

```js
const obj = { test: undefined };

console.log(obj.test); // undefined
console.log('test' in obj); // true
```

- [객체에서 키가 저장되는 순서](https://ko.javascript.info/object#ref-525)
	- 정수형 문자열을 오름차순으로 우선 정렬
	- 나머지 키들은 추가된 순서대로 정렬

## 메서드와 this

- 일반 함수의 `this`는 (strict 기준) `undefined`, 메서드는 메서드를 콜한 객체를 가리킴
	```js
	function hello() { console.log(this) }
	const obj = {};
	obj.hello = hello;

	hello(); // undefined
	obj.hello(); // obj
	```

## new 연산자와 생성자 함수

- 객체 생성자 함수
	```js
	function User(name) {
		// 암시적으로 빈 객체 this를 생성

		this.name = name;

		// 암시적으로 this를 반환
		// 객체를 리턴한다면, this를 리턴하지 않고 해당 객체를 리턴한다.
		return { name: 'Alice' };

		// 원시 타입을 리턴하면 해당 구문은 무시된다.
		return 1; // 무시되고 this 리턴
	}

	const user = new User('John');
	```
- `new.target`: 해당 함수가 `new`와 함께 호출되었는지 확인할 수 있음
	```js
	function User() {
		console.log(new.target);
	}

	User(); // undefined
	new User(); // function User
	```

## 옵셔널 체이닝 '?.'

```js
const user1 = {
	test() {
		console.log('test');
	}
};
const user2 = {};

user1.test?.(); // test
user2.test?.(); // 에러가 발생하지 않음
```

## 심볼형

- 심볼형은 항상 다르다(패러미터는 설명값)
	```js
	const id1 = Symbol('id');
	const id2 = Symbol('id');

	console.log(id1 === id2); // false
	console.log(id1.description === id2.description); // true
	```
	- 숨겨진 키를 만들 때 사용 가능하다. 여러 서드파티가 한 객체에 접근할 때 유용
		```js
		const id = Symbol('id');
		const user = {
			name: 'John',
			[id]: 1, // 이제 이 값은 id가 있어야만 직접 접근 가능하다. 콘솔 찍으면 보이니 민감한 정보는 담으면 안 된다
		};

		for (let key in user) {
			console.log(key); // name만 출력, id 심볼은 노출되지 않는다
		}

		// Object.assign을 이용하면 복사된다
		const copiedUser = Object.assign({}, user);
		console.log(copiedUser[id]); // 1
		```
		- 조회가 안 되는 것은 아니다
			- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols>
			- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys>
	- 문자열로 명시적 형변환해야 한다
- 전역 심볼
	```js
	const id = Symbol.for('id'); // 해당 description을 가진 심볼이 없으면 새 전역 심볼을 생성
	```
- 시스템 심볼: 객체의 기본 동작을 바꿔주는 데 사용

## 객체를 원시형으로 변환하기

```js
const obj = {
	[Symbol.toPrimitive]: function(hint) {
		switch(hint) {
			case 'string':
				return 'obj stringified';
			case 'number':
				return 1;
			case 'default': // 무엇으로 형변환할지 확실하지 않을 때
				return 'default value';
		}
	},
};

console.log(String(obj)); // obj stringified
```

- 객체에 `Symbol.toPrimitive`가 없으면
	- hint가 string인 경우 `toString` -> `valueOf`
	- 아닌 경우 `valueOf` -> `toString`
	```js
	const obj = {
		toString() { // 기본 동작은 [object Object] 반환
			return 'obj stringified';
		},
		valueOf() { // 기본 동작은 객체 자신을 반환
			return 1; // default를 따로 구분하지 않음
		}
	};
	```

<PageTags />
