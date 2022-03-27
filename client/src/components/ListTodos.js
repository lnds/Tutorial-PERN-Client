import React, { Fragment, useEffect, useState } from "react"

import EditTodo from "./EditTodo"

import serverApiUrl from "./consts"

const ListTodos = () => {
  const [todos, setTodos] = useState([])
  
   // delete todo function
  const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`${serverApiUrl}/${id}`, {
                method: "DELETE"
            })

            //console.log(deleteTodo)
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

  const getTodos = async () => {
    console.log(serverApiUrl)
        try {
            const response = await fetch(serverApiUrl,
                                        )
            const jsonData = await response.json()

            setTodos(jsonData)
            console.log(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getTodos()
    }, [])
   //console.log(todos)
    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">Descripción</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                  {todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    Borrar
                                </button>
                            </td> 
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
