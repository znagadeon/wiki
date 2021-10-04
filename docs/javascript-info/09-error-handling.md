---
tags:
  - js
---

# 에러 핸들링

## 'try..catch'와 에러 핸들링

- `try ... catch`는 동기적으로 동작한다. 비동기 메서드의 오류는 잡아낼 수 없다.
- 직접 에러 던지기
	```js
	const num = 10, divider = 0;
	try {
		if (divider === 0) {
			throw new Error('Divider is 0');
		}
		console.log(num / divider);
	} catch(err) { // 최신 문법에서는 err가 필요없을 경우 생략할 수 있음
		console.log(err.name); // Error
		console.log(err.message); // Divider is 0
		console.log(err.stack); // 에러 발생 순간의 스택 출력(비표준)
	}
	```
- `catch`는 알고 있는 에러만 처리하고 나머지 에러는 다시 던져야 디버깅이 용이해진다.
- `finally`는 `try`, `catch`가 종료되면 **무조건** 실행된다.
	```js
	function test() {
		try {
			return 1; // Finally 출력 후 1을 리턴
		} catch {
			// ...
		} finally {
			console.log('Finally');
		}
	}
	```
- `window.onerror`로 handle되지 않은 오류를 잡아낼 수 있다.

## 커스텀 에러와 에러 확장

```js
class MyError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;

		this.customProperty = 'My Custom Property';
	}
}

try {
	throw new MyError('My Custom Error');
} catch (err) {
	if (err instanceof MyError) {
		console.log(err.name); // MyError
		console.log(err.message); // My Custom Error
		console.log(err.customProperty); // My Custom Property
	} else throw err;
}
```

- '예외 감싸기' 패턴
	- 하나의 논리적 단위 안에서 발생하는 모든 에러를 한 종류의 에러로 추상화
	```js
	class CommonError extends Error {
		constructor(message, cause) {
			super(message);
			this.cause = cause;
			this.name = this.constructor.name;
		}
	}

	function test() {
		try {
			// Error 1 Occurred
		} catch (err) {
			if (err instanceof Error1) {
				throw new CommonError('Error 1', err);
			} else throw e;
		}

		try {
			// Error 2 Occurred
		} catch (err) {
			if (err instanceof Error2) {
				throw new CommonError('Error 2', err);
			} else throw e;
		}

		// ...
	}

	try {
		test();
	} catch (err) {
		if (err instanceof CommonError) {
			console.error(err);
			console.error(err.cause); // 원본 에러가 필요할 때는 cause 활용
		} else throw e;
	}
	```

<PageTags />
