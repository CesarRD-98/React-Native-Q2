'use client'
import React, { useContext, useState } from 'react'
import { Children } from '../models/childrenModel'
import { EventoContext } from '../context/eventoContext'
import { Evento } from '../models/eventoModel'

export default function eventosProvider({ children }: Children) {

    const [eventos, setEventos] = useState<Evento[]>([])
    const [eventosEliminados, setEventosEliminados] = useState<Evento[]>([])
    const [index, setIndex] = useState<number>(0)

    function agregarEvento(evento: Evento) {
        
    }

    function eliminarEvento(evento: Evento) {
        
    }

    function autoIncremento() {
        setIndex(index + 1)
    }


    return (
        <>
            <EventoContext.Provider value={{eventos, eventosEliminados, agregarEvento, eliminarEvento}}>
                {children}
            </EventoContext.Provider>
        </>
    )
}

export function useEventoContext() {
    return useContext(EventoContext)
}
