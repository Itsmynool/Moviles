//https://app.quicktype.io/

export interface Productos {
    id:               number;
    product:          string;
    characteristics:  string;
    linkvideo:        Linkvideo[];
    conditions:       Conditions;
    featured:         number;
    brandproviderid:  number;
    subcategoryid:    number;
    optionsstatus:    Applydevolution;
    optionscreatedat: Date;
    optionsupdatedat: null;
    weight:           number;
    volume:           number;
    sku:              string;
    long:             number;
    high:             number;
    wide:             number;
    warrantyid:       number;
    applydevolution:  Applydevolution;
}

export enum Applydevolution {
    No = "No",
    Si = "Si",
}

export enum Conditions {
    AceptaDevoluciones = "Acepta devoluciones",
}

export interface Linkvideo {
    url: string;
}


export interface UsuariosNew {
    nombre: string;
    correo: string;
    rol:    string;
    estado: boolean;
    google: boolean;
    uid:    string;
}

export interface UsuarioRef {
    _id:    string;
    nombre: string;
}


export interface CategoriasNew {
    _id:     string;
    nombre:  string;
    usuario: UsuarioRef;
}

export interface CategoriaRef {
    _id:    string;
    nombre: string;
}

export interface ProductosNew {
    _id:       string;
    nombre:    string;
    usuario:   string;
    precio:    number;
    categoria: CategoriaRef;
    imagen:    string;
}







