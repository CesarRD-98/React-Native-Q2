import { createContext } from "react";
import { Platillo } from "../models/platilloModel";

export const PlatillosContext = createContext({
    platillos: {} as Platillo[],
    platillosAgregados: {} as Platillo[],
    platillosEliminados: {} as Platillo[],
    agregarPlatillo: (platillo: Platillo) => {},
    eliminarPlatillo: (platillo: Platillo) => {}
})