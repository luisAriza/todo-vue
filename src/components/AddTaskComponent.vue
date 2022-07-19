<template lang="pug">
form.w-full(@submit.prevent="addTask()" :class="addClass")
	label.font-semibold(for="title") Write your task
	input(
		id="title",
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea(placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	.tags.flex.gap-4
		small(v-for="tag in tags")
			input.hidden(
				type="checkbox",
				:id="tag",
				:value="tag",
				v-model="task.tags")
			label(:for='tag') {{ tag }}
	button.submit-btn(type="submit") Add Task
	p(class="cancel-btn" @click="$store.commit('showAdd')") Back
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
form {
	@apply gap-4 w-full justify-items-center p-6 border-b
}
input,
textarea {
	@apply w-full max-w-sm outline-none rounded-md px-3 py-2 bg-slate-100 text-slate-500 shadow-md font-normal
}
.tags {
	@apply flex flex-wrap justify-start gap-2 mb-3;
}
.tags label {
	@apply bg-slate-100 text-gray-400 rounded-md py-[2px] px-2 cursor-pointer shadow-md;
}
.tags input:checked ~ label{
	@apply bg-green-600 text-white;
}
.submit-btn {
	@apply bg-green-600 text-white cursor-pointer p-2 mt-2 max-w-sm w-full rounded-md
}
.cancel-btn {
	@apply bg-white text-green-600 border border-green-600 cursor-pointer p-2 -mt-1 mb-1 max-w-sm w-full rounded-md
}
</style>