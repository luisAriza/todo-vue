<template lang="pug">
section.tasks
	.info
		.info__title.text-start
			p.text-xl.font-bold Immediate Steps
			p.text-slate-400 These are your immediate steps to complete
		.info__task-left.text-start.text-lg.my-4
			p.text-slate-500 {{ this.$parent.tasksUncompleted }} / {{ this.$parent.tasksCreated.length }} tasks left
	.filter
		label.text-xl(for="searcher") Task List
		input.filter__searcher(
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
	.tasks-list
		ul
			li(v-for='(task, i) in this.$parent.tasksList', :key='i' :class="this.$parent.taskClass(task)")
				span(
					@click='this.$parent.taskCompleted(task)',
					:class="this.$parent.taskClass2(task)")
				span(@click="edit(task, i)") {{ task.title }}
				span(@click="edit(task, i)") V
				span(v-show="!task.edited", @dblclick="edit(task, i)") {{ task.description }}
				small(
					class="tasks-list__tags",
					v-show="!task.edited",
					v-for='tag in task.tags') {{ tag }}
				input(v-show="task.edited"
					type="text"
					v-model="task.title"
					@keyup.esc="noEdit(task, i)"
					@keyup.enter="this.$parent.doneEdit(task, i)")
				input(v-show="task.edited"
					type="textarea"
					v-model="task.description"
					@keyup.esc="noEdit(task, i)"
					@keyup.enter="this.$parent.doneEdit(task, i)")
				small(v-show="task.edited", v-for="(tag, j) in this.$parent.tags", :key="j")
					input(
						type="checkbox",
						v-model="task.tags",
						:id="j",
						:value="tag")
					label(:for='j') {{ tag }}
				span(@click='this.$parent.remove(i)', class="remove")
</template>

<script>
export default {
	name: "TaskList",
	methods: {
		edit(task, i) {
			return this.$parent.edit(task, i)
		},
		noEdit(task, i) {
			return this.$parent.noEdit(task, i)
		}
	}
}
</script>

<style scoped>
.tasks {
	@apply grid w-full my-8 p-5 rounded-lg shadow-md shadow-slate-400
}
.info {
	@apply border-b
}
.filter {
	@apply py-4 border-b
}
.filter__searcher {
	@apply w-full outline-none rounded-lg bg-slate-100 my-2 px-3 py-2
}
.filter__tags {
	@apply flex justify-center gap-3 my-2
}
.filter__tags label {
	@apply bg-slate-100 rounded-full py-1 px-2
}
.filter__tags input:checked ~ label {
	@apply bg-green-300
}
.tasks-list {
	@apply py-4
}
.tasks-list ul {
	@apply grid gap-1
}
.tasks-list ul li {
	@apply flex justify-between items-center w-full
}
.tasks-list__tags {
	@apply bg-green-300 rounded-full py-1 px-2
}
.tasks-list label {
	@apply bg-slate-100 rounded-full py-1 px-2
}
.check {
	width: 20px;
	height: 20px;
	background-image: url("../assets/check.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}

.checked {
	@apply text-slate-400 cursor-pointer
}
.uncheck {
	width: 20px;
	height: 20px;
	background-image: url("../assets/uncheck.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
.unchecked {
	@apply text-slate-900 cursor-pointer
}
.remove {
	width: 20px;
	height: 20px;
	background-image: url('../assets/delete.svg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>