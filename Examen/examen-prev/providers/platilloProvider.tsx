import React, { useContext, useState } from 'react'
import { Children } from '../models/childrenModel'
import { Platillo } from '../models/platilloModel'
import { PlatillosContext } from '../contexts/platillosContext'

export default function PlatilloProvider({ children }: Children) {

  const [platillos, setPlatillos] = useState<Platillo[]>([
    { id: 1, nombrePlato: 'Baleadas', precio: 25 },
    { id: 2, nombrePlato: 'Sopa de Caracol', precio: 150 },
    { id: 3, nombrePlato: 'Yuca con chicharrón', precio: 120 },
    { id: 4, nombrePlato: 'Tajadas con Carne', precio: 100 },
    { id: 5, nombrePlato: 'Enchiladas hondureñas', precio: 80 },
    { id: 6, nombrePlato: 'Pupusas', precio: 50 },
    { id: 7, nombrePlato: 'Sopa de Frijoles', precio: 130 },
    { id: 8, nombrePlato: 'Pollo Chuco', precio: 90 },
    { id: 9, nombrePlato: 'Ticucos', precio: 70 },
    { id: 10, nombrePlato: 'Catrachas', precio: 40 },
  ])

  const [platillosAgregados, setPlatillosAgregados] = useState<Platillo[]>([])
  const [platillosEliminados, setPlatillosEliminados] = useState<Platillo[]>([])


  function agregarPlatillo(platillo: Platillo) {

    const index = platillosAgregados.findIndex(p => p.id === platillo.id)

    if (index === -1) {
      setPlatillosAgregados([...platillosAgregados, platillo]) 
    }
  }

  
  function eliminarPlatillo(platillo: Platillo) {

    const index = platillosEliminados.findIndex(p => p.id === platillo.id)

    if (index === -1) {
      setPlatillosEliminados([...platillosEliminados, platillo]) 
    }

    setPlatillosAgregados(() => {
      const nuevosPlatillos = platillosAgregados.filter(p => p.id !== platillo.id)
      return nuevosPlatillos
    })
  }

  return (
    <PlatillosContext.Provider value={{ platillos, platillosAgregados, platillosEliminados, agregarPlatillo, eliminarPlatillo }}>
      {children}
    </PlatillosContext.Provider>
  )
}

export function usePlatillosContext() {
  return useContext(PlatillosContext)
}
