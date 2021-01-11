const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if( !data.nombre ){
            return callback({
                error: true,
                message: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala)

        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasBySala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió.`));

        let personasPorSala = usuarios.getPersonasBySala(data.sala);

        callback( personasPorSala );
    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersonaById(client.id);

        let mensaje =  crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);

    })

    client.on('disconnect', () => { 

        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió.`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasBySala(personaBorrada.sala));


     } )

    //  Mensajes privados

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersonaById(client.id);

        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) ); 

    })

});