---
tags:
  - css
---

# CSS 미세 팁 모음

## CSS overflow

`overflow-x`와 `overflow-y`를 함께 쓸 때, 어느 한 쪽이 `visible`이고 다른 한 쪽은 아니라면, `visible`은 `auto`로 해석된다.

## css 단위계: `ex` & `ch`

- `ex`: 현재 폰트의 `x` 글자 높이값의 n배
- `ch`: 모노스페이스 폰트 `N` 글자 너비값의 n배

## `writing-mode`

글이 쓰이는 방향을 정해줄 수 있다. 워드클라우드 만들 때 좋을 듯

```css
p {
	writing-mode: vertical-lr; # 왼쪽에서 오른쪽으로
	writing-mode: horizontal-tb; # 위에서 아래로
}
```
