---
tags:
  - js
---

# 문서

## 브라우저 환경과 다양한 명세서

- 호스트 환경: js가 돌아가는 플랫폼(호스트)가 제공하는 해당 호스트에 특정된 기능 목록
- 브라우저 호스트 환경
	- window: 전역 객체/브라우저 창 제어
		- DOM(Document Object Model): 웹 페이지 내의 모든 콘텐츠를 객체로 제공, 수정 가능
			- document 객체로 제어
			- DOM은 브라우저가 아닌 곳에서도 사용할 수 있다(html 파싱 등등)
		- BOM(Browser Object Model): 문서 이외의 것들을 제어(브라우저 정보, url 등)
			- HTML 스펙에 포함

## DOM 트리

- `head` 태그 앞에 오는 공백 및 새 줄은 무시
- `body` 뒤에 콘텐츠가 있더라도 무조건 `body` 안쪽으로 옮겨짐(따라서, `body` 뒤에는 공백이 없음)

## DOM 탐색하기

- Root Elements
	```js
	console.log(document.documentElement); // html 태그
	console.log(document.head); // head 태그
	console.log(document.body); // body 태그
	```
- `Node` vs `Element`: `Node`는 텍스트 노드나 주석 노드도 포함한다.
	```js
	console.log(document.documentElement.parentNode); // document
	console.log(document.documentElement.parentElement); // null, document는 노드는 맞지만 요소 노드는 아니다.

	console.log(element.childNodes); // Node
	console.log(element.children); // Element
	```
- 테이블의 추가 프로퍼티
	- `table.rows`, `tbody.rows`: `tr` 요소 컬렉션
	- `table.caption`, `table.tHead`, `table.tFoot`
	- `table.tBodies`: `tbody` 요소 컬렉션(`tbody`는 테이블에 무조건 최소 한 개 존재함)
	- `tr.cells`
	- `tr.selectionRowIndex`: `tr`이 부모 아래 몇 번째 줄인지에 대한 니덱스
	- `tr.rowIndex`: `tr`이 `table` 아래 몇 번째 줄인지에 대한 인덱스
	- `td.cellIndex`

## getElement*, querySelector*로 요소 검색하기

- `querySelector`에는 가상 선택자도 사용할 수 있다. `:hover`처럼 여러 개가 선택되는 경우 `html`부터 상위 요소 순으로 반환된다.
- `element.mathces(css)`: 해당 요소가 css 선택자와 일치하는지 확인

## 주요 노드 프로퍼티

- [DOM Node의 상속 구조](https://ko.javascript.info/basic-dom-node-properties#ref-767)

## 속성과 프로퍼티

- `input.value`는 속성에서 프로퍼티 방향으로만 이루어진다.
	```js
	input.setAttribute('value', 'hello');
	console.log(input.value); // hello

	input.value = 'bye';
	console.log(input.getAttribute('value')); // hello <- DOM에서는 수정되지만 attribute는 그대로
	```
- 일부 프로퍼티는 속성값과 다르다.
	```html
	<a id="anchor" href="#hash">Link</a>
	<script>
		const anchor = document.getElementById('anchor');

		console.log(anchor.getAttribute('href')); // #hash
		console.log(anchor.href); // https://example.com/page#hash
	</script>
	```

## 문서 수정하기

|삽입하는 위치|이스케이프하기|이스케이프하지 않기(`insertAdjacentHTML`)|
|---|---|---|
|요소의 앞|`before`|`beforebegin`|
|요소의 뒤|`after`|`afterend`|
|요소의 firstChild 앞|`prepend`|`afterbegin`|
|요소의 lastChild 뒤|`append`|`beforeend`|
|요소를 바꿔치기하기|`replaceWith`|없음|

- 기존에 있던 노드를 다른 노드로 옮길 때, 삽입 메서드를 이용하면 자동으로 노드를 삭제하고 새 노드로 이동시킨다.
- `element.cloneNode(deep: Boolean)`: 노드 복사하기

## 스타일과 클래스

- `getComputedStyle(element, [pseudo])`: `element`의 계산된 스타일 정보 반환
	- `:visited`에 적용된 스타일은 보안상 이슈로 가져올 수 없다(사용자가 해당 페이지에 방문했는지를 알아낼 수 있음).

## 요소 사이즈와 스크롤

- 기하 프로퍼티
	- `element.offsetParent`
		1. `position`이 `static`이 아닌 가장 가까운 조상
		2. 1이 없을 경우 `td`, `th`, 혹은 `table`
		3. 2가 없을 경우 `body`
	- `element.offsetLeft`, `element.offsetTop`: `element`가 `element.offsetParent`로부터 떨어져 있는 거리₩
	- `element.offsetWidth`, `element.offsetHeight`: `border`를 포함하는 `element`의 크기
	- `element.clientTop`, `element.clientLeft`: 요소 내 실제 콘텐츠의 위치(대개 `border`의 크기이나, RTL 언어인 경우 스크롤바 크기가 포함될 수 있음)
	- `element.clientWidth`, `element.clientHeight`: `border`, 스크롤바 크기를 제외한 콘텐츠의 크기(content size + padding)
	- `element.scrollWidth`, `element.scrollHeight`: 오버플로우된 영역을 포함한 클라이언트 사이즈(스크롤바 크기만큼 제외)
	- `element.scrollTop`, `element.scrollLeft`: 스크롤이 움직인 거리
- [자세히 보기](https://ko.javascript.info/size-and-scroll)

## 브라우저 창 사이즈와 스크롤

- 브라우저 창의 너비와 높이 구하기
	```js
	// 스크롤바를 포함
	console.log(window.innerWidth);
	console.log(window.innerHeight);

	// 스크롤바를 포함하지 않음
	console.log(document.documentElement.clientWidth);
	console.log(document.documentElement.clientHeight);
	```
- 문서의 너비와 높이 구하기
	```js
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);
	```
- 스크롤 위치 구하기
	```js
	console.log(window.pageXOffset);
	console.log(window.pageYOffset);
	```
- 스크롤 위치 변경하기
	```js
	window.scrollBy(x, y); // 현재 위치를 기준으로 이동
	window.scrollTo(x, y); // 페이지의 절대 위치로 이동

	element.scrollIntoView(true); // element가 문서의 최상단에 오도록 스크롤
	element.scrollIntoView(false); // element가 문서의 최하단에 오도록 스크롤
	```

## 좌표

- 좌표의 구분
	- 브라우저 화면의 최상단을 기준으로 계산: `clientX`, `clientY`
	- 문서의 최상단을 기준으로 계산(스크롤을 해도 값이 변하지 않음): `pageX`, `pageY`
- `getBoundingClientRect`: 브라우저 화면을 기준으로 x, y, width, height 등의 좌표 정보를 반환
	- 호환성 이슈가 있으니 주의해서 사용할 것!
	- <https://ko.javascript.info/coordinates#ref-1140>
- `document.elementFromPoint(x, y)`: `x`, `y`에서 제일 가까운 요소 반환

<PageTags />
