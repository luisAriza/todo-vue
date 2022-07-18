<template lang="pug">
.tasks-list
	ul.list
		li(
			v-for='(task, i) in this.$parent.tasksList',
			:key='i',
			:class="classChecked(task)")
			ul.tasks-list__title
				span(
					@click='taskCompleted(task)',
					:class="classCheck(task)")
				span(
					class="task-title",
					:class="task.details ? 'show-title' : ''") {{ task.title }}
			ul.tasks-list__tags
				small(v-for='tag in task.tags') {{ tag }}
				span(
					v-if='!task.edited',
					@click="edit(task, i)",
					class="edit")
				span(
					v-else,
					@click="doneEdit(task, i)"
					class="edit")
				span(
					@click="taskDetails(task)",
					class="arrow",
					:class="task.details ? 'rotate' : ''")
				span(@click='this.$parent.remove(i)', class="remove")
			.tasks-list__details(:class="task.details ? 'flex' : 'hidden'")
				p.font-bold.w-full Description
				span.description {{ task.description }}
				EditTask(:task="task" :i="i")
</template>

<script>
import EditTask from "@/components/EditTaskComponent.vue";

export default {
	name: "TaskList",
	components: {
		EditTask
	},
	data() {
		return {
			cache: ""
		}
	},
	methods: {
		taskCompleted(task) {
			(task.completed = !task.completed)
			task.edited = false;
			localStorage.setItem("tasks", JSON.stringify(this.$parent.tasksRecords));
		},
		classChecked(task) {
			return [task.completed ? "checked" : "unchecked"];
		},
		classCheck(task) {
			return [task.completed ? "check" : "uncheck"];
		},
		taskDetails(task) {
			task.edited = false;
			task.details = !task.details;
		},
		edit(task, i) {
			this.cache = {
				title: this.$parent.tasksList[i].title,
				description: this.$parent.tasksList[i].description,
				tags: this.$parent.tasksList[i].tags
			}
			task.details = true;
			task.edited = true;
		},
		doneEdit(task, i) {
			if (!this.$parent.tasksList[i].title) {
				this.$parent.remove(i)
			}
			task.edited = false;
			task.details = false;
			localStorage.setItem("tasks", JSON.stringify(this.$parent.tasksRecords));
		},
		noEdit(task, i) {
			this.$parent.tasksCreated[i] = {
				title: this.cache.title,
				description: this.cache.description,
				tags: this.cache.tags
			}
			task.edited = false;
		}
	}
}
</script>

<style scoped>
.tasks-list__details {
	@apply w-full justify-start flex-wrap gap-1 bg-green-50 rounded-md mt-3 px-3 py-6 shadow-md
}
.tasks-list__details .description {
	@apply w-full text-start pb-4 pl-2 border-b font-normal
}
</style>