<template>
	<form @submit.prevent="createTask()">
		<label for="task">New Task</label>
		<input id="task" type="text" placeholder="Title" v-model="task.title" @blur="v$.task.title.$touch" required>
		<p v-if="v$.task.title.$error">Enter title of task</p>
		<!-- <p v-if="error" class="error">Title existent</p> -->
		<textarea name="description" placeholder="Description" cols="30" rows="3" v-model="task.description"
			@blur="v$.task.description.$touch" required>
		</textarea>
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
import { required, maxLength } from '@vuelidate/validators'

export default {
	name: "Task",
	data() {
		return {
			user: localStorage.getItem("user"),
			task: {
				title: "",
				description: ""
			// tags: [],
			},
		}
	},
	methods: {
		createTask() {
			let task_records = new Array();
			task_records = JSON.parse(localStorage.getItem("tasks_records")) ? JSON.parse(localStorage.getItem("tasks_records")) : [];

			if (task_records.some((v) => v.user == this.user)) {
				// let current_user = task_records.filter((v) => v.user == this.user)[0];
				// task_records.push({
				// 	"tasks": [this.task]
				// })
				console.log(localStorage.getItem("tasks_records"));
				// localStorage.setItem("tasks_records", current_user.task)
			} else {
				console.log(localStorage.getItem("tasks_records"));
				// localStorage.setItem("tasks_records", JSON.stringify(task_records));
			}
		},
		showTask() {

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
					maxLength: maxLength(120)
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