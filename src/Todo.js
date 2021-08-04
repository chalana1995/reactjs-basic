import React from 'react'

export default function Todo({ todo, toggleTodo }) {


    const changeCheked = () => {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onClick={changeCheked} />
                {todo.name}
            </label>
        </div>
    )
}
