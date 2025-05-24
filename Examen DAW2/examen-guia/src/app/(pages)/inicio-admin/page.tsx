'use client'
import React, { useState } from 'react'

export default function page() {

  const [evento, setEvento] = useState<string>('')
  const [direccion, setDireccion] = useState<string>('')
  const [fechaInicial, setFechaInicial] = useState<string>('')
  const [fechaFinal, setFechaFinal] = useState<string>('')


  return (
    <div className='container-fluid p-5'>
      <div className="row">
        <div className="col-5">
          <h2>Creacion de eventos</h2>
          <form action="">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese nombre de evento"
                value={evento}
                onChange={(e) => setEvento(e.target.value)} />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)} />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)} />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                placeholder="Ingrese su contraseña"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)} />
            </div>
            <button type="button" className="btn btn-success" >Guardar Evento</button>
          </form>
        </div>
        <div className="col-auto">
          <table className='table'>
            <thead>
              <tr>
                <th>Evento</th>
                <th>Dirección</th>
                <th>Fecha de inicio y final</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Año nuevo</td>
                <td>Bul. Centroamérica</td>
                <td>1-1-2026 al 2-1-2026</td>
                <td>
                  <button className='btn btn-sm btn-warning me-2'>Editar</button>
                  <button className='btn btn-sm btn-danger'>Eliminar</button>
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
