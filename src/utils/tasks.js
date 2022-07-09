import Task from "@/components/Task.vue";

export default {
  name: "Tasks",
  components: {
    Task,
  },
  data() {
    return {
      tarea: {
        titulo: "",
        description: "",
      },
      tareas: [
        {
          titulo: "tarea 1",
          description: "sdaihdoihasfoihas",
          completada: false,
        },
      ],
    };
  },
  computed: {
    tareasCompletas() {
      return this.tareas.filter((tarea) => {
        return tarea.completada;
      }).length;
    },
    tareasIncompletas() {
      return this.tareas.filter((tarea) => {
        return !tarea.completada;
      }).length;
    },
  },
  methods: {
    ingresar() {
      if (this.tarea.titulo.length <= 1 || this.tarea.description.length <= 1)
        return;
      this.tareas.push({
        titulo: this.tarea.titulo,
        description: this.tarea.description,
        completada: false,
      });
      this.tarea = {
        titulo: "",
        description: "",
      };
    },
  },
};
