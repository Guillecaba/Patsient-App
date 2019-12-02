import { Persona } from './persona';

export interface Ficha{
    idFichaClinica: Number,
    fechaHora: Date,
    motivoConsulta : string,
    diagnostico	:string,
    idLocal: {
        idLocal:Number,
        nombre:string
    }
    idEmpleado:Persona,
    idCliente:Persona,
    idTipoProducto:{
        idTipoProducto:Number,
        descripcion:string
        idCategoria:{
            idCategoria:Number,
            descripcion:string,
            flagVisible:string,
        },
    },
    observacion	:string
}