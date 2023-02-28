export class DetallePagoPedido{
    constructor(
        public IdPedido	:	Number,
        public IdConceptoPago :	Number,
        public IdFormaPago :	Number,
        public IdMoneda		:	Number,
        public MontoCobro	:	Number,	
        public IdUsuarioRegistro : Number
    ){}
};