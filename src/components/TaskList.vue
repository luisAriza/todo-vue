<template lang="pug">
.tasks-list__container
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
			ul
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
				span(@click='remove(i)', class="remove")
			.tasks-list__details(:class="task.details ? 'flex' : 'hidden'")
				span.description {{ task.description }}
				ul.tasks-list__tags
					small(v-for='tag in task.tags') {{ tag }}
				EditTask(:task="task" :i="i")
</template>

<script>
import EditTask from "@/components/EditTaskComponent.vue";

export default {
  name: "TaskList",
  components: {
    EditTask,
  },
  data() {
    return {
      cache: "",
    };
  },
  methods: {
    taskCompleted(task) {
      task.completed = !task.completed;
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
        tags: this.$parent.tasksList[i].tags,
      };
      task.details = true;
      task.edited = true;
    },
    doneEdit(task, i) {
      if (!this.$parent.tasksList[i].title) {
        this.$parent.remove(i);
      }
      task.edited = false;
      task.details = false;
      localStorage.setItem("tasks", JSON.stringify(this.$parent.tasksRecords));
    },
    noEdit(task, i) {
      this.$parent.tasksCreated[i] = {
        title: this.cache.title,
        description: this.cache.description,
        tags: this.cache.tags,
      };
      task.edited = false;
    },
    remove(i) {
      let sizeTaskCreated = this.$parent.tasksCreated.length;
      let sizeTaskList = this.$parent.tasksList.length;

      if (sizeTaskCreated == sizeTaskList) {
        this.$parent.tasksCreated.splice(i, 1);
      } else if (sizeTaskCreated > sizeTaskList) {
        this.$parent.tasksCreated.splice(
          this.$parent.tasksCreated.indexOf(
            this.$parent.tasksList.splice(i, 1)[0]
          ),
          1
        );
      }
      localStorage.setItem("tasks", JSON.stringify(this.$parent.tasksRecords));
    },
  },
};
</script>

<style scoped lang="postcss">
.tasks-list__details {
  @apply flex-wrap justify-start gap-1
  w-full
  mt-3 sm:ml-7 px-3 py-6
  rounded-md shadow-md
  bg-blue-50;
}
.tasks-list__details .description {
  @apply w-full text-start font-thin;
}
</style>
