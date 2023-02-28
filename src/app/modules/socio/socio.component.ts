import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import { ObtenerDatosSocio } from 'src/app/models/Socio/ObtenerDatosSocio.model';
import { comboSocio } from 'src/app/models/Socio/ComboSocio.model';
import Swal from 'sweetalert2';
import { DatosSocio } from 'src/app/models/Socio/DatosSocio.model';
import { DatosDireccionSocio } from 'src/app/models/Socio/DatosDireccionSocio.model';
import { comboDepartamento } from 'src/app/models/ComboBox/ComboDepartamento';
import { comboMunicipio } from 'src/app/models/ComboBox/ComboMunicipio.model';
import { comboZona } from 'src/app/models/ComboBox/ComboZona.model';
import { comboColonia } from 'src/app/models/ComboBox/comboColonia.model';
import { ObtenerDireccionSocio } from 'src/app/models/Socio/ObtenerDireccionSocio.model';
import { comboBoxDireccion } from 'src/app/models/ComboBox/comboBoxDireccion.model';
import { ObtenerDatosContacto } from 'src/app/models/Socio/ObtenerDatosContacto.model';
import { DatosContactoSocio } from 'src/app/models/Socio/DatosContactoSocio.model';
import { DatosTelefono } from 'src/app/models/Socio/DatosTelefono.model';
import { DatosCorreo } from 'src/app/models/Socio/DatosCorreo.model';
import { comboCliente } from 'src/app/models/ComboBox/comboCliente.model';
import { ObtenerDatosBancariosId } from 'src/app/models/Socio/ObtenerDatosBancariosId.model';
import { comboTipoPago } from 'src/app/models/ComboBox/ComboTipoPago.model';
import { comboTipoProducto } from 'src/app/models/ComboBox/ComboTipoProducto.model';
import { comboBanco } from 'src/app/models/ComboBox/ComboBanco.model';
import { comboTipoCuenta } from 'src/app/models/ComboBox/ComboTipoCuenta.model';
import { DatosFinancieros } from 'src/app/models/Socio/DatosFinancieros.model';
import Stepper from 'bs-stepper';
import { CuentaSocio } from 'src/app/models/Socio/CuentaSocio.model';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.scss'],
  providers:[UserService,PedidoService]
})
export class SocioComponent implements OnInit {
  //#region Atributos - datos para obtener el token y datos del usuario 
    public token;
    public identity;
    public status;
    public loading: boolean;
  //#endregion
  //#region Atributos - Obtener la informacion de los socios
    public comboBoxSocioHide = 0;
    public rolSocio = 0;
    public keyword10 = 'Socio';
    public IdSocio = 0;
    public obtenerDatosEmpresa : ObtenerDatosSocio;
    public comboSocio : comboSocio;
    public CrearNuevoSocio = 0;
    public botonActualizarSocio = 0;
    public datosSocio : DatosSocio;
    public keyword  = 'Descripcion';
    public keyword2 = 'Descripcion';
    public keyword3 = 'Descripcion';
    public keyword4 = 'Descripcion';
    public keyword5 = 'NombreEmpresa';
    public keyword6 = 'Nombre';
    public keyword7 = 'Descripcion';
    public keyword8 = 'name';
    public tipoPersona;
  //#endregion
  //#region Atributos - Direccion del socio
    public datosDireccionSocio : DatosDireccionSocio;
    public comboDepartament : comboDepartamento;
    public idDepartamento = 0;
    public idMunicipio = 0;
    public idZona = 0;
    public idColonia = 0;
    public comboMunicipioDireccion = '';
    public comboMunicipio : comboMunicipio;
    public comboZona : comboZona;
    public comboColonia : comboColonia;

    public obtenerDireccionSocioId : ObtenerDireccionSocio

    public comboDireccionMunicipio : comboBoxDireccion;
    public comboDireccionZona : comboBoxDireccion;
    public comboDireccionColonia : comboBoxDireccion;

    public hideDepartamento;
    public hideMunicipio;
    public hideZona;
    public hideColonia;
    public visualizarComboColonia = 0;
    public visualizarComboZona = 0;

    public listarDireccion;
    public botonActualizarDireccionSocio = 0;
    public idColoniaEdicion;
    public idDatoDireccionSocio = 0;

    //Agregar direccion del socio
    public opcionSeleccionadoComboBox = 0;
  //#endregion
  //#region Atributos - Contactos y colaboradores del socio
    public numeroItems2 = 7
    public pageActual2 = 1
    public listarContacto;
    public botonActualizarDatosContacto = 0;
    public obtenerDatoContactoId : ObtenerDatosContacto
    public idTipoTelefonoSeleccionado;
    public idDatoContactoSocio = 0;
    public obtenertTipoTelefono;
    public IdTipoTelefonoColaborador = 0;
    public IdTipoTelefono = 0;
    public opcionDatosContacto = 0;
    public datosContactoSocio : DatosContactoSocio;
    public datosTelefono : DatosTelefono;
    public datosTelefonoColaborador : DatosTelefono;
    public datosCorreo : DatosCorreo;
    public obtenerContactoSocio;
    public IdColaborador = 0;
    public opcionSocioColaborador = 0;
    public IdTipoCorreo = 0;
    public obtenertTipoCorreo;
    public comboCliente : comboCliente;
  //#endregion
  //#region Atributos - Datos Financieros del socio
  public listarDatosFinancieros;
  public botonActualizarDatosFinancieros = 0;
  public obtenerDatosFinancierosId: ObtenerDatosBancariosId;
  public idDatoFinancieroSocio = 0;
  public comboTipoPago : comboTipoPago;
  public comboTipoProducto : comboTipoProducto;
  public comboBanco : comboBanco;
  public idBanco = 0;
  public comboTipoCuenta : comboTipoCuenta;
  public idTipoCuenta = 0;
  public datosFinancieros : DatosFinancieros;
  //#endregion
  //#region Atributos - Datos stepper
  private stepper: Stepper;
  name = 'Angular';
  //#endregion
  //#region Atributos - Datos crear usuario
  public datosCuentaSocio : CuentaSocio;
  //#endregion

  constructor(private _userServices:UserService , private _router:Router, private _pedidoServices:PedidoService) { 
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.obtenerDatosEmpresa = new ObtenerDatosSocio(0,0,'',0,'',0,'','','','','',0,0);
    this.datosDireccionSocio = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
    this.obtenerDireccionSocioId = new ObtenerDireccionSocio(0,'',0,'',0,'',0,'',0,'','',0);
    this.comboDireccionMunicipio = new comboBoxDireccion(0,'');
    this.comboDireccionZona = new comboBoxDireccion(0,'');
    this.comboDireccionColonia = new comboBoxDireccion(0,'');
    this.datosDireccionSocio = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
    this.obtenerDatoContactoId = new ObtenerDatosContacto(0,'','','',0,'','',0,'',0);
    this.datosContactoSocio = new DatosContactoSocio(0,0,'','',0,0);
    this.datosTelefono = new DatosTelefono(0,0,0,'',0,0,0);
    this.datosTelefonoColaborador = new DatosTelefono(0,0,0,'',0,0,0);
    this.datosCorreo = new DatosCorreo(0,0,0,'',0,0,0);
    this.obtenerDatosFinancierosId = new ObtenerDatosBancariosId(0,0,'',0,'','','',0);
    this.datosFinancieros = new DatosFinancieros(0,0,0,'','',0,0);
    this.datosSocio = new   DatosSocio('','','',0,'','','',0);
    this.datosCuentaSocio = new CuentaSocio(0,'','');
  }

  ngOnInit(){
    this.obtenerSocio();
    this.getComboDepartamento();
    this.visualizarIngresoSocio();
    this.getComboTipoProducto();
    this.getComboTipoPago();
    this.getComboCliente();
    this.comboTipoTelefono();
    this.comboTipoCorreo();
    this.getComboBanco();
    this.getComboTipoCuenta();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  //#region Metodos - Botones siguiente y atras del stepper
  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }
  onSubmit() {
    return false;
  }
  //#endregion
  

  //#region Metodos - Obtener informacion de socio
  getIdCliente(params){
    this.IdSocio = params.IdSocio
    this.obtenerDatosSocio(this.IdSocio)
    this.obtenerContacto(params.IdSocio)
    this.listarDireccionSocio(params.IdSocio)
    this.listarContactos(params.IdSocio)
    this.listarDatosFinancierosSocio(params.IdSocio)
  }
  obtenerDatosSocio(params){
    this._pedidoServices.obtenerDatosSocio(params).subscribe(
      response=>{
        let params = response.request;
        this.obtenerDatosEmpresa = params[0];
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  obtenerSocio(){
    this._pedidoServices.comboObtenerSocio().subscribe(
    response=>{
      let params = response.request;
      this.comboSocio = params;
    },error=>{
      var erroMessage = <any>error;
      console.log(erroMessage);
      if (erroMessage != null) {
        this.status = 'error';
      }
    }
  )
  }

  crearNuevoSocio(){
    this.CrearNuevoSocio = 1;
    this.comboBoxSocioHide = 1;
    this.IdSocio = 0;
  }
  visualizarIngresoSocio(){
    if(this.identity.IdSocio != 0){
      this.rolSocio = 1
    }else{
      this.rolSocio = 0
    }
  }
  //#endregion
  //#region Metodos - Actualizacion de socios
    editarDatosSocio(){
      if(this.IdSocio != 0){
        this.botonActualizarSocio = 1
      }else{
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'Para poder editar los datos del socio principales, se necesita seleccionar al socio o crearlo',
        })
      }
    }
    cerrarEdicionDatosSocio(){
      this._pedidoServices.obtenerDatosSocio(this.IdSocio).subscribe(
        response=>{
          let params = response.request;
          this.obtenerDatosEmpresa = params[0];
          this.botonActualizarSocio = 0
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    editarSocio() {

      this.obtenerDatosEmpresa.IdSocio = this.IdSocio
      this.obtenerDatosEmpresa.IdUsuario = this.identity.IdUsuarioLog

      Swal.fire({
        title: 'Editar datos del socio',
        text: "¿Esta seguro de editar los datos del socio?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF8000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value == true) {
          this.obtenerDatosEmpresa.IdTipoTelefono = 1;
          
          this._pedidoServices
            .EditarDatosSocio(this.obtenerDatosEmpresa)
            .subscribe(
              (response) => {
                let mensaje = response.message;
                if (
                  response.message ==
                  'Se ha actualizado correctamento los datos del socio'
                ) {
                  console.log(response.message);
                  this.obtenerDatosSocio(this.IdSocio);
                  this.status = 'Ok';
                  this.botonActualizarSocio = 0;
                  this.obtenerSocio();
                  Swal.fire(
                    'Editado',
                    'Los datos del socio han sido actualizados',
                    'success'
                  );
                } else {
                  this.desactivarCarga();
                  Swal.fire(mensaje);
                }
              },
              (error) => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                  this.desactivarCarga();
                  Swal.fire(error.error.message);
                  this.status = 'error';
                }
              }
            );
        } else {
          Swal.fire(
            'Edición no completada',
            'Los datos del socio no se han podido actualizar',
            'success'
          );
        }
        //}
      })

    }
  //#endregion
  //#region Metodos - para limpiar los OBJETOS
    public activarCarga() {
      this.loading = true;
    }
    public desactivarCarga() {
      this.loading = false;
    }
    public limpiarDatosSocio(){
      this.datosSocio = new   DatosSocio('','','',0,'','','',0);
    }
  
    public limpiarFormDirecciones(){
      this.datosDireccionSocio = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
      this.getComboDepartamento()
      this.idMunicipio = 0;
      this.idZona = 0;
      this.idColonia = 0;
    }
  
    public limpiarFormDireccionSeleccionado(){
      this.obtenerDireccionSocioId = new ObtenerDireccionSocio(0,'',0,'',0,'',0,'',0,'','',0);
      this.idMunicipio = 0;
      this.idZona = 0;
      this.idColonia = 0;
    }
    
    public limpiarFormtoContacto() {
      this.datosContactoSocio = new DatosContactoSocio(0, 0, '', '', 0, 0);
    }

    public limpiarFormtoTelefono() {
      this.datosTelefono = new DatosTelefono(0, 0, 0, '', 0, 0, 0);
    }

    public limpiarFormtoTelefonoColaborador() {
      this.datosTelefonoColaborador = new DatosTelefono(0, 0, 0, '', 0, 0, 0);
    }

    public limpiarFormatoFinanciero(){
      this.datosFinancieros = new DatosFinancieros(0,0,0,'','',0,0)
    }
    
    public limpiarFormatoCorreo() {
      this.datosCorreo = new DatosCorreo(0, 0, 0, '', 0, 0, 0)
    }
    
    public limpiarComboMunicipio(){
      this.comboDireccionMunicipio = new comboBoxDireccion(0,'');
    }
    public limpiarComboZona(){
      this.comboDireccionZona = new comboBoxDireccion(0,'');
  
    }
    public limpiarComboColonia(){
      this.comboDireccionColonia = new comboBoxDireccion(0,'');
    }
    //#endregion
  //#region Metodos - comboBox
    getComboCliente(){
      this._pedidoServices.comboCliente().subscribe(
        response=>{
          let params = response.request;
          this.comboCliente = params;
        //  console.log(this.comboCliente);

        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }

    getIdContacto(params){
      this.IdColaborador = params.IdContacto

    }
    comboTipoCorreo(){
      this._pedidoServices.comboTipoCorreo().subscribe(
        response=>{
          let params = response.request;
          this.obtenertTipoCorreo = params;
        },error=>{
          var erroMessage = <any>error;
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }

    getComboDepartamento(){
      this._pedidoServices.comboDepartamento().subscribe(
        response=>{
          let params = response.request;
          this.comboDepartament = params;
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
  
    getComboMunicipio(params){
      this.idDepartamento = params.IdDepartamento;
      this._pedidoServices.comboMunicipio(this.idDepartamento).subscribe(
        response=>{
          let params = response.request;
          this.comboMunicipio = params;
          // console.log(this.idDepartamento);
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
  
    MunicipioDireccion(params){
      this.idDepartamento = params;
      this._pedidoServices.comboMunicipio(params).subscribe(
        response=>{
          let params = response.request;
          this.comboMunicipio = params;
          // console.log(this.idDepartamento);
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
  
    getComboZona(params){
      this.idMunicipio = params.IdMunicipio;
      this._pedidoServices.comboZona(this.idMunicipio).subscribe(
        response=>{
          let params = response.request;
          this.comboZona = params;
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
  
    ZonaDireccion(params){
      this.idMunicipio = params;
      this._pedidoServices.comboZona(this.idMunicipio).subscribe(
        response=>{
          let params = response.request;
          this.comboZona = params;
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
  
    getComboColonia(params){
      this.idZona = params.IdZona;
      this._pedidoServices.comboColonia(this.idZona).subscribe(
        response=>{
          let params = response.request;
          this.comboColonia = params;
          // console.log(this.idZona)
          if(params != ''){
            params = ''
            // console.log(params);
  
          }else{
            return params
          }
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
  
    }

    listarDireccionSocio(params){
      this._pedidoServices.listaDireccionesSocio(params).subscribe(
        response=>{
          let params = response.request;
          this.listarDireccion = params;
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    ObtenerIdDireccion(IdDatoDireccion){
      this._pedidoServices.ObtenerDireccionSocioId(IdDatoDireccion).subscribe(
        response=>{
          let params = response.request;
          this.obtenerDireccionSocioId = params[0];
          this.botonActualizarDireccionSocio = 1;
          this.hideDepartamento = this.obtenerDireccionSocioId.IdDepartamento
          this.hideMunicipio = this.obtenerDireccionSocioId.IdMunicipio;
          this.hideZona = this.obtenerDireccionSocioId.IdZona;
          this.hideColonia = this.obtenerDireccionSocioId.IdColonia;

          this.getComboDepartamento();
          this.MunicipioDireccion(this.hideDepartamento);
  
          console.log(this.obtenerDireccionSocioId);
          
            if(this.hideZona == null){
              this.visualizarComboZona = 0
              this.ZonaDireccion(this.hideMunicipio)
            }else{
              this.visualizarComboZona = 1
              this.ZonaDireccion(this.hideMunicipio)
            }
  
          if(this.hideColonia == null){
            this.visualizarComboColonia = 0
            if (this.idZona == null) {
              this.ColoniaDireccion(this.hideZona)
            } 
          }else{
            this.visualizarComboColonia = 1
            this.ColoniaDireccion(this.hideZona)
          }
  
          this.idDatoDireccionSocio = IdDatoDireccion;
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }

    ColoniaDireccion(params){
      this.idZona = params;
      this._pedidoServices.comboColonia(this.idZona).subscribe(
        response=>{
          let params = response.request;
          this.comboColonia = params;
          // console.log(this.idZona)
          if(params != ''){
            params = ''
            // console.log(params);
  
          }else{
            return params
          }
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
  
    }
    getIdColonia(params){
      this.idColonia = params.IdColonia
      this.idColoniaEdicion = params.IdColonia
    }
  
    editarDatosDireccionSocio() {
      this.obtenerDireccionSocioId.IdUsuario = this.identity.IdUsuarioLog;
  
      if (this.obtenerDireccionSocioId.Direccion == '') {
        Swal.fire('Ingrese la direccion del socio')
      } else if (this.obtenerDireccionSocioId.IdDepartamento == null) {
        Swal.fire('Seleccione un departamento')
      } else {
        this.obtenerDireccionSocioId.IdDepartamento = this.idDepartamento
        this.obtenerDireccionSocioId.IdMunicipio = this.idMunicipio
        this.obtenerDireccionSocioId.IdZona = this.idZona
        this.obtenerDireccionSocioId.IdColonia = this.idColonia
        this._pedidoServices.EditarDatosDireccionSocio(this.obtenerDireccionSocioId).subscribe(
          response => {
            let mensaje = response.message;
            if (response.message == 'Se ha actualizado correctamento los datos de las direcciones del socio') {
              console.log(response.message);
              this.status = 'Ok'
              this.limpiarFormDireccionSeleccionado()
              this.listarDireccionSocio(this.IdSocio)

              this.botonActualizarDireccionSocio = 0;
            } else {
              this.limpiarFormDireccionSeleccionado()
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
    cerrarEdicionDireccionSocio(){
      this.botonActualizarDireccionSocio = 0
    }
    getComboMunicipioDireccion(id){
      this._pedidoServices.comboMunicipioDireccion(id).subscribe(
        response=>{
          let params = response.request;
          this.comboMunicipioDireccion = params[0].Descripcion;
        //  console.log(this.comboMunicipioDireccion);
  
        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }

    comboTipoTelefono(){
      this._pedidoServices.comboTipoTelefono().subscribe(
        response=>{
          let params = response.request;
          this.obtenertTipoTelefono = params;
        },error=>{
          var erroMessage = <any>error;
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
    //#endregion
  //#region Metodos - ABM para ingresar las direcciones del socio 

  
    agregarDireccionSocio() {
      this.datosDireccionSocio.IdDepartamento = this.idDepartamento;
      this.datosDireccionSocio.IdContacto = 0;
      this.datosDireccionSocio.IdTipoDireccion = 1;
      this.datosDireccionSocio.IdUsuario = this.identity.IdUsuarioLog
      this.datosDireccionSocio.Predeterminado = 0;
      this.datosDireccionSocio.IdSocio = this.IdSocio
      if (this.datosDireccionSocio.Direccion == '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingresar la direccion del socio',
        })
      } else if (this.datosDireccionSocio.IdSocio == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe de seleccionar un socio o crearlo',
        })
      } else if (this.datosDireccionSocio.IdDepartamento == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe de seleccionar un departamento',
        })
      } else {

        this.datosDireccionSocio.IdMunicipio = this.idMunicipio
        this.datosDireccionSocio.IdZona = this.idZona
        this.datosDireccionSocio.IdColonia = this.idColonia
        this._pedidoServices.agregarDireccionSocio(this.datosDireccionSocio).subscribe(
          response => {
            let mensaje = response.message;
            if (response.message == 'Se ha creado exitosamente la direccion del socio') {
              console.log(response.message);
              this.status = 'Ok'
              this.listarDireccionSocio(this.IdSocio);
              this.limpiarFormDirecciones()
              Swal.fire(
                'Direccion del socio',
                mensaje,
                'success'
              )
            } else {
              this.limpiarFormDirecciones()
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
  
    obtenerOpcionSeleccionada(params){
      this.opcionSeleccionadoComboBox = params.target.value;
    }
    //#endregion
  //#region Metodos - ABM para crear clientes y colaboradores del socio
  listarContactos(params){
    this._pedidoServices.listarContactosSocio(params).subscribe(
      response=>{
        let params = response.request;
        this.listarContacto = params;
        //        console.log(this.listarContacto);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  ObtenerIdContacto(IdDatoContacto){
    this._pedidoServices.ObtenerDatosContactoId(IdDatoContacto).subscribe(
      response=>{
        let params = response.request;
        this.obtenerDatoContactoId = params[0];
        this.idTipoTelefonoSeleccionado = this.obtenerDatoContactoId.IdTipoTelefono;

        this.botonActualizarDatosContacto = 1
        this.idDatoContactoSocio = IdDatoContacto;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  editarDatosContactos() {
    this.obtenerDatoContactoId.IdUsuario = this.identity.IdUsuarioLog;
    this.comboTipoTelefono();
    if (this.IdTipoTelefonoColaborador == 0) {
      this.obtenerDatoContactoId.IdTipoTelefono = this.idTipoTelefonoSeleccionado
      this.obtenerDatoContactoId.TipoDeTelefono = null;
      Swal.fire({
        title: 'Editar contactos del socio',
        text: "¿Esta seguro de editar los datos del contacto del socio?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF8000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this._pedidoServices.EditarDatosContactos(this.obtenerDatoContactoId).subscribe(
            response => {
              let mensaje = response.message;
              if (response.message == 'Se ha actualizado correctamento los datos del contacto del socio') {
                // console.log(response.message);
                this.listarContactos(this.IdSocio)
                this.status = 'Ok'
                this.botonActualizarDatosContacto = 0
                Swal.fire(
                  'Editado',
                  'Los datos del contacto seleccionado del socio han sido actualizados',
                  'success'
                )
              } else {
                this.desactivarCarga()
                Swal.fire(mensaje)
              }
            },
            error => {
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                this.desactivarCarga()
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
        }
      })
    } else {
      this.obtenerDatoContactoId.IdTipoTelefono = this.IdTipoTelefonoColaborador
      this.obtenerDatoContactoId.TipoDeTelefono = null;
      this.IdTipoTelefonoColaborador = 0
      // console.log(this.obtenerDatoContactoId,'here');


      Swal.fire({
        title: 'Editar contactos del socio',
        text: "¿Esta seguro de editar los datos del contacto del socio?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this._pedidoServices.EditarDatosContactos(this.obtenerDatoContactoId).subscribe(
            response => {
              let mensaje = response.message;
              if (response.message == 'Se ha actualizado correctamento los datos del contacto del socio') {
                // console.log(response.message);
                this.listarContactos(this.IdSocio)
                this.status = 'Ok'
                this.botonActualizarDatosContacto = 0
                Swal.fire(
                  'Editado',
                  'Los datos del contacto seleccionado del socio han sido actualizados',
                  'success'
                )
              } else {
                this.desactivarCarga()
                Swal.fire(mensaje)
              }
            },
            error => {
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                this.desactivarCarga()
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
        }
      })

    }
  }
  getIdTipoTelefono(params){
    this.IdTipoTelefono = params.IdTipoTelefono

  }
  getIdTipoTelefonoColaborador(params){
    this.IdTipoTelefonoColaborador = params.IdTipoTelefono
  }
  cerrarEdicionDatosContactoSocio(){
    this.botonActualizarDatosContacto = 0
  }
  obtenerOpcionDatosContacto(id){
    this.opcionDatosContacto = id.target.value;
  }
  obtenerContacto(params){
    this._pedidoServices.obtenerContacto(params).subscribe(
      response=>{
        let params = response.request;
        this.obtenerContactoSocio = params;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  agregarDatosContacto() {
    if(this.IdSocio == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de seleccionar un socio o crearlo para el ingreso de los datos del contacto',
      })
    }else if(this.opcionDatosContacto == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de seleccionar una opcion para la creacion del contacto o ya bien sus atributos',
      })
    }
     else{
      if (this.opcionDatosContacto == 1) {
        this.datosContactoSocio.IdSocio = this.IdSocio;
        this.datosContactoSocio.Predeterminado = 0;
        this.datosContactoSocio.IdUsuario = this.identity.IdUsuarioLog
        this.datosContactoSocio.IdTipoContacto = 2
        if (this.datosContactoSocio.Nombre == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese el nombre del contacto',
          })
        } else if (this.datosContactoSocio.Puesto == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese el puesto del contacto',
          })
        } else {
          Swal.fire({
            title: 'Crear colaboradores del socio',
            text: "¿Se encuentra seguro de crear los colaboradores para el socio seleccionado?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              this._pedidoServices.agregarDatosContacto(this.datosContactoSocio).subscribe(
                response => {
                  let mensaje = response.message;
                  if (response.message == 'Se ha creado exitosamente el contacto del socio') {
                    console.log(response.message);
                    Swal.fire(
                      'Creado',
                      mensaje,
                      'success'
                    )
                    this.listarContactos(this.IdSocio)
                    this.obtenerContacto(this.IdSocio)
                    this.status = 'Ok'
                    this.IdColaborador = 0;
                    this.limpiarFormtoContacto();
                  } else {
                    this.desactivarCarga()
                    console.log(response)
                    this.limpiarFormtoContacto();
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage)
                  if (errorMessage != null) {
                    Swal.fire(error.error.message)
                    this.status = 'error'
                    this.limpiarFormtoContacto();
                  }
                }
              )
            }
          })

        }
      } else if (this.opcionDatosContacto == 2) {

        if (this.opcionSocioColaborador == 1) {
          this.datosTelefono.IdContacto = null
        } else {
          if (this.datosTelefono.IdContacto == 0) {
            this.datosTelefono.IdContacto = null
          } else {
            this.datosTelefono.IdContacto = this.IdColaborador
          }
        }
  
        if (this.datosTelefono.Telefono == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'LLenar el campo de telefono',
          })
        }else if(this.IdTipoTelefono == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe de seleccionar el tipo de telefono',
          })
        }else if(this.IdColaborador == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe de seleccionar un colaborador para el ingreso del telefono',
          })
        } 
      
        else {
          Swal.fire({
            title: 'Crear telefonos de los colaboradores del socio',
            text: "¿Se encuentra seguro de crear la informacion del telefono para el colaborador seleccionado?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {

            if (result.value) {
              this.datosTelefono.IdSocio = this.IdSocio;
              this.datosTelefono.IdUsuario = this.identity.IdUsuarioLog;
              this.datosTelefono.Predeterminado = 0;
              this.datosTelefono.IdContacto = this.IdColaborador;
              this.datosTelefono.IdTipoTelefono = this.IdTipoTelefono;
              this.datosTelefono.Opcion = 2
              
              this._pedidoServices.agregarDatosTelefono(this.datosTelefono).subscribe(
                response => {
                  let mensaje = response.message;
                  if (response.message == 'Se ha creado exitosamente el telefono') {
                    this.status = 'Ok'
                    Swal.fire(
                      'Creado',
                      mensaje,
                      'success'
                    )
                    this.listarContactos(this.IdSocio)
                    this.obtenerContacto(this.IdSocio)
                    this.limpiarFormtoTelefono();
                    this.IdColaborador = 0;
                  } else {
                    console.log(response)
                    this.limpiarFormtoTelefono();
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage)
                  if (errorMessage != null) {
                    this.desactivarCarga()
                    Swal.fire(error.error.message)
                    this.status = 'error'
                    this.limpiarFormtoTelefono();
                  }
                }
              )
            }
          })
        }
      } else if (this.opcionDatosContacto == 3){
        if (this.datosCorreo.Email == '') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Colocar el correo electronico de cuenta',
          })
        }else if(this.IdTipoCorreo == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe de seleccionar el tipo de correo',
          })
        }else if(this.IdColaborador == 0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe de seleccionar un colaborador para el ingreso del correo electronico',
          })
        } else {
          Swal.fire({
            title: 'Crear correo electronico de los colaboradores del socio',
            text: "¿Se encuentra seguro de crear el correo electronico para el colaborador seleccionado?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF8000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
              this.datosCorreo.IdSocio = this.IdSocio;
              this.datosCorreo.IdUsuario = this.identity.IdUsuarioLog;
              this.datosCorreo.Predeterminado = 0;
              this.datosCorreo.IdContacto = this.IdColaborador;
              this.datosCorreo.IdTipoEmail = this.IdTipoCorreo;
              this.datosCorreo.Opcion = 2;
              this._pedidoServices.agregarDatosCorreo(this.datosCorreo).subscribe(
                response => {
                  let mensaje = response.message;
                  if (response.message == 'Se ha creado exitosamente el correo') {
                    Swal.fire(
                      'Creado',
                      mensaje,
                      'success'
                    )
                    this.listarContactos(this.IdSocio)
                    this.obtenerContacto(this.IdSocio)
                    this.status = 'Ok'
                    this.IdColaborador = 0;
                    this.limpiarFormatoCorreo();
                  } else {
                    console.log(response)
                    this.limpiarFormatoCorreo();
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage)
                  if (errorMessage != null) {
                    Swal.fire(error.error.message)
                    this.status = 'error'
                    this.limpiarFormatoCorreo();
                  }
                }
              )
            }
          })
        }
      }
    }

    


  }
 
  //#endregion
  //#region Metodos - ABM para los datos financieros del socio
  editarDatosFinancierosId(IdDatosFinancieros){
    this._pedidoServices.ObtenerDatosFinancierosId(IdDatosFinancieros).subscribe(
      response=>{
        let params = response.request;
        this.obtenerDatosFinancierosId = params[0];
        this.botonActualizarDatosFinancieros = 1
        this.idDatoFinancieroSocio = IdDatosFinancieros;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboTipoProducto(){
    this._pedidoServices.ComboTipoProducto().subscribe(
      response=>{
        let params = response.request;
        this.comboTipoProducto = params;
      //  console.log(this.comboTipoProducto);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboTipoPago(){
    this._pedidoServices.ComboTipoPago().subscribe(
      response=>{
        let params = response.request;
        this.comboTipoPago = params;
      //  console.log(this.comboTipoPago);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  listarDatosFinancierosSocio(params){
    this._pedidoServices.listarDatosFinancieros(params).subscribe(
      response=>{
        let params = response.request;
        this.listarDatosFinancieros = params;
        // console.log(this.listarDatosFinancieros);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboBanco(){
    this._pedidoServices.comboBanco().subscribe(
      response=>{
        let params = response.request;
        this.comboBanco = params;
        // console.log(this.comboBanco);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getIdBanco(params){
    this.idBanco = params.IdBanco
  }
  getComboTipoCuenta(){
    this._pedidoServices.comboTipoCuenta().subscribe(
      response=>{
        let params = response.request;
        this.comboTipoCuenta = params;
        // console.log(this.comboTipoCuenta);

      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getIdTipoCuenta(params){
    this.idTipoCuenta = params.IdTipoCuentaBancaria
    console.log(this.idTipoCuenta);

  }
  cerrarEdicionDatosFinancieros(){
    this.botonActualizarDatosFinancieros = 0
  }
  editarDatosFinancieros(){
    if(this.idTipoCuenta != 0 && this.idBanco != 0){
     this.obtenerDatosFinancierosId.IdUsuario = this.identity.IdUsuarioLog

     this.obtenerDatosFinancierosId.IdBanco = this.idBanco
     this.obtenerDatosFinancierosId.TipoCuentaBancaria = this.idTipoCuenta;

     this.obtenerDatosFinancierosId.Banco = null
     this.obtenerDatosFinancierosId.TipoCuenta = null

     Swal.fire({
       title: 'Editar datos financieros del socio',
       text: "¿Esta seguro de editar los datos financieros del socio?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#FF8000',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Editar',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.value) {
         this._pedidoServices.EditarDatosFinancieros(this.obtenerDatosFinancierosId).subscribe(
           response => {
             let mensaje = response.message;
             if (response.message == 'Se ha actualizado correctamento los datos financieros del socio') {
               console.log(response.message);
               this.listarDatosFinancierosSocio(this.IdSocio)
               this.status = 'Ok'
               this.botonActualizarDatosFinancieros = 0
               this.idBanco = 0;
               this.idTipoCuenta = 0;
               Swal.fire(
                 'Editado',
                 'Los datos financieros del socio han sido actualizados',
                 'success'
               )
             } else {
               this.desactivarCarga()
               Swal.fire(mensaje)
             }
           },
           error => {
             var errorMessage = <any>error;
            console.log(errorMessage)
             if (errorMessage != null) {
               this.desactivarCarga()
               Swal.fire(error.error.message)
               this.status = 'error'
             }
           }
         )
       }
     })
   } else if(this.idBanco != 0){
     this.obtenerDatosFinancierosId.IdUsuario = this.identity.IdUsuarioLog
     this.obtenerDatosFinancierosId.IdBanco = this.idBanco
     // this.obtenerDatosFinancierosId.TipoCuentaBancaria = this.idTipoCuenta;
     this.obtenerDatosFinancierosId.Banco = null
     // this.obtenerDatosFinancierosId.TipoCuenta = null

     Swal.fire({
       title: 'Editar datos financieros del socio',
       text: "¿Esta seguro de editar los datos financieros del socio?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#FF8000',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Editar',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.value) {
         this._pedidoServices.EditarDatosFinancieros(this.obtenerDatosFinancierosId).subscribe(
           response => {
             let mensaje = response.message;
             if (response.message == 'Se ha actualizado correctamento los datos financieros del socio') {
               console.log(response.message);
               this.listarDatosFinancierosSocio(this.IdSocio)
               this.status = 'Ok'
               this.botonActualizarDatosFinancieros = 0
               this.idBanco = 0;
               this.idTipoCuenta = 0;
               Swal.fire(
                 'Editado',
                 'Los datos financieros del socio han sido actualizados',
                 'success'
               )
             } else {
               this.desactivarCarga()
               Swal.fire(mensaje)
             }
           },
           error => {
             var errorMessage = <any>error;
            console.log(errorMessage)
             if (errorMessage != null) {
               this.desactivarCarga()
               Swal.fire(error.error.message)
               this.status = 'error'
             }
           }
         )
       }
     })


   }else if(this.idTipoCuenta != 0){
     this.obtenerDatosFinancierosId.IdUsuario = this.identity.IdUsuarioLog
     this.obtenerDatosFinancierosId.TipoCuentaBancaria = this.idTipoCuenta;
     this.obtenerDatosFinancierosId.TipoCuenta = null

     Swal.fire({
       title: 'Editar datos financieros del socio',
       text: "¿Esta seguro de editar los datos financieros del socio?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#FF8000',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Editar',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.value) {
         this._pedidoServices.EditarDatosFinancieros(this.obtenerDatosFinancierosId).subscribe(
           response => {
             let mensaje = response.message;
             if (response.message == 'Se ha actualizado correctamento los datos financieros del socio') {
               console.log(response.message);
               this.listarDatosFinancierosSocio(this.IdSocio)
               this.status = 'Ok'
               this.botonActualizarDatosFinancieros = 0
               this.idBanco = 0;
               this.idTipoCuenta = 0;
               Swal.fire(
                 'Editado',
                 'Los datos financieros del socio han sido actualizados',
                 'success'
               )
             } else {
               this.desactivarCarga()
               Swal.fire(mensaje)
             }
           },
           error => {
             var errorMessage = <any>error;
            console.log(errorMessage)
             if (errorMessage != null) {
               this.desactivarCarga()
               Swal.fire(error.error.message)
               this.status = 'error'
             }
           }
         )
       }
     })
   }else {
     this.obtenerDatosFinancierosId.IdUsuario = this.identity.IdUsuarioLog

     Swal.fire({
       title: 'Editar datos financieros del socio',
       text: "¿Esta seguro de editar los datos financieros del socio?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#FF8000',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Editar',
       cancelButtonText: 'Cancelar'
     }).then((result) => {
       if (result.value) {
         this._pedidoServices.EditarDatosFinancieros(this.obtenerDatosFinancierosId).subscribe(
           response => {
             let mensaje = response.message;
             if (response.message == 'Se ha actualizado correctamento los datos financieros del socio') {
               console.log(response.message);
               this.listarDatosFinancierosSocio(this.IdSocio)
               this.status = 'Ok'
               this.botonActualizarDatosFinancieros = 0
               this.idBanco = 0;
               this.idTipoCuenta = 0;
               Swal.fire(
                 'Editado',
                 'Los datos financieros del socio han sido actualizados',
                 'success'
               )
             } else {
               this.desactivarCarga()
               Swal.fire(mensaje)
             }
           },
           error => {
             var errorMessage = <any>error;
            console.log(errorMessage)
             if (errorMessage != null) {
               this.desactivarCarga()
               Swal.fire(error.error.message)
               this.status = 'error'
             }
           }
         )
       }
     })


    }

  }
  agregarDatosFinancieros(){

    this.datosFinancieros.IdSocio = this.IdSocio;
    this.datosFinancieros.IdBanco = this.idBanco;
    this.datosFinancieros.IdTipoCuentabancaria = this.idTipoCuenta;
    this.datosFinancieros.IdUsuario = this.identity.IdUsuarioLog;
    this.datosFinancieros.Predeterminado = 0;
    if(this.datosFinancieros.NumeroCuenta == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresar el numero de cuenta del socio',
      })
      // Swal.fire('Debe de ingresar el numero de cuenta del socio')
    }else if(this.datosFinancieros.IdSocio == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccionar al socio o crear un nuevo socio',
      })
    }else{
      Swal.fire({
        title: 'Crear datos financieros del socio',
        text: "¿Se encuentra seguro de crear los datos financieros del socio?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF8000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this._pedidoServices.agregarDatosFinancieros(this.datosFinancieros).subscribe(
            response =>{
              let mensaje = response.message;
              if(response.message == 'Se ha creado exitosamente el numero de cuenta'){
                console.log(response.message);
                Swal.fire(
                  'Creado',
                  'Se ha creado exitosamente los datos finacieros del socio',
                  'success'
                )
                this.listarDatosFinancierosSocio(this.IdSocio)
                  this.status = 'Ok'
                this.limpiarFormatoFinanciero();
              } else {
                this.desactivarCarga()
                console.log(response)
                this.limpiarFormatoFinanciero();
              }
            },
            error =>{
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
                this.limpiarFormatoFinanciero();
              }
            }
          )
        }
      })
          

    }

  }
  //#endregion
  //#region Metodos - ABM Guardar socios
  agregarDatosSocio() {
    // Ingreso de datos del socio
    this.datosSocio.IdUsuario = this.identity.IdUsuarioLog;

    this.datosFinancieros.IdBanco = this.idBanco;
    this.datosFinancieros.IdTipoCuentabancaria =  this.idTipoCuenta;

    this.datosTelefonoColaborador.IdTipoTelefono = this.IdTipoTelefonoColaborador;
    
    if (this.datosSocio.TipoPersona == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de seleccionar el tipo de socio que desea crear',
      })
    } else if (this.datosSocio.DescripcionNit == '' && this.datosSocio.IdentificacionDPI == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar algun tipo de identificacion, ya sea NIT o DPI',
      })
    } else if (this.datosTelefono.Telefono == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar el telefono del socio',
      })
    } else if (this.datosContactoSocio.Nombre == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar el nombre del contacto',
      })

    } else if (this.datosTelefonoColaborador.Telefono == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar el numero de telefono del colaborador',
      })
    } else if (this.datosTelefonoColaborador.IdTipoTelefono == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de seleccionar el tipo de telefono que va a ingresar del colaborador',
      })
    } else if (this.datosCorreo.Email == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar el correo del colaborador',
      })
    } else if (this.idTipoCuenta == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de seleccionar el tipo de cuenta bancaria',
      })
    } else if (this.idBanco == 0) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de seleccionar el banco',
      })
    } else if (this.datosFinancieros.NumeroCuenta == '') {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Debe de ingresar el numero de cuenta',
      })
    } else if (this.datosDireccionSocio.Direccion == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingresar la direccion del socio',
      })
    } else if (this.idDepartamento == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de seleccionar un departamento',
      })
    } else if (this.datosCuentaSocio.Usuarios == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de ingresar los datos del usuario',
      })
    } else if (this.datosCuentaSocio.Password == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de ingresar el password del socio',
      })
    } else {
      if (this.datosSocio.TipoPersona == 1) {
        this.datosSocio.Nombres = null;
        this.datosSocio.Apellidos = null;

      } else if (this.datosSocio.TipoPersona == 2) {
        this.datosSocio.NombreSocio = null;
        this.datosSocio.RazonSocial = null;
      }
      Swal.fire({
        title: 'Crear nuevo socio',
        text: "¿Se encuentra seguro de crear el nuevo socio con todos sus datos?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF8000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

          this._pedidoServices.agregarDatosSocio(this.datosSocio).subscribe(
            response => {
              let mensaje = response.message;
              this.IdSocio = response.IdSocio
              if (response.message) {
                this.status = 'Ok'
                this.obtenerDatosSocio(this.IdSocio)
                this.obtenerContacto(this.IdSocio)
                this.limpiarDatosSocio();
                //#region creacion de los datos de telefono pero del socio
                this.datosTelefono.IdSocio = this.IdSocio;
                this.datosTelefono.IdContacto = 0;
                this.datosTelefono.IdUsuario = this.identity.IdUsuarioLog;
                this.datosTelefono.Opcion = 1;
                this.datosTelefono.Predeterminado = 0;
                this.datosTelefono.IdTipoTelefono = 1;
    
                this._pedidoServices.agregarDatosTelefono(this.datosTelefono).subscribe(
                  response => {
                    let mensaje = response.message;
                    if (response.message == 'Se ha creado exitosamente el telefono') {
                      this.desactivarCarga();
                      this.status = 'Ok'
                      this.listarContactos(this.IdSocio)
                      this.IdTipoTelefono = 0
                      this.limpiarFormtoTelefono();
                      //#region Ingresar contactos
                     
                      this.datosContactoSocio.IdSocio = this.IdSocio;
                      this.datosContactoSocio.IdUsuario = this.identity.IdUsuarioLog;
                      this.datosContactoSocio.Predeterminado = 0;
                      this.datosContactoSocio.IdTipoContacto = 2;

                      this._pedidoServices.agregarDatosContacto(this.datosContactoSocio).subscribe(
                        response => {
                          let mensaje = response.message;
                          this.IdColaborador = response.IdContacto
                          if (response.message == 'Se ha creado exitosamente el contacto del socio') {
                            this.desactivarCarga();
                            this.listarContactos(this.IdSocio)
                            this.status = 'Ok'
                            this.limpiarFormtoContacto();
                //             //#region
                            this.datosTelefonoColaborador.IdSocio = 0;
                            this.datosTelefonoColaborador.IdContacto = this.IdColaborador;
                            this.datosTelefonoColaborador.IdUsuario = this.identity.IdUsuarioLog;
                            this.datosTelefonoColaborador.Opcion = 2;
                            this.datosTelefonoColaborador.Predeterminado = 0;
    
                            this._pedidoServices.agregarDatosTelefono(this.datosTelefonoColaborador).subscribe(
                              response => {
                                let mensaje = response.message;
                                if (response.message == 'Se ha creado exitosamente el telefono') {
                                  this.desactivarCarga();
                                  this.status = 'Ok'
                                  this.listarContactos(this.IdSocio)
                                  this.IdTipoTelefonoColaborador = 0
                                  this.limpiarFormtoTelefonoColaborador();
                                  this.IdTipoTelefono = 0
    
                                  //#region ingreso de correo
                                  this.datosCorreo.IdSocio = 0;
                                  this.datosCorreo.IdUsuario = this.identity.IdUsuarioLog;
                                  this.datosCorreo.Predeterminado = 0
                                  this.datosCorreo.IdContacto = this.IdColaborador;
                                  this.datosCorreo.Opcion = 2;
                                  this.datosCorreo.IdTipoEmail = 3

                                  this._pedidoServices.agregarDatosCorreo(this.datosCorreo).subscribe(
                                    response => {
                                      let mensaje = response.message;
                                      if (response.message == 'Se ha creado exitosamente el correo') {
                                        this.desactivarCarga();
                                        this.listarContactos(this.IdSocio)
                                        this.status = 'Ok'
                                        this.limpiarFormatoCorreo();
                                        //#region datos financieros
                                        
                                        this.datosFinancieros.IdSocio = this.IdSocio;
                                        this.datosFinancieros.IdUsuario = this.identity.IdUsuarioLog;
                                        this.datosFinancieros.Predeterminado = 0;

                                        this._pedidoServices.agregarDatosFinancieros(this.datosFinancieros).subscribe(
                                          response => {
                                            let mensaje = response.message;
                                            if (response.message == 'Se ha creado exitosamente el numero de cuenta') {
                                              this.desactivarCarga();
                                              this.status = 'Ok'
                                              this.idBanco = 0;
                                              this.idTipoCuenta = 0;
                                              this.limpiarFormatoFinanciero();
                                              this.listarDatosFinancierosSocio(this.IdSocio)

                                                this.datosCuentaSocio.IdSocio = this.IdSocio;
                                                this._pedidoServices.CrearCuentaSocio(this.datosCuentaSocio).subscribe(
                                                  response => {
                                                    let mensaje = response.message;
                                                    if (response.message == 'Se ha creado exitosamente la cuenta del socio') {
                                                      this.status = 'Ok'
                                                      this.datosDireccionSocio.IdDepartamento = this.idDepartamento;
                                                      this.datosDireccionSocio.IdContacto = 0;
                                                      this.datosDireccionSocio.IdTipoDireccion = 1;
                                                      this.datosDireccionSocio.IdUsuario = this.identity.IdUsuarioLog
                                                      this.datosDireccionSocio.Predeterminado = 0;
                                                      this.datosDireccionSocio.IdSocio = this.IdSocio

                                                      this.datosDireccionSocio.IdMunicipio = this.idMunicipio
                                                      this.datosDireccionSocio.IdZona = this.idZona
                                                      this.datosDireccionSocio.IdColonia = this.idColonia
                                                      this._pedidoServices.agregarDireccionSocio(this.datosDireccionSocio).subscribe(
                                                        response => {
                                                          let mensaje = response.message;
                                                          if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                                                            this.status = 'Ok'
                                                            this.listarDireccionSocio(this.IdSocio);
                                                            this.limpiarFormDirecciones()
                                                            Swal.fire(
                                                              'Creacion de socio!',
                                                              'Se ha creado exitosamente el socio',
                                                              'success'
                                                            )
                                                            this.obtenerContacto(this.IdSocio)
                                                          } else {
                                                            this.limpiarFormDirecciones()
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


                                                      
                                                     
                                                      this.comboBoxSocioHide = 0;
                                                    } else {
                                                      this.desactivarCarga()
                                                      console.log(response)
                                                    }
                                                  },
                                                  error => {
                                                    var errorMessage = <any>error;
                                                    console.log(errorMessage)
                                                    if (errorMessage != null) {
                                                      this.desactivarCarga()
                                                      Swal.fire(error.error.message)
                                                      this.status = 'error'
                                                      this.limpiarFormatoFinanciero();
                                                    }
                                                  }
                                                )
                                              //#region datos de la direccion
                                              this.CrearNuevoSocio = 0;
                                              this.comboBoxSocioHide = 0;
                                              //#endregion
                                            } else {
                                              this.desactivarCarga()
                                              console.log(response)
                                              this.limpiarFormatoFinanciero();
                                            }
                                          },
                                          error => {
                                            var errorMessage = <any>error;
                                            console.log(errorMessage)
                                            if (errorMessage != null) {
                                              this.desactivarCarga()
                                              Swal.fire(error.error.message)
                                              this.status = 'error'
                                              this.limpiarFormatoFinanciero();
                                            }
                                          }
                                        )
    
                                        //#endregion
                                      } else {
                                        this.desactivarCarga()
                                        console.log(response)
                                        this.limpiarFormatoCorreo();
                                      }
                                    },
                                    error => {
                                      var errorMessage = <any>error;
                                      console.log(errorMessage)
                                      if (errorMessage != null) {
                                        this.desactivarCarga()
                                        Swal.fire(error.error.message)
                                        this.status = 'error'
                                        this.limpiarFormatoCorreo();
                                      }
                                    }
                                  )
    
                                  //#endregion
                                } else {
                                  this.desactivarCarga()
                                  console.log(response)
                                  this.limpiarFormtoTelefonoColaborador();
                                }
                              },
                              error => {
                                var errorMessage = <any>error;
                                console.log(errorMessage)
                                if (errorMessage != null) {
                                  this.desactivarCarga()
                                  Swal.fire(error.error.message)
                                  this.status = 'error'
                                  this.limpiarFormtoTelefonoColaborador();
                                }
                              }
                            )
    
                //             //#endregion
    
                          } else {
                            this.desactivarCarga()
                            console.log(response)
                            this.limpiarFormtoContacto();
                          }
                        },
                        error => {
                          var errorMessage = <any>error;
                          console.log(errorMessage)
                          if (errorMessage != null) {
                            this.desactivarCarga()
                            Swal.fire(error.error.message)
                            this.status = 'error'
                            this.limpiarFormtoContacto();
                          }
                        }
                      )
                //       //#endregion
                    } else {
                      this.desactivarCarga()
                      console.log(response)
                      this.limpiarFormtoTelefono();
                    }
                  },
                  error => {
                    var errorMessage = <any>error;
                    console.log(errorMessage)
                    if (errorMessage != null) {
                      this.desactivarCarga()
                      Swal.fire(error.error.message)
                      this.status = 'error'
                      this.limpiarFormtoTelefono();
                    }
                  }
                )
                //#endregion
              } else {
                this.desactivarCarga()
                Swal.fire(response)
                this.limpiarDatosSocio();
              }
            },
            error => {
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                this.desactivarCarga()
                Swal.fire(error.error.message)
                this.status = 'error'
                this.limpiarDatosSocio();
              }
            }
          )
        }
      })

      
    }
  }
  //#endregion
  

  
}
