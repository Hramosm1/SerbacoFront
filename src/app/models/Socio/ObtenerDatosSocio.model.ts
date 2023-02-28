export class ObtenerDatosSocio {
    constructor(
        public IdSocio: Number,
        public IdTipoIdentificacion: Number,
        public DescripcionNit: String,      
        public IdTipoIdentificacionDPI: Number,
        public DPI: String,      
        public TipoPersona: Number,
        public Nombres: String,
        public Apellidos: String,
        public NombreSocio: String,
        public RazonSocial: String,
        public Telefono: String,
        public IdTipoTelefono: Number,
        // public TipoTelefono: String,
        public IdUsuario: Number
    ){}
};
