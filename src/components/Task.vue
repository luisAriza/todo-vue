<template>
	<form @submit.prevent="createTask">
		<label for="task">New Task</label>
		<input type="text" v-model="titleTask" id="task">
		<textarea name="description" cols="30" rows="3" v-model="descriptionTask"></textarea>
		<input type="submit" class="button" value="Create Task">
		<ul>
			<li></li>
		</ul>
	</form>
</template>

<script>
// showData();
// function saveData() {
// 	let task_name;
// 	task_name = document.getElementById("task_name").value;

// 	let task_records = new Array();
// 	task_records = JSON.parse(localStorage.getItem("toDoList")) ? JSON.parse(localStorage.getItem("toDoList")) : []
// 	if (task_records.some((v) => { return v.task_name == task_name })) {
// 		alert("duplicate data");
// 	}
// 	else {
// 		task_records.push({
// 			"task_name": task_name,
// 			"status": '0',
// 		})
// 		localStorage.setItem("toDoList", JSON.stringify(task_records));
// 	}
// 	showData();
// }

// function showData() {
// 	document.getElementById("showUsers").innerHTML = "";
// 	let task_records = new Array();
// 	task_records = JSON.parse(localStorage.getItem("toDoList")) ? JSON.parse(localStorage.getItem("toDoList")) : []
// 	if (task_records) {
// 		for (let i = 0; i < task_records.length; i++) {
// 			let addDiv = document.createElement('div');
// 			addDiv.className = "row";
// 			let status = task_records[i].status == "1" ? true : false;
// 			if (status) {
// 				addDiv.innerHTML = '  <div class="col-sm-12" style="padding: 10px;color:red;"><input type="checkbox" checked /> ' + task_records[i].task_name + ' <button class="btn btn-info" onclick="deleteData(' + i + ')">Delete</button> <button class="btn btn-warning" onclick="setStatus(' + i + ',0)">Un-Mark</button></div>';

// 			}
// 			else {
// 				addDiv.innerHTML = '  <div class="col-sm-12" style="padding: 10px;color:red;"><input type="checkbox" /> ' + task_records[i].task_name + ' <button class="btn btn-info" onclick="deleteData(' + i + ')">Delete</button> <button class="btn btn-success" onclick="setStatus(' + i + ',1)">Mark Done</button></div>';

// 			}
// 			document.getElementById("showUsers").appendChild(addDiv);

// 		}
// 	}
// }

// function setStatus(index, status_type) {
// 	let task_records = new Array();
// 	task_records = JSON.parse(localStorage.getItem("toDoList")) ? JSON.parse(localStorage.getItem("toDoList")) : []
// 	task_records[index].status = status_type;
// 	localStorage.setItem("toDoList", JSON.stringify(task_records));

// 	showData();
// }
// function deleteData(index) {
// 	let task_records = new Array();
// 	task_records = JSON.parse(localStorage.getItem("toDoList")) ? JSON.parse(localStorage.getItem("toDoList")) : []
// 	task_records.splice(index, 1)
// 	localStorage.setItem("toDoList", JSON.stringify(task_records));
// 	this.showData();
// }
// function clearData() {
// 	window.localStorage.clear();
// 	this.showData();
// }
export default {
	name: "Task",
	data() {
		return {
			titleTask: "",
			descriptionTask: "",
			tags: [],
			tasks: []
		}
	},
	methods: {
		createTask() {
			
		}
	}
}
</script>

<style scoped>

form {
	@apply grid gap-4 w-full justify-items-center mt-10
}
input, textarea {
	@apply border px-2 rounded-md outline-none w-full p-1
}
.button {
	@apply bg-green-400 cursor-pointer p-3
}
ul {
	list-style: circle;
}
.completed {
	text-decoration: line-through;
	color: grey;
}
</style>