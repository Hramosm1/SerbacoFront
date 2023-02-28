export class DatosPedido {
    constructor(
        public IdMoneda: Number,       
        public IdDireccionRecepcion: Number,
        public IdDireccionEntrega: Number,
        public IdTelefono: Number,
        public IdFormaPago: Number,
        public IdCuentaBancaria: Number,
        public FechaHoraEntrega: String,
        public SolicitudCobro: Number,
        public MontoCobro: Number,
        public Observaciones: String,
        public Especificaciones: String,
        public IdTipoPedido: Number,
        public HoraAntesDe: String,
        public HoraDespuesDe: String,
        public IdUsuario: Number
    ){}
};
