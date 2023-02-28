import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import Stepper from 'bs-stepper';
import { comboSocio } from 'src/app/models/ComboBox/ComboSocio.model';
import { DatosDireccionSocio } from 'src/app/models/Socio/DatosDireccionSocio.model';
import { DatosContactoSocio } from 'src/app/models/Socio/DatosContactoSocio.model';
import { DatosTelefono } from 'src/app/models/Socio/DatosTelefono.model';
import Swal from 'sweetalert2';
import { DatosPedido } from 'src/app/models/Pedido/DatosPedido.model';
import * as moment from 'moment'
import { comboBoxDireccion } from 'src/app/models/ComboBox/ComboBoxDireccion.model';
import { MontoTarifa } from 'src/app/models/Tarifado/MontoTarifa.model';
import { DatosTarifaRuta } from 'src/app/models/Tarifado/DatosTarifaRuta.model';
import { comboDepartamento } from 'src/app/models/ComboBox/ComboDepartamento';
import { comboMunicipio } from 'src/app/models/ComboBox/ComboMunicipio.model';
import { comboZona } from 'src/app/models/ComboBox/ComboZona.model';
import { comboColonia } from 'src/app/models/ComboBox/comboColonia.model';
import { DetallePagoPedido } from 'src/app/models/Pedido/DetallePagoPedido.model';
import { fichaPedido } from 'src/app/models/FichaPedido/FichaPedido.model';
import { AccesoApiTigo } from 'src/app/models/MensajesTigo/AccesoApiTigo.model';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
  providers: [UserService, PedidoService]
})
export class PedidoComponent implements OnInit {
  //#region Atributos - Datos para obtener del token y los datos del usuario
  public token;
  public identity;
  public status;
  //#endregion
  //#region Atributos - Datos stepper
  private stepper: Stepper;
  public pedidos = 0;
  @ViewChild('auto') auto;
  //#endregion
  //#region Atributos - parametros para la creacion de pedido
  public comboSocio: comboSocio;
  public IdSocio = 0;
  public rolSocio = 0;
  public opcionPredeterminada;
  public opcionModal = 0;
  public loading: boolean;

  public datosDireccionSocio: DatosDireccionSocio;
  public datosContactoSocio: DatosContactoSocio;
  public datosTelefono: DatosTelefono;
  public datosPedido: DatosPedido;
  public obtenertTipoTelefono;
  public obtenertTipoPedido;
  public obtenertTipoFormaPago;
  public obtenerCuentaBancaria;
  public IdTipoTelefono = 0;
  public IdTipoPedido = 0;
  public idTelefonoCliente = 0;
  public idTelefonoClienteCF = 0;
  public IdCuentaBancaria = 0;
  public IdFormaPago = 0;
  public botonDireccion = 0;
  public botonTelefono = 0;
  public ingresarDatosDireccion = 0;
  public opcionSeleccionadoComboBox = 0;
  public DescripcionMunicipio = null;
  public DescripcionZona = null;
  public DescripcionColonia = null;
  public comboDireccionMunicipio: comboBoxDireccion;
  public comboDireccionZona: comboBoxDireccion;
  public comboDireccionColonia: comboBoxDireccion;
  public comboDireccion: comboBoxDireccion;
  public ObtenerIdPedido;
  //#endregion
  //#region Atributos - Palabras claves
  public keyword = 'Descripcion';
  public keyword3 = 'Descripcion';
  public keyword4 = 'Descripcion';
  public keyword7 = 'Descripcion';
  public keyword8 = 'Direccion';
  public keyword9 = 'NumeroCuenta';
  public keyword90 = 'Nombre';
  public keyword5 = 'NombreEmpresa';
  public keyword1 = 'Direccion'
  public keyword2 = 'Telefono'
  public keyword10 = 'Socio';
  public keyword41 = 'Nombre'
  //#endregion
  //#region Atribuyos - Parametros para la obtencion de la direccion
  public obtenerDireccionesSocio;
  public IdDireccion = 0;
  public Direccion2 = '';
  public Zona = '';
  public Colonia = '';
  public Municipio = '';
  public Departamento = '';
  //#endregion
  //#region Atributos - datos para calcular la tarifa
  public datoMontoTarifa: MontoTarifa
  public montoTarifa;
  public montoTarifaRuta;
  public datosTarifaRuta: DatosTarifaRuta;
  //#endregion
  //#region Atributos - parametros de los clientes
  public IdCliente = 0;
  public ObtenerClienteSocio;
  public NombreClienteSocio = '';
  public TelefonoClienteSocio = '';

  //#region combos para el llenado de las direcciones
  public comboDepartament: comboDepartamento;
  public comboMunicipio: comboMunicipio;
  public comboZona: comboZona;
  public comboColonia: comboColonia;
  public idDepartamento = 0;
  public idMunicipio = 0;
  public idZona = 0;
  public idColonia = 0;
  //#endregion
  //#endregion 
  //#region Atributos - parametros para obtener la direccion de los clientes
  public obtenerDireccionCliente;
  public IdDireccionCliente = 0;
  public DireccionCliente = '';
  public ZonaCliente = '';
  public ColoniaCliente = '';
  public MunicipioCliente = '';
  public DepartamentoCliente = ''
  //#endregion
  //#region Atributos - Parametros para ingreso de pedidos
  public date;
  public fechaHoraEntrega;
  public horaAntesDe;
  public horaDespuesDe;
  public conceptoPago;
  public idConceptoPago = 0;
  public formaPago;
  public DescripcionConceptoPago;
  public id = 0;
  public data = [];
  public resultado: Number
  public total;
  public DatosDetallePedido: DetallePagoPedido
  public listaPagos = [];
  public pageChange = 1;
  public numeroElemntos = 40;
  public datoRestado;

  //#endregion
  //#region Atributos - Parametros para la visualizacion del pedido
  public obtenerFichaPDF : fichaPedido

  //#endregion
   //#region atributos - Mensajeria tigo
   public DatosMensajeriaTigo: AccesoApiTigo;
   public ListadoInformacionTigo;
   public InformacionSocioMensajerias;
   //#endregion
  constructor(private _userServices: UserService, private _router: Router, private _pedidoServices: PedidoService) {
    this.datoMontoTarifa = new MontoTarifa(0, 0, 0, 0)
    this.datosTarifaRuta = new DatosTarifaRuta(0, 0, 0, 0, 0)
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.DatosMensajeriaTigo = new AccesoApiTigo('', '');
    this.datosDireccionSocio = new DatosDireccionSocio(0, 0, '', 0, 0, 0, 0, 0, '', 0, 0);
    this.datosContactoSocio = new DatosContactoSocio(0, 0, '', '', 0, 0);
    this.datosTelefono = new DatosTelefono(0, 0, 0, '', 0, 0, 0);
    this.datosPedido = new DatosPedido(0, 0, 0, 0, 0, 0, '', 0, 0, '', '', 0, '', '', 0)
    this.DatosDetallePedido = new DetallePagoPedido(0, 0, 0, 0, 0, 0);
    this.obtenerFichaPDF = new fichaPedido('','','','','','','','','','','','','','','','',0,'',0,'','','','','','','',0,0,'','','',0,'','',0,0,0,0,0,0,0,0,0,0,'','',0);

  }

  ngOnInit() {
    this.obtenerSocio();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    
    this.comboTipoTelefono();
    this.getComboDepartamento();
    this.obtenerFechaHoraEntrega();
    this.obtenerTipoPedido();
    this.ComboConceptoPago();
    this.obtenerFormaPago();
  }

  //#region Metodos - Botones siguiente y atras del stepper
  next(params) {
    if (params == 1) {
      if (this.IdSocio == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Selección de socio',
          text: 'Debe de seleccionar al socio de quien se va a registrar el pedido',
        })
      }else if (this.IdDireccion == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Dirección de socio',
          text: 'Debe de seleccionar la direccion de recepcion de pedido',
        })
      }else if (this.IdCuentaBancaria == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Crear pedido',
          text: 'Debe de seleccionar la cuenta bancaria',
        })
      }else{
        this.stepper.next();
      }
    }else if(params == 2){
      if (this.IdCliente == 0) {
        if (this.datosContactoSocio.Nombre == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese el nombre del cliente',
          })
        }else if (this.datosTelefono.Telefono == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese el numero de telefono del cliente',
          })
        }else if (this.IdTipoTelefono == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Debe de seleccionar el tipo de telefono',
          })
        }else if (this.datosDireccionSocio.Direccion == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese la direccion del cliente para la entrega del pedido',
          })
        }else if (this.idDepartamento == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Crear pedido',
            text: 'Debe de seleccionar el departamento de entrega',
          })
        }else if (this.idMunicipio == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Crear pedido',
            text: 'Debe de seleccionar el municipio de entrega',
          })
        }else{
          this.stepper.next();
        }
      }else{
        if(this.IdDireccionCliente == 0){
          Swal.fire({
            icon: 'info',
            title: 'Selección dirección del cliente',
            text: 'Debe de seleccionar la dirección de entrega del cliente',
          })
        }else{
          this.stepper.next();
        }
       
      }
    }
  }

  previous() {
    this.stepper.previous();

  }

  onSubmit() {
    return false;
  }
  //#endregion
  //#region Metodos - Funcion para recibir los parametros que se hayan seleccionado del socio
  getIdCliente(params) {
    this.IdSocio = params.IdSocio;
    this.obtenerFichaPDF.Socio = params.Socio;
    this.listarDireccionSocio(params.IdSocio)
    this.obtenerClientes(params.IdSocio)
    this.ObtenerCuentasBancariasSocio(params.IdSocio)
  }
  obtenerSocio() {
    this._pedidoServices.comboObtenerSocio().subscribe(
      response => {
        let params = response.request;
        this.comboSocio = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  listarDireccionSocio(params) {
    this._pedidoServices.listaDireccionesSocio(params).subscribe(
      response => {
        let params = response.request;
        this.obtenerDireccionesSocio = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  //Funcion para obtener los valores que se selecciono de la direccion del socio
  getIdDireccion(params) {
    this.IdDireccion = params.IdDireccion;
    this.Zona = params.Zona;
    this.Colonia = params.Colonia;
    this.Municipio = params.Municipio;
    this.Departamento = params.Departamento;
    this.Direccion2 = params.Direccion;
    this.obtenerFichaPDF.MunicipioRecepcion = this.Municipio;

    

    if (params.IdZona == null) {
      this.datoMontoTarifa.IdZonaOrigen = 0
      this.obtenerFichaPDF.DireccionRecepcion = this.Direccion2
      
    } else {
      this.datoMontoTarifa.IdZonaOrigen = params.IdZona
      this.obtenerFichaPDF.DireccionRecepcion = this.Direccion2+' ZONA '+ this.Zona
    }
    this.datoMontoTarifa.IdMunicipioOrigen = params.IdMunicipio;

  }
  ObtenerCuentasBancariasSocio(params) {
    this._pedidoServices.listarDatosFinancieros(params).subscribe(
      response => {
        let params = response.request;
        this.obtenerCuentaBancaria = params;

      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  obtenerIdCuentaBancaria(params) {
    this.IdCuentaBancaria = params.IdNumeroCuenta;
    // console.log(this.IdCuentaBancaria);

  }
  //Funcion para obtener el listado de los clientes del socio
  obtenerClientes(params) {
    this._pedidoServices.obtenerDatosClientes(params).subscribe(
      response => {
        let params = response.request;
        this.ObtenerClienteSocio = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getIdClienteSocio(params) {
    this.IdCliente = params.IdContacto
    this.NombreClienteSocio = params.Nombre;
    this.TelefonoClienteSocio = params.Telefono;
    this.idTelefonoCliente = params.IdPersonaTelefono;
    this.ObtenerDireccionCliente(params.IdContacto)
  }
  //Funcion para crear un nuevo cliente
  obtenerOpcionPredeterminada(id) {
    this.opcionPredeterminada = id.target.value;
    if (this.opcionPredeterminada == 1) {
      this.IdCliente = 0;
      this.auto.clear();
      // this.auto.close();
      this.IdDireccionCliente = 0;
      this.DireccionCliente = '';
      this.ZonaCliente = '';
      this.ColoniaCliente = '';
      this.MunicipioCliente = '';
      this.DepartamentoCliente = ''
    }

  }
  //#endregion
  //#region Metodos - creacion de datos del cliente del socio
  //Funcion para obtener el listado de direccion del cliente seleccionado
  ObtenerDireccionCliente(params) {
    this._pedidoServices.obtenerDireccionCliente(params).subscribe(
      response => {
        let params = response.request;
        this.obtenerDireccionCliente = params;

     
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdDireccionClienteSeleccionado(params) {
    if (params.IdZona == null) {
      this.datoMontoTarifa.IdZonaDestino = 0
    } else {
      this.datoMontoTarifa.IdZonaDestino = params.IdZona
    }
    this.datoMontoTarifa.IdMunicipioDestino = params.IdMunicipio
    this.IdDireccionCliente = params.IdDireccion
    this.ZonaCliente = params.Zona;
    this.ColoniaCliente = params.Colonia;
    this.MunicipioCliente = params.Municipio;
    this.DepartamentoCliente = params.Departamento;
    this.obtenerMontoTarifa()

    this.obtenerFichaPDF.MunicipioEntrega = this.MunicipioCliente

    if (params.Zona == null) {
      this.obtenerFichaPDF.DireccionEntrega = params.Direccion
    } else {
      if (params.Colonia == null) {
        this.obtenerFichaPDF.DireccionEntrega = params.Direccion +" ZONA "+ params.Zona
      }else{
        this.obtenerFichaPDF.DireccionEntrega = params.Direccion +" ZONA "+ params.Zona +" COLONIA "+ params.Colonia 
      }

    }

  }
  obtenerMontoTarifa() {
    this._pedidoServices.ObtenerMontoTarifa(this.datoMontoTarifa).subscribe(
      response => {
        let params = response.request;
        this.montoTarifa = params;

        if (this.montoTarifa.length == 0) {
          this.datosTarifaRuta.Monto = this.datosTarifaRuta.Monto
          this.datosTarifaRuta.IdSectorDestino = null
          this.datosTarifaRuta.IdSectorOrigen = null
          console.log(this.datosTarifaRuta);

        } else {
          this.datosTarifaRuta.Monto = this.montoTarifa[0].Monto
          this.datosTarifaRuta.IdSectorDestino = this.montoTarifa[0].IdSectorDestino
          this.datosTarifaRuta.IdSectorOrigen = this.montoTarifa[0].IdSectorOrigen
          console.log(this.datosTarifaRuta);
        }

      }
      , error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  comboTipoTelefono() {
    this._pedidoServices.comboTipoTelefono().subscribe(
      response => {
        let params = response.request;
        this.obtenertTipoTelefono = params;
      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getIdTipoTelefono(params) {
    this.IdTipoTelefono = params.IdTipoTelefono
  }


  //#endregion
  //#region Metodos - Funciones con los combos para agregar direcciones
  getComboDepartamento() {
    this._pedidoServices.comboDepartamento().subscribe(
      response => {
        let params = response.request;
        this.comboDepartament = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getComboMunicipio(params) {
    this.idDepartamento = params.IdDepartamento;
    this._pedidoServices.comboMunicipio(this.idDepartamento).subscribe(
      response => {
        let params = response.request;
        this.comboMunicipio = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getComboZona(params) {
    this.idMunicipio = params.IdMunicipio;
    this.datoMontoTarifa.IdMunicipioDestino = params.IdMunicipio;
    this.obtenerFichaPDF.MunicipioEntrega = params.Descripcion;
    if (this.idZona == 0) {
      this.datoMontoTarifa.IdZonaDestino = 0
      this.obtenerMontoTarifa();
    }
    this._pedidoServices.comboZona(this.idMunicipio).subscribe(
      response => {
        let params = response.request;
        this.comboZona = params;
        
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getComboColonia(params) {
    this.idZona = params.IdZona;
    this.datoMontoTarifa.IdZonaDestino = this.idZona;
    this.obtenerMontoTarifa();

    this.obtenerFichaPDF.ZonaEntrega = params.Descripcion;
    this._pedidoServices.comboColonia(this.idZona).subscribe(
      response => {
        let params = response.request;
        this.comboColonia = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )

  }

  getIdColonia(params) {
    this.idColonia = params.IdColonia
    this.obtenerFichaPDF.ColoniaEntrega = params.Descripcion;
    // console.log(this.idColonia);
  }
  //#endregion
  //#region Metodos - Funciones para los datos del pedido de socios
  obtenerFecha(params) {
    this.date = params.target.value;
  }
  obtenerFechaHoraEntrega() {
    this._pedidoServices.fechaHoraEntrega().subscribe(
      response => {
        let params = response;
        this.fechaHoraEntrega = params.fecha;
        this.horaAntesDe = params.horaAntes
        this.horaDespuesDe = params.horaDespues
      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  public limpiarPedidos() {
    this.datosPedido = new DatosPedido(0, 0, 0, 0, 0, 0, '', 0, 0, '', '', 0, '', '', 0)
  }
  obtenerTipoPedido() {
    this._pedidoServices.ObtenerTipoPedido().subscribe(
      response => {
        let params = response.request;
        this.obtenertTipoPedido = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdTipoPedidoS(params) {
    this.IdTipoPedido = params.IdTipoPedido;
    this.obtenerFichaPDF.TipoProducto = params.Descripcion;
    
  }
  ComboConceptoPago() {
    this._pedidoServices.ComboConceptoPago().subscribe(
      response => {
        let params = response.request;
        this.conceptoPago = params;
      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  obtenerFormaPago() {
    this._pedidoServices.ObtenerFormaPago().subscribe(
      response => {
        let params = response.request;
        this.obtenertTipoFormaPago = params;

      }, error => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdConceptoPagoS(params) {
    this.idConceptoPago = params.IdConceptoPago;
  }
  IdFormaPagoS(params) {
    this.IdFormaPago = params.IdFormaPago;
  }
  agregarFormaPago() {
    if (this.datosPedido.MontoCobro == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Crear pedido',
        text: 'Debe de ingresar el monto de cobro',
      })
    } else if (this.IdFormaPago == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Crear pedido',
        text: 'Debe de seleccionar la forma de pago',
      })
    } else if (this.idConceptoPago == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Crear pedido',
        text: 'Debe de seleccionar el concepto de pago',
      })
    } else {
      if (this.IdFormaPago == 1) {
        this.formaPago = 'Efectivo'
      } else if (this.IdFormaPago == 2) {
        this.formaPago = 'Tarjeta'
      } else if (this.IdFormaPago == 3) {
        this.formaPago = 'Transferencia'
      } else if (this.IdFormaPago == 4) {
        this.formaPago = 'Deposito'
      } else if (this.IdFormaPago == 5) {
        this.formaPago = 'N/A'
      }

      if (this.idConceptoPago == 1) {
        this.DescripcionConceptoPago = 'Cobro de mensajeria'
      } else if (this.idConceptoPago == 2) {
        this.DescripcionConceptoPago = 'Cobro de producto'
      }

      this.id += 1;
      this.data.push({
        Id: this.id, IdFormaPago: this.IdFormaPago, FormaPago: this.formaPago, IdConceptoPago: this.idConceptoPago,
        ConceptoPago: this.DescripcionConceptoPago, MontoCobro: this.datosPedido.MontoCobro
      })
      //this.IdFormaPago = 0

      this.data.forEach(element => {
        this.resultado = element.MontoCobro
      });
      var json = JSON.stringify(this.data);
      var arr = JSON.parse(json)

      var totalAges = arr.reduce((sum, value) => (typeof value.MontoCobro == "number" ? sum + value.MontoCobro : sum), 0);
      this.total = totalAges
      this.obtenerFichaPDF.MontoCobro = this.total;
    }

  }
  eliminarFormaPago(id) {
    var json = JSON.stringify(this.data);

    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].Id == id) {
        this.datoRestado = this.data[i].MontoCobro;
        this.data.splice(i, 1)
      }
    }

    this.total -= this.datoRestado
    console.log(this.total);

    if (this.data.length != 0) {
      this.total = this.total
    } else {
      this.total = 0
    }

  }
  agregarPedido() {
    if (this.IdCliente == 0) {
      Swal.fire({
        title: '¿Está seguro de generar el pedido?',
        text: "Pedido serbaco ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar pedido',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value == true) {
          //Validación para crear los pedidos del socio que se logueo 
          if (this.identity.IdSocio != 0) {
            this.datosContactoSocio.IdSocio = this.identity.IdSocio;
          } else {
            this.datosContactoSocio.IdSocio = this.IdSocio;
          }


          //Ingreso de datos del contacto del socio
          this.datosContactoSocio.IdTipoContacto = 1;
          this.datosContactoSocio.IdUsuario = this.identity.IdUsuarioLog;
          this.datosContactoSocio.Predeterminado = 0;
          this.datosContactoSocio.Puesto = null;
          this._pedidoServices.agregarDatosContacto(this.datosContactoSocio).subscribe(
            response => {
              let mensaje = response.message;
              this.IdCliente = response.IdContacto;
              if (response.message == mensaje) {
                this.status = 'Ok'
                //Creacion de datos del telefono del cliente
                this.IdCliente = response.IdContacto;
                this.datosTelefono.IdContacto = this.IdCliente;
                this.datosTelefono.Predeterminado = 0;
                this.datosTelefono.IdSocio = 0;
                this.datosTelefono.IdTipoTelefono = this.IdTipoTelefono;
                this.datosTelefono.IdUsuario = this.identity.IdUsuarioLog;
                this.datosTelefono.Opcion = 2;

                
                this._pedidoServices.agregarDatosTelefono(this.datosTelefono).subscribe(
                  response => {
                    this.idTelefonoCliente = response.IdTelefono
                    let mensaje = response.message;
                    if (response.message == mensaje) {
                      this.status = 'Ok'

                      //Agregar los parametros de la direccion del cliente e insertarlos a la base de datos
                      this.datosDireccionSocio.IdDepartamento = this.idDepartamento;
                      this.datosDireccionSocio.IdMunicipio = this.idMunicipio;
                      this.datosDireccionSocio.IdZona = this.idZona;
                      this.datosDireccionSocio.IdColonia = this.idColonia;
                      this.datosDireccionSocio.IdSocio = 0;
                      this.datosDireccionSocio.IdTipoDireccion = 2;
                      this.datosDireccionSocio.Predeterminado = 0;
                      this.datosDireccionSocio.IdUsuario = this.identity.IdUsuarioLog;
                      this.datosDireccionSocio.IdContacto = this.IdCliente;
                      console.log(this.datosDireccionSocio);

                      this._pedidoServices.agregarDireccionSocio(this.datosDireccionSocio).subscribe(
                        response => {
                          let mensaje = response.message;
                          this.IdDireccionCliente = response.IdDireccion

                          if (response.message == mensaje) {
                            console.log(response.message);
                            this.status = 'Ok'



                            this.datosPedido.IdCuentaBancaria = this.IdCuentaBancaria;


                            if (this.IdFormaPago == 0) {
                              this.datosPedido.IdFormaPago = 5;

                              this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                              this.datosPedido.IdMoneda = 1;
                              this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                              this.datosPedido.IdDireccionRecepcion = this.IdDireccion;
                              this.datosPedido.IdDireccionEntrega = this.IdDireccionCliente;
                              this.datosPedido.IdTelefono = this.idTelefonoCliente;
                              this.datosPedido.HoraAntesDe = this.horaAntesDe;
                              this.datosPedido.HoraDespuesDe = this.horaDespuesDe;
                              
                              if (this.date == null) {
                                this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
                              } else {
                                let newDate = new Date(this.date)
                                let parameter = moment(newDate).format('YYYY/MM/DD')
                                this.datosPedido.FechaHoraEntrega = this.date
                              }



                              this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                response => {
                                  let mensaje = response.message;
                                  if (response.message == 'Se ha creado exitosamente el pedido') {

                                    this.ObtenerIdPedido = response.IdPedido

                                    this.InformacionSocioMensajeriaCambioFecha(this.ObtenerIdPedido);

                                   

                                    Swal.fire({
                                      icon: 'success',
                                      title: 'Creación del pedido',
                                      text: mensaje,
                                    })
                                    this.status = 'Ok'
                                    // this.limpiarPedidos()
                                    // window.location.reload()
                                    // this.limpiarFormtoTelefono();
                                    this.IdCliente = 0;
                                  } else {
                                    this.limpiarPedidos()
                                  }
                                },
                                error => {
                                  var errorMessage = <any>error;
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Datos del cliente del socio',
                                    text: 'Favor comunicarse con Sistemas, error en Creacion del pedido' + errorMessage,
                                  })
                                }
                              )

                            } else {
                              this.datosPedido.IdFormaPago = this.IdFormaPago;
                              this.datosPedido.MontoCobro = this.total;
                              this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                              this.datosPedido.IdMoneda = 1;
                              this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                              this.datosPedido.IdDireccionRecepcion = this.IdDireccion;
                              this.datosPedido.IdDireccionEntrega = this.IdDireccionCliente;
                              this.datosPedido.IdTelefono = this.idTelefonoCliente;
                              this.datosPedido.HoraAntesDe = this.horaAntesDe;
                              this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                              if (this.date == null) {
                                this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega;
                              } else {
                                let newDate = new Date(this.date)
                                let parameter = moment(newDate).format('YYYY/MM/DD')
                                this.datosPedido.FechaHoraEntrega = this.date
                              }
                              this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                response => {
                                  let mensaje = response.message;
                                  if (response.message == mensaje) {
                                    this.ObtenerIdPedido = response.IdPedido
                                    this.CrearTarifaPedido()
                                    this.DatosDetallePedido.IdMoneda = 1;
                                    this.DatosDetallePedido.IdPedido = this.ObtenerIdPedido;
                                    this.DatosDetallePedido.IdUsuarioRegistro = this.identity.IdUsuarioLog;

                                    

                                    for (var i = 0; i < this.data.length; i++) {
                                      this.DatosDetallePedido.IdFormaPago = this.data[i].IdFormaPago
                                      this.DatosDetallePedido.IdConceptoPago = this.data[i].IdConceptoPago
                                      this.DatosDetallePedido.MontoCobro = this.data[i].MontoCobro


                                      this._pedidoServices.AgregarPagoPedido(this.DatosDetallePedido).subscribe(
                                        response => {
                                          let mensaje = response.message;
                                          if (response.message == 'Se ha creado exitosamente el detalle del pago') {
                                            console.log(response.message);
                                            Swal.fire({
                                              icon: 'success',
                                              title: 'Creación del pedido',
                                              text: mensaje,
                                            })

                                          
                                            
                                            this.status = 'Ok'
                                          } else {
                                            console.log(response)
                                          }
                                        },
                                        error => {
                                          var errorMessage = <any>error;
                                          Swal.fire({
                                            icon: 'error',
                                            title: 'Datos del cliente del socio',
                                            text: 'Favor comunicarse con Sistemas, error en Creacion del pedido' + errorMessage,
                                          })
                                        }
                                      )
                                    }

                                    this.InformacionSocioMensajeriaCambioFecha(this.ObtenerIdPedido);
                                    this.status = 'Ok'
                                    // window.location.reload()
                                    this.IdCliente = 0;
                                  } else {
                                    this.limpiarPedidos()
                                  }
                                },
                                error => {
                                  var errorMessage = <any>error;
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Datos del cliente del socio',
                                    text: 'Favor comunicarse con Sistemas, error en Creacion del pedido' + errorMessage,
                                  })
                                }
                              )
                            }
                          } else {
                            Swal.fire({
                              icon: 'error',
                              title: 'Datos de dirección cliente',
                              text: 'No se ha podido crear los datos de la direccion del cliente, favor comunicarse con Sistemas',
                            })
                          }
                        },
                        error => {
                          var errorMessage = <any>error;
                          Swal.fire({
                            icon: 'error',
                            title: 'Datos de dirección del cliente',
                            text: 'Favor comunicarse con Sistemas, error en Creacion de direccion de entrega del cliente' + errorMessage,
                          })
                        }
                      )
                    } else {
                      Swal.fire({
                        icon: 'error',
                        title: 'Datos del telfono de cliente',
                        text: 'No se ha podido crear los datos del telefono, del cliente, favor comunicarse con Sistemas',
                      })
                    }
                  },
                  error => {
                    var errorMessage = <any>error;
                    Swal.fire({
                      icon: 'error',
                      title: 'Datos del telefono del cliente',
                      text: 'Favor comunicarse con Sistemas, error en Creacion de telefono del cliente' + errorMessage,
                    })
                  })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Datos del cliente del socio',
                  text: 'No se ha podido crear los datos del cliente, favor comunicarse con Sistemas',
                })
              }
            },
            error => {
              var errorMessage = <any>error;
              Swal.fire({
                icon: 'error',
                title: 'Datos del cliente del socio',
                text: 'Favor comunicarse con Sistemas, error en Creacion del cliente' + errorMessage,
              })
            }
          )

        } else {
          Swal.fire({
            icon: 'info',
            title: 'Crear pedido',
            text: 'No se ha realizado la creación del pedido',
          })
        }
      })
    } else {
      if (this.IdDireccion == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Crear pedido',
          text: 'Debe de seleccionar la direccion de entrega de pedido',
        })
      } else {
        Swal.fire({
          title: '¿Está seguro de generar el pedido?',
          text: "Pedido serbaco",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Guardar pedido',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {


            if (this.IdCuentaBancaria == 0) {
              this.datosPedido.IdCuentaBancaria = 0;
            } else {
              this.datosPedido.IdCuentaBancaria = this.IdCuentaBancaria;
            }

            if (this.IdFormaPago == 0) {
              this.datosPedido.IdFormaPago = 5;

              this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
              this.datosPedido.IdMoneda = 1;
              this.datosPedido.IdTipoPedido = this.IdTipoPedido;
              this.datosPedido.IdDireccionRecepcion = this.IdDireccion;
              this.datosPedido.IdDireccionEntrega = this.IdDireccionCliente;
              this.datosPedido.IdTelefono = this.idTelefonoCliente;
              this.datosPedido.HoraAntesDe = this.horaAntesDe;
              this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

              if (this.date == null) {
                this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
              } else {
                let newDate = new Date(this.date)
                let parameter = moment(newDate).format('YYYY/MM/DD')
                this.datosPedido.FechaHoraEntrega = this.date
              }

              //console.log(this.datosPedido);

              this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                response => {
                  let mensaje = response.message;
                  if (response.message == mensaje) {
                    console.log(response.message);
                    this.ObtenerIdPedido = response.IdPedido

                    this.InformacionSocioMensajeriaCambioFecha(this.ObtenerIdPedido);

                    this.CrearTarifaPedido()
                    this.status = 'Ok'
                    this.IdCliente = 0;
                  } else {
                    this.limpiarPedidos()
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  Swal.fire({
                    icon: 'error',
                    title: 'Datos del cliente del socio',
                    text: 'Favor comunicarse con Sistemas, error en Creacion del pedido' + errorMessage,
                  })
                }
              )

            } else {
              if (this.total != null) {

                this.datosPedido.IdFormaPago = this.IdFormaPago;
                this.datosPedido.MontoCobro = this.total;
                this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                this.datosPedido.IdMoneda = 1;
                this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                this.datosPedido.IdDireccionRecepcion = this.IdDireccion;
                this.datosPedido.IdDireccionEntrega = this.IdDireccionCliente;
                this.datosPedido.IdTelefono = this.idTelefonoCliente;
                this.datosPedido.HoraAntesDe = this.horaAntesDe;
                this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                if (this.date == null) {
                  this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega;
                } else {
                  let newDate = new Date(this.date)
                  let parameter = moment(newDate).format('YYYY/MM/DD')
                  this.datosPedido.FechaHoraEntrega = this.date
                }
                //console.log(this.datosPedido);

                this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                  response => {
                    let mensaje = response.message;
                    if (response.message == 'Se ha creado exitosamente el pedido') {
                      console.log(response.message);
                      this.ObtenerIdPedido = response.IdPedido
                      this.CrearTarifaPedido()
                      this.DatosDetallePedido.IdMoneda = 1;
                      this.DatosDetallePedido.IdPedido = this.ObtenerIdPedido;
                      this.DatosDetallePedido.IdUsuarioRegistro = this.identity.IdUsuarioLog;

                      for (var i = 0; i < this.data.length; i++) {
                        this.DatosDetallePedido.IdFormaPago = this.data[i].IdFormaPago
                        this.DatosDetallePedido.IdConceptoPago = this.data[i].IdConceptoPago
                        this.DatosDetallePedido.MontoCobro = this.data[i].MontoCobro

                        this._pedidoServices.AgregarPagoPedido(this.DatosDetallePedido).subscribe(
                          response => {
                            let mensaje = response.message;
                            if (response.message == 'Se ha creado exitosamente el detalle del pago') {
                              this.status = 'Ok'
                            }
                          },
                          error => {
                            var errorMessage = <any>error;
                            console.log(errorMessage)
                            if (errorMessage != null) {
                              Swal.fire(error.error.message)
                              this.status = 'error'
                            }
                          }
                        )
                      }

                      this.InformacionSocioMensajeriaCambioFecha(this.ObtenerIdPedido);


                      this.status = 'Ok'
                      this.IdCliente = 0;
                    } else {
                      this.limpiarPedidos()
                    }
                  },
                  error => {
                    var errorMessage = <any>error;
                    Swal.fire({
                      icon: 'error',
                      title: 'Datos del cliente del socio',
                      text: 'Favor comunicarse con Sistemas, error en Creacion del pedido' + errorMessage,
                    })
                  }
                )

              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Añadir importe de pago',
                  text: 'Debe seleccionar el botón verde con el simbolo más, para agregar el detalle de pago del pedido',
                })
              }

            }
          }
        })

      }
    }
  }

  InformacionSocioMensajeriaCambioFecha(IdPedido) {
    this._pedidoServices.InformacionSocioMensajeria(IdPedido).subscribe(
      response => {
        let params = response.request;
        this.InformacionSocioMensajerias = params[0];
        if (this.InformacionSocioMensajerias.Telefono.length < 8) {
          Swal.fire('No cumple con el formato del numero')
          window.location.reload()
                    this.limpiarFormtoTelefono();
                    this.limpiarPedidos()
        } else {
          this._pedidoServices.InformacionTigo().subscribe(
            response => {
              let params = response.request;
              this.ListadoInformacionTigo = params[0];              
              this.DatosMensajeriaTigo.Telefono = this.InformacionSocioMensajerias.Telefono;
              this.DatosMensajeriaTigo.Text = 'SERBACO: Te informamos que fue creado el pedido ' + 
              this.InformacionSocioMensajerias.IdPedido + ' para el cliente: ' + this.InformacionSocioMensajerias.Cliente
              + ', fecha de entrega '+ this.datosPedido.FechaHoraEntrega;

              console.log(this.DatosMensajeriaTigo);
              
              this._pedidoServices.accesoApiTigo(this.DatosMensajeriaTigo).subscribe(
                response => {
                  let mensaje = response.request.error_code;
                  this.status = 'Ok'                
                  this.DatosMensajeriaTigo.Telefono = null
                  this.DatosMensajeriaTigo.Text = null
                  window.location.reload()
                  this.limpiarFormtoTelefono();
                  this.limpiarPedidos()
                },
                error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage)
                  if (errorMessage != null) {
                    Swal.fire(error.error.message)
                    this.status = 'error'
                    this.DatosMensajeriaTigo.Telefono = null
                    this.DatosMensajeriaTigo.Text = null
                    window.location.reload()
                    this.limpiarFormtoTelefono();
                    this.limpiarPedidos()
                  }
                }
              )
              
            }, error => {
              var erroMessage = <any>error;
              if (erroMessage != null) {
                this.status = 'error';
              }
            }
          )

        }


      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }


  CrearTarifaPedido() {
    this.datosTarifaRuta.IdUsuarioRegistro = this.identity.IdUsuarioLog;
    this.datosTarifaRuta.IdPedido = this.ObtenerIdPedido;
    if (this.datosTarifaRuta.Monto == 0) {
      console.log('No se puede cargar la ruta');
    } else {
      this._pedidoServices.DatosTarifaPedido(this.datosTarifaRuta).subscribe(
        response => {
          let mensaje = response.message;
          if (response.message == 'Se ha creado exitosamente la tarifa del pedido') {
            console.log(response.message);
            this.status = 'Ok'

          } else {
            console.log(mensaje)
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage)
          if (errorMessage != null) {
            Swal.fire(error.error.message)
            this.status = 'error'
          }
        }
      )
    }


  }

   

  public preliminar() {
    this.obtenerFichaPDF.FechaHoraEntrega = this.fechaHoraEntrega;
    this.obtenerFichaPDF.Especificaciones = this.datosPedido.Especificaciones;
    this.obtenerFichaPDF.Observaciones = this.datosPedido.Observaciones;
    
    if (this.datosPedido.SolicitudCobro == 0) {
      this.obtenerFichaPDF.SolicitudCobro = 'NO'
    }else{
      this.obtenerFichaPDF.SolicitudCobro = 'SI'
    }
    

    if (this.IdCliente == 0) {
      //Datos de la ficha
      this.obtenerFichaPDF.NombreRecibe = this.datosContactoSocio.Nombre;
      this.obtenerFichaPDF.TelefonoRecibe = this.datosTelefono.Telefono;
      
      if (this.idZona == 0) {
        this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionSocio.Direccion + " " + this.datosDireccionSocio.ReferenciaDireccion;
      } else {
        if (this.idColonia == 0) {
          this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionSocio.Direccion + " ZONA " + this.obtenerFichaPDF.ZonaEntrega + " " + this.datosDireccionSocio.ReferenciaDireccion;
        } else {
          this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionSocio.Direccion + " ZONA " + this.obtenerFichaPDF.ZonaEntrega + " COLONIA " + this.obtenerFichaPDF.ColoniaEntrega +  " " + this.datosDireccionSocio.ReferenciaDireccion;
        }
      }

    } else {
      this.obtenerFichaPDF.NombreRecibe = this.NombreClienteSocio;
      this.obtenerFichaPDF.TelefonoRecibe = this.TelefonoClienteSocio;
      
    }

  }
  
  public limpiarFormtoTelefono() {
    this.datosTelefono = new DatosTelefono(0, 0, 0, '', 0, 0, 0);
  }
  //#endregion
  
}