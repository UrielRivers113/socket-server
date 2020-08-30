import express from 'express';
import { SERVER_PORT } from '../global/environment';

import socketIO from 'socket.io'; //Para que no marque error, instalar "npm install @types/socket.io --save-dev"

import http from 'http';

import * as socket from '../sockets/socket';

export default class Server{

    //_instance es del mismo tipo de la clase Server
    private static _instance: Server;


public app: express.Application;
public port: number;

//io parecido al servidor de expres, es la configuración de la conexión de los sockets// 
//io propiedad encargada de emitir eventos
public io: socketIO.Server;
//Este va a ser que vamos a levantar y no el app
private httpServer: http.Server;


//Patrón sigleton para asegurarme de que solo exista una unica instancia de mi clase Server

private constructor(){
    this.app = express();
    this.port = SERVER_PORT
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSockets();
}

public static get instance(){
    //si ya existe una instancia regresa esa instancia cuando se quiera obtener el get instance
    //y si no existe o es la primera vez que se llama esa funcion crea una nueva instancia
     return this._instance || (this._instance = new this()) //new this() es como si fuera new Server();
}

private escucharSockets(){
    console.log('Escuchando conexiones - sockets')
    //Cuando una persona se conecta al servidor //on para escuchar eventos
    this.io.on('connection', cliente =>{
        console.log('Cliente conectado')
    
    //Mensajes
    socket.mensaje(cliente, this.io);



    //Desconectar
    socket.desconectar(cliente);



    });

    

}


start(callback: any){
    //this.app.listen(this.port, callback); //Esta linea fue cuando era puro server express
    this.httpServer.listen(this.port, callback);
}

}

