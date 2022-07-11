<template lang="pug">
section.tasks
	.info
		.info__title.text-start
			p.text-xl.font-bold Immediate Steps
			p.text-gray-400 These are your immediate steps to complete
		.info__task-left.text-start.my-4
			p.text-slate-500.bg-slate-100.px-4.py-1.w-max.rounded-md
				span.text-blue-400 {{ tasksUncompleted }}
				|  / {{ tasksCreated.length }} tasks left
	.filter
		button.add(@click="showAdd = true") + Add a Task
		input.filter__searcher(
			id="searcher",
			type="text",
			placeholder="Search",
			v-model="search")
		.filter__tags
			small(v-for="(tag, i) in tags", :key="i + '0'")
				input.hidden(
					type="checkbox",
					:id="i + '0'",
					:value="tag",
					v-model="searchTags")
				label(:for="i + '0'") {{ tag }}
	AddTask
	.tasks-list
		ul.list
			li(v-for='(task, i) in tasksList', :key='i' :class="taskClass(task)")
				ul.tasks-list__title
					span(
						@click='taskCompleted(task)',
						:class="taskClass2(task)")
					span(class="task-title", @click="edit(task, i)") {{ task.title }}
				ul.tasks-list__tags
					small(v-for='tag in task.tags') {{ tag }}
					span(
						@click="showDetails = !showDetails", class="arrow",
						:class="showDetails ? 'rotate' : ''")
					span(@click='remove(i)', class="remove")
				.tasks-list__details(:class="showDetails ? 'block' : 'hidden'")
					span(
						v-show="!task.edited",
						class="description"
						@dblclick="edit(task, i)") {{ task.description }}
					input(v-show="task.edited"
						type="text"
						v-model="task.title"
						@keyup.esc="noEdit(task, i)"
						@keyup.enter="doneEdit(task, i)")
					input(v-show="task.edited"
						type="textarea"
						v-model="task.description"
						@keyup.esc="noEdit(task, i)"
						@keyup.enter="doneEdit(task, i)")
					small(v-show="task.edited", v-for="(tag, j) in tags", :key="j")
						input.hidden(
							type="checkbox",
							v-model="task.tags",
							:id="j",
							:value="tag")
						label(:for='j') {{ tag }}
</template>

<script>
import AddTask from "@/components/AddTask.vue";

export default {
	name: "TaskList",
	components: {
		AddTask
	},
	data() {
		return {
			cache: "",
			search: "",
			showAdd: false,
			showDetails: false,
			searchTags: [],
			tasksCreated: [],
			tags: [
				"Work",
				"Study",
				"Gym",
				"Urgent",
				"Important"
			]
		}
	},
	computed: {
		tasksRecords() {
			let tasks = localStorage.getItem("tasks");

			return JSON.parse(tasks);
		},
		tasksRecordsUser() {
			let user = localStorage.getItem("user");
			let tasksRecords = this.tasksRecords;

			// Index(posición en el array) del user a identificar en tareas registradas
			let tasksIndexUser = tasksRecords.findIndex((v) => v.user == user);
			// User seleccionado en tareas registradas
			if (user != null || undefined) {
				let tasksUser = tasksRecords[tasksIndexUser].tasks

				return tasksUser;
			}
		},
		searchFilter() {
			return (item) => {
				if (this.search) {
					return item.title.toLowerCase()
						.includes(this.search.toLowerCase())
						||
						item.description.toLowerCase()
							.includes(this.search.toLowerCase())
				} else {
					return item.tags.sort().join('')
						.includes(this.searchTags.sort().join(''))
				}
			}
		},
		tasksList() {
			return this.tasksCreated.filter(this.searchFilter)
		},
		tasksUncompleted() {
			return this.tasksCreated.filter((task) => {
				return !task.completed;
			}).length;
		}
	},
	methods: {
		taskCompleted(task) {
			(task.completed = !task.completed)
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		taskClass(task) {
			return [task.completed ? "checked" : "unchecked"];
		},
		taskClass2(task) {
			return [task.completed ? "check" : "uncheck"];
		},
		edit(task, i) {
			this.cache = {
				title: this.tasksList[i].title,
				description: this.tasksList[i].description,
				tags: this.tasksList[i].tags
			}
			task.edited = true;
		},
		doneEdit(task, i) {
			if (!this.tasksList[i].title) {
				this.remove(i)
			}
			task.edited = false;
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		noEdit(task, i) {
			this.tasksList[i] = {
				title: this.cache.title,
				description: this.cache.description,
				tags: this.cache.tags
			}
			task.edited = false;
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		remove(i) {
			let sizeTaskCreated = this.tasksCreated.length
			let sizeTaskList = this.tasksList.length

			if (sizeTaskCreated == sizeTaskList) {
				this.tasksCreated.splice(i, 1)
			} else if (sizeTaskCreated > sizeTaskList) {
				this.tasksCreated
					.splice(this.tasksCreated
						.indexOf(this.tasksList
							.splice(i, 1)[0]), 1)
			}
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
	},
	created() {
		if (localStorage.getItem("tasks") != null) {
			this.tasksCreated = this.tasksRecordsUser;
		}
	}
}
</script>
