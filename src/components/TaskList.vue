<template lang="pug">
section
	ul.task-list.mt-10.w-96
		li.flex.justify-between.w-full(v-for='(item, i) in tasksUser', :key='i')
			span
				img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='checkTask()')
			| {{i + 1}}. {{item.title}}: {{item.description}}
			span(v-for='(tag, j) in item.tags', :key="'tag' + j") {{tag}}
			| {{tag}}
			span
				img.delete.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTask()')
	ul.task-checked-list.mt-10.w-96
		li.flex.justify-between.w-full(v-for='(item, k) in tasksChecked', :key='k')
			span
				img.inline.cursor-pointer(src='@/assets/check.svg', alt='check icon', width='20', height='20', @click='uncheckTask()')
			| {{k + 1}}. {{item.title}}: {{item.description}}
			span(v-for='(tag, l) in item.tags', :key="'tag' + l") {{tag}}
			| {{tag}}
			span
				img.inline.cursor-pointer(src='@/assets/delete.svg', alt='close icon', width='20', height='20', @click='deleteTask()')
</template>

<script>
export default {
	data() {
		return {
			user: localStorage.getItem("user")
		}
	},
	methods: {
		checkTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			tasksChecked.unshift(tasks.shift());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		uncheckTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			tasks.push(tasksChecked.shift())
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		deleteTask() {
			let tasks = this.tasksUser

			tasks.pop();
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
			return tasksRecords[tasksIndexUser]
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