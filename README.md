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

