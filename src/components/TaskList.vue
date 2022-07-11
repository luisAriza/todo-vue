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
	AddTask
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
				.tasks-list__details
					span(v-show="!task.edited", @dblclick="edit(task, i)") {{ task.description }}
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
			searchTags: [],
			tasksCreated: [],
			task: {
				title: "",
				description: "",
				tags: [],
				completed: false,
				edited: false,
			},
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
		addTask() {
			let tasksUser = this.tasksRecordsUser;

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasksUser.some(titleRepeat) ||
				this.task.title.length <= 2 ||
				this.task.description.length <= 2
			) {
				console.log("La tarea ya existe, o no falta llenar campos");
			} else {
				this.tasksCreated.push({
					title: this.task.title,
					description: this.task.description,
					tags: this.task.tags.sort(),
					completed: false,
					edited: false,
				});
				// Para reiniciar el formulario
				this.task = {
					title: "",
					description: "",
					tags: [],
				};
				localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
			}
		},
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
		edit(task, i) {
			this.cache = {
				title: this.tasksList[i].title,
				description: this.tasksList[i].description,
				tags: this.tasksList[i].tags
			}
			task.edited = true;
		},
		doneEdit(task, i) {
			if (!this.tasksList[i].title) {
				this.remove(i)
			}
			task.edited = false;
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		noEdit(task, i) {
			this.tasksList[i] = {
				title: this.cache.title,
				description: this.cache.description,
				tags: this.cache.tags
			}
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
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