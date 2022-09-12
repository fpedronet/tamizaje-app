import { Byte } from "@angular/compiler/src/util";
import { pagination } from "../pagination";

export class Usuario {
    vUsuario? : string;
    vContrasena? : string;
}

export class TokenUsuario{
    idPersona? : number;
    idUsuario? : number;
    nombreConocido? : string;
    documento? : string;
    access_token? : string;
    typeResponse? : number;
    mensaje? : string;
}

export class UsuarioRequest extends pagination {
    documento? : string;
    data? : string;
    estado? : string;
}
