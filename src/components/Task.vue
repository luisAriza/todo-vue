<template>
	<form @submit="createTask()">
		<label for="task">New Task</label>
		<input id="task" type="text" placeholder="Title" v-model="task.title" @blur="v$.task.title.$touch" required>
		<p v-if="v$.task.title.$error">Enter title of task</p>
		<textarea name="description" placeholder="Description" cols="30" rows="3" v-model="task.description"
			@blur="v$.task.description.$touch" required>
		</textarea>
		<div class="tags">
		</div>
		<p v-if="v$.task.description.$error">Enter description of task</p>
		<button class="button" type="submit">Create Task</button>
	</form>
	<p v-if="noLogged">
		No logged.
		<router-link to="/">Log In</router-link>
	</p>
	<ul class="task-list mt-10 w-96">
		<li class="flex justify-between w-full" v-for="(item, i) in tasksUser" :key="i">
			<span>
				<img src="@/assets/check.svg" alt="check icon" width="20" height="20" class="inline cursor-pointer"
					@click="checkTask()" />
			</span>
			Title: {{item.title}} - Description: {{item.description}} - Tags:
			<span v-for="(tag, j) in item.tags" :key="'tag' + j">{{tag}}</span>
			<span>
				<img src="@/assets/delete.svg" alt="close icon" class="inline cursor-pointer" @click="deleteTask()" />
			</span>
		</li>
	</ul>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	name: "Task",
	data() {
		return {
			user: localStorage.getItem("user"),
			task: {
				title: "",
				description: "",
				tags: new Array()
			},
			noLogged: false,
		}
	},
	methods: {
		createTask() {
			let tasksRecords = this.tasksRecords;
			let tasks = this.tasksUser;

			if (tasks.some((v) => v.title == this.task.title)) {
				console.log("El titulo ya existe");
			} else {
				tasks.push(this.task);
				localStorage.setItem("tasks", JSON.stringify(tasksRecords));
			}
		},
		checkTask() {
			console.log(this.tasksUser);
			console.log(this.tasksChecked);
			
		},
		deleteTask() {
			console.log(JSON.parse(this.tasks))
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");

			return JSON.parse(tasks);
		},
		idUser() {
			let tasksRecords = this.tasksRecords;
			//index(posición en el array) del user, para identificarla
			let tasksIndexUser = tasksRecords.findIndex((v) => v.user == this.user);
			//tareas del user seleccionada
			return tasksRecords[tasksIndexUser]
		},
		tasksUser() {
			if (this.user != null || undefined) {
				let tasksUser = this.idUser.tasks;

				return tasksUser;
			} else {
				this.noLogged = true;
			}
		},
		tasksChecked() {
			let tasksUserCompleted = this.idUser.completed;

			return tasksUserCompleted;
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
</style>