## Preparación


### En replit:

Crear un replit con node.js y ejecutar en el shell:


```
   $ npx create-react-app client
```

Luego ejecuta el cliente de este modo:

```
   $ cd client
   $ npm start
```


### En tu PC

```
  $ mkdir tutorial-client
  $ cd tutorial-client
  $ npm init
  $ npx create-react-app client
  $ cd client
  $ npm start
  ```

## Elimina archivos innecesarios

Elimina los siguientes archivos en la carpeta `client/src`:

- client/README.md
- client/src/App.test.js
- client/src/logo.svg
- client/src/reportWebVitals.js
- client/src/setupTests.js

Luego modifica el archivo App.js dejándolo así:

```javascript
import React, { Fragment } from "react"
import './App.css';

function App() {
  return (
    <Fragment>
      <h1>App</h1>
    </Fragment>
  );
}

export default App;
```

Y deja el archivo `src/index.js` de la siguiente forma:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Fíjate cómo la página principal cambia para dejar sólo el texto `App` en negrita

## Agregar Bootstrap 5

Vamos a usar Bootstrap 5 para darle el estilo gráfico a nuestra aplicación. Para esto modifica el archivo `client/public/index.html` y agrega la siguiente linea debajo de <title>...</title>

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```

Depués antes de la etiqueta `</body>` agrega esto:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```

Con esto tenemos acceso a bootstrap 5 en nuestra app.

## Agregando nuestro primer componente

Crea una carpeta `components` debajo de src. Agrega el archivo `ListTodos.js`

Dentro de `src/components/ListTodos.js` escribe este código:

```javascript
import React, { Fragment} from "react"


const ListTodos = () => {
    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
```

De este modo hemos configurado una tabla que contendrá nuestros registros.


Luego modifica App.js de este modo:

```javascript 
//components
import ListTodos from "./components/ListTodos";

const App = () => {
  return (
    <Fragment>
       <div className="container">
          <ListTodos />
        </div>
    </Fragment>
  );
}
```

## Conectandose a la API

Ahora usaremos `useState` y `useEffect` para recuperar la data desde el servidor backend.

Modifica el archivo `componentes/ListTodos.js` de este modo:

```javascript
import React, { Fragment, useEffect, useState } from "react"

const serverApiUrl = 'https://server-tutorial-pern.lnds.repl.co/todos'

const ListTodos = () => {
  const [todos, setTodos] = useState([])
  
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
   console.log(todos)
   return (
```    

Deja todo lo que viene después de return tal como estaba.

Ahora navega a la aplicación usando Chrome y activa developers tools, y revisa la consola de Chrome. Si todo está bien verás los registros.

Atención, el valor de `serverApiUrl` puede variar.

## Desplegar los registros en pantalla

Modifica las últimas lineas de la función `ListTodos()` de este modo:

```javascript
//console.log(todos)
    return (
        <Fragment>
            <table className="table  mt-5 text-center">
                <thead>
                    <tr>
                        <th scope="col">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                  {todos.map(todo =>
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
```

Al hacer esto se desplegarán los registros en pantalla.

## Agregar Tareas

Ahora crea el archivo `components/InputTodo.js` con el siguiente contenido:

```javascript
import React, { Fragment, useState } from "react"

const serverApiUrl = 'https://server-tutorial-pern.lnds.repl.co/todos'

const InputTodo = () => {

    const [description, setDescription] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { description }
            const response = await fetch(serverApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Lista de Tareas</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Agregar</button>
            </form>
        </Fragment>
    )
}

export default InputTodo
```

Y modifica App.js agregando esta componente del siguiente modo:

```javascript
//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

const App = () => {
  return (
    <Fragment>
       <div className="container">
          <InputTodo />
          <ListTodos />
        </div>
    </Fragment>
  );
}
```

Una vez hecho esto puedes probar agregar una nueva tarea a tu lista.

## Editar una tarea

Agrega el archivo `components/EditTodo.js` con este contenido:

```javascript
import React, { Fragment, useState } from "react";

import serverApiUrl from "./consts"

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    // edit description function
    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = { description }
            const response = await fetch(`${serverApiUrl}/${todo.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            //console.log(response)
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${todo.id}`}
            >
                Editar
            </button>
            <div className="modal fade" id={`id${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => setDescription(todo.description)}
                                data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default EditTodo
```

Fíjate que hemos dejado la constante `serverApiUrl` en el archivo `components/consts.js`.

Modifica también el archivo `components/ListTodos.js`:

```javascript
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
```

Ahora puedes probar modificando tus registros


