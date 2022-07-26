<template lang="pug">
Navbar
.home
  header.header
    h1.title TASKS ASSIST
    img(src="../assets/project.svg" width="160" height="152" alt="logo")
    h2.tasks-left
      span.text-blue-400 {{ tasksUncompleted }}
      |  / {{ tasksCreated.length }} tasks left
  section.tasks
    FilterTask
    AddTask
    TaskList
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FilterTask from "@/components/FilterTaskComponent.vue";
import AddTask from "@/components/AddTaskComponent.vue";
import TaskList from "@/components/TaskList.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    FilterTask,
    AddTask,
    TaskList,
  },
  data() {
    return {
      search: "",
      searchTags: [],
      tasksCreated: [],
      tags: this.$store.state.tags,
    };
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
        let tasksUser = tasksRecords[tasksIndexUser].tasks;

        return tasksUser;
      }
    },
    searchFilter() {
      return (item) => {
        if (this.search) {
          return (
            item.title.toLowerCase().includes(this.search.toLowerCase()) ||
            item.description.toLowerCase().includes(this.search.toLowerCase())
          );
        } else {
          return item.tags
            .sort()
            .join("")
            .includes(this.searchTags.sort().join(""));
        }
      };
    },
    tasksList() {
      return this.tasksCreated.filter(this.searchFilter);
    },
    tasksUncompleted() {
      return this.tasksCreated.filter((task) => {
        return !task.completed;
      }).length;
    },
  },
  created() {
    if (localStorage.getItem("tasks") != null) {
      this.tasksCreated = this.tasksRecordsUser;
    }
  },
};
</script>

<style scoped lang="postcss">
.home {
  @apply grid w-full max-w-[50rem] mx-auto my-8 px-2;
  & .header {
    @apply flex items-center justify-end sm:justify-between gap-4 px-5;
  }
  & .title {
    @apply hidden sm:block text-4xl font-bold;
  }
  & .tasks-left {
    @apply self-start w-40 m-2 p-1 text-slate-500 font-semibold rounded-md bg-blue-50;
  }
  & .tasks {
    @apply grid w-full p-6 pt-8 rounded-lg shadow-md border bg-white;
  }
}
</style>
