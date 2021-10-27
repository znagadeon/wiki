---
tags:
  - js
---

# UI 이벤트

## 마우스 이벤트

- 종류
	- `click`: 마우스 왼쪽 버튼 클릭
	- `contextmenu`: 마우스 오른쪽 버튼 클릭
	- `mousedown`, `mouseup`: 마우스 버튼을 눌렀을 때, 뗐을 때
	- `mousemove`: 마우스를 움직일 때
	- `mouseover`, `mouseout`, `mouseenter`, `mouseleave`
		- over와 enter는 마우스가 특정 요소로 진입할 때
		- out과 leave는 마우스가 특정 요소를 떠날 때
		- enter와 leave는 요소의 자식을 지날 때 트리거되지 않음
	- `dblclick`: 더블클릭

```js
document.body.addEventListener('click', e => {
	// 클릭한 버튼
	console.log(e.button); // 왼쪽 버튼: 0, 오른쪽 버튼: 2, 가운데 버튼: 1

	console.log(e.shiftKey); // shift 키를 누르고 클릭한 경우 true
	console.log(e.altKey); // alt/opt 키를 누르고 클릭한 경우 true
	console.log(e.ctrlKey); // ctrl 키를 누르고 클릭한 경우 true
	console.log(e.metaKey); // cmd 키를 누르고 클릭한 경우 true

	console.log(e.clientX, e.clientY); // 브라우저에서의 클릭 좌표
	console.log(e.pageX, e.pageY); // 페이지에서의 클릭 좌표
});
```

## Moving the mouse: mouseover/out, mouseenter/leave

```js
element.addEventListener('mouseover', e => {
	console.log(e.relatedTarget); // 마우스가 이전에 있던 요소
	console.log(e.target); // 현재 마우스를 올린 요소
});
```

## 드래그 앤 드롭과 마우스 이벤트

```js
// mousedown, mousemove, mouseup 이벤트를 이용한 방법
element.addEventListener('mousedown', e => {
	const rect = element.getBoundingClientRect();
	let droppable = false;

	// element의 position은 absolute
	const moveTo = (x, y) => {
		element.style.top = `${x - rect.top}px`;
		element.style.left = `${y - rect.left}px`;
	};

	const onMouseMove = e => {
		moveTo(e.pageX, e.pageY);

		// 드롭 가능한 영역인지 확인
		element.hidden = true;
		const below = document.elementFromPoint(e.clientX, e.clientY);
		element.hidden = false;

		if (!below) return;

		const droppableElem = below.closest('.droppable');
		if (droppableElem) {
			droppable = true;
		}
	};
	const onMouseUp = e => {
		if (!droppable) {
			alert('이 위치에서는 내려놓을 수 없습니다');
			// 기타 처리...
		}

		document.removeEventListener('mousemove', onMouseMove);
		element.removeEventListener('mouseup', onMouseUp);
	};

	moveTo(e.pageX, e.pageY);

	document.addEventListener('mousemove', onMouseMove);
	element.addEventListener('mouseup', onMouseUp);

	// drag 기본 이벤트와 충돌 방지
	element.addEventListener('dragstart', e => {
		e.preventDefault();
	});
});
```

## Pointer events

- 마우스/터치 이벤트를 일반화한 것
	```js
	element.addEventListener('pointerdown', e => { // mousedown에 대응
		console.log(e.pointerId); // 브라우저가 자동으로 부여하는 포인터의 id값(멀티 터치 대응)
		console.log(e.pointerType); // 어떤 방식으로 클릭했는지(마우스, 터치, 스타일러스 펜, ...)을 문자열로 표시
		console.log(e.isPrimary); // 멀티터치의 첫 번째 터치라면 true

		console.log(e.width, w.height); // 포인터가 가리키는 너비/높이(지원되지 않는 경우 1)
		console.log(e.pressure); // 포인터의 압력(지원되지 않는 기기는 눌렸을 때 0.5, 뗐을 때 0)
		console.log(e.tangentialPressure); // normalize된 압력값
		console.log(e.tiltX, e.tiltY, e.twist); // 스타일러스 펜의 tilt, twist 값
	});
	```
- `pointercancel` 이벤트
	- 브라우저의 기본 동작이 실행되며 더이상 포인터 이벤트가 동작하지 않을 때 발생
	- 브라우저 기본 동작을 꺼주면(`preventDefault`, `touch-action: none`) 발생하지 않음
- Pointer Capture
	- 이벤트가 발생하는 요소를 포인터가 최초로 인터렉션한 요소로 고정
	- 슬라이더 등, 특정 방향으로만 이동하는 드래그 요소는 종종 포인터가 요소의 바깥으로 이동하는 경우가 발생할 수 있는데 이 경우에도 정상적으로 `pointerup` 이벤트가 발생하도록 도와줌
	```js
	const slide = (e) => {
		const elem = e.currentTarget;
		const rect = elem.getBoundingClientRect();
		e.currentTarget.style.transform = `translate(${e.clientX - rect.left}px)`;
	};

	element.addEventListener('pointerdown', e => {
		element.addEventListener('pointermove', slide);
		element.setPointerCapture(e.pointerId); // gotpointercapture 이벤트 발생
	});

	element.addEventListener('pointerup', e => {
		element.removeEventListener('pointermove', slide);

		// 안 써줘도 됨
		element.releasePointerCapture(e.pointerId); // lostpointercapture 이벤트 발생
	});
	```

## Keyboard: keydown and keyup

```js
input.addEventListener('keydown', e => {
	console.log(e.key); // 내가 눌러서 나온 문자열
	console.log(e.code); // 키보드에서 내가 누른 키의 코드값

	console.log(e.repeat); // keydown한 상태로 떼지 않을 경우 true
});
```

- OS-based 명령은 `preventDefault`로 취소할 수 없다.
	- ex) `Alt + F4`

## Scrolling

- 스크롤 이벤트는 브라우저 기본 동작 스크롤이 진행되고 난 뒤 발생한다. 스크롤 동작 자체를 막으려면 스크롤을 '발생시키는' 이벤트에서 `preventDefault`를 사용해야 한다.

<PageTags />
