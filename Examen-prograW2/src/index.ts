import { Cancion } from './classes/cancionClass'
import { CancionModel } from './models/cancionModel';

const canciones: CancionModel[] = [
    { id: 1, titulo: "Bohemian Rhapsody", artista: "Queen", album: "A Night at the Opera", fecha_estreno: "1975-10-31", duracion: "5:55" },
    { id: 2, titulo: "Hotel California", artista: "Eagles", album: "Hotel California", fecha_estreno: "1976-12-08", duracion: "6:30" },
    { id: 3, titulo: "Billie Jean", artista: "Michael Jackson", album: "Thriller", fecha_estreno: "1983-01-02", duracion: "4:54" },
    { id: 4, titulo: "Smells Like Teen Spirit", artista: "Nirvana", album: "Nevermind", fecha_estreno: "1991-09-10", duracion: "5:01" },
    { id: 5, titulo: "Like a Rolling Stone", artista: "Bob Dylan", album: "Highway 61 Revisited", fecha_estreno: "1965-07-20", duracion: "6:13" },
    { id: 6, titulo: "Someone Like You", artista: "Adele", album: "21", fecha_estreno: "2011-01-24", duracion: "4:45" },
    { id: 7, titulo: "Stairway to Heaven", artista: "Led Zeppelin", album: "Led Zeppelin IV", fecha_estreno: "1971-11-08", duracion: "8:02" },
    { id: 8, titulo: "Yesterday", artista: "The Beatles", album: "Help!", fecha_estreno: "1965-08-06", duracion: "2:05" },
    { id: 9, titulo: "Imagine", artista: "John Lennon", album: "Imagine", fecha_estreno: "1971-10-11", duracion: "3:04" },
    { id: 10, titulo: "Sweet Child o' Mine", artista: "Guns N' Roses", album: "Appetite for Destruction", fecha_estreno: "1987-07-21", duracion: "5:56" }
]

Cancion.agregarCanciones(canciones)

Cancion.mostrarCanciones()
