<template lang="pug">
small(
	v-show="task.edited"
	@click='this.$parent.noEdit(task, i)'
	class="remove noEdit")
label.text-lg.font-semibold.pt-6.mt-4.w-full.border-t(
	v-show="task.edited"
	for="editTitle") Edit task
input(
	id="editTitle"
	v-show="task.edited"
	type="text"
	v-model="task.title"
	@keyup.esc="this.$parent.noEdit(task, i)")
textarea.mb-3(
	id="editDescription"
	v-show="task.edited"
	cols="30" rows="3"
	v-model="task.description"
	@keyup.esc="this.$parent.noEdit(task, i)")
ul
	small(v-if="task.edited", v-for="(tag, j) in tags", :key="j")
		input.hidden(
			type="checkbox",
			v-model="task.tags",
			:id="j + 0",
			:value="tag")
		label(:for='j + 0') {{ tag }}
button.done-btn(
	v-if='task.edited',
	@click="this.$parent.doneEdit(task, i)") Done
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
  @apply absolute right-4 bottom-80 xs:bottom-72;
}
.done-btn {
  @apply justify-self-center w-full max-w-sm mt-8 mb-2 py-2 text-white rounded-md bg-primary;
}
.task-item__details input,
.task-item__details textarea {
  @apply w-full max-w-sm justify-self-center
	mt-1 px-2 py-1
	text-sm text-slate-500
	shadow-inner resize-none
	bg-white;
}
.task-item__details ul {
  @apply flex flex-wrap justify-center gap-x-2 gap-y-3;
}
.task-item__details small label {
  @apply py-0.5 px-2
	text-[11.2px] text-slate-400
	cursor-pointer rounded-md shadow-inner
	border
	bg-white;
}
.task-item__details small input:checked ~ label {
  @apply text-white shadow-md bg-primary border-[#42b983];
}
</style>
