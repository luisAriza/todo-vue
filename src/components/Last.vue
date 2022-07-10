<template lang="pug">
form.w-full(@submit.prevent="addTask()")
	label(for="task") New Task
	input(id="task"
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea(placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	.tags.flex.gap-4
		small(v-for="tag in tags")
			label(:for='tag') {{ tag }}
			input(type="checkbox", :id="tag", :value="tag", v-model="task.tags")
	button(class="submit-btn" type="submit") Add Task
section.grid.mt-4.w-full
	h2.text-2xl.my-4 Lista de tareas
	.mb-2
		h3 Completed: {{ tasksCompleted }}/{{ tasksCreated.length }}
	input.border(type="text", placeholder="Search task", v-model="search")
	.tags.flex.gap-4
		p Filter by tags
		small(v-for="(tag, i) in tags", :key="i + '0'")
			label(:for="i + '0'") {{ tag }}
			input(type="checkbox", :id="i + '0'", :value="tag", v-model="searchTags")
	ul.my-8
		li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in tasksList', :key='i' :class="taskClass(task)")
			span(@click='taskCompleted(task)' :class="taskClass2(task)")
			span(v-show="!task.edited" @dblclick="edit(task, i)") {{ task.title }}
			span(v-show="!task.edited" @dblclick="edit(task, i)") {{ task.description }}
			small(v-show="!task.edited", v-for='tag in task.tags') {{ tag }}
			input(v-show="task.edited"
				type="text"
				v-model="task.title"
				@blur="noEdit(task, i)"
				@keyup.esc="noEdit(task, i)"
				@keyup.enter="doneEdit(task, i)")
			input(v-show="task.edited"
				type="textarea"
				v-model="task.description"
				@blur="noEdit(task, i)"
				@keyup.esc="noEdit(task, i)"
				@keyup.enter="doneEdit(task, i)")
			small(v-show="task.edited", v-for="(tag, j) in tags", :key="j")
				label(:for='j') {{ tag }}
				input(type="checkbox", v-model="task.tags",	:id="j", :value="tag")
			span(@click='remove(i)', class="remove")
</template>

<script>

export default {
	name: "CreateTask",
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
				}	else {
					return item.tags.sort().join('')
						.includes(this.searchTags.sort().join(''))
				}
			}
		},
		tasksList() {
			return this.tasksCreated.filter(this.searchFilter)
		},
		tasksCompleted() {
			return this.tasksCreated.filter((task) => {
				return task.completed;
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
			this.task[i] = {
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



form {
	@apply grid gap-4 w-full justify-items-center mt-10
}
input,
textarea {
	@apply border px-2 rounded-md outline-none w-full p-1
}
.submit-btn {
	@apply bg-green-400 cursor-pointer p-3 w-full rounded-md
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
	@apply text-slate-400 cursor-pointer line-through
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