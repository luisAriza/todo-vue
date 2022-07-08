<template>
	<form @submit.prevent="createTask()">
		<label for="task">New Task</label>
		<input id="task" type="text" placeholder="Title" v-model="task.title" @blur="v$.task.title.$touch" required />
		<p v-if="v$.task.title.$error">Enter title of task</p>
		<textarea name="description" placeholder="Description" cols="30" rows="3" v-model="task.description"
			@blur="v$.task.description.$touch" required>
		</textarea>
		<p v-if="v$.task.description.$error">Enter description of task</p>
		<div class="tags flex gap-4">
		</div>
		<button class="button" type="submit">Create Task</button>
	</form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	name: "CreateTask",
	data() {
		return {
			user: localStorage.getItem("user"),
			task: {
				title: "",
				description: "",
				tags: []
			},
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
			} else {
				this.noLogged = true;
			}
		}
	},
	methods: {
		createTask() {
			let tasksRecords = this.tasksRecords;
			let tasks = this.tasksUser;

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasks.some(titleRepeat)) {
				console.log("La tarea ya existe");
			} else {
				tasks.push(this.task);
				localStorage.setItem("tasks", JSON.stringify(tasksRecords));
			}
		}
	},
	setup() {
		return {
			v$: useVuelidate()
		}
	},
	validations() {
		return {
			task: {
				title: {
					required,
				},
				description: {
					required,
				}
			}
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

button {
	@apply bg-green-400 cursor-pointer p-3 w-full rounded-md
}
</style>