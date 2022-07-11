<template lang="pug">
section.tasks
	.info
		.info__title.text-start
			p.text-xl.font-bold Immediate Steps
			p.text-gray-400 These are your immediate steps to complete
		.info__task-left.text-start.my-4
			p.text-slate-500.bg-slate-100.px-4.py-1.w-max.rounded-md
				span.text-blue-400 {{ this.$parent.tasksUncompleted }}
				|  / {{ this.$parent.tasksCreated.length }} tasks left
	.filter
		button.add(@click="") + Add a Task
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
		ul.list
			li(v-for='(task, i) in this.$parent.tasksList', :key='i' :class="this.$parent.taskClass(task)")
				ul.tasks-list__title
					span(
						@click='this.$parent.taskCompleted(task)',
						:class="this.$parent.taskClass2(task)")
					span(class="task-title", @click="edit(task, i)") {{ task.title }}
				ul.tasks-list__tags
					small(v-for='tag in task.tags') {{ tag }}
					span(@click="", class="arrow")
					span(@click='this.$parent.remove(i)', class="remove")
				.tasks-list__details.hidden
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
						input.hidden(
							type="checkbox",
							v-model="task.tags",
							:id="j",
							:value="tag")
						label(:for='j') {{ tag }}
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
	@apply grid w-full max-w-[50rem] my-8 mx-auto p-6 rounded-lg shadow-lg shadow-slate-400
}
.info {
	@apply border-b sm:flex sm:justify-between sm:pb-4 px-2 sm:px-4
}
.filter {
	@apply grid py-4 border-b sm:grid-cols-2 items-center
}
.add {
	@apply bg-green-300 text-white cursor-pointer p-2 mb-4 w-full rounded-md sm:row-start-1 sm:row-end-3 sm:col-start-2 sm:col-end-3 sm:w-40 sm:m-0 sm:justify-self-end
}
.filter__searcher {
	@apply w-full outline-none rounded-md bg-slate-100 mb-2 px-3 py-2 text-slate-500
}
.filter__tags {
	@apply flex justify-start gap-3 mt-2
}
.filter__tags label,
.tasks-list label {
	@apply bg-slate-100 text-gray-400 rounded-md py-[2px] px-2 cursor-pointer
}
.filter__tags input:checked ~ label,
.tasks-list input:checked ~ label {
	@apply bg-green-300 text-white
}
.tasks-list {
	@apply pb-2
}
.tasks-list .list {
	@apply grid
}
.tasks-list .list li {
	@apply grid items-center gap-2 w-full py-3 border-b relative
}
.tasks-list__title {
	@apply flex items-center gap-2
}
.tasks-list__tags {
	@apply grid grid-flow-col justify-start items-center gap-2
}
.tasks-list__tags small {
	@apply bg-green-300 text-white rounded-md px-2
}
.tasks-list__tags span {
	@apply absolute right-2
}
.tasks-list__tags .remove {
	@apply top-3
}

.check {
	width: 20px;
	height: 20px;
	background-image: url("../assets/check.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;
	filter: invert(80%);
}
.uncheck {
	width: 20px;
	height: 20px;
	background-image: url("../assets/uncheck.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;
	filter: invert(60%);
}
.checked .task-title {
	@apply text-gray-400
}
.checked .tasks-list__tags small {
	@apply bg-slate-100 text-gray-400
}

.arrow {
	width: 16px;
	height: 16px;
	background-image: url('../assets/arrow.svg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;
}
.remove {
	width: 20px;
	height: 20px;
	background-image: url('../assets/delete.svg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	cursor: pointer;
	filter: invert(75%);
}
</style>