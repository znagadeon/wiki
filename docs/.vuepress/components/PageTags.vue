<template>
<tags :tags="tags"></tags>
</template>

<script>
import Tags from './Tags.vue';

export default {
	components: {
		Tags,
	},

	computed: {
		tags() {
			return this.$page.frontmatter.tags.map(v => [v, 0]);
		},
	},
}
</script>
