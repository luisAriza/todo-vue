<template>
	<form @submit="createTask()">
		<label for="task">New Task</label>
		<input id="task" type="text" placeholder="Title" v-model="task.title" @blur="v$.task.title.$touch" required />
		<p v-if="v$.task.title.$error">Enter title of task</p>
		<textarea name="description" placeholder="Description" cols="30" rows="3" v-model="task.description"
			@blur="v$.task.description.$touch" required>
		</textarea>
		<p v-if="v$.task.description.$error">Enter description of task</p>
		<div class="tags">
		</div>
		<button class="button" type="submit">Create Task</button>
	</form>
	<p v-if="noLogged">
		No logged.
		<router-link to="/">Log In</router-link>
	</p>
	<section>
		<ul class="task-list mt-10 w-96">
			<li class="flex justify-between w-full" v-for="(item, i) in tasksUser" :key="i">
				<span>
					<img src="@/assets/check.svg" alt="check icon" width="20" height="20" class="inline cursor-pointer"
						@click="checkTask()" />
				</span>
				{{i + 1}} - Title: {{item.title}} - Description: {{item.description}} - Tags:
				<span v-for="(tag, j) in item.tags" :key="'tag' + j">{{tag}}</span>
				<span>
					<img src="@/assets/delete.svg" alt="close icon" width="20" height="20" class="inline cursor-pointer"
						@click="deleteTask()" />
				</span>
			</li>
		</ul>
		<ul class="task-checked-list mt-10 w-96">
			<li class="flex justify-between w-full" v-for="(item2, k) in tasksChecked" :key="k">
				<span>
					<img src="@/assets/check.svg" alt="check icon" width="20" height="20" class="inline cursor-pointer"
						@click="uncheckTask()" />
				</span>
				{{k + 1}} - Title: {{item2.title}} - Description: {{item2.description}} - Tags:
				<span v-for="(tag, l) in item2.tags" :key="'tag' + l">{{tag}}</span>
				<span>
					<img src="@/assets/delete.svg" alt="close icon" width="20" height="20" class="inline cursor-pointer"
						@click="deleteTask()" />
				</span>
			</li>
		</ul>
	</section>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	name: "Task",
	el: "ul",
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

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasks.some(titleRepeat)) {
				console.log("La tarea ya existe");
			} else {
				tasks.push(this.task);
				localStorage.setItem("tasks", JSON.stringify(tasksRecords));
			}
		},
		checkTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			tasksChecked.unshift(tasks.shift());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
			console.log(`La tarea ${tasksChecked[0].title} se añadió a completadas`);
			console.log(tasksChecked);
		},
		uncheckTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			console.log(`La tarea ${tasksChecked[0].title} se quitó de completadas`);
			tasks.push(tasksChecked.shift());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
			console.log(tasks);
		},
		deleteTask() {
			let tasks = this.tasksUser

			console.log(`La tarea ${tasks[0].title} se eliminó`);
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