<template lang="pug">
form(@submit.prevent="createTask()")
	label(for="task") New Task
	input(id="task"
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea(placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	ul.tags.flex.gap-4 Select your tags:
		li(v-for="tag in tags")
			input.hidden(type="checkbox", :id="tag", :value="tag", v-model="task.tags")
			label(:for='tag') {{ tag }}
	p {{task.title}}
	p {{task.description}}
	ul.tags.flex.gap-4 Tags
		li(v-for="tag in task.tags.sort()") {{ tag }}
	button(class="submit-btn" type="submit") Create Task
	h2 Lista de tareas
	//- ul
	//- 	li(v-for="task in tasks")
	//- 		span {{task.title}}
	//- 		span {{task.description}}
	//- 		span {{task.tags}}
	section.grid.mt-4
	input.border(type="text", v-model="search" placeholder="Search task...")
	ul.task-list.mt-10
		li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in tasks', :key='i')
			span: img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='checkTask(i)')
			| {{ task.title }}
			p(@click="showDescription == false ? showDescription = true : showDescription = false") V
				span(v-show="showDescription == true") {{ task.description }}
			span(v-for='tag in task.tags') {{ tag }}
			button(@click="edit()") edit
			span: img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='remove(i)')
			input.border(v-show="editing", type="text", v-model="task.title")
		li.flex.justify-between.w-full.text-red-500(v-for='(taskChecked, i) in tasks', :key='i')
			span: img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='uncheckTask(i)')
			| {{ taskChecked.title }}: {{ taskChecked.description }}
			span(v-for='tag in taskChecked.tags') {{ tag }}
			span: img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='removeChecked(i)')
	//- TaskList
</template>

<script>
// import TaskList from "@/components/TaskList.vue"

export default {
	// components: {
	// 	TaskList
	// },
	name: "CreateTask",
	data() {
		return {
			user: localStorage.getItem("user"),
			showDescription: false,
			editing: false,
			search: "",
			task: {
				title: "",
				description: "",
				tags: [],
			},
			tags: [
				"work",
				"study",
				"urgent",
				"important"
			],
			tasksCreated: []
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");

			return JSON.parse(tasks);
		},
		indexUser() {
			let tasksRecords = this.tasksRecords;
			// Index(posición en el array) del user a identificar en tareas registradas
			let tasksIndexUser = tasksRecords.findIndex((v) => v.user == this.user);
			// User seleccionado en tareas registradas
			return tasksRecords[tasksIndexUser]
		},
		tasksUser() {
			if (this.user != null || undefined) {
				let tasksUser = this.indexUser.tasks;

				return tasksUser;
			} else {
				this.noLogged = true;
			}
		},
		tasksUserChecked() {
			if (this.user != null || undefined) {
				let tasksUserCompleted = this.indexUser.completed;

				return tasksUserCompleted;
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
		// tasksChecked() {
		// 	return this.tasksCreated.filter(this.searches)
		// }
	},
	methods: {
		createTask() {
			let tasksRecords = this.tasksRecords;
			let tasks = this.tasksUser;

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasks.some(titleRepeat) || this.task.title.length <= 1 || this.task.description.length <= 1) {
				console.log("La tarea ya existe, o no tiene titulo");
			} else {
				tasks.unshift({
					title: this.task.title,
					description: this.task.description,
					tags: this.task.tags.sort(),
				});
				this.tasks.push({
					title: this.task.title,
					description: this.task.description,
					tags: this.task.tags.sort(),
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
		checkTask(i) {
			let tasks = this.tasksUser;
			let tasksChecked = this.tasksUserChecked;
			let task = tasks.splice(i, 1);

			tasksChecked.unshift(task.pop());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		uncheckTask(i) {
			let tasks = this.tasksUser;
			let tasksChecked = this.tasksUserChecked;
			let task = tasksChecked.splice(i, 1);

			tasks.push(task.pop());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		remove(i) {
			let tasks = this.tasksUser;

			tasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		removeChecked(i) {
			let tasksChecked = this.tasksUserChecked;

			tasksChecked.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
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
</style>