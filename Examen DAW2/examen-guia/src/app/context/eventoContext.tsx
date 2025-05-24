import { createContext } from "react";
import { Evento } from "../models/eventoModel";

export const EventoContext = createContext({
    eventos: {} as Evento[],
    eventosEliminados: {} as Evento[],
    agregarEvento: (evento: Evento) => {},
    eliminarEvento: (evento: Evento) => {}
})