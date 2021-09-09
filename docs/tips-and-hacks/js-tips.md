---
tags:
  - js
---

# 자바스크립트 미세 팁 모음

## Dynamic element의 클릭 이벤트 잡기

```js
$('staticElement').on('eventName', 'selector', function(e) {
	// callback
});
```

Vue, React 등을 쓴다든지 해서 저 `staticElement`가 없는 경우가 발생하는데, 이 때는 `document`를 사용하면 된다.

## strict mode의 `this`는 무엇을 가리키는가

```js
(function() {
  console.log(this); // window
})();

(function() {
  'use strict';
  console.log(this); // undefined
})();
```

## Draggable component 디버깅하기

크롬 개발자 도구의 Source > Show debugger > Event Listener Breakpoints에서 특정 동작에 대한 디버깅 포인트를 설정할 수 있다. `dragend` 트리거를 찍어두면 드래그 시에만 나타나는 컴포넌트의 디버깅이 가능하다.

## Tagged Template Literal

```js
function test(strs, ...values) {
  console.log(strs); // ["abc", "df", "g"]
  console.log(values); // [4, 5]
}

test`abc${4}df${5}g`;
```

## `Object.freeze()`

오브젝트의 내부 값을 수정할 수 없게 한다. 단, 내부 오브젝트는 수정할 수 있다. 따라서 어떤 오브젝트를 완전히 freeze하려면 재귀적으로 내부 오브젝트까지 freeze해야 한다.

```js
const parent = { child: {} };
Object.freeze(parent);
parent.test = 1; // error
parent.child.test = 1; // It works!
```

## `marked`의 점 파싱 이슈

숫자 앞에 점을 찍으면 무조건 ordered list로 인식하는 버그가 있다.

```
2020. 05. 23. (x)
2020\. 05\. 23\. (o)
```

## `switch`의 신박한 사용법

이게 된다고?

```js
switch (true) {
	case 1+1 === 2:
		console.log('It works');
		break;
	default:
		break;
}
```

- [출처](https://seanbarry.dev/posts/switch-true-pattern)

## js `Array.sort`의 기본 정렬 함수

```js
[1, 10, 2].sort() // [1, 10, 2]
[1, 10, 1].sort((a, b) => b-a) // [1, 2, 10]
```

정렬 시 `toString()`이 한 번 실행되는 것으로 보인다. 반드시 정렬 함수를 전달하도록 하자.

## `async ... await`와 함께 for loop 사용하기

`Array.forEach`에서 사용해야 하는 콜백 함수가 `async`인 경우, `forEach` 메서드를 사용하는 대신 `for (item of arr)`를 사용하자

<PageTags />
