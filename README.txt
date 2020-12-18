 -------Aplicación de notificaciones push-------

Pasos para su funcionamiento:

1 - Ejecutar los siguientes comandos en la carpeta de nuestro proyecto:
    npm init -y --> nos crea el packaje.json
    npm install express dotenv webpush morgan --> modulos requeridos

--------------------------------------------------------------------------------------------------------------------------

2 - En caso de que no funcione la clave publica y/o privada, ir a la siguiente web:
    https://d3v.one/vapid-key-generator/

--------------------------------------------------------------------------------------------------------------------------

3 - Seguidamente, se copian ambas claves en el archivo .env y la clave publica tambien en el archivo main.js (linea 3)
    (no cambiar nombre de variables, solo el string de las claves)

---------------------------------------------------------------------------------------------------------------------------