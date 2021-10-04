---
tags:
  - js
---

# 프라미스와 async, await

## 콜백

- 오류 우선 콜백
	- 콜백의 첫 인자에 에러를, 두번째, 세번째, ... 인자에 성공했을 때의 data를 전달
	```js
	function loadScript(src, callback) {
		const script = document.createElement('script');
		script.src = src;

		script.onload = () => callback(null, script);
		script.onerror = () => callback(new Error('에러 발생'));

		document.head.append(script);
	}
	```

## 프라미스

- 제작 코드와 소비 코드
	- 제작 코드: 비동기적인 동작을 하는 코드
	- 소비 코드: 제작 코드의 결과를 기다렸다가 소비
- Promise 객체의 내부 프로퍼티
	- `state`: pending -> fulfilled(성공한 경우)/rejected(실패한 경우)
	- `result`: undefined -> value(성공한 경우)/error(실패한 경우)
- 이미 처리된 프라미스의 핸들러는 `then`, `catch`에 추가되는 순간 바로 실행됨

```js
const fulfilled = (result) => {};
const rejected = (error) => {};

promise
	.then(fulfilled, rejected); // fulfilled가 실패해도 rejected는 실행되지 않음
promise
	.then(fulfilled)
	.catch(rejected); // fulfilled가 실패한 경우, rejected가 실행됨
```

## 프라미스 체이닝

- `Promise.then`을 호출하면 `Promise`가 반환된다. 이를 이용해 `then`을 체이닝할 수 있다.
	- 정확히는 thenable 객체를 반환한다. `then(resolve, reject)`이 구현된 객체라면 프라미스 체인에 사용할 수 있다.
- `then`에 새로운 프라미스 객체가 존재한다면 다음 `then`은 해당 프라미스가 완료될 때까지 대기한다.

## 프라미스와 에러 핸들링

- `window.addEventListener('unhandledrejection', (event) => {})`로 handle되지 않은 프라미스 에러를 잡아낼 수 있다.

## 프라미스 API

```js
const promises = [promise1, promise2];

// 모든 promise가 준비될 때까지 대기, 하나라도 거부되면 곧바로 reject
Promise.all(promises);

// 모든 promise가 준비될 때까지 대기, 거부되는 promise가 있더라도 모든 promise를 실행
Promise.allSettled(promises);

// 가장 먼저 완료되는 promise의 결과값을 반환
Promise.race(promises);
```

## 마이크로태스크

- 프라미스가 즉시 이행 가능하다고 해도, `then`, `catch`, `finally`는 항상 비동기적으로 실행된다.
	- 프라미스를 이용해 할당한 작업들은 일단 마이크로태스크 큐(혹은 PromiseJobs 큐)에 들어간다.
	- 마이크로태스크 큐는 실행할 것이 아무 것도 없는 상태에서만 실행되므로, 기존 동기 코드가 먼저 실행된다.
- `unhandledrejection` 에러는 **마이크로태스크 큐의 끝에서** 프라미스 에러가 처리되지 못한 경우 발생한다.
	- 마이크로태스크 큐에 있는 작업이 모두 완료되었고, 이 중 하나라도 거부된 상태로 catch 처리가 되지 않은 경우
	```js
	// 에러가 발생했지만 처리되지 않은 프라미스
	const promise = Promise.reject(new Error('reject'));

	setTimeout(() => {
		promise.catch(err => {
				console.error('에러 발생'); // 여기가 나중에 실행
			});
	}, 1000);

	window.addEventListener('unhandledrejection', (event) => {
		console.error(event.reason); // 여기가 먼저 실행
	});
	```

## async와 await

- `async` 함수는 항상 프라미스를 반환하고, 프라미스를 반환하지 않는 함수의 결과값은 프라미스로 감싸서 반환한다.
- `await`는 thenable 객체를 받을 수 있다(꼭 프라미스가 아니어도 됨).

<PageTags />
