<template>
<a class="tag" :href="`/tags.html#${name}`">
	<span class="tag__name">{{ name }}</span>
	<span class="tag__count" v-if="count">{{ count }}</span>
</a>
</template>

<script>
export default {
	props: ['name', 'count'],
}
</script>

<style lang="scss" scoped>
$radius: 5px;
$padding: 5px;

.tag {
	display: inline-flex;
	margin: 2px;

	color: #fff;

	&:hover {
		text-decoration: none !important;
	}

	&__name {
		padding: $padding;
		border-radius: $radius 0 0 $radius;

		background-color: #42b883;

		&:last-child {
			border-radius: $radius;
		}
	}

	&__count {
		padding: $padding;
		border-radius: 0 $radius $radius 0;

		background-color: #35495e;
	}
}
</style>
