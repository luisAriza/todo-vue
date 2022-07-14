<template lang="pug">
.filter(v-show="!this.$parent.showAdd")
	button.add(@click="this.$parent.showAdd = true") + Add a Task
	input.filter__searcher(
		v-show="!this.$parent.showAdd"
		id="searcher",
		type="text",
		placeholder="Search",
		v-model="this.$parent.search")
	.filter__tags
		small(v-for="(tag, i) in this.$parent.tags", :key="i + '0'")
			input.hidden(
				type="checkbox",
				:id="i + '0'",
				:value="tag",
				v-model="this.$parent.searchTags")
			label(:for="i + '0'") {{ tag }}
</template>

<script>
export default {
	name: "FilterTask",
}
</script>

<style scoped>

</style>