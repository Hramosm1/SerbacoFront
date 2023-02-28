export class DatosDireccionSocioPedido {
    constructor(
        public opcion: Number,
        public Socio: String,
        public IdDireccionRecepcion:Number,
        public DireccionRecepcion:String,
        public IdDepartamentoRecepcion:Number, 
        public IdZonaRecepcion: Number,
        public IdColoniaRecepcion:Number,
        public IdMunicipioRecepcion:Number,
        public ReferenciaDireccionRecepcion:String,
        public IdUsuario:Number,
    ){}
};
