<template>
	<h2 class="text-xl"></h2>
	<input class="border" type="text" v-model="tarea.titulo" />
	<input class="border" type="textarea" v-model="tarea.description" />
	<button class="border" @click="ingresar()">Ingresar</button>
	{{ tarea.titulo }} | {{ tarea.description }}
	<h3 class="text-lg">Lista de tareas</h3>
	<h4>Tareas completas: {{ tareasCompletas }}</h4>
	<h4>Tareas incompletas: {{ tareasIncompletas }}</h4>
	<ul>
		<tarea v-for="tarea in tareas" :tarea="tarea" />
	</ul>
	<pre>{{ $data.tareas }}</pre>
</template>

<script>
import tarea from "@/components/tarea.vue";

export default {
	name: "tarea",
	components: {
		tarea,
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
</script>

<style>

</style>