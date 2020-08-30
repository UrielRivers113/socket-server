import {Router, Request, Response} from 'express';
import Server from '../classes/server';

const router = Router(); //Para crear API end points


router.get('/mensajes',(req: Request, res: Response)=>{
    res.json({
        ok: true,
        mensaje: 'Todo está bien'
    });
});

router.post('/mensajes',(req: Request, res: Response)=>{

    //Estos son los dos campos que ingresas en el postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        cuerpo,
        de
    }

    const server =  Server.instance;

    //Así para mandar a todos los conectados
    server.io.emit('mensaje-nuevo', payload);


    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id',(req: Request, res: Response)=>{

    //Estos son los dos campos que ingresas en el postman
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    // in sirve para mandar mensaje a una persona que se encuentre en un canal particular
    // tiene que ser el mismo mensaje que escucho en angular
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});


export default router;