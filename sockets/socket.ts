//Este archivo es para crear la configuración y las opciones de cada una de las acciones que van a ser disparadas
//desde server.ts
//Para que aquí tengamos toda la lógica, y en el otro archivo las referencias de lo que quiero llamar

import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket) =>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario)

}


export const desconectar = (cliente: Socket)=>{

    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado');
        usuariosConectados.borrarUsuario(cliente.id)

        
        
    });
}

// Escuchar mensajes que vienen de angular
//io es quien sabe los usuarios que están conectados
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{

    cliente.on('mensaje',(payload:{de: string, cuerpo: string})=>{
        console.log('Mensaje recibido', payload);

        // Es la misma propiedad que estoy escuchando desde angular
        io.emit('mensaje-nuevo', payload);

    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) =>{

    cliente.on('configurar-usuario',(payload:{nombre: string}, callback: Function)=>{
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        })
    })
}