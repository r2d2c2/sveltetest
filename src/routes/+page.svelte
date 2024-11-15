<script>
	import { onMount } from 'svelte';
	import { getTodos, addTodo, updateTodo, deleteTodo } from '$lib/api';

	let todos = [];
	let newTodo = '';

	// 데이터 불러오기
	const loadTodos = async () => {
		todos = await getTodos();
	};

	// 새로운 할 일 추가
	const createTodo = async () => {
		if (newTodo.trim()) {
			const todo = { text: newTodo, completed: false };
			await addTodo(todo);
			newTodo = '';
			await loadTodos();
		}
	};

	// 할 일 상태 업데이트
	const toggleComplete = async (todo) => {
		todo.completed = !todo.completed;
		await updateTodo(todo.id, todo);
		await loadTodos();
	};
	//text 수정
	const textUpdate = async (todo) => {
		todo.text = newTodo;
		await updateTodo(todo.id, todo);
		await loadTodos();
	};

	// 할 일 삭제
	const removeTodo = async (id) => {
		await deleteTodo(id);
		await loadTodos();
	};

	onMount(loadTodos);
</script>

<main>
	<h1>📝 Todo List</h1>

	<!-- 새 할 일 입력 -->
	<input
		type="text"
		bind:value={newTodo}
		placeholder="Add a new task..."
		on:keydown={(e) => e.key === 'Enter' && createTodo()}
	/>
	<button on:click={createTodo}>Add</button>

	<!-- 할 일 목록 -->
	<ul>
		{#each todos as todo}
			<li>
				<input
					type="checkbox"
					bind:checked={todo.completed}
					on:change={() => toggleComplete(todo)}
				/>
				<span style="text-decoration: {todo.completed ? 'line-through' : 'none'}">
					{todo.text}
				</span>

				<!-- text 입력 수정-->
				<input
					type="text"
					bind:value={todo.text}
					placeholder="Edit task..."
					on:keydown={(e) => e.key === 'Enter' && textUpdate(todo)}
				/>
				<button on:click={() => removeTodo(todo.id)}>❌</button>
				<!-- 삭제 하면 세로 고침-->
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		margin: 2rem auto;
		max-width: 500px;
		text-align: center;
	}
	input {
		margin-right: 0.5rem;
		padding: 0.5rem;
		font-size: 1rem;
	}
	button {
		margin-left: 0.5rem;
		padding: 0.5rem;
		font-size: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin: 0.5rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	span {
		flex-grow: 1;
		margin-left: 0.5rem;
	}
</style>
