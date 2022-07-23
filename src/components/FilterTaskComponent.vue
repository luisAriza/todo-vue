<template lang="pug">
.filter(v-show="!showAdd")
	button.add(@click="$store.commit('showAdd')") + Add a Task
	input.filter__searcher(
		id="searcher",
		type="text",
		placeholder="Search task",
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
    };
  },
  computed: {
    showAdd() {
      return this.$store.state.showAdd;
    },
  },
};
</script>

<style scoped lang="postcss">
.filter {
  @apply grid sm:grid-cols-3 items-center py-6 border-b;
  & .add {
    @apply sm:justify-self-end
    w-full sm:w-44
    p-2 mb-3 sm:m-0
    text-white
    cursor-pointer rounded-md
    sm:row-start-1
    sm:row-end-3
    sm:col-start-3
    sm:col-end-4
    bg-primary;
  }
  &__searcher {
    @apply w-full sm:max-w-sm mb-1 px-3 py-2 text-sm text-secondary shadow-md sm:col-span-2;
  }
  &__tags {
    @apply flex flex-wrap justify-start gap-x-2 gap-y-3 mt-2 text-sm sm:col-span-2;
  }
  &__tags label {
    @apply py-[2px] px-2
    text-slate-400
    shadow-md rounded-md cursor-pointer
    border border-slate-200
    bg-slate-50;
  }
  &__tags input:checked ~ label {
    @apply text-white bg-primary border-[#42b983];
  }
}
</style>
