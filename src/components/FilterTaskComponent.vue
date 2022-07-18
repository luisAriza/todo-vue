<template lang="pug">
.filter(v-show="!showAdd")
	button.add(@click="$store.commit('showAdd')") + Add a Task
	input.filter__searcher(
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
			tags: this.$store.state.tags,
		}
	},
	computed: {
		showAdd() {
			return this.$store.state.showAdd;
		}
	}
}
</script>

<style scoped>

.filter {
	@apply grid py-6 border-b sm:grid-cols-3 items-center;
}

.add {
	@apply bg-green-600 text-white cursor-pointer p-2 mb-4 w-full rounded-md sm:w-44 sm:row-start-1 sm:row-end-3 sm:col-start-3 sm:col-end-4 sm:m-0 sm:justify-self-end;
}

.filter__searcher {
	@apply w-full font-normal sm:max-w-sm outline-none rounded-md bg-slate-100 mb-2 px-3 py-2 text-slate-500 shadow-md sm:col-span-2;
}

.filter__tags {
	@apply flex flex-wrap justify-start gap-2 gap-y-3 mt-2 sm:col-span-2;
}

.filter__tags label {
	@apply bg-slate-100 text-gray-400 rounded-md py-[2px] px-2 cursor-pointer shadow-md;
}

.filter__tags input:checked ~ label {
	@apply bg-green-600 text-white;
}
</style>