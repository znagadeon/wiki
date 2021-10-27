---
tags:
  - js
---

# 이벤트 기초

## 브라우저 이벤트 소개

- 내가 몰랐던 이벤트들
	- `contextmenu`: 요소 위에서 마우스 오른쪽 클릭
	- `transitionend`: CSS 애니메이션 종료
- `addEventListener`의 세 번째 인자 `options`
	- `once`: `true`일 경우 리스너가 한 번만 실행된 뒤 바로 삭제됨
	- `capture`: `true`일 경우 리스너가 capture phase에 실행됨
		- `removeEventListener` 사용 시 `capture`값이 같아야 리스너가 삭제됨
	- `passive`: `true`일 경우 리스너의 `preventDefault`가 무시됨
		- `preventDefault`를 사용하지 않겠다고 명시해 줌으로써 해당 메서드가 실행되었는지 체크하는 동안의 불필요한 지연을 방지
		- ex) `touchstart`, `touchmove` 이벤트는 기본 스크롤 동작을 가지고 있으므로 `passive`가 `false`일 경우 덜덜 떨리는 동작 발생
- `obj.handleEvent` 메서드를 사용하여 객체를 이벤트 핸들러에 할당할 수 있다.
	```js
	const obj = {
		handleEvent(event) {
			// ...
		},
	};

	element.addEventListener('click', obj);
	```

## 버블링과 캡처링

- 이벤트는 가장 하위 요소부터 `document`까지 버블링되며 올라온다.
- `event.target`은 이벤트가 최초로 발생한 요소를, `event.currentTarget`은 현재 리스너가 붙어 있는 요소를 나타낸다.
- `stopPropagation` vs `stopImmediatePropagation`
	```js
	element1.addEventListener('click', (e) => {
		e.stopPropagation();
	});
	element1.addEventListener('click', (e) => {
		console.log('여기는 실행된다');
	});
	element1.parentElement.addEventListener('click', (e) => {
		console.log('여기는 실행되지 않는다');
	});

	element2.addEventListener('click', (e) => {
		e.stopImmediatePropagation();
	});
	element2.addEventListener('click', (e) => {
		console.log('여기도 실행되지 않는다');
	});
	element2.parentElement.addEventListener('click', (e) => {
		console.log('여기는 실행되지 않는다');
	});
	```
- 이벤트 전파: capture -> target -> bubbling

## 이벤트 위임

- 행동 패턴: 요소에 선언적 방식으로 행동을 추가하기
	```html
	<button type="button" data-counter>0</button>

	<script>
		document.addEventListener('click', (e) => {
			if (e.target.dataset.counter !== undefined) {
				e.target.textContent = parseInt(e.target.textContent) + 1;
			}
		});
	</script>
	```

## 브라우저 기본 동작

- 후속 이벤트: 첫 번째 이벤트가 막히면 다음 번 이벤트가 발생하지 않는다.
	- ex) `mousedown` -> `focus` (`focus` 이벤트 자체가 막힌 것은 아니므로 키보드로 focus할 수 있다)
- `event.defaultPrevented`: 기본 동작이 막혔는지를 검사하는 프로퍼티

## 커스텀 이벤트 디스패치

```js
const event = new Event('my-event', {
	bubbles: true, // 이벤트 버블링 발생 (default: false)
	cancelable: true, // true인 경우 preventDefault를 사용할 수 있음 (default: false)
});

document.addEventListener('my-event', e => {
	console.log(e.isTrusted); // 사용자 액션에 의해 발생한 이벤트라면 true, 이 경우에는 false
});

element.dispatchEvent(event); // element에서 my-event 발생

// 기본 이벤트를 상속받은 UI 이벤트
// 목록: https://ko.javascript.info/dispatch-events#ref-849
const clickEvent = new MouseEvent('click', {
	bubbles: true,
	cancelable: true,
	clientX: 100,
	clientY: 100,
});

// 커스텀 이벤트
document.addEventLisener('message', e => {
	if (!confirm('이벤트 실행')) {
		e.preventDefault();
	}
});

button.addEventListener('click', e => {
	const customEvent = new CustomEvent('message', {
		cancelable: true,
		detail: { message: 'hello' },
	});

	if (element.dispatchEvent(customEvent)) { // confirm이 true인 경우 hello 출력
		console.log(e.detail.message);
	} else {
		console.log('이벤트 취소됨');
	}
});
```

- 이벤트의 실행 순서
	```js
	const dispatch = (num) => {
		button.dispatchEvent(new CustomEvent('custom', {
			bubbles: true,
			detail: { num },
		}));
	}

	// 순서대로 1, 2, 3, 4 출력
	button.addEventListener('click', e => {
		console.log(1);

		dispatch(2);

		setTimeout(() => {
			dispatch(4);
		}, 0);

		console.log(3);
	});

	document.addEventListener('custom', e => {
		console.log(e.detail.num);
	});
	```

<PageTags />
