---
tags:
  - vue
---

# Vue 미세 팁 모음

## `forceUpdate`는 컴포넌트 밖에서 하면 안된다

## `slot`이 비어 있는지 검사하기

```html
<div v-if="$slots.default"></div>
```
