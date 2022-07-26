<template lang="pug">
.tasks__container.pb-2
	ul.tasks-list.grid
		li.task-item(v-for='(task, i) in this.$parent.tasksList',
			:key='i',
			:class="classChecked(task)")
			.task-item__left
				span(@click='taskCompleted(task)',
					:class="classCheck(task)")
				span(class="task-title",
					:class="task.details ? 'task-title--show' : ''") {{ task.title }}
			.task-item__right
				span(@click="taskDetails(task)",
					class="arrow",
					:class="task.details ? 'rotate' : ''")
				span(@click='remove(i)', class="remove")
			.task-item__details(:class="task.details ? 'grid' : 'hidden'")
				span.description {{ task.description }}
				ul.task-item__details-tags
					small(v-for='tag in task.tags') {{ tag }}
				span(v-if='!task.edited',
					@click="edit(task, i)",
					class="edit")
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
