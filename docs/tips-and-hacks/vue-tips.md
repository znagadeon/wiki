---
tags:
  - vue
  - js
---

# Vue 미세 팁 모음

## `vm.$forceUpdate`

Real DOM을 강제로 업데이트한다. input 태그에 뭔가를 입력했는데 길이 제한으로 얼럿을 주고 잘라내야한다든지 할 때 쓰인다.

```js
export default {
	computed: {
		title: {
			get() {
				return this.$store.getters.title;
			},
			set(title) {
				if (title.length > 10) {
					alert('Too long!!');
					this.$forceUpdate();
				} else {
					this.$store.commit('updateTitle', title);
				}
			}
		},
	},
}
```

이 때, `forceUpdate`는 수정하고 싶은 DOM이 있는 바로 그 자리에서 실행해야 한다. 예를 들어 부모 컴포넌트에서는 실행해도 동작하지 않는다.

## `slot`이 비어 있는지 검사하기

```html
<div v-if="$slots.default"></div>
```

## vuex에서 `dispatch`를 콜하면 무조건 `Promise`를 반환한다

<PageTags />
