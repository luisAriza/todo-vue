<template>
	<section>
		<ul class="task-list mt-10 w-96">
			<li class="flex justify-between w-full" v-for="(item, i) in tasksUser" :key="i">
				<span>
					<img src="@/assets/check.svg" alt="check icon" width="20" height="20" class="inline cursor-pointer"
						@click="checkTask()" />
				</span>
				{{ i + 1 }} - Title: {{ item.title }} - Description: {{ item.description }}
				<span v-for="(tag, j) in item.tags" :key="'tag' + j">{{tag}}</span>
				<span>
					<img src="@/assets/delete.svg" alt="close icon" width="20" height="20" class="delete inline cursor-pointer"
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
				{{k + 1}} - Title: {{item2.title}} - Description: {{item2.description}}
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
export default {
	data() {
		return {
			user: localStorage.getItem("user")
		}
	},
	methods: {
		checkTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			tasksChecked.unshift(tasks.shift());
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		uncheckTask() {
			let tasks = this.tasksUser
			let tasksChecked = this.tasksChecked

			tasks.push(tasksChecked.shift())
			localStorage.setItem("tasks", JSON.stringify(this.tasksRecords));
		},
		deleteTask() {
			let tasks = this.tasksUser

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
			}
		},
		tasksChecked() {
			if (this.user != null || undefined) {
				let tasksUserCompleted = this.idUser.completed;

				return tasksUserCompleted;
			}
		}
	}
}

</script>

<style scoped>

</style>