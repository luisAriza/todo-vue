<template lang="pug">
small(
	v-show="task.edited"
	@click='this.$parent.noEdit(task, i)'
	class="remove noEdit")
label.font-semibold.mt-5.w-full(
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
input(
	id="editDescription"
	v-show="task.edited"
	type="textarea"
	rows="3"
	v-model="task.description"
	@keyup.esc="this.$parent.noEdit(task, i)"
	@keyup.enter="this.$parent.doneEdit(task, i)")
p.font-semibold.w-full(v-show="task.edited") Edit Tags
small.mb-3(v-if="task.edited", v-for="(tag, j) in this.$parent.tags", :key="j")
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
	props: ["task", "i"]
}
</script>

<style scoped>
.noEdit {
	@apply absolute right-4 bottom-[17.5rem] xs:bottom-[240px] sm:right-40
}
.tasks-list__details input {
	@apply w-full justify-start border rounded-md mb-2 ml-2 px-2 py-1 outline-none bg-white text-slate-500 shadow-md font-normal;
}
.tasks-list__details small {
	@apply ml-2 my-2 justify-start
}
</style>