<template lang="pug">
form(@submit.prevent="addTask()")
	label(for="task") New Task
	input(id="task"
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea(placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	ul.tags.flex.gap-4
		li(v-for="tag in tags")
			input(type="checkbox", :id="tag", :value="tag", v-model="task.tags")
			label(:for='tag') {{ tag }}
	button(class="submit-btn" type="submit") Add Task
section.grid.mt-4
	h2.text-2xl.my-4 Lista de tareas
	.mb-2
		h3 Task completed: {{ tasksCompleted }}
		h3 Task uncompleted: {{ tasksIncompleted }}
	input.border(type="text", placeholder="Search task", v-model="search")
	ul.my-8
		li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in tasksList', :key='i' :class="taskClass(task)")
			span(@click='taskCompleted(task)' :class="taskClass2(task)")
			| {{ task.title }}
			| {{ task.description }}
			span(v-for='tag in task.tags') {{ tag }}
			span(@click='remove()' :class="taskClass3(task)")
</template>

<script>

export default {
	name: "CreateTask",
	data() {
		return {
			search: "",
			tasksCreated: undefined,
			completed: false,
			task: {
				title: "",
				description: "",
				tags: [],
				completed: false,
			},
			tags: [
				"Work",
				"Study",
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
				return item.title.toLowerCase()
					.includes(this.search.toLowerCase())
					||
					item.description.toLowerCase()
						.includes(this.search.toLowerCase())
					||
					item.tags.join('').toLowerCase()
						.includes(this.search.toLowerCase())
			}
		},
		tasksList() {
			return this.tasksCreated.filter(this.searchFilter)
		},
		tasksCompleted() {
			return this.tasksCreated.filter((task) => {
				return task.completed;
			}).length;
		},
		tasksIncompleted() {
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
		taskClass3(task) {
			return [task.completed ? "check" : "uncheck"];
		},
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
					completed: false
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
		edit() {
			// this.tasksRecordsUser[i];
			// localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
			if (this.editing == false) {
				return this.editing = true;
			} else {
				return this.editing = false;
			}
		},
		remove(task) {
			
		},
		removeRecords(i) {
			let tasks = this.tasksRecordsUser;

			tasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		}
	},
	created() {
		if (localStorage.getItem("tasks") != null) {
			this.tasksCreated = this.tasksRecordsUser;
		}
		console.log(this.tasksCreated)
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