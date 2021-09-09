<template>
<section :id="_tag">
	<h2>#{{ _tag }}</h2>
	<ul>
		<!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
		<li v-for="page in pages" v-if="page.title" :key="page.title">
			<router-link :to="page.path">{{ page.title }}</router-link>
		</li>
	</ul>
</section>
</template>

<script>
export default {
	props: ['tag'],

	computed: {
		_tag() {
			return this.tag || 'untagged';
		},
		pages() {
			return this.$site.pages.map(page => {
				return {
					title: page.title,
					path: page.path,
					tags: page?.frontmatter?.tags || [],
				};
			}).filter(page => {
				if (this.tag) {
					return page.tags.indexOf(this.tag) > -1;
				}

				return page.tags.length === 0;
			});
		},
	}
}
</script>
