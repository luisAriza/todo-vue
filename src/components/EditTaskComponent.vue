<template lang="pug">
small(
	v-show="task.edited"
	@click='this.$parent.noEdit(task, i)'
	class="remove noEdit")
label.font-semibold.pt-5.mt-4.w-full.border-t(
	v-show="task.edited"
	for="editTitle") Edit Title
input(
	id="editTitle"
	v-show="task.edited"
	type="text"
	v-model="task.title"
	@keyup.esc="this.$parent.noEdit(task, i)"
	@keyup.enter="this.$parent.doneEdit(task, i)")
label.font-semibold.w-full(
	v-show="task.edited"
	for="editDescription") Edit Description
textarea(
	id="editDescription"
	v-show="task.edited"
	cols="30" rows="3"
	v-model="task.description"
	@keyup.esc="this.$parent.noEdit(task, i)"
	@keyup.enter="this.$parent.doneEdit(task, i)")
p.font-semibold.w-full(v-show="task.edited") Edit Tags
ul
	small(v-if="task.edited", v-for="(tag, j) in tags", :key="j")
		input.hidden(
			type="checkbox",
			v-model="task.tags",
			:id="j + 0",
			:value="tag")
		label(:for='j + 0') {{ tag }}
</template>

<script>
export default {
  name: "EditTask",
  props: ["task", "i"],
  data() {
    return {
      tags: this.$store.state.tags,
    };
  },
};
</script>

<style scoped lang="postcss">
.noEdit {
  @apply absolute right-4 bottom-[20rem] xs:bottom-[18rem];
}
.tasks-list__details input,
.tasks-list__details textarea {
  @apply w-full justify-start
	mt-1 mb-3 px-2 py-1
	text-sm text-slate-500
	shadow-inner resize-none
	bg-white;
}
.tasks-list__details ul {
  @apply flex flex-wrap gap-x-2 gap-y-3 my-2;
}
.tasks-list__details small label {
  @apply py-0.5 px-2 text-[11.2px] text-gray-400 cursor-pointer rounded-md shadow-md bg-white;
}
</style>
