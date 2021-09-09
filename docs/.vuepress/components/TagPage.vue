<template>
<div>
	<page-list></page-list>
	<page-list v-for="tag in tags" :key="tag" :tag="tag"></page-list>
</div>
</template>

<script>
import PageList from './PageList.vue';

export default {
	components: {
		PageList,
	},

	computed: {
		tags() {
			return Array.from(new Set(this.$site.pages.map(v => v.frontmatter.tags)
				.filter(v => v)
				.flat()));
		},
	},
}
</script>
