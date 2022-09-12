export class Exportacion {
    pac_num_documento?: string;
    pac_ape_paterno?: string;
    pac_ape_materno?: string;
    pac_nombres?: string;
    pac_edad?: number;
    pac_telefono?: string;
    pac_celular?: string;
    pac_direccion?: string;
    hpa_edad_gestacion?: string;
    pac_fec_registro?: Date;

    hpa_ape_paterno?: string;
    hpa_ape_materno?: string;
    hpa_nombres?: string;
    hpa_fec_hora_nacimiento?: string;
    hpa_fec_nacimiento?: string;
    hpa_hora_nacimiento?: string;
    hpa_genero?: string;
    hpa_prematuro?: string;
    hpa_transfundido?: string;
    hpa_peso?: number;
    hpa_talla?: number;
    hpa_hor_lactancia?: string;
    hpa_fec_registro?: Date;

    mue_id?: number;
    mue_num_tarjeta?: string;
    mue_num_muestra?: number;
    mue_observaciones?: string;
    mue_sec_ingreso?: number;
    mue_redirigido?: number;
    mue_fec_registro?: Date;
    mue_pruebas?: string;

    mue_ddc_id?: number;
    mue_doc_id?: number;
    mue_control?: string;
    rpe_resultado?: number;

    mue_cen_id?: number;
    cen_nombre?: string;

    mue_zco_id?: number;
    zco_descripcion?: string;

    mue_usu_responsable?: string;


}