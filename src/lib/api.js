/* const BASE_URL = "http://localhost:3000/todos";

// GET: 모든 할 일 가져오기
export const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

// POST: 새로운 할 일 추가
export const addTodo = async (todo) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

// PUT: 할 일 수정
export const updateTodo = async (id, updatedTodo) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  return await res.json();
};

// DELETE: 할 일 삭제
export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return await res.json();
};
 */

const BASE_URL = '/api/todos';

// GET: 모든 할 일 가져오기
export const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

// POST: 새로운 할 일 추가
export const addTodo = async (todo) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

// PUT: 할 일 수정
export const updateTodo = async (id, updatedTodo) => {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updatedTodo }),
  });
  return await res.json();
};

// DELETE: 할 일 삭제
export const deleteTodo = async (id) => {
  const res = await fetch(BASE_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};
