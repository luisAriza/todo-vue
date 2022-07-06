<template>
	<form @submit.prevent="createTask()">
		<label for="task">New Task</label>
		<input id="task" type="text" placeholder="Title" v-model="task.title" @blur="v$.task.title.$touch" required>
		<p v-if="v$.task.title.$error">Enter title of task</p>
		<!-- <p v-if="error" class="error">Title existent</p> -->
		<textarea name="description" placeholder="Description" cols="30" rows="3" v-model="task.description"
			@blur="v$.task.description.$touch" required>
		</textarea>
		<div class="tags">
		</div>
		<p v-if="v$.task.description.$error">Enter description of task</p>
		<button class="button" type="submit">Create Task</button>
		<ul>
			<li>
				{{showTask()}}
			</li>
		</ul>
	</form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	name: "Task",
	data() {
		return {
			user: localStorage.getItem("user"),
			tasks: localStorage.getItem("tasks"),
			task: {
				title: "",
				description: "",
				tags: []
			},
			TaskPrint: false,
		}
	},
	methods: {
		createTask() {
			let task_records = new Array();
			task_records = JSON.parse(this.tasks) ? JSON.parse(this.tasks) : [];
			//index del user
			let tasksIndex = task_records.findIndex((v) => v.user == this.user);
			//tarea del user seleccionada
			let tasks = task_records[tasksIndex].tasks;

			if (task_records.some((v) => v.user == this.user)) {
				tasks.push(this.task)
				localStorage.setItem("tasks", JSON.stringify(task_records));
			}
		},
		showTask() {
			let task_records = JSON.parse(this.tasks)
			console.log(task_records[0].tasks)
			return task_records[0].tasks
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
input, textarea {
	@apply border px-2 rounded-md outline-none w-full p-1
}
button {
	@apply bg-green-400 cursor-pointer p-3 w-full rounded-md
}
ul {
	list-style: circle;
}
</style>