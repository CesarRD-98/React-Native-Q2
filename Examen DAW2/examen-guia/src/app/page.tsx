'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsuarioContext } from "./provider/usuarioProvider";

export default function Home() {

  const router = useRouter()
  const { usuario, autenticacion } = useUsuarioContext()

  const [correo, setCorreo] = useState<string>('')
  const [contrasena, setContrasena] = useState<string>('')

  async function manejarInicioSesion() {

    if (!correo.trim() || !contrasena.trim()) {
      return alert('Campos vacios')
    }

    const validar = autenticacion({ correo, contrasena })

    if (validar && validar.tipo_user === 'consultor') {
      router.push('/inicio')
    } 
    
    if (validar && validar.tipo_user === 'admin') {
      router.push('/inicio-admin')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ width: 300 }}>
        <h2>Inicio de sesión</h2>
        <form action="">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)} />
          </div>
          <button type="button" className="btn btn-success" onClick={manejarInicioSesion}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}
