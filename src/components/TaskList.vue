<template lang="pug">
section
	ul.task-list.mt-10.w-96
		li.flex.justify-between.w-full(v-for='(task, i) in tasksUser', :key='i')
			span
				img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='checkTask(i)')
			| {{task.title}}: {{task.description}}
			span(v-for='tag in task.tags') {{tag}}
			span
				img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTask(i)')
	ul.task-checked-list.mt-10.w-96
		li.flex.justify-between.w-full(v-for='(taskChecked, i) in tasksChecked', :key='i')
			span
				img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='uncheckTask(i)')
			| {{taskChecked.title}}: {{taskChecked.description}}
			span(v-for='tag in taskChecked.tags') {{tag}}
			span
				img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTaskChecked(i)')
</template>

<script>
export default {
	data() {
		return {
			user: localStorage.getItem("user")
		}
	},
	methods: {
		checkTask(i) {
			let tasks = this.tasksUser;
			let tasksChecked = this.tasksChecked;
			let task = tasks.splice(i, 1);

			tasksChecked.unshift(task.pop());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		uncheckTask(i) {
			let tasks = this.tasksUser;
			let tasksChecked = this.tasksChecked;
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
			let tasksChecked = this.tasksChecked;

			tasksChecked.splice(i, 1);
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");

			return JSON.parse(tasks);
		},
		idUser() {
			let tasksRecords = this.tasksRecords;
			// Index(posición en el array) del user a identificar en tareas registradas
			let tasksIndexUser = tasksRecords.findIndex((v) => v.user == this.user);
			// User seleccionado en tareas registradas
			return tasksRecords[tasksIndexUser];
		},
		tasksUser() {
			if (this.user != null || undefined) {
				let tasksUser = this.idUser.tasks;

				return tasksUser;
			}
		},
		tasksChecked() {
			if (this.user != null || undefined) {
				let tasksUserCompleted = this.idUser.completed;

				return tasksUserCompleted;
			}
		}
	}
}

</script>

<style scoped>

</style>