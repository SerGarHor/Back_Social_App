#Backend Social App

Hola a todos, este es el backend de la aplicacion Social_App, este proyecto ha sido creado con el fin de una prueba tecnica y tambien para aprendizaje

Este proyecto tiene un Frontend, aca te dejo el enlace del repositorio: https://github.com/SerGarHor/Social_App/tree/master

Este proyecto se ha realizado con Node js, con ayuda de express, cors y JWT para el tema de las autorizaciones y para la base de datos
se realizo con postgresql-16.1-1

se realizo con estas versiones de node y npm:

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/125b5738-0b50-4b8c-91be-61044ef790e9)

Ahora te mostrare algunas cosas importantes del proyecto:

Se creo un archivo .env para poder usar las variables de entorno en cualquier parte del proyecto y para buenas practicas:

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/9f04e33b-86d3-4614-951c-e3ee98ddb692)

Se creo un servicio para conectar con la base de datos, esta misma la puedes encontrar en el directorio raiz del proyecto

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/1085ddc5-0a6e-4907-a0b6-785ab8fbd61f)

En el archivo routes, puedes encontrar los servicios a la base de datos, quedo estructurado entonces no tienes pierde de
donde estan las peticiones, hay algunos comentarios para orientarte mejor de que hace cada cosa

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/f8d2604c-f9e5-40f6-b4e1-e5ead7981e76)

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/1d7a6999-9ba9-4b4c-b3eb-922629d3c73d)

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/b41f19f3-ea24-4b14-bb00-4a42aee3d7d1)


Se creo un middleware para poder validar el token cuando viene o esta vacio

![image](https://github.com/SerGarHor/Back_Social_App/assets/93298529/8fd56b09-d732-4b8e-870e-63fb6ee92b7f)

Esto es lo mas importante del backend, el resto ya puedes leer los archivos y la estrcutura con la cual maneje el backend
trate de hacerla con un estandar global

Espero te sirva mucho este proyecto, mucha suerte desarrollador! 🧑‍💻
