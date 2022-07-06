<template>
	<form @submit.prevent="createTask">
		<label for="task">Nueva tarea</label>
		<input type="text" v-model="titleTask" id="task">
		<textarea name="descriptionTask" cols="30" rows="3" v-model="descriptionTask"></textarea>
		<input class="button" type="submit" value="Crear tarea">
		<ul>
			<li v-for="(task, i) in tasks" :key="'task' + i" :class="{completed: task.completed}"
				@click="completeTask(task.text)">
				{{task.text}}
			</li>
		</ul>
	</form>
</template>

<script>
export default {
	name: "Task",
	data() {
		return {
			titleTask: "",
			descriptionTask: "",
			tasks: []
		}
	},
	methods: {
		createTask() {
			let task = {
				text: this.titleTask,
				completed: false
			};
			this.tasks.push(task);
			this.titleTask = "";
			console.log(this.tasks);
		},
		completeTask(taskText) {
			for (let i = 0; i < this.tasks.length; i++) {
				let task = this.tasks[i];
				if (taskText === task.text) {
					task.completed = !task.completed;
				}
			}
		}
	}
}
</script>

<style scoped>

form {
	@apply grid gap-6 w-full justify-items-center mt-8
}
input, textarea {
	@apply border px-2 rounded-md outline-none w-full p-1
}
.button {
	@apply bg-green-400 cursor-pointer p-3
}
ul {
	list-style: circle;
}
.completed {
	text-decoration: line-through;
	color: grey;
}
</style>