'use client'
import React, { useContext, useState } from 'react'
import { Children } from '../models/childrenModel'
import { Usuario } from '../models/usuarioModel'
import { UsuarioContext } from '../context/usuarioContex'
import { Resultado } from '../models/resultadoModel'

export default function UsuarioProvider({ children }: Children) {

    const [usuario, setUsuario] = useState<Usuario | null>(null)

    const usuarios = [
        { correo: 'admin@gmail.com', contrasena: 'admin123', tipo_usuario: 'admin' },
        { correo: 'consultor@gmail.com', contrasena: 'consultor123', tipo_usuario: 'consultor' }
    ]

    function autenticacion(usuario: Usuario): Resultado {
        let auth: boolean = false
        let tipo_user: string = ''

        const index = usuarios.findIndex(u => u.correo === usuario.correo)

        if (index !== -1) {
            const nuevoUsuario = usuarios[index]
            if (nuevoUsuario.contrasena === usuario.contrasena) {
                setUsuario(nuevoUsuario)
                auth = true
                tipo_user = nuevoUsuario.tipo_usuario
            } else {
                alert('Contraseña incorrecta')
            }
        } else {
            alert('Usuario no encontrado')
            auth = false
        }

        return {
            success: auth,
            tipo_user
        }
    }

    return (
        <UsuarioContext.Provider value={{ usuario, autenticacion }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export function useUsuarioContext() {
    return useContext(UsuarioContext)
}
