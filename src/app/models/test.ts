export interface Event {
    id: number;
    categoria: Categoria;
    nombre: string;
    direccion: string;
    foto_evento: string;
    position: string;
    limite_asistencia: number;
    descripcion: string;
    inicio: string;
    fin: string;
    recurrencia: string;
    contacto_nombre: null;
    contacto_email: null;
    contacto_telefono: null;
    link_facebook: null;
    link_uts: null;
    link_instagram: null;
    observacion: null;
    slug: string;
    visitas: number;
    permitir_reservas: boolean;
    is_destacado: boolean;
    lugar: number;
    sitio: null;
  }
interface Categoria {
    id: number;
    nombre: string;
    tags: string;
  }