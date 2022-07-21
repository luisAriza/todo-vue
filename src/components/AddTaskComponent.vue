<template lang="pug">
form.addTask(@submit.prevent="addTask()" :class="addClass")
	h3 Write your task
	input.addTask__title(
		id="title",
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea.addTask__description(
		placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	.addTask__tags
		small(v-for="tag in tags")
			input.hidden(
				type="checkbox",
				:id="tag",
				:value="tag",
				v-model="task.tags")
			label(:for='tag') {{ tag }}
	button.addTask__submit-btn(type="submit") Add Task
	button.addTask__cancel-btn(@click="$store.commit('showAdd')") Back
</template>

<script>
export default {
	name: "AddTask",
	data() {
		return {
			task: {
				title: "",
				description: "",
				tags: [],
				completed: false,
				edited: false,
				details: false
			},
			tags: this.$store.state.tags
		}
	},
	computed: {
		addClass() {
			return this.$store.state.showAdd ? "grid" : "hidden";
		},
	},
	methods: {
		addTask() {
			let tasksUser = this.$parent.tasksRecordsUser;

			let titleRepeat = (v) => v.title == this.task.title;

			if (tasksUser.some(titleRepeat) ||
				this.task.title.length == 0 ||
				this.task.description.length == 0
			) {
				console.log("La tarea ya existe ó falta llenar campos");
			} else {
				this.$parent.tasksCreated.push({
					title: this.task.title,
					description: this.task.description,
					tags: this.task.tags.sort(),
					completed: false,
					edited: false,
					details: false,
				});
				// Para reiniciar el formulario
				this.task = {
					title: "",
					description: "",
					tags: [],
				};
				localStorage.setItem("tasks", JSON.stringify(this.$parent.tasksRecords));
			}
		},
	}
}
</script>

<style scoped>

</style>