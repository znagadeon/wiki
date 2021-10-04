---
tags:
  - js
---

# 기타

## Proxy와 Reflect

- Proxy
	```js
	let target = {};

	const handlers = {
		get(target, prop) {
			if (prop in target) {
				// tip: 함수는 proxy를 타지 않고 바로 target에 접근할 수 있도록 조치해준다.
				const val = target[prop];
				return typeof val === 'function' ? val.bind(target) : val;
			} else {
				throw new Error('해당하는 값이 없습니다.');
			}
		},

		set(target, prop, val) {
			if (typeof val !== 'number') {
				console.log('숫자가 아닌 값은 추가할 수 없습니다.');
				return false;
			}

			if (!(prop in target)) {
				console.log('새 값이 추가되었습니다.');
			}
			target[prop] = val;
			return true;
		}
	};

	target = new Proxy(target, handlers);

	target.test = 1; // 새 값이 추가되었습니다.
	console.log(target.test); // 1
	console.log(target.notExist); // 에러 발생

	// 함수 proxy
	function delay(f, ms) {
		// 기존
		return function() {
			setTimeout(() => f.apply(this, arguments), ms);
		};

		// proxy 이용하기
		return new Proxy(f, {
			apply(target, thisArg, args) {
				setTimeout(() => target.apply(thisArg, args), ms);
			},
		});
	}

	function hello(name) {
		console.log(`Hello, ${name}!`);
	}

	hello = delay(hello, 3000);

	// 기존 방식을 사용할 경우 0(delay에서 반환하는 함수의 인자 갯수)
	// proxy를 사용할 경우 1(hello의 실제 인자 갯수)
	console.log(hello.length);
	```
	- [Proxy 핸들러 메서드, 몇몇 제약사항 모음](https://ko.javascript.info/proxy#ref-1)
	- [예제: observable 만들기](https://ko.javascript.info/proxy#ref-18)
- Reflect: `Proxy`에서 `target`의 기본 연산을 사용하고 싶을 때 사용
	```js
	let target = {};

	target = new Proxy(target, {
		get(target, prop, receiver) {
			// prop이 없는 경우 0을, 있는 경우 기존 target의 prop을 반환
			if (!(prop in target)) return 0;
			return Reflect.get(target, prop, receiver);
		}
	})
	```
	- `Reflect`가 필요한 경우
		```js
		const parent = {
			_private: 1,
			get private() {
				return this._private;
			},
		};
		const parentProxy = new Proxy(parent, {
			get(target, prop, receiver) {
				return target[prop]; // target은 항상 parent. 1 출력
				return Reflect.get(target, prop, receiver); // 호출부를 인식함. 2 춣력
			},
		});

		const child = {
			__proto__: parentProxy,
			_private: 2,
		};

		console.log(child.private);
		```
- `Proxy.revocable`: 리소스에 대한 접근 권한을 제어
	```js
	const { proxy, revoke } = Proxy.revocable(target, handler);

	proxy.value = 1;

	revoke();
	console.log(proxy.value); // 에러 발생
	```

## 참조 타입

- `obj.method()`
	1. `obj`에서 `method`를 찾는다.
	2. `method`를 실행한다.
	- 1번과 2번을 분리해서 실행하면 2로 가는 과정에서 `this` 컨텍스트를 잃는다. 메서드가 제대로 동작하게 하기 위해, 자바스크립트는 1, 2가 한 번에 실행되면 내부적으로 `.`이 함수가 아닌 **참조 타입** 을 반환하도록 한다(실제로 개발자가 사용 가능한 값은 아님).
	- 만약 `obj`가 아닌 표현식이 `.` 앞에 존재한다면, 참조 타입 반환이 이루어지지 않아 `this`가 `undefined`가 된다.

## BigInt

- `BigInt` - `Number`간 사칙연산에는 명시적 형변환이 필요하다.
- `1n !== 1`: 타입이 다름

<PageTags />
