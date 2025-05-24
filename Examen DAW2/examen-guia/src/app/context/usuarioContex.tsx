'use client'
import { createContext } from "react";
import { Usuario } from "../models/usuarioModel";
import { Resultado } from "../models/resultadoModel";

type tipoContext = {
    usuario: Usuario | null
    autenticacion: (usuario: Usuario) => Resultado
}

export const UsuarioContext = createContext<tipoContext>({
    usuario: null,
    autenticacion: (usuario: Usuario) => ({success: false, tipo_user: ''})
})
