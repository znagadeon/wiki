---
tags:
  - web
---

# 모르면 고생하는 브라우저 스펙

## IE

- IE는 css에 `initial`, `unset`을 쓸 수 없다.
- IE 팝업 안에서는 referrer를 확인할 수 없다. 정확히는 빈 문자열로 나온다.
- IE는 GET API도 캐싱한다. 꼭 `no-cache`를 붙일 것!

## Safari

- 사파리 팝업 사이즈는 작업표시줄의 높이를 포함해서 height를 계산한다. 팝업 높이가 대략 28px 정도 짧아진다.

<PageTags />
