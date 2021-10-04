---
tags:
  - js
---

# 프로토타입과 프로토타입 상속

## 프로토타입 상속

```js
const animal = { eats: true };
const rabbit = { jumps: true };
rabbit.__proto__ = animal; // 객체 혹은 null

console.log(Object.keys(rabbit)); // [jumps]
for (let prop in rabbit) {
	if (rabbit.hasOwnProperty(prop)) {
		console.log(`Own: ${prop}`); // Own: jumps
	} else {
		console.log(`Super: ${prop}`); // Super: eats
	}
}
```

## 함수의 prototype 프로퍼티

<https://ko.javascript.info/function-prototype> 이미지 참고

```js
function Rabbit(name) {
	this.name = name;
}
Rabbit.prototype = animal; // new를 이용할 경우에만 쓰임

const rabbit = new Rabbit('MyRabbit'); // rabbit.__proto__ === animal
console.log(rabbit.eats); // true

// prototype을 지정하지 않았을 경우
function NewFunc() {}
console.log(NewFunc.prototype); // { constructor: NewFunc }
// 주의: prototype을 직접 교체하면 constructor가 사라짐. 프로퍼티를 추가하는 방식으로 구현할 것
```

## 프로토타입 메서드와 __proto__가 없는 객체

```js
const rabbit = Object.create(animal, {
	jumps: { value: true, writable: true },
});
// 또는
const rabbit = {};
rabbit.__proto__ = animal;

console.log(Object.getPrototypeOf(rabbit));
// 또는
console.log(rabbit.__proto__);

Object.setPrototypeOf(rabbit, {});
rabbit.__proto__ = {};

// __proto__를 상속받지 않기(__proto__ 오염 방지)
const obj = Object.create(null);
// 혹은 Map을 사용한다
```

<PageTags />
