---
tags:
  - html
---

# HTML 미세 팁 모음

## 크롬 모바일 웹 상단바 색상 넣는 법

```html
<meta name="theme-color" content="#123456">
```

## `<button>` 태그에는 타입을 넣어 주자

`<button>`에 아무 타입을 주지 않으면, `<form>` 안에서는 `type=submit`이라고 인식한다.

## `a` 태그 아래 알 수 없는 높이값이 추가될 때

`line-height: 0`을 주면 해결

- [출처](https://stackoverflow.com/questions/8997532/a-tag-taking-some-extra-space-in-html)
