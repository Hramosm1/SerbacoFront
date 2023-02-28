import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import { DatosSector } from 'src/app/models/Tarifado/DatosSector.model';
import { EditarDatosSector } from 'src/app/models/Tarifado/EditarDatosSector.model';
import { DatosRuta } from 'src/app/models/Tarifado/DatosRuta.model';
import { comboMunicipio } from 'src/app/models/DatosDemograficos/ComboMunicipio.model';
import { comboZona } from 'src/app/models/DatosDemograficos/ComboZona.model';
import { EditarDatosRuta } from 'src/app/models/Tarifado/EditarDatosRuta.model';
import { DatosTarifa } from 'src/app/models/Tarifado/DatosTarifa.model';
import { EditarDatosTarifa } from 'src/app/models/Tarifado/EditarDatosTarifa.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tarifado',
  templateUrl: './tarifado.component.html',
  styleUrls: ['./tarifado.component.scss'],
  providers: [UserService, PedidoService]

})
export class TarifadoComponent implements OnInit {
  //#region Atributos - parametros para los datos del usuario logueado
  public token;
  public identity;
  public status;
  public usuario;
  public loading: boolean;
  public rolSocio = 0;
  //#endregion
  //#region Atributos - parametros ABM de sectores
  public datosSectores : DatosSector;
  public datosEdicionSectores: EditarDatosSector;
  public ListaSectores;
  public IdEdicionSector = 0;
  pageActual: number = 1;
  numeroItems = 30;
//#endregion
  //#region Atributos - parametros ABM de rutas
  public datosRuta : DatosRuta;
  public keyword  = 'Descripcion';
  public comboMunicipioEntrega : comboMunicipio;
  public idMunicipioEntrega = 0;
  public idSector = 0;
  public idZona = 0;
  public comboZonaEntrega : comboZona;
  public ListaRutas;
  public IdEdicionRuta = 0;
  public sector = '';
  public municipio = '';
  public zona = '';
  public datosEdicionRuta : EditarDatosRuta;
  pageActualRuta: number = 1;
  numeroItemsRuta = 30;
//#endregion
  //#region Atributos - parametros ABM de tarifas
    public ListaSectorOrigen;
    public sectorOrigen = '';
    public datosTarifa : DatosTarifa
    public ListaSectorDestino;
    public sectorDestino = '';
    public ListaTarifa;
    public visualizacionMatrizz = 1;
    public visualizacionTarifa =0;
    public ListaTarifaRuta;
    public datosEdicionTarifa : EditarDatosTarifa;
    pageActualTarifas: number = 1;
    numeroItemsTarifas = 30;
    pageActualTarifass: number = 1;
    numeroItemsTarifass = 30;
    public editarTarifa = 0;
    public IdSectorOrigenTarifa = 0;
    public IdSectorDestinoTarifa = 0;
  //#endregion
 
  constructor(private _userServices:UserService,private _router:Router, private _pedidoServices:PedidoService) { 
    this.datosSectores = new DatosSector('');
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.datosEdicionSectores = new EditarDatosSector('',0);

    this.datosRuta = new DatosRuta(0,0,0,0)
    this.datosEdicionRuta = new EditarDatosRuta(0,0,0,0,0)

    this.datosTarifa = new DatosTarifa(0,0,0,0)
    this.datosEdicionTarifa = new EditarDatosTarifa(0,0,0,0,0);
  }

  ngOnInit(){
    this.ObtenerSector();
    this.getComboMunicipioEntrega();
    this.ObtenerRuta();
    this.ObtenerSectorOrigen();
    this.ObtenerSectorDestino();
    this.ObtenerRutaTarifas();
    this.ObtenerListaTarifa();
    this.usuario = this.identity.usuarioLogueado;

  }
  //#region Metodos - ABM ingreso de sectores
  ObtenerSector(){
    this._pedidoServices.ObtenerSector().subscribe(
      response=>{
        let params = response.request;
        this.ListaSectores = params;
      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  creacionSector(){
    if(this.datosSectores.Descripcion == ""){
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío',
        text: 'El nombre del sector se encuentra vacío',
      })
    }else{
      Swal.fire({
        title: 'Creación del sector',
        text: "¿Desea crear el sector?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear Sector',
        cancelButtonText: 'Cancelar'
      }).then((result) => { 
        if(result.isConfirmed){
          this._pedidoServices.AgregarDatosSector(this.datosSectores).subscribe(
            response =>{
              let mensaje = response.message;
              if(response.message == 'Se ha creado exitosamente el sector'){
                console.log(response.message);
                  this.status = 'Ok'
                  this.ObtenerSector()
                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso finalizado',
                    text: 'Se ha creado exitosamente el sector',
                  })
                  this.datosSectores.Descripcion = ''
                  
              } else {
                console.log(mensaje)
              }
            },
            error =>{
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
        }
        if(result.isDismissed){
          Swal.fire('La información no se ha podido crear', '', 'info')
        }
        
      })
    }
    
    
  }
  ObtenerDatosSector(params,params2){
    this.IdEdicionSector = 1
    this.datosEdicionSectores.Descripcion = params2;
    this.datosEdicionSectores.IdSector = params;
  }
  EdicionDatosSector(){
    Swal.fire({
      title: 'Edición  del sector',
      text: "¿Desea editar el sector?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => { 

      if(result.isConfirmed){
        this._pedidoServices.EditarrDatosSector(this.datosEdicionSectores).subscribe(
          response =>{
            let mensaje = response.message;
            if(response.message == 'Se ha editado exitosamente el sector'){
              console.log(response.message);
                this.status = 'Ok'
                this.ObtenerSector()
                Swal.fire({
                  icon: 'success',
                  title: 'Edición del sector',
                  text: 'Se ha editado exitosamente el sector',
                })
              this.IdEdicionSector = 0
              this.datosSectores.Descripcion = ""
            } else {
              console.log(mensaje)
            }
          },
          error =>{
            var errorMessage = <any>error;
            console.log(errorMessage)
            if (errorMessage != null) {
              Swal.fire(error.error.message)
              this.status = 'error'
            }
          }
        )
      }
      if(result.isDismissed){
        Swal.fire('La información no se ha podido crear', '', 'info')
      }
    })
    
  }
  //#endregion

  //#region Metodos - ABM ingreso de ruta
  ObtenerRuta(){
    this._pedidoServices.ObtenerRuta().subscribe(
      response=>{
        let params = response.request;
        this.ListaRutas = params;
      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdSector(params){
    this.datosRuta.IdSector = params.IdSector
    this.idSector = params.IdSector
  } 
  getComboMunicipioEntrega(){
    this._pedidoServices.comboMunicipio(1).subscribe(
      response=>{
        let params = response.request;
        this.comboMunicipioEntrega = params;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboZonaEntrega(params){
    this.idMunicipioEntrega = params.IdMunicipio;
    this.datosRuta.IdMunicipio = params.IdMunicipio;
    this._pedidoServices.comboZona(this.idMunicipioEntrega).subscribe(
      response=>{
        let params = response.request;
        this.comboZonaEntrega = params;
      },error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  getComboColoniaEntrega(params){
    this.datosRuta.IdZona = params.IdZona;
    this.idZona = params.IdZona;
  }
  crearRuta(){
    this.datosRuta.IdUsuarioRegistro = this.identity.IdUsuarioLog
    if(this.datosRuta.IdZona == 0){
      this.datosRuta.IdZona = null;
    }
    if(this.datosRuta.IdSector == 0){
      Swal.fire({
        icon: 'error',
        title: 'Campo no seleccionado',
        text: 'El sector no ha sido seleccionado',
      })
    }else if(this.datosRuta.IdMunicipio == 0){
      Swal.fire({
        icon: 'error',
        title: 'Campo no seleccionado',
        text: 'El municipio no ha sido seleccionado',
      })
    }else{
      Swal.fire({
        title: 'Cración de la ruta',
        text: "¿Desea crear la ruta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar'
      }).then((result) => { 

        if(result.isConfirmed){
          this._pedidoServices.AgregarDatosRuta(this.datosRuta).subscribe(
            response =>{
              let mensaje = response.message;
              if(response.message == 'Se ha creado exitosamente la ruta'){
                console.log(response.message);
                  this.status = 'Ok'
                  this.ObtenerRuta()
                  Swal.fire({
                    icon: 'success',
                    title: 'Edición del sector',
                    text: 'Se ha editado exitosamente el sector',
                  })
                this.datosRuta.IdSector = 0
                this.datosRuta.IdMunicipio = 0
                this.datosRuta.IdZona = 0
                this.sector = '';
                this.municipio = '';
                this.zona = '';
              } else {
                console.log(mensaje)
              }
            },
            error =>{
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
        }
        if(result.isDismissed){
          Swal.fire('La información no se ha podido crear', '', 'info')
        }
      })
    }
  }
  obtenerDatosRuta(params,params2,params3, params4,params5,params6, params7){
    this.sector = params;
    this.municipio = params2;
    this.zona = params3;
    this.IdEdicionRuta = 1;
    this.idSector = params4;
    this.idMunicipioEntrega = params5;
    this.idZona = params6;
    this.datosEdicionRuta.IdRuta = params7;
  } 
  EditarRuta(){
    this.datosEdicionRuta.IdSector = this.idSector;
    this.datosEdicionRuta.IdMunicipio = this.idMunicipioEntrega;
    this.datosEdicionRuta.IdZona = this.idZona;
    this.datosEdicionRuta.IdUsuarioRegistro = this.identity.IdUsuarioLog
    Swal.fire({
      title: 'Edición  del sector',
      text: "¿Desea editar la ruta del sector?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => { 

      if(result.isConfirmed){
        this._pedidoServices.EditarDatosRuta(this.datosEdicionRuta).subscribe(
          response =>{
            let mensaje = response.message;
            if(response.message == 'Se ha editado exitosamente la ruta'){
              console.log(response.message);
                this.status = 'Ok'
                this.ObtenerRuta()
                Swal.fire({
                  icon: 'success',
                  title: 'Edición de la ruta',
                  text: 'Se ha editado exitosamente la ruta',
                })
              this.IdEdicionRuta = 0
              this.sector = '';
              this.municipio = '';
              this.zona = '';
            } else {
              console.log(mensaje)
            }
          },
          error =>{
            var errorMessage = <any>error;
            console.log(errorMessage)
            if (errorMessage != null) {
              Swal.fire(error.error.message)
              this.status = 'error'
            }
          }
        )
      }
      if(result.isDismissed){
        Swal.fire('La información no se ha podido crear', '', 'info')
      }
    })
    
  }
  //#endregion

  //#region Metodos - ABM ingreso tarifa
  ObtenerSectorOrigen(){
    this._pedidoServices.ObtenerSector().subscribe(
      response=>{
        let params = response.request;
        this.ListaSectorOrigen = params;

      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdSectorOrigen(params){
    this.datosTarifa.IdSectorOrigen = params.IdSector;
    this.IdSectorOrigenTarifa = params.IdSector;
  } 
  ObtenerSectorDestino(){
    this._pedidoServices.ObtenerSector().subscribe(
      response=>{
        let params = response.request;
        this.ListaSectorDestino = params;

      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  IdSectorDestino(params){
    this.datosTarifa.IdSectorDestino = params.IdSector;
    this.IdSectorDestinoTarifa = params.IdSector;
  } 
  crearTarifaRuta(){
    this.datosTarifa.IdUsuarioRegistro = this.identity.IdUsuarioLog;
    if(this.datosTarifa.Monto == 0){
      Swal.fire({
        icon: 'error',
        title: 'Campo vacío',
        text: 'El monto no puede ser 0',
      })
    }else if(this.datosTarifa.IdSectorOrigen == 0){
      Swal.fire({
        icon: 'error',
        title: 'Campo no seleccionado',
        text: 'El sector de origen no ha sido seleccionado',
      })
    }else if(this.datosTarifa.IdSectorOrigen == 0){
      Swal.fire({
        icon: 'error',
        title: 'Campo no seleccionado',
        text: 'El sector de destino no ha sido seleccionado',
      })
    }else{
      Swal.fire({
        title: 'Creación de la tarifa',
        text: "¿Desea crear la tarifa para la ruta ingresada?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Asignar tarifa',
        cancelButtonText: 'Cancelar'
      }).then((result) => { 
        if(result.isConfirmed){
          this._pedidoServices.AgregarDatosTarifa(this.datosTarifa).subscribe(
            response =>{
              let mensaje = response.message;
              if(response.message == 'Se ha creado exitosamente la tarifa de la ruta'){
                console.log(response.message);
                  this.status = 'Ok'
                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso finalizado',
                    text: 'Se ha creado exitosamente la tarifa de la ruta',
                  })
                  this.datosTarifa.Monto = 0;
                  this.datosTarifa.IdSectorOrigen = 0;
                  this.datosTarifa.IdSectorDestino = 0;
                  this.sectorDestino = '';
                  this.sectorOrigen = '';
              } else {
                console.log(mensaje)
              }
            },
            error =>{
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
              }
            }
          )
        }
        if(result.isDismissed){
          Swal.fire('La información no se ha podido crear', '', 'info')
        }
        
      })
    }
    
  }
  visualizacionDatosMatriz(){
    this.visualizacionMatrizz = 1;
    this.visualizacionTarifa = 0;
  }
  visualizacionDatosTarifa(){
    this.visualizacionMatrizz = 0;
    this.visualizacionTarifa = 1;
  }
  ObtenerListaTarifa(){
    this._pedidoServices.ObtenerTarifaRuta().subscribe(
      response=>{
        let params = response.request;
        this.ListaTarifaRuta = params;

      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  parametrosObtenidosTarifa(params1,params2,params3,params4,params5,params6){
    this.sectorOrigen = params3;
    this.sectorDestino = params5;
    this.datosEdicionTarifa.IdRutaSector = params1
    this.IdSectorOrigenTarifa = params2
    this.IdSectorDestinoTarifa = params4
    this.datosEdicionTarifa.Monto = params6
    this.editarTarifa = 1;
    console.log(params1,params2,params3,params4,params5,params6);
    
  }
  editarDatosTarifa(){
    this.datosEdicionTarifa.IdSectorDestino = this.IdSectorDestinoTarifa;
    this.datosEdicionTarifa.IdSectorOrigen = this.IdSectorOrigenTarifa;
    this.datosEdicionTarifa.IdUsuarioRegistro = this.identity.IdUsuarioLog
    console.log(this.datosEdicionTarifa);
    
    Swal.fire({
      title: 'Edición  de la tarifa',
      text: "¿Desea editar la tarifa de la ruta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => { 

      if(result.isConfirmed){
        this._pedidoServices.EditarDatosTarifa(this.datosEdicionTarifa).subscribe(
          response =>{
            let mensaje = response.message;
            if(response.message == 'Se ha editado exitosamente la tarifa de la ruta'){
              console.log(response.message);
                this.status = 'Ok'
                this.ObtenerRutaTarifas()
                this.ObtenerListaTarifa()
                Swal.fire({
                  icon: 'success',
                  title: 'Edición de la ruta',
                  text: 'Se ha editado exitosamente la tarifa de la ruta',
                })
              this.IdSectorDestinoTarifa = 0
              this.IdSectorOrigenTarifa = 0;
              this.sectorOrigen = '';
              this.sectorDestino = '';
              this.editarTarifa = 0;
              this.datosEdicionTarifa.Monto = 0;
            } else {
              console.log(mensaje)
            }
          },
          error =>{
            var errorMessage = <any>error;
            console.log(errorMessage)
            if (errorMessage != null) {
              Swal.fire(error.error.message)
              this.status = 'error'
            }
          }
        )
      }
      if(result.isDismissed){
        Swal.fire('La información no se ha podido crear', '', 'info')
      }
    })
  }
  ObtenerRutaTarifas(){
    this._pedidoServices.ObtenerRutaTarifa().subscribe(
      response=>{
        let params = response.request;
        this.ListaTarifa = params;
      },error=>{
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }
  //#endregion

  //#region Metodos - visualizacion de datos del usuario logueado
  visualizarIngresoSocio(){
    if(this.identity.IdSocio != 0){
      this.rolSocio = 1
    }else{
      this.rolSocio = 0
    }
  }
  //#endregion
}
