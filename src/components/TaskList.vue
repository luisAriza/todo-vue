<template lang="pug">
section.tasks
	.info
		.info__title.text-start
			p.text-xl.font-bold Immediate Steps
			p.text-gray-400 These are your immediate steps to complete
		.info__task-left.text-start.mt-4.mb-6
			p.text-slate-500.bg-green-50.px-4.py-1.w-max.rounded-md
				span.text-blue-400 {{ tasksUncompleted }}
				|  / {{ tasksCreated.length }} tasks left
	FilterTask
	AddTask
	.tasks-list
		ul.list
			li(v-for='(task, i) in tasksList', :key='i' :class="classChecked(task)")
				ul.tasks-list__title
					span(
						@click='taskCompleted(task)',
						:class="classCheck(task)")
					span(
						class="task-title",
						:class="task.details ? 'show-title' : ''") {{ task.title }}
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
					p.font-bold.w-full Description
					span(class="description") {{ task.description }}
					EditTask(:task="task" :i="i")
</template>

<script>
import FilterTask from "@/components/FilterTaskComponent.vue";
import AddTask from "@/components/AddTaskComponent.vue";
import EditTask from "@/components/EditTaskComponent.vue";

export default {
	name: "TaskList",
	components: {
		FilterTask,
		AddTask,
		EditTask
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
			task.edited = false;
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		classChecked(task) {
			return [task.completed ? "checked" : "unchecked"];
		},
		classCheck(task) {
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
			task.details = true;
			task.edited = true;
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
	@apply w-full justify-start flex-wrap gap-1 bg-green-50 rounded-md mt-3 px-3 py-6 shadow-md
}
.tasks-list__details .description {
	@apply w-full text-start pb-4 pl-2 border-b font-normal
}
</style>