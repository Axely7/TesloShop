# Next.js Teslo Shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d

```

- El -d, significa **detached**

## Configurar las variables de entorno

Renombrar el archio **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los módulos de node y levantar Next

```
npm install
npm run dev
```

## Llenar la BD con información de pruebas

LLamar a :

````
    http://localhost:3000/api/seed
```
````
