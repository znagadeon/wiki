---
tags:
  - css
---

# 개쩌는 CSS 속성 모음

## `all`

기존 태그가 가지고 있던 모든 속성을 무시한다.

```css
/* old */
.my-component {
	color: red !important;
}

/* new */
.my-component {
	all: 'initial';
	color: red;
}
```

## `appearance: base`

크로스 브라우징 대응 시 모든 스타일을 통일해준다.

- [출처](https://twitter.com/little_bret/status/1380327595909206017)

<PageTags />
