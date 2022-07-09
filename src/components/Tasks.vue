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
		<li v-for="tarea in tareas">
			<small @click="tareaCompletada(tarea)" :class="claseTareas(tarea)"></small>
			<span v-text="tarea.titulo"></span>:
			<span v-text="tarea.description"></span>-
		</li>
	</ul>
	<pre>{{ $data.tareas }}</pre>
</template>

<script>

</script>
<script src="@/utils/tasks.js"></script>

<style>
.check::before {
	content: "completa";
}
.uncheck::before {
	content: "incompleta";
}
</style>