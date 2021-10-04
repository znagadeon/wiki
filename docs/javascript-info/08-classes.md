---
tags:
  - js
---

# 클래스

## 클래스와 기본 문법

```js
class Animal {
	constructor(name) { this.name = name; }
	eat() { console.log(`${this.name} eats.`); }
}

console.log(typeof Animal); // function
console.log(Animal === Animal.prototype.constructor);
console.log(Object.getOwnPropertyNames(Animal.prototype)); // constructor, eat
```

- 기존 함수와 다른 점
	- `[[FunctionKind]]: 'classConstructor'`: 이 프로퍼티가 있다면 `new` 없이 사용할 수 없음
	- 클래스 메서드는 `enumerable: false`
	- 항상 엄격 모드로 실행됨
- 클래스 필드
	```js
	class Button {
		// 기본 사용법
		name = 'myButton';

		// 응용: this가 항상 클래스로 생성된 객체에 바인딩됨
		click = () => {
			console.log(this.name);
		}
	}

	const button = new Button();
	setTimeout(button.click, 1000); // myButton
	```

## 클래스 상속

```js
class Parent {
	test() {
		// ...
	}
}

class Child extends Parent {
	constructor(...args) {
		// 내부 프로퍼티에 [[ConstructorKind]]: "derived" 가 추가된다
		// 이 경우 super를 반드시 호출해야 this를 사용할 수 있다(없으면 에러)
		super(...args);
		// ...
	}

	test() {
		super.test();
		// ...
	}
}
```

- 클래스 필드 오버라이딩
	- 부모의 필드 초기화가 먼저 이루어지므로, 자식의 필드가 적용되지 않는다. 주의!
	```js
	class Parent {
		type = 'parent';

		constructor() {
			console.log(this.type);
		}
	}

	class Child extends Parent {
		type = 'child';
	}

	const parent = new Parent(); // parent
	const child = new Child(); // parent <- ???
	```
- super 키워드와 [[HomeObject]]
	- grandchild class의 콜스택 오버플로우 이슈
		```js
		const parent = {
			test() {},
		};
		const child = {
			__proto__: parent,
			test() {
				// (2) this가 **child가 아니라 grandchild**이므로, this.__proto__는 child
				// (3) 무한히 child.test()를 호출하며 오버플로우
				this.__proto__.test.call(this);
			},
		};
		const grandchild = {
			__proto__: child,
			test() {
				this.__proto__.test.call(this); // (1) this.__proto__는 child
			}
		};

		grandchild.test(); // 콜스택 오버플로우 발생
		```
	- 함수 전용 내부 프로퍼티 `[[HomeObject]]`로 해결
		- `[[HomeObject]]`에는 항상 객체 자신이 저장된다
		- `super`로 `[[HomeObject]]`에 접근 가능
		```js
		// ...
		const child = {
			__proto__: parent,
			test() {
				super.test();
			},
		};
		const grandchild = {
			__proto__: child,
			test() {
				super.test();
			},

			// 이렇게 쓰면 안 됨
			test: function() {
				super.test();
			},
		};

		// ...
		```

## private, protected 프로퍼티와 메서드

```js
class Parent {
	_prorected = 20; // _를 붙이는 것은 일종의 컨벤션으로, 실제로 protected처럼 동작하지는 않음
	#private = 10; // 최신 문법, 언어 차원에서 private을 지원

	// getter/setter를 이용해 _protected, #private에 간접 접근 가능하도록 설계(읽기 전용인 경우 setter는 구현하지 않음)
	get protected() {
		return this._protected;
	}

	set protected(val) {
		this._protected = value;
	}

	// 함수에도 사용 가능
	_protectedMethod() {}
	#privateMethod() {}
}
```

## 내장 클래스 확장하기

- `Symbol.species`: `map`, `filter` 등의 메서드를 호출할 때 반환되는 객체의 생성자를 지정 가능
	```js
	class ExtenedArray extends Array {
		static get [Symbol.species]() {
			return Array;
		}
	}

	const arr = new ExtenedArray(1, 2, 3);
	const filtered = arr.filter(v => v === 1);
	console.log(filtered instanceof Array); // true
	console.log(filtered instanceof ExtendedArray); // false
	```

## 'instanceof'로 클래스 확인하기

- `instanceof` 커스터마이징하기
	```js
	class MyClass {
		static [Symbol.hasInstance](obj) {
			if (obj.test) return true;
			return false;
		}
	}

	const obj = { test: 1 };
	console.log(obj instanceof MyClass); // true
	```
- `instanceof`, `typeof`의 대안: `Object.prototoype.toString` 활용
	```js
	const obj = {
		[Symbol.toStringTag]: 'MyClass',
	};

	console.log(Object.prototype.toString.call(obj)); // [object MyClass]
	// 혹은
	console.log({}.toString.call(obj)); // 같은 결과
	```

## 믹스인

- 다중 상속에 사용하는 기법
	```js
	const mixin = {
		mixinMethod() {
			// ...
		},
	};

	class Child extends Parent {
		// ...
	}
	Object.assign(Child.prototype, mixin);

	const child = new Child();
	child.mixinMethod();

	// 믹스인 상속
	const childMixin = {
		__proto__: mixin,
		// ...
	};
	```

<PageTags />
