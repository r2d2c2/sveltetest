import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

// 데이터베이스 연결 생성
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM todos');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Database query failed', { status: 500 });
  }
}

export async function POST({ request }) {
  const { text } = await request.json();
  try {
    const [result] = await db.query('INSERT INTO todos (text) VALUES (?)', [text]);
    return new Response(JSON.stringify({ id: result.insertId }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to insert todo', { status: 500 });
  }
}

export async function PUT({ request }) {
  const { id, text, completed } = await request.json();
  try {
    await db.query('UPDATE todos SET text = ?, completed = ? WHERE id = ?', [
      text,
      completed,
      id,
    ]);
    return new Response('Todo updated', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update todo', { status: 500 });
  }
}

export async function DELETE({ request }) {
  console.log("DELETE");
  const { id } = await request.json();
  try {
    await db.query('DELETE FROM todos WHERE id = ?', [id]);
    console.log('DELETE FROM todos WHERE id = ?', [id])
    return new Response('Todo deleted', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete todo', { status: 500 });
  }
}
