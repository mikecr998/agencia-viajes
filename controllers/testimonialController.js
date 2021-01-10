import {Testimonial} from '../models/Testimoniales.js' // Importar el modelo 

const guardarTestimonial = async(req, res) => {
  // Validar 
  const {nombre, correo, mensaje} = req.body

  const errores= []

  if(nombre.trim() === '') {
    errores.push({mensaje: "EL nombre no puede estar vacio"})
  }
  if(correo.trim() === '' ) {
    errores.push({mensaje: "EL correo no puede estar vacio"})
  }
  if(mensaje.trim() === '') {
    errores.push({mensaje: "EL mensaje no puede estar vacio"})
  }

  if(errores.length > 0) {
    // Consultar los testimoniales en la BD
    const testimoniales = await Testimonial.findAll()

    // Mostrar la vista con los errores
    res.render('testimoniales', {
      pagina: "Testimoniales",
      errores,
      nombre, 
      correo,
      mensaje,
      testimoniales
    })
  } else {
    // Almacenarlo en la basse de datos
    try {
      await Testimonial.create({
        nombre,
        correo, 
        mensaje
      })

      res.redirect('/testimoniales')
    } catch (error) {
      console.log(error)
    }
  }
}

export {
  guardarTestimonial
}