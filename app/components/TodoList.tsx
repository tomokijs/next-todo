'use client'

import { useState, useEffect } from 'react'

type Todo = {
  id: number
  title: string
  date: Date | string // Date型も許容
  done: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todo')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data.todos)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch todos:', err)
      setError('TODOの取得に失敗しました')
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      })

      if (!response.ok) {
        throw new Error('Failed to add todo')
      }

      setNewTodo('')
      fetchTodos()
      setError(null)
    } catch (err) {
      console.error('Failed to add todo:', err)
      setError('TODOの追加に失敗しました')
    }
  }

  const formatDate = (date: Date | string) => {
    try {
      return new Date(date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch (err) {
      console.error('Date formatting error:', err)
      return '日付不明'
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">TODOリスト</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="新しいTODOを入力..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            追加
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-700"
          >
            <span>{todo.title}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(todo.date)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
