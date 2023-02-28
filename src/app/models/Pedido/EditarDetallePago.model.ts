export class EditarDetallePagoPedido{
    constructor(
        public IdDetalleImportePedido	:Number,
        public MontoCobro :	String,
        public IdConceptoPago : Number,
        public IdFormaPago : Number,
        public IdUsuarioModificacion :Number
    ){}
};