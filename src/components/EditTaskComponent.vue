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
textarea(
	id="editDescription"
	v-show="task.edited"
	cols="30" rows="3"
	v-model="task.description"
	@keyup.esc="this.$parent.noEdit(task, i)"
	@keyup.enter="this.$parent.doneEdit(task, i)")
p.font-semibold.w-full(v-show="task.edited") Edit Tags
small.mb-3(v-if="task.edited", v-for="(tag, j) in tags", :key="j")
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
			tags: this.$store.state.tags
		}
	}
}
</script>

<style scoped>



.noEdit {
	@apply absolute right-4 bottom-[20.5rem] xs:bottom-72
}
.tasks-list__details input,
.tasks-list__details textarea  {
	@apply w-full justify-start border rounded-md mb-2 ml-2 px-2 py-1 outline-none bg-white text-slate-500 shadow-md font-normal resize-none;
}
.tasks-list__details small {
	@apply ml-2 my-2 justify-start
}
.tasks-list__details small label {
	@apply bg-slate-100 text-gray-400 rounded-md py-[2px] px-2 cursor-pointer shadow-md;
}
</style>