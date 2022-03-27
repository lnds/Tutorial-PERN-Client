import React, { Fragment, useEffect, useState } from "react"

import EditTodo from "./EditTodo"

import serverApiUrl from "./consts"

const ListTodos = () => {
  const [todos, setTodos] = useState([])
  
  const getTodos = async () => {
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
                    </tr>
                </thead>
                <tbody>
                  {todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
