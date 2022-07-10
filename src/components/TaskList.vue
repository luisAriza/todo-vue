<template lang="pug">
section.task-list.grid.mt-4.w-full
	.p-4
		.mb-2
			h2.text-2xl.my-4 Immediate Steps
			p These are your immediate steps to complete
		.mb-2
			p {{ this.$parent.tasksCompleted }}/{{ this.$parent.tasksCreated.length }} tasks left
	.p-2
		input.searcher.border(type="text", placeholder="Search task", v-model="this.$parent.search")
		.tags.flex.gap-4
			p Filter by tags
			small(v-for="(tag, i) in this.$parent.tags", :key="i + '0'")
				label(:for="i + '0'") {{ tag }}
				input(type="checkbox", :id="i + '0'", :value="tag", v-model="this.$parent.searchTags")
	.p-3
		ul.my-8
			li.flex.justify-between.w-full.text-blue-500(v-for='(task, i) in this.$parent.tasksList', :key='i' :class="this.$parent.taskClass(task)")
				span(@click='this.$parent.taskCompleted(task)' :class="this.$parent.taskClass2(task)")
				span(v-show="!task.edited", @click="edit(task, i)") {{ task.title }}
				span(v-show="!task.edited", @click="edit(task, i)") {{ task.description }}
				small(v-show="!task.edited", v-for='tag in task.tags') {{ tag }}
				input(v-show="task.edited"
					type="text"
					v-model="task.title"
					@blur="noEdit(task, i)"
					@keyup.esc="noEdit(task, i)"
					@keyup.enter="this.$parent.doneEdit(task, i)")
				input(v-show="task.edited"
					type="textarea"
					v-model="task.description"
					@blur="noEdit(task, i)"
					@keyup.esc="noEdit(task, i)"
					@keyup.enter="this.$parent.doneEdit(task, i)")
				small(v-show="task.edited", v-for="(tag, j) in this.$parent.tags", :key="j")
					label(:for='j') {{ tag }}
					input(type="checkbox", v-model="task.tags",	:id="j", :value="tag")
				span(@click='this.$parent.remove(i)', class="remove")
</template>

<script>
export default {
	name: "TaskList",
	props: {
	},
	data() {
		return {
		}
	},
	methods: {
		edit(task, i) {
			return this.$parent.edit(task, i)
		},
		noEdit(task, i) {
			return this.$parent.noEdit(task, i)
		}
	}
}
</script>

<style scoped>

.check {
	width: 20px;
	height: 20px;
	background-image: url("../assets/check.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}

.checked {
	@apply text-slate-400 cursor-pointer
}

.uncheck {
	width: 20px;
	height: 20px;
	background-image: url("../assets/uncheck.svg");
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}

.unchecked {
	@apply text-slate-900 cursor-pointer
}

.remove {
	width: 20px;
	height: 20px;
	background-image: url('../assets/delete.svg');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>