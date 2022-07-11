<template lang="pug">
Test(type="submit" class="submit-btn")
form.w-full(@submit.prevent="addTask()")
	label(for="task") New Task
	input(id="task"
		type="text"
		placeholder="Title"
		v-model="task.title")
	textarea(placeholder="Description"
		cols="30" rows="3"
		v-model="task.description")
	.tags.flex.gap-4
		small(v-for="tag in tags")
			label(:for='tag') {{ tag }}
			input(type="checkbox", :id="tag", :value="tag", v-model="task.tags")
	button(class="submit-btn" type="submit") +Add Task
</template>

<script>
import Test from "@/components/Test.vue";

export default {
	name: "AddTask",
	components: {
		Test
	}
}
</script>

<style scoped>
h1 {
	color: red
}
form {
	@apply grid gap-4 w-full justify-items-center mt-10
}
input,
textarea {
	@apply border px-2 rounded-md outline-none w-full p-1
}
.submit-btn {
	@apply bg-green-400 cursor-pointer p-3 w-full rounded-md
}

</style>