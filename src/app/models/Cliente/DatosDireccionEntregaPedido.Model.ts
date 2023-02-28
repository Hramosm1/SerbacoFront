export class DatosDireccionEntregaPedido {
    constructor(
        public IdDireccionEntrega:Number,
        public IdUsuario:Number,
        public Nombre: String,
        public Telefono: String,
        public DireccionEntrega:String,
        public IdDepartamentoEntrega:Number, 
        public IdZonaEntrega: Number,
        public IdColoniaEntrega:Number,
        public IdMunicipioEntrega:Number,
        public ReferenciaDireccionEntrega:String,
    ){}
};
