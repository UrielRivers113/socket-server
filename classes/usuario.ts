export class Usuario{

    // ID del socket que se está conectando, siempre debe existir, es obligatorio

    public id: string;
    public nombre: string;
    public sala: string;

    constructor(id: string){
        this.id = id;
        this.nombre = 'Sin-nombre';
        this.sala = 'Sin-sala';

    }
}