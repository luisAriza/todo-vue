<template lang="pug">
.filter(v-show="!this.$store.state.showAdd")
	button.add(@click="this.$store.state.showAdd = true") + Add a Task
	input.filter__searcher(
		v-show="!this.$store.state.showAdd"
		id="searcher",
		type="text",
		placeholder="Search",
		v-model="this.$parent.search")
	.filter__tags
		small(v-for="(tag, i) in tags", :key="i + '0'")
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
	data() {
		return {
			tags: this.$store.state.tags
		}
	}
}
</script>

<style scoped>

</style>