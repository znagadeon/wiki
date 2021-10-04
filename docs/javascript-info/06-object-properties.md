---
tags:
  - js
---

# 객체 프로퍼티 설정

## 프로퍼티 플래그와 설명자

```js
const user = { name: 'John' }; // 플래그 기본값 모두 true

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
/*
{
	// 값
	value: 'John',

	// 플래그
	writable: true, // 값을 수정할 수 있음
	enumerable: true, // 반복문을 사용해 나열할 수 있음 (for ... in에서 나타남)
	configurable: true, // 프로퍼티를 삭제하거나 프로퍼티 플래그를 수정할 수 있음
}
*/

// Object.defineProperty로 객체 프로퍼티의 플래그를 변경할 수 있다(기본값 false)
Object.defineProperty(user, 'name', {
	value: 'Alice',
	writable: true, // writable을 제외한 두 플래그는 false로 지정
	// 이 때, configurable이 false더라도 writable을 true에서 false로 바꾸는 동작은 가능
});

// 혹은
Object.defineProperties(user, {
	name: { value: 'Alice', writable: true },
});

// 객체 완전히 복사하기(기존 방법은 플래그, 심볼형 키를 복사하지 못함)
const perfectClone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
```

- 객체 전체 프로퍼티에 적용 가능한 메서드
	- `Object.preventExtensions`: 새로운 프로퍼티 추가 금지
	- `Object.seal`: 새로운 프로퍼티 추가 및 삭제 금지
	- `Object.freeze`: 새로운 프로퍼티 추가, 삭제 및 기존 프로퍼티 수정 금지
	- `Object.isExtensible`, `Object.isSealed`, `Object.isFrozen`: 위 세 개 메서드가 콜되었는지를 검사 가능

## 프로퍼티 getter와 setter

```js
const user = { name: 'John', surname: 'Smith' };
Object.defineProperty(user, 'fullName', {
	get() {
		return `${this.name} ${this.surname}`;
	},

	set(value) {
		[this.name, this.surname] = value.split(' ');
	},

	writable: false,
	enumerable: false,
	configurable: true,
})
```

<PageTags />
