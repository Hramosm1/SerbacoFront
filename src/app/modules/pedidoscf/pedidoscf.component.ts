import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import * as moment from 'moment';
import { comboBoxDireccion } from 'src/app/models/DatosDemograficos/ComboBoxDireccion.model';
import { comboColonia } from 'src/app/models/DatosDemograficos/ComboColonia.model';
import { comboDepartamento } from 'src/app/models/DatosDemograficos/ComboDepartamento.model';
import { comboMunicipio } from 'src/app/models/DatosDemograficos/ComboMunicipio.model';
import { comboZona } from 'src/app/models/DatosDemograficos/ComboZona.model';
import { fichaPedido } from 'src/app/models/FichaPedido/FichaPedido.model';
import { DatosPedido } from 'src/app/models/Pedido/DatosPedido.model';
import { DetallePagoPedido } from 'src/app/models/Pedido/DetallePagoPedido.model';
import { comboSocio } from 'src/app/models/Socio/ComboSocio.model';
import { DatosContactoSocio } from 'src/app/models/Socio/DatosContactoSocio.model';
import { DatosDireccionSocio } from 'src/app/models/Socio/DatosDireccionSocio.model';
import { DatosTelefono } from 'src/app/models/Socio/DatosTelefono.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidoscf',
  templateUrl: './pedidoscf.component.html',
  styleUrls: ['./pedidoscf.component.scss'],
  providers: [UserService, PedidoService]
})
export class PedidoscfComponent implements OnInit {
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
  //#region Atributos - Datos del cliente C/F
  public IdclienteCF = 0;
  public clientesCF;
  public NombreCF = '';
  public TelefonoCF = '';
  public TipoTelefonoCF = '';
  public IdDireccionCF = 0;
  public DireccionCF = '';
  public ZonaCF = '';
  public ColoniaCF = '';
  public MunicipioCF = '';
  public DepartamentoCF = '';
  public ReferenciaCF = 0;
  public direccionCF;

  public formularioClienteCF = 0;
  public datosContactoCF: DatosContactoSocio;
  public datosTelefonoCF: DatosTelefono;
  public datosDireccionCF: DatosDireccionSocio

  public idDepartamentoCF = 0;
  public idMunicipioCF = 0;
  public idZonaCF = 0;
  public idColoniaCF = 0;

  public comboDepartamentCF: comboDepartamento;
  public comboMunicipioCF: comboMunicipio;
  public comboZonaCF: comboZona;
  public comboColoniaCF: comboColonia;


  //#endregion
  //#region Atributos - Datos del cliente - cliente C/F
  public datosContactoClienteCF: DatosContactoSocio;
  public datosTelefonoContactoCF: DatosTelefono;
  public obtenertTipoTelefonoContactoCF;
  public idTipoTelefonoContacto = 0;
  public IdCliente = 0;
  public datosDireccionContactoCF: DatosDireccionSocio
  public comboDepartamentContactoCF: comboDepartamento;
  public idMunicipioContactoCF = 0;
  public idZonaContactoCF = 0;
  public idColoniaContactoCF = 0;
  public idDepartamentoContactoCF = 0;
  public comboMunicipioContactoCF: comboMunicipio;
  public comboZonaContactoCF: comboZona;
  public comboColoniaContactoCF: comboColonia;
  public IdContactoCF = 0;
  public IdDireccionContactoCF = 0;

  //#endregion
  //#region Atributos - Datos para obtener del token y los datos del usuario
  public token;
  public identity;
  public status;
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
  //#region Atributos - Datos stepper
  private stepperCF: Stepper;
  public pedidos = 0;
  @ViewChild('auto') auto;
  //#endregion
  //#region Atributos - Parametros para la visualizacion del pedido
  public obtenerFichaPDF : fichaPedido

  //#endregion
  constructor(private _userServices: UserService, private _router: Router, private _pedidoServices: PedidoService) { 
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();

    this.datosContactoCF = new DatosContactoSocio(0,0,'','',0,0);
    this.datosTelefonoCF = new DatosTelefono(0,0,0,'',0,0,0);
    this.datosDireccionCF = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
    
    this.datosContactoClienteCF = new DatosContactoSocio(0,0,'','',0,0);
    this.datosTelefonoContactoCF = new DatosTelefono(0,0,0,'',0,0,0);
    this.datosDireccionContactoCF =  new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);

    this.datosPedido = new DatosPedido(0, 0, 0, 0, 0, 0, '', 0, 0, '', '', 0, '', '', 0)
    this.DatosDetallePedido = new DetallePagoPedido(0, 0, 0, 0, 0, 0);

    this.obtenerFichaPDF = new fichaPedido('','','','','','','','','','','','','','','','',0,'',0,'','','','','','','',0,0,'','','',0,'','',0,0,0,0,0,0,0,0,0,0,'','',0);
  }

  ngOnInit() {
    this.stepperCF = new Stepper(document.querySelector('#stepper2'), {
      linear: false,
      animation: true
    });

    this.ComboConceptoPago();
    this.ObtenerClientesCF();
    this.comboTipoTelefonoContactoCF();
    this.getComboDepartamentoContactoCF();
    this.getComboDepartamentoCF();
    this.comboTipoTelefono();
    this.obtenerFechaHoraEntrega();
    this.obtenerTipoPedido();
    this.obtenerFormaPago();
  }

  //#region Metodos - Botones siguiente y atras del stepper
  previous() {
    this.stepperCF.previous();
  }
  nextCF(params) {
    //Primer item - Datos de cliente C/F
    if (params == 1) {
      if (this.IdclienteCF == 0) {
        if (this.datosContactoCF.Nombre == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese el nombre del cliente C/F',
          })
        } else if (this.datosTelefonoCF.Telefono == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese el numero de telefono del cliente C/F',
          })
        } else if (this.IdTipoTelefono == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese el tipo de telefono del cliente C/F',
          })
        } else if (this.datosDireccionCF.Direccion == '') {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Ingrese la direccion del cliente C/F para la recepcion del pedido',
          })
        } else if (this.idDepartamentoCF == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Debe de seleccionar algun departamento para la creacion de la direccion de cliente C/F',
          })
        } else if (this.idMunicipioCF == 0) {
          Swal.fire({
            icon: 'info',
            title: 'Cliente nuevo',
            text: 'Debe de seleccionar algun municipio para la creacion de la direccion de cliente C/F',
          })
        }else{
          this.stepperCF.next();
        }
      }else{
        this.stepperCF.next();
      }
     
    }else if(params == 2){
      if (this.datosContactoClienteCF.Nombre == '') {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Debe de ingresar el nombre del cliente a quien se va a realizar la entrega',
        })
      } else if (this.datosTelefonoContactoCF.Telefono == '') {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Debe de ingresar el numero de telefono del cliente a quien se va a realizar la entrega',
        })
      } else if (this.idTipoTelefonoContacto == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Debe de seleccionar el tipo de telefono del cliente a quien se va a realizar la entrega',
        })
      } else if (this.datosDireccionContactoCF.Direccion == '') {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Ingrese la direccion del cliente para la entrega del pedido',
        })
      } else if (this.idDepartamentoContactoCF == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Debe de seleccionar un departamento para la creacion de la direccion del cliente quien recibe el pedido',
        })
      } else if (this.idMunicipioContactoCF == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Cliente nuevo',
          text: 'Debe de seleccionar un municipio para la creacion de la direccion del cliente quien recibe el pedido',
        })

      }else{
        this.stepperCF.next();
      } 
    }     

  }

  onSubmit() {
    return false;
  }
  //#endregion
  //#region Metodos - Funciones para creacion de datos clientes C/F
    //Metodos para limpiar los formularios
    public limpiarFormDireccionesCF(){
      this.datosDireccionCF = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
      this.getComboDepartamentoCF()
      this.idMunicipioCF = 0;
      this.idZonaCF = 0;
      this.idColoniaCF = 0;
    }
    public limpiarFormtoTelefono() {
      this.datosTelefono = new DatosTelefono(0, 0, 0, '', 0, 0, 0);
    }
  
    //Metodos para llenar y obtener la data de los combos
    getComboDepartamentoCF(){
      this._pedidoServices.comboDepartamento().subscribe(
        response=>{
          let params = response.request;
          this.comboDepartamentCF = params;        
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    async getComboMunicipioCF(params){
      this.idDepartamentoCF = params.IdDepartamento;
      this.obtenerFichaPDF.DepartamentoRecibe = params.Descripcion
      await this._pedidoServices.comboMunicipio(this.idDepartamentoCF).subscribe(
        response=>{
          let params = response.request;
          this.comboMunicipioCF = params;
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    getComboZonaCF(params){
      this.idMunicipioCF = params.IdMunicipio;
      this.obtenerFichaPDF.MunicipioRecepcion = params.Descripcion

      this._pedidoServices.comboZona(this.idMunicipioCF).subscribe(
        response=>{
          let params = response.request;
          this.comboZonaCF = params;
          // console.log(this.idMunicipio);  
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    getComboColoniaCF(params){
      this.idZonaCF = params.IdZona;
      this.obtenerFichaPDF.ZonaRecepcion = params.Descripcion

      this._pedidoServices.comboColonia(this.idZonaCF).subscribe(
        response=>{
          let params = response.request;
          this.comboColoniaCF = params;
  
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
      
    }
    getIdColoniaCF(params){
      this.idColoniaCF = params.IdColonia
      this.obtenerFichaPDF.ColoniaRecepcion = params.Descripcion

      // console.log(this.idColonia);
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
      this.obtenerFichaPDF.TelefonoRecibe = params.Telefono

    }
  
    //Obtener la informacion de clientes c/f seleccionados
    ObtenerClientesCF(){
      this._pedidoServices.obtenerDatosClienteCF().subscribe(
        response=>{
          let params = response.request;
          this.clientesCF = params
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    ObtenerDatosSeleccionados(params){
      this.IdclienteCF = params.IdCliente;
      this.NombreCF = params.Nombre;
      this.TelefonoCF = params.Telefono;
      this.TipoTelefonoCF = params.TipoTelefono;
      this.obtenerDatosDireccionClienteCF(this.IdclienteCF)
    }
    obtenerDatosDireccionClienteCF(id){
      this._pedidoServices.obtenerDatosDireccionClienteCF(id).subscribe(
        response=>{
          let params = response.request;
          this.direccionCF = params[0] 
          this.IdDireccionCF = this.direccionCF.IdDireccion;
          this.DireccionCF = this.direccionCF.Direccion;
          this.ZonaCF = this.direccionCF.Zona;
          this.ColoniaCF = this.direccionCF.Colonia;
          this.MunicipioCF = this.direccionCF.Municipio;
          this.DepartamentoCF = this.direccionCF.Departamento;
          this.ReferenciaCF = this.direccionCF.ReferenciaDireccion;
          
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    crearDatosPedidoNormal(){
      this.formularioClienteCF = 0
      this.IdclienteCF = 0;
    }

  
    //Limpieza de formularios
    limpiarFormulario(){
      this.IdclienteCF = 0;
    }
    public limpiarTelefonoCF(){
      this.datosTelefonoCF = new DatosTelefono(0,0,0,'',0,0,0);
    }
    public limpiarClienteCF(){
      this.datosContactoCF = new DatosContactoSocio(0,0,'','',0,0);
    }
  //#endregion
  //#region Metodos - Metodos para la creacion de datos de los clientes de los socios C/F
  //Datos del cliente Telefono
  comboTipoTelefonoContactoCF(){
    this._pedidoServices.comboTipoTelefono().subscribe(
      response=>{
        let params = response.request;
        this.obtenertTipoTelefonoContactoCF = params;        
      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getIdTipoTelefonoContactoCF(params){
    this.idTipoTelefonoContacto = params.IdTipoTelefono    
  }

  //Limpieza de datos del cliente
  public limpiarFormDireccionesContactoCF(){
    this.datosDireccionContactoCF = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
    this.getComboDepartamentoContactoCF()
    this.idMunicipioContactoCF = 0;
    this.idZonaContactoCF = 0;
    this.idColoniaContactoCF = 0;
  }
  getComboDepartamentoContactoCF(){
    this._pedidoServices.comboDepartamento().subscribe(
      response=>{
        let params = response.request;
        this.comboDepartamentContactoCF = params;        
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboMunicipioContactoCF(params){
    this.idDepartamentoContactoCF = params.IdDepartamento;
    this._pedidoServices.comboMunicipio(this.idDepartamentoContactoCF).subscribe(
      response=>{
        let params = response.request;
        this.comboMunicipioContactoCF = params;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboZonaContactoCF(params){
    this.idMunicipioContactoCF = params.IdMunicipio;
    this.obtenerFichaPDF.MunicipioEntrega = params.Descripcion
    this._pedidoServices.comboZona(this.idMunicipioContactoCF).subscribe(
      response=>{
        let params = response.request;
        this.comboZonaContactoCF = params;
        // console.log(this.idMunicipio);  
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboColoniaContactoCF(params){
    this.idZonaContactoCF = params.IdZona;
    this.obtenerFichaPDF.ZonaEntrega = params.Descripcion

    this._pedidoServices.comboColonia(this.idZonaContactoCF).subscribe(
      response=>{
        let params = response.request;
        this.comboColoniaContactoCF = params;

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
    
  }
  getIdColoniaContactoCF(params){
    this.idColoniaContactoCF = params.IdColonia
    this.obtenerFichaPDF.ColoniaEntrega = params.Descripcion

  }
  //#endregion
  //#region Metodos - Funciones para creacion de pedidos de clientes C/F
  agregarPedidosCF() {    
    if (this.IdclienteCF == 0) {
      if (this.IdTipoPedido == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Crear pedido',
          text: 'Debe de seleccionar el tipo de pedido',
        })
      }else{
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
          if(result.value == true){
            this.datosContactoCF.IdSocio = 0
            this.datosContactoCF.IdTipoContacto = 3;
            this.datosContactoCF.IdUsuario = this.identity.IdUsuarioLog;
            this.datosContactoCF.Predeterminado = 0;
            this.datosContactoCF.Puesto = null;

            //Creacion del cliente C/F
            this._pedidoServices.agregarDatosContacto(this.datosContactoCF).subscribe(
            response => {
              this.IdclienteCF = response.IdContacto;
              if (response.message == 'Se ha creado exitosamente el contacto del socio') {

                this.status = 'Ok'
                this.IdclienteCF = response.IdContacto;

                this.datosTelefonoCF.IdContacto = this.IdclienteCF;
                this.datosTelefonoCF.Predeterminado = 0;
                this.datosTelefonoCF.IdSocio = 0;
                this.datosTelefonoCF.IdTipoTelefono = this.IdTipoTelefono;
                this.datosTelefonoCF.IdUsuario = this.identity.IdUsuarioLog;
                this.datosTelefonoCF.Opcion = 2;

                //Creacion telefono del cliente C/F
                this._pedidoServices.agregarDatosTelefono(this.datosTelefonoCF).subscribe(
                response => {
                  this.idTelefonoClienteCF = response.IdTelefono
                  if (response.message == 'Se ha creado exitosamente el telefono') {
                    this.status = 'Ok'
                    this.datosDireccionCF.IdDepartamento = this.idDepartamentoCF;
                    this.datosDireccionCF.IdContacto = this.IdclienteCF;
                    this.datosDireccionCF.IdTipoDireccion = 3;
                    this.datosDireccionCF.IdUsuario = this.identity.IdUsuarioLog
                    this.datosDireccionCF.Predeterminado = 0;
                    this.datosDireccionCF.IdSocio = 0
                    this.datosDireccionCF.IdMunicipio = this.idMunicipioCF
                    this.datosDireccionCF.IdZona = this.idZonaCF
                    this.datosDireccionCF.IdColonia = this.idColoniaCF

                    this._pedidoServices.agregarDireccionSocio(this.datosDireccionCF).subscribe(
                      response => {
                        this.IdDireccionCF = response.IdDireccion
                        if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                          this.status = 'Ok'
                          this.ObtenerClientesCF()
                          //#region creacion del contacto del socio C/F
                          this.datosContactoClienteCF.IdSocio = 0;
                          this.datosContactoClienteCF.IdTipoContacto = 1;
                          this.datosContactoClienteCF.IdUsuario = this.identity.IdUsuarioLog;
                          this.datosContactoClienteCF.Predeterminado = 0;
                          this.datosContactoClienteCF.Puesto = null;

                          this._pedidoServices.agregarDatosContacto(this.datosContactoClienteCF).subscribe(
                            response => {
                              this.IdContactoCF = response.IdContacto;
                              if (response.message == 'Se ha creado exitosamente el contacto del socio') {
                                this.status = 'Ok'
                                this.IdContactoCF = response.IdContacto;

                                this.datosTelefonoContactoCF.IdContacto = this.IdContactoCF;
                                this.datosTelefonoContactoCF.Predeterminado = 0;
                                this.datosTelefonoContactoCF.IdSocio = 0;
                                this.datosTelefonoContactoCF.IdTipoTelefono = this.idTipoTelefonoContacto;
                                this.datosTelefonoContactoCF.IdUsuario = this.identity.IdUsuarioLog;
                                this.datosTelefonoContactoCF.Opcion = 2;

                                this._pedidoServices.agregarDatosTelefono(this.datosTelefonoContactoCF).subscribe(
                                  response => {
                                    this.idTelefonoClienteCF = response.IdTelefono
                                    if (response.message == 'Se ha creado exitosamente el telefono') {
                                      this.status = 'Ok'

                                      //#region Direccion del contacto del socio
                                      this.datosDireccionContactoCF.IdDepartamento = this.idDepartamentoContactoCF;
                                      this.datosDireccionContactoCF.IdContacto = this.IdContactoCF;
                                      this.datosDireccionContactoCF.IdTipoDireccion = 2;
                                      this.datosDireccionContactoCF.IdUsuario = this.identity.IdUsuarioLog
                                      this.datosDireccionContactoCF.Predeterminado = 0;
                                      this.datosDireccionContactoCF.IdSocio = 0
                                      this.datosDireccionContactoCF.IdMunicipio = this.idMunicipioContactoCF
                                      this.datosDireccionContactoCF.IdZona = this.idZonaContactoCF
                                      this.datosDireccionContactoCF.IdColonia = this.idColoniaContactoCF

                                      console.log(this.datosDireccionContactoCF);
                                      
                                      this._pedidoServices.agregarDireccionSocio(this.datosDireccionContactoCF).subscribe(
                                        response => {
                                          this.IdDireccionContactoCF = response.IdDireccion
                                          if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                                            console.log(response.message);
                                            this.status = 'Ok'
                                            this.ObtenerClientesCF()
                                            //#region Creacion del pedido
                                            if (this.IdFormaPago == 0) {
                                              this.datosPedido.IdFormaPago = 5;
                                              this.datosPedido.IdCuentaBancaria = 0;
                                              this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                              this.datosPedido.IdMoneda = 1;
                                              this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                                              this.datosPedido.IdDireccionRecepcion = this.IdDireccionCF;
                                              this.datosPedido.IdDireccionEntrega = this.IdDireccionContactoCF;
                                              this.datosPedido.IdTelefono = this.idTelefonoClienteCF;
                                              this.datosPedido.HoraAntesDe = this.horaAntesDe;
                                              this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                                              if (this.date == null) {
                                                this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
                                              } else {
                                                let newDate = new Date(this.date)
                                                let parameter = moment(newDate).format('YYYY/MM/DD')

                                                this.datosPedido.FechaHoraEntrega = this.date
                                              }

                                              console.log(this.datosPedido);

                                              this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                                response => {
                                                  let mensaje = response.message;
                                                  if (response.message == 'Se ha creado exitosamente el pedido') {
                                                    console.log(response.message);
                                                    this.ObtenerIdPedido = response.IdPedido

                                                    this.status = 'Ok'
                                                    this.limpiarPedidos()
                                                    window.location.reload()
                                                    this.limpiarFormtoTelefono();
                                                    this.IdCliente = 0;
                                                  } else {
                                                    this.limpiarPedidos()
                                                  }
                                                },
                                                error => {
                                                  var errorMessage = <any>error;
                                                  console.log(errorMessage)
                                                  if (errorMessage != null) {
                                                    Swal.fire(error.error.message)
                                                    this.status = 'error'
                                                    this.limpiarPedidos()
                                                  }
                                                }
                                              )

                                            } else {
                                              this.datosPedido.IdCuentaBancaria = 0;
                                              this.datosPedido.IdFormaPago = this.IdFormaPago;
                                              this.datosPedido.MontoCobro = this.total;
                                              this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                              this.datosPedido.IdMoneda = 1;
                                              this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                                              this.datosPedido.IdDireccionRecepcion = this.IdDireccionCF;
                                              this.datosPedido.IdDireccionEntrega = this.IdDireccionContactoCF;
                                              this.datosPedido.IdTelefono = this.idTelefonoClienteCF;
                                              this.datosPedido.HoraAntesDe = this.horaAntesDe;
                                              this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                                              if (this.date == null) {
                                                this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
                                              } else {
                                                let newDate = new Date(this.date)
                                                let parameter = moment(newDate).format('YYYY/MM/DD')
                                                this.datosPedido.FechaHoraEntrega = this.date
                                              }

                                              console.log(this.datosPedido);

                                              this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                                response => {
                                                  let mensaje = response.message;
                                                  if (response.message == 'Se ha creado exitosamente el pedido') {
                                                    console.log(response.message);
                                                    this.ObtenerIdPedido = response.IdPedido

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
                                                            this.status = 'Ok'
                                                          } else {
                                                            console.log(response)
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
                                                    this.status = 'Ok'
                                                    window.location.reload()
                                                    this.IdCliente = 0;
                                                  } else {
                                                    this.limpiarPedidos()
                                                  }
                                                },
                                                error => {
                                                  var errorMessage = <any>error;
                                                  console.log(errorMessage)
                                                  if (errorMessage != null) {
                                                    Swal.fire(error.error.message)
                                                    this.status = 'error'
                                                    this.limpiarPedidos()
                                                  }
                                                }
                                              )
                                            }
                                            //#endregion

                                          } else {
                                            this.limpiarFormDireccionesContactoCF()
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
                                      //#endregion
                                    } else {
                                      this.limpiarTelefonoCF()
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
                                
                              } else {
                                this.limpiarClienteCF()
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
                          //#endregion

                          this.limpiarFormDireccionesCF()
                        } else {
                          this.limpiarFormDireccionesCF()
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
                  

                  } else {
                    this.limpiarTelefonoCF()
                  }
                }, error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage)
                  if (errorMessage != null) {
                    Swal.fire(error.error.message)
                    this.status = 'error'
                  }
                }
              )
                
              } else {
                this.limpiarClienteCF()
              }
            }, error => {
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
            
          }
        })
      }
    }else{
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
        if (result.value == true) {
          if (this.IdTipoPedido == 0) {
            Swal.fire({
              icon: 'info',
              title: 'Crear pedido',
              text: 'Debe de seleccionar el tipo de pedido',
            })
          } else {
            this.datosContactoClienteCF.IdSocio = 0;
            this.datosContactoClienteCF.IdTipoContacto = 1;
            this.datosContactoClienteCF.IdUsuario = this.identity.IdUsuarioLog;
            this.datosContactoClienteCF.Predeterminado = 0;
            this.datosContactoClienteCF.Puesto = null;

            this._pedidoServices.agregarDatosContacto(this.datosContactoClienteCF).subscribe(
              response => {
                this.IdContactoCF = response.IdContacto;
                if (response.message == 'Se ha creado exitosamente el contacto del socio') {
                  console.log(response.message);
                  this.status = 'Ok'
                  this.IdContactoCF = response.IdContacto;

                  this.datosTelefonoContactoCF.IdContacto = this.IdContactoCF;
                  this.datosTelefonoContactoCF.Predeterminado = 0;
                  this.datosTelefonoContactoCF.IdSocio = 0;
                  this.datosTelefonoContactoCF.IdTipoTelefono = this.idTipoTelefonoContacto;
                  this.datosTelefonoContactoCF.IdUsuario = this.identity.IdUsuarioLog;
                  this.datosTelefonoContactoCF.Opcion = 2;

                  this._pedidoServices.agregarDatosTelefono(this.datosTelefonoContactoCF).subscribe(
                    response => {
                      this.idTelefonoClienteCF = response.IdTelefono
                      if (response.message == 'Se ha creado exitosamente el telefono') {
                        console.log(response.message);
                        this.status = 'Ok'

                        //#region Direccion del contacto del socio
                        this.datosDireccionContactoCF.IdDepartamento = this.idDepartamentoContactoCF;
                        this.datosDireccionContactoCF.IdContacto = this.IdContactoCF;
                        this.datosDireccionContactoCF.IdTipoDireccion = 2;
                        this.datosDireccionContactoCF.IdUsuario = this.identity.IdUsuarioLog
                        this.datosDireccionContactoCF.Predeterminado = 0;
                        this.datosDireccionContactoCF.IdSocio = 0
                        this.datosDireccionContactoCF.IdMunicipio = this.idMunicipioContactoCF
                        this.datosDireccionContactoCF.IdZona = this.idZonaContactoCF
                        this.datosDireccionContactoCF.IdColonia = this.idColoniaContactoCF

                        console.log(this.datosDireccionContactoCF);

                        this._pedidoServices.agregarDireccionSocio(this.datosDireccionContactoCF).subscribe(
                          response => {
                            this.IdDireccionContactoCF = response.IdDireccion
                            if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                              console.log(response.message);
                              this.status = 'Ok'
                              this.ObtenerClientesCF()
                              //#region Creacion del pedido
                              if (this.IdFormaPago == 0) {
                                this.datosPedido.IdFormaPago = 5;
                                this.datosPedido.IdCuentaBancaria = 0;
                                this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                this.datosPedido.IdMoneda = 1;
                                this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                                this.datosPedido.IdDireccionRecepcion = this.IdDireccionCF;
                                this.datosPedido.IdDireccionEntrega = this.IdDireccionContactoCF;
                                this.datosPedido.IdTelefono = this.idTelefonoClienteCF;
                                this.datosPedido.HoraAntesDe = this.horaAntesDe;
                                this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                                if (this.date == null) {
                                  this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
                                } else {
                                  let newDate = new Date(this.date)
                                  let parameter = moment(newDate).format('YYYY/MM/DD')

                                  this.datosPedido.FechaHoraEntrega = this.date
                                }

                                console.log(this.datosPedido);

                                this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                  response => {
                                    let mensaje = response.message;
                                    if (response.message == 'Se ha creado exitosamente el pedido') {
                                      console.log(response.message);
                                      this.ObtenerIdPedido = response.IdPedido

                                      this.status = 'Ok'
                                      this.limpiarPedidos()
                                      window.location.reload()
                                      this.limpiarFormtoTelefono();
                                      this.IdCliente = 0;
                                    } else {
                                      this.limpiarPedidos()
                                    }
                                  },
                                  error => {
                                    var errorMessage = <any>error;
                                    console.log(errorMessage)
                                    if (errorMessage != null) {
                                      Swal.fire(error.error.message)
                                      this.status = 'error'
                                      this.limpiarPedidos()
                                    }
                                  }
                                )

                              } else {
                                this.datosPedido.IdCuentaBancaria = 0;
                                this.datosPedido.IdFormaPago = this.IdFormaPago;
                                this.datosPedido.MontoCobro = this.total;
                                this.datosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                this.datosPedido.IdMoneda = 1;
                                this.datosPedido.IdTipoPedido = this.IdTipoPedido;
                                this.datosPedido.IdDireccionRecepcion = this.IdDireccionCF;
                                this.datosPedido.IdDireccionEntrega = this.IdDireccionContactoCF;
                                this.datosPedido.IdTelefono = this.idTelefonoClienteCF;
                                this.datosPedido.HoraAntesDe = this.horaAntesDe;
                                this.datosPedido.HoraDespuesDe = this.horaDespuesDe;

                                if (this.date == null) {
                                  this.datosPedido.FechaHoraEntrega = this.fechaHoraEntrega
                                } else {
                                  let newDate = new Date(this.date)
                                  let parameter = moment(newDate).format('YYYY/MM/DD')
                                  this.datosPedido.FechaHoraEntrega = this.date
                                }

                                console.log(this.datosPedido);

                                this._pedidoServices.agregarPedido(this.datosPedido).subscribe(
                                  response => {
                                    let mensaje = response.message;
                                    if (response.message == 'Se ha creado exitosamente el pedido') {
                                      console.log(response.message);
                                      this.ObtenerIdPedido = response.IdPedido

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
                                              this.status = 'Ok'
                                            } else {
                                              console.log(response)
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
                                      this.status = 'Ok'
                                      window.location.reload()
                                      this.IdCliente = 0;
                                    } else {
                                      this.limpiarPedidos()
                                    }
                                  },
                                  error => {
                                    var errorMessage = <any>error;
                                    console.log(errorMessage)
                                    if (errorMessage != null) {
                                      Swal.fire(error.error.message)
                                      this.status = 'error'
                                      this.limpiarPedidos()
                                    }
                                  }
                                )
                              }
                              //#endregion

                            } else {
                              this.limpiarFormDireccionesContactoCF()
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
                        //#endregion
                      } else {
                        this.limpiarTelefonoCF()
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

                } else {
                  this.limpiarClienteCF()
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
      })
    }
  }
  IdTipoPedidoS(params) {
    this.IdTipoPedido = params.IdTipoPedido;
    this.obtenerFichaPDF.TipoProducto = params.Descripcion;

  }

  public limpiarPedidos() {
    this.datosPedido = new DatosPedido(0, 0, 0, 0, 0, 0, '', 0, 0, '', '', 0, '', '', 0)
  }
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
  IdConceptoPagoS(params) {
    this.idConceptoPago = params.IdConceptoPago;
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
    let json = JSON.stringify(this.data);

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

  public preliminar(){
    this.obtenerFichaPDF.NombreRecibe = this.datosContactoClienteCF.Nombre;
    this.obtenerFichaPDF.TelefonoRecibe = this.datosTelefonoContactoCF.Telefono;
    this.obtenerFichaPDF.Observaciones = this.datosPedido.Observaciones;
    this.obtenerFichaPDF.Especificaciones = this.datosPedido.Especificaciones;
    this.obtenerFichaPDF.FechaHoraEntrega = this.fechaHoraEntrega;

    if (this.IdclienteCF == 0) {
      if (this.idZonaCF == 0) {
        this.obtenerFichaPDF.DireccionRecepcion = this.datosDireccionCF.Direccion +" "+ this.datosDireccionCF.ReferenciaDireccion
      } else {
        if (this.idColoniaCF == 0) {
          this.obtenerFichaPDF.DireccionRecepcion = this.datosDireccionCF.Direccion + " ZONA "+ this.obtenerFichaPDF.ZonaRecepcion +" "+ this.datosDireccionCF.ReferenciaDireccion
        } else {
          this.obtenerFichaPDF.DireccionRecepcion = this.datosDireccionCF.Direccion + " ZONA "+ this.obtenerFichaPDF.ZonaRecepcion +" "+ this.obtenerFichaPDF.ColoniaRecepcion +" "+ this.datosDireccionCF.ReferenciaDireccion

        }
      }

      this.obtenerFichaPDF.Socio = this.datosContactoCF.Nombre

    } else {
      this.obtenerFichaPDF.MunicipioRecepcion = this.MunicipioCF;
      this.obtenerFichaPDF.Socio = this.NombreCF 
      
      if (this.ZonaCF == null) {
        this.obtenerFichaPDF.DireccionRecepcion = this.DireccionCF +" "+ this.ReferenciaCF 
      } else {
        if (this.ColoniaCF == null) {
          this.obtenerFichaPDF.DireccionRecepcion = this.DireccionCF + "ZONA " + this.ZonaCF +" "+ this.ReferenciaCF 
        } else {
          this.obtenerFichaPDF.DireccionRecepcion = this.DireccionCF + "ZONA " + this.ZonaCF +" "+this.ColoniaCF+" "+ this.ReferenciaCF 
        }
      }
    }

    if (this.datosPedido.SolicitudCobro == 0) {
      this.obtenerFichaPDF.SolicitudCobro = 'NO'
    }else{
      this.obtenerFichaPDF.SolicitudCobro = 'SI'
    }

    if (this.idZonaContactoCF == 0) {
      this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionContactoCF.Direccion +" "+ this.datosDireccionContactoCF.ReferenciaDireccion
    } else {
      if (this.idColoniaContactoCF == 0) {
        this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionContactoCF.Direccion + " ZONA "+ this.obtenerFichaPDF.ZonaEntrega +" "+ this.datosDireccionContactoCF.ReferenciaDireccion
      } else {
        this.obtenerFichaPDF.DireccionEntrega = this.datosDireccionContactoCF.Direccion + " ZONA "+ this.obtenerFichaPDF.ZonaEntrega +" "+ this.obtenerFichaPDF.ColoniaEntrega +" "+ this.datosDireccionContactoCF.ReferenciaDireccion

      }
    }
  }
  //#endregion
 
}
