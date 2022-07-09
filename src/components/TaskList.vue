<template lang="pug">
section.grid.mt-4
	input.border(type="text", v-model="search" placeholder="Search...")
	ul.task-list.mt-10.w-96
		li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in tasks', :key='i')
			span: img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='checkTask(i)')
			| {{ task.title }}: {{ task.description }}
			span(v-for='tag in task.tags') {{ tag }}
			span: img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTask(i)')
		li.flex.justify-between.w-full.text-red-500(v-for='(taskChecked, i) in tasksChecked', :key='i')
			span: img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='uncheckTask(i)')
			| {{ taskChecked.title }}: {{ taskChecked.description }}
			span(v-for='tag in taskChecked.tags') {{ tag }}
			span: img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTaskChecked(i)')
</template>

<script>
export default {
	data() {
		return {
			search: "",
			user: localStorage.getItem("user")
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");
			return JSON.parse(tasks);
		},
		indexUser() {
			let tasksRecords = this.tasksRecords;

			// Posición en el array del user a identificar en las tareas registradas
			let indexTasksUser = tasksRecords.findIndex((v) => v.user == this.user);
			// User seleccionado en tareas registradas
			return tasksRecords[indexTasksUser];
		},
		tasksUser() {
			if (this.user != null || undefined) {
				let tasksUser = this.indexUser.tasks;

				return tasksUser;
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
				item.tags[0].toLowerCase()
					.includes(this.search.toLowerCase())
			}
		},
		tasks() {
			return this.tasksUser.filter(this.searches)
		},
		tasksChecked() {
			return this.tasksUserChecked.filter(this.searches)
		}
	},
	methods: {
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
		deleteTask(i) {
			let tasks = this.tasksUser;

			tasks.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		deleteTaskChecked(i) {
			let tasksChecked = this.tasksUserChecked;

			tasksChecked.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		}
	}
}
</script>

<style scoped>
</style>