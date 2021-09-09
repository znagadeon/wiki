<template>
<div class="tags">
	<tag v-for="tag in tags" :key="tag[0]" :name="tag[0]" :count="tag[1]"></tag>
</div>
</template>

<script>
import Tag from './Tag.vue';

export default {
	props: ['tags'],

	components: {
		Tag,
	},
}
</script>

<style lang="scss" scoped>
.tags {
	margin-top: 20px;
}
</style>
