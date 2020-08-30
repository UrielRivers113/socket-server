import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors'; //Para que no marque error, ejecutar npm install@types/cors --save-dev

const server = Server.instance;

//body parser
//Lo que dicen estas lineas es: "lo que sea que me posteen tomalo y genera un objeto de javascript"
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json);

//CORS
server.app.use(cors({origin:true, credentials: true}));

//Rutas de servicios
server.app.use('/', router );

server.start(()=>{
    console.log(`El servidor está corriendo en el puerto: ${server.port} `);
})