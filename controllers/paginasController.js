// Importar modelos
import {Viaje} from '../models/Viaje.js' 
import {Testimonial} from '../models/Testimoniales.js'

const paginaInicio = async (req,res) => {

  const promiseDB = []
  promiseDB.push(Viaje.findAll({limit:3}))
  promiseDB.push(Testimonial.findAll({limit:3}))

  try {
    // Consultar 3 viajes del modelo Viaje
    //const viajes = await Viaje.findAll({limit:3})
    // Consultar los testimoniales a la BD
    //const testimoniales = await Testimonial.findAll({limit:3})
    const resultado = await Promise.all(promiseDB)

    res.render('inicio', {
      pagina: "Inicio",
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
    })
  } catch (error) {
    console.log(error)
  }  
}
const paginaNosotros = (req,res) => {
  res.render('nosotros', {
    pagina: "Nosotros"
  })
}

const paginaViajes = async (req,res) => {
  // Consultar BD
  const viajes = await Viaje.findAll()
  // console.log(viajes)

  res.render('viajes', {
    pagina: "Proximos Viajes",
    viajes
  })
}

const paginaTestimoniales = async (req,res) => {
  try {
    // Consultar los testimoniales a la BD
    const testimoniales = await Testimonial.findAll()
    // console.log(testimoniales)

    res.render('testimoniales', {
      pagina: "Testimoniales",
      testimoniales
    })
    
  } catch (error) {
    console.log(error)
  }
}

// Muestra la info de cada viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  // console.log(req.params.slug)
  const {slug} = req.params

  try {
    const viaje = await Viaje.findOne({where: {slug}})
    // console.log(viaje)
    res.render('viaje', {
      pagina: 'Información Viaje',
      viaje
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}