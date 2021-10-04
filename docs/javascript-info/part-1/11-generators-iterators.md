---
tags:
  - js
---

# 제너레이터와 비동기 이터레이션

## 제너레이터

```js
function* generate() {
	yield 1;
	yield 2;
	return 3;
}

let generator = generate(); // 제너레이터 객체
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: true }
console.log(generator.next()); // { done: true }

generator = generate();
for (value of generator) {
	console.log(value); // 1, 2 (return 시 done이 true가 되므로 무시됨)
	// 3도 출력되기를 원할 경우, return 3 대신 yield 3을 쓰도록 하자
}
```

- [이터레이터 함수](./04-data-types#iterable-객체)를 제너레이터로 구현하기
	```js
	const range = {
		from: 1,
		to: 5,

		*[Symbol.iterator]() {
			for (let val = this.from; val <= this.to; val++) {
				yield val;
			}
		},
	};
	```
- 제너레이터 컴포지션: 제너레이터를 다른 제너레이터 내부에서 사용하기
	```js
	function* generateSequence(start, end) {
		for (let i=start; i<=end; i++) {
			yield i;
		}
	}

	function* generateCapital() {
		yield* generateSequence('A'.charCodeAt(0), 'Z'.charCodeAt(0));
	}
	```
- `yield`를 사용한 제너레이터-메인 흐름 간 데이터 교환
	- **두 번째 `next`부터** 값을 내부로 전달할 수 있다
	```js
	function* generate() {
		try {
			const result = yield 'Hi';
			console.log(result); // 여기에서 Hello 출력
		} catch (e) {
			console.error(e.message); // 에러 발생
		}
	}

	let generator = generate();
	console.log(generator.next().value); // Hi

	generator.next('Hello'); // generate 함수의 console.log에서 Hello 출력
	// 에러 던지기
	generator.throw(new Error('에러 발생'));
	```

## async 이터레이터와 제너레이터

- async 이터레이터
	```js
	const range = {
		from: 1,
		to: 5,

		// 일반 이터레이터
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
				}
			};
		},

		// async 이터레이터
		[Symbol.asyncIterator]() {
			return {
				current: this.from,
				last: this.to,

				async next() {
					await new Promise(resolve => setTimeout(resolve, 1000));

					if (this.current <= this.last) {
						return { done: false, value: this.current++ };
					} else {
						return { done: true };
					}
				}
			};
		},
	};

	(async () => {
		for await (let value of range) {
			console.log(value); // 1초에 한 번씩 1, 2, 3, 4, 5 출력
		}
	})();
	```
- async 제너레이터
	```js
	async function* generate(start, end) {
		for (let i=start, i<=end; i++) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			yield i;
		}
	}

	(async () => {
		const generator = generate(1, 5);
		for await (let value of generator) {
			console.log(value); // 1초에 한 번씩 1, 2, 3, 4, 5 출력
		}
	})();
	```
- async 이터러블
	```js
	const range = {
		from: 1,
		to: 5,

		// 일반 이터레이터
		*[Symbol.iterator]() {
			for (let val = this.from; val <= this.to; val++) {
				yield val;
			}
		},

		// async 이터레이터
		async *[Symbol.asyncIterator]() {
			for (let val = this.from; val <= this.to; val++) {
				await new Promise(resolve => setTimeout(resolve, 1000));
				yield val;
			}
		}
	};

	(async () => {
		for await (let value of range) {
			console.log(value); // 1초에 한 번씩 1, 3, 4, 5 출력
		}
	})();
	```

<PageTags />
