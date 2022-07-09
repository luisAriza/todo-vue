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
		li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in tasks', :key='i')
			span(@click='taskCompleted(task)' :class="taskClass(task)")
			| {{ task.title }}
			| {{ task.description }}
			span(v-for='tag in task.tags') {{ tag }}
			img.inline(src='@/assets/delete.svg', width='20', height='20', @click='remove(i)')
</template>

<script>

export default {
	name: "CreateTask",
	data() {
		return {
			search: "",
			tasksCreated: [],
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
		tasksUser() {
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
		searches() {
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
		tasks() {
			return this.tasksCreated.filter(this.searches)
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
			return (task.completed = !task.completed);
		},
		taskClass(task) {
			return [task.completed ? "check" : "uncheck"];
		},
		addTask() {
			let tasksRecords = this.tasksRecords;
			let tasks = this.tasksUser;

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasks.some(titleRepeat) || this.task.title.length <= 1 || this.task.description.length <= 1) {
				console.log("La tarea ya existe, o no tiene titulo");
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
				localStorage.setItem("tasks", JSON.stringify(tasksRecords));
			}
		},
		edit() {
			// this.tasksUser[i];
			// localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
			if (this.editing == false) {
				return this.editing = true;
			} else {
				return this.editing = false;
			}
		},
		remove(i) {
			let tasks = this.tasksUser;

			tasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		removeRecords(i) {
			let tasks = this.tasksUser;

			tasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		}
	},
	created() {
		if (localStorage.getItem("tasks") != null) {
			this.tasksCreated = this.tasksUser;
		}
			console.log(this.tasksUser)
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
	@apply text-red-500
}
.check::before {
	content: "com";
}

.uncheck::before {
	content: "inc";
}
</style>