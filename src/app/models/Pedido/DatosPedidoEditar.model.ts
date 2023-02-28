export class DatosPedidoEditar {
    constructor(
        public IdPedido:Number,
        public IdMoneda:Number,
        public IdFormaPago: Number,
        public IdCuentaBancaria: Number,
        public FechaHoraEntrega:String,
        public SolicitudCobro:Number, 
        public MontoCobro: Number,
        public Observaciones:String,
        public Especificaciones:String,
        public IdTipoPedido:Number,
        public IdDireccionRecepcion:Number,
        public IdUsuario:Number
    ){}
};
