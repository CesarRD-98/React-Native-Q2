import { CancionModel } from "../models/cancionModel"

export class Cancion {
    static canciones: CancionModel[] = []

    id: number
    titulo: string
    artista: string
    album: string
    fecha_estreno: string
    duracion: string

    constructor(id: number, titulo: string, artista: string, album: string, fecha_estreno: string, duracion: string) {
        this.id = id,
        this.titulo = titulo
        this.artista = artista
        this.album = album
        this.fecha_estreno = fecha_estreno
        this.duracion = duracion
    }

    static agregarCanciones(array: CancionModel[]) {
        Cancion.canciones = array
        console.log('\nSe agregaron canciones exitosamente\n');
    }

    static mostrarCanciones() {
        console.log(Cancion.canciones);
    }
}