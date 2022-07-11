<template lang="pug">
section.tasks
	.info
		.info__title.text-start
			p.text-xl.font-bold Immediate Steps
			p.text-gray-400 These are your immediate steps to complete
		.info__task-left.text-start.my-4
			p.text-slate-500.bg-slate-100.px-4.py-1.w-max.rounded-md
				span.text-blue-400 {{ tasksUncompleted }}
				|  / {{ tasksCreated.length }} tasks left
	.filter(v-show="!showAdd")
		button.add(@click="showAdd = true") + Add a Task
		input.filter__searcher(
			v-show="!showAdd"
			id="searcher",
			type="text",
			placeholder="Search",
			v-model="search")
		.filter__tags
			small(v-for="(tag, i) in tags", :key="i + '0'")
				input.hidden(
					type="checkbox",
					:id="i + '0'",
					:value="tag",
					v-model="searchTags")
				label(:for="i + '0'") {{ tag }}
	AddTask
	.tasks-list
		ul.list
			li(v-for='(task, i) in tasksList', :key='i' :class="taskClass(task)")
				ul.tasks-list__title
					span(
						@click='taskCompleted(task)',
						:class="taskClass2(task)")
					span(class="task-title") {{ task.title }}
				ul.tasks-list__tags
					small(v-for='tag in task.tags') {{ tag }}
					span(
						v-if='!task.edited',
						@click="edit(task, i)",
						class="edit")
					span(
						v-else,
						@click="doneEdit(task, i)"
						class="edit")
					span(
						@click="taskDetails(task)",
						class="arrow",
						:class="task.details ? 'rotate' : ''")
					span(@click='remove(i)', class="remove")
				.tasks-list__details(:class="task.details ? 'flex' : 'hidden'")
					p.font-bold Description
					span(class="description") {{ task.description }}
					small(
						v-show="task.edited"
						@click='noEdit(task, i)'
						class="remove noEdit")
					label.font-semibold(
						v-show="task.edited"
						for="editTitle") Edit title
					input(
						id="editTitle"
						v-show="task.edited"
						type="text"
						v-model="task.title"
						@keyup.esc="noEdit(task, i)"
						@keyup.enter="doneEdit(task, i)")
					label.font-semibold(
						v-show="task.edited"
						for="editDescription") Edit description
					input(
						id="editDescription"
						v-show="task.edited"
						type="textarea"
						rows="3"
						v-model="task.description"
						@keyup.esc="noEdit(task, i)"
						@keyup.enter="doneEdit(task, i)")
					small(v-if="task.edited", v-for="(tag, j) in tags", :key="j")
						input.hidden(
							type="checkbox",
							v-model="task.tags",
							:id="j + 0",
							:value="tag")
						label(:for='j + 0') {{ tag }}
</template>

<script>
import AddTask from "@/components/AddTask.vue";

export default {
	name: "TaskList",
	components: {
		AddTask
	},
	data() {
		return {
			cache: "",
			search: "",
			showAdd: false,
			searchTags: [],
			tasksCreated: [],
			tags: [
				"Work",
				"Study",
				"Gym",
				"Urgent",
				"Important"
			]
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");

			return JSON.parse(tasks);
		},
		tasksRecordsUser() {
			let user = localStorage.getItem("user");
			let tasksRecords = this.tasksRecords;

			// Index(posición en el array) del user a identificar en tareas registradas
			let tasksIndexUser = tasksRecords.findIndex((v) => v.user == user);
			// User seleccionado en tareas registradas
			if (user != null || undefined) {
				let tasksUser = tasksRecords[tasksIndexUser].tasks

				return tasksUser;
			}
		},
		searchFilter() {
			return (item) => {
				if (this.search) {
					return item.title.toLowerCase()
						.includes(this.search.toLowerCase())
						||
						item.description.toLowerCase()
							.includes(this.search.toLowerCase())
				} else {
					return item.tags.sort().join('')
						.includes(this.searchTags.sort().join(''))
				}
			}
		},
		tasksList() {
			return this.tasksCreated.filter(this.searchFilter)
		},
		tasksUncompleted() {
			return this.tasksCreated.filter((task) => {
				return !task.completed;
			}).length;
		}
	},
	methods: {
		taskCompleted(task) {
			(task.completed = !task.completed)
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		taskClass(task) {
			return [task.completed ? "checked" : "unchecked"];
		},
		taskClass2(task) {
			return [task.completed ? "check" : "uncheck"];
		},
		taskDetails(task) {
			task.edited = false;
			task.details = !task.details;
		},
		edit(task, i) {
			this.cache = {
				title: this.tasksList[i].title,
				description: this.tasksList[i].description,
				tags: this.tasksList[i].tags
			}
			this.tasksCreated.edited = false
			task.edited = true;
			task.details = true;
		},
		doneEdit(task, i) {
			if (!this.tasksList[i].title) {
				this.remove(i)
			}
			task.edited = false;
			task.details = false;
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		noEdit(task, i) {
			this.tasksCreated[i] = {
				title: this.cache.title,
				description: this.cache.description,
				tags: this.cache.tags
			}
			task.edited = false;
		},
		remove(i) {
			let sizeTaskCreated = this.tasksCreated.length
			let sizeTaskList = this.tasksList.length

			if (sizeTaskCreated == sizeTaskList) {
				this.tasksCreated.splice(i, 1)
			} else if (sizeTaskCreated > sizeTaskList) {
				this.tasksCreated
					.splice(this.tasksCreated
						.indexOf(this.tasksList
							.splice(i, 1)[0]), 1)
			}
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
	},
	created() {
		if (localStorage.getItem("tasks") != null) {
			this.tasksCreated = this.tasksRecordsUser;
		}
	}
}
</script>

<style scoped>

.tasks-list__details {
	@apply w-full justify-start flex-wrap gap-1
}
.tasks-list__details span {
	@apply w-full text-start mb-3 ml-2
}
.tasks-list__details input {
	@apply w-full justify-start border rounded-md mb-2 ml-2 px-2 py-1 outline-none bg-slate-100 text-slate-500;
}
.tasks-list__details small {
	@apply mr-3 my-1 justify-start
}
.noEdit {
	@apply absolute right-0 top-32 sm:right-32 sm:top-28
}
</style>