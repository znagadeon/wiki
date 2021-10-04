---
tags:
  - js
---

# 함수 심화학습

## 변수의 유효범위와 클로저

- 렉시컬 환경
	- <https://ko.javascript.info/closure#ref-409>
- 최적화 프로세스
	- <https://ko.javascript.info/closure#ref-415>

## 객체로서의 함수와 기명 함수 표현식

```js
function hello() {}
function hello2(a, b) {}
function hello3(a, b, ...rest) {}

console.log(hello.name); // hello
console.log(hello2.length); // 2, parameter의 갯수
console.log(hello3.length); // 2, rest는 세지 않음
```

- 함수는 객체이므로, 프로퍼티를 추가할 수 있다.
	```js
	function counter() {
		counter.count = 0; // 외부에서 접근 가능

		return function() {
			return counter.count++;
		}
	}

	const myCounter = counter();
	console.log(myCounter()); // 0
	console.log(myCounter()); // 1
	console.log(myCounter()); // 2
	```
- 기명 함수 표현식
	```js
	let helloWithNamedFunction = function func(name) {
		if (name) {
			console.log(name);
		} else {
			func(name);
		}
	}

	let hello = function(name) {
		if (name) {
			console.log(name);
		} else {
			hello(name);
		}
	}

	// 기능적으로는 같으나, 아래 상황에서 hello 함수는 문제가 생김
	const myHello = hello;
	hello = null;
	myHello(); // TypeError: hello is not a function
	```

## new Function 문법

런타임에 동적으로 함수를 생성할 수 있다.

```js
const func = new Function('a', 'b', 'return a+b');

// 같은 뜻
const func = function(a, b) { return a+b };

// 클로저를 new Function으로 만들면 전역 변수에만 접근 가능하다
function counter() {
	let count = 0;
	return new Function('return count++');
}

console.log(counter()); // ReferenceError: count is not defined
```

## setTimeout과 setInterval을 이용한 호출 스케줄링

- 중첩된 setTimeout을 사용하기
	- <https://ko.javascript.info/settimeout-setinterval#ref-80>
- 브라우저에서, **다섯 번째 중첩 타이머 이후에는 대기시간을 최소 4밀리초 이상으로 강제한다.**
	- 서버는 상관없음

## call/apply와 데코레이터, 포워딩

```js
const user = { name: 'John' };

function hello(hi) {
	console.log(`${hi}, ${this.name}!`);
}

hello.call(user, 'Hello'); // Hello, John!
hello.apply(user, ['Hello']); // call과 같은 동작, 브라우저는 apply를 최적화하기 때문에 보통 이쪽이 빠름
```

## 함수 바인딩

```js
const user = { name: 'John' };
const helloWithName = hello.bind(user);
helloWithName('Hello'); // Hello, John!

// partial application
function sum(a, b) { return a+b };
const adder2 = sum.bind(null, 2);
console.log(adder2(3)); // 5

// this를 동적으로 바인딩하기
const counter = {
	count: 0,
	add: function(num) {
		this.count += num;
		return this.count;
	},
};
counter.increase = partial(counter.add, 1);
console.log(counter.increase()); // 1

function partial(func, ...argsBound) {
	return function(...args) {
		return func.call(this, ...argsBound, ...args);
	};
}
```

<PageTags />
