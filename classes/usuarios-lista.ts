import { Usuario } from './usuario';
// La idea de este es que yo tenga centralizado acá la logica de todos mis usuarios
//procesos para agregar, mandar mensajes e particular, en fin... toda la lógica


export class UsuariosLista{
    private lista: Usuario[] = [];

    constructor(){}

    // Agregar un usuario
    public agregar(usuario: Usuario){
        this.lista.push(usuario);
        console.log(usuario);
        return usuario;
    }

    // ESTE SERÍA DIFERENTE SI FUERA A UNA BASE DE DATOS 
    public actualizarNombre(id: string, nombre: string){
        
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando usuario ====');
        console.log(this.lista);

    }


    // Obtener lista de usuarios
    public getLista(){
        return this.lista;
    }

    // Obtener un usuario
    public getUsuario(id: string){
        return this.lista.find(usuario => usuario.id === id)
    }

    // Obtener usuarios en una sala en particular
    public getUsuariosEnSala(sala: string){
        return this.lista.filter(usuario=> usuario.sala === sala)
    }

    // Borrar usuario
    public borrarUsuario(id: string){
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario=> usuario.id !== id);
        return tempUsuario
    }





}