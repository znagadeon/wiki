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
			const tagMap = this.$site.pages.map(v => v.frontmatter.tags)
				.filter(v => v)
				.flat()
				.reduce((acc, current) => {
					return {
						...acc,
						[current]: acc[current] ? acc[current] + 1 : 1,
					};
				}, {});

			return Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
		},
	},
}
</script>
