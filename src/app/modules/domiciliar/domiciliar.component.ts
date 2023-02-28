import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import { DatosDomiciliar } from 'src/app/models/Domiciliar/DatosDomiciliar.model';
import { EditarDatosDomiciliar } from 'src/app/models/Domiciliar/EditarDatosDomiciliar.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domiciliar',
  templateUrl: './domiciliar.component.html',
  styleUrls: ['./domiciliar.component.scss'],
  providers: [UserService, PedidoService]
})
export class DomiciliarComponent implements OnInit {
  //#region Atributos - parametros para los datos del usuario logueado
  public token;
  public identity;
  public status;
  public usuario;
  public loading: boolean;
  public rolSocio = 0;
  //#endregion
  //#region Atributos - parametros para la creacion de los domiciliares
  public domiciliar = 0;
  public DatosDomiciliar: DatosDomiciliar;
  public EditarDatosDomiciliar: EditarDatosDomiciliar;
  public ObtenerListadoDomiciliar;
  public ObtenerDomiciliarSeleccionado;
  public IdDomiciliar = 0;
  pageActual: number = 1;
  numeroItems = 7;
  //#endregion

  constructor(private _userServices: UserService, private _router: Router, private _pedidoServices: PedidoService) {
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.DatosDomiciliar = new DatosDomiciliar('', '', 0);
    this.EditarDatosDomiciliar = new EditarDatosDomiciliar(0, '', '', 0);
  }

  ngOnInit() {
    this.usuario = this.identity.usuarioLogueado;
    this.obtenerListadoDomiciliar();
  }

  //#region Metodos - limpieza de objetos
  public limpiarFomularioDomiciliar() {
    this.DatosDomiciliar = new DatosDomiciliar('', '', 0);
  }
  //#endregion

  //#region ABM domicialiar
  domiciliarNuevo() {
    this.domiciliar = 1
  }

  cerrarDomiciliarNuevo() {
    this.domiciliar = 0
  }

  crearDomiciliar() {
    this.DatosDomiciliar.IdUsuario = this.identity.IdUsuarioLog;
    if (this.DatosDomiciliar.Nombres == '') {
      Swal.fire(
        'Creacion de domiciliar',
        'Debe de ingresar un nombre del domiciliar para crearlo',
        'info'
      )
    } else if (this.DatosDomiciliar.Apellidos == '') {
      Swal.fire(
        'Creacion de domiciliar',
        'Debe de ingresar un apellido del domiciliar para crearlo',
        'info'
      )
    } else {
      Swal.fire({
        title: 'Creación de domiciliar',
        text: "¿Esta seguro de crear el domiciliar nuevo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this._pedidoServices.CrearDatosDomiciliar(this.DatosDomiciliar).subscribe(
            response => {
              let mensaje = response.message;
              if (response.message == 'Se ha creado exitosamente el domiciliar') {
                console.log(response.message);
                this.obtenerListadoDomiciliar();
                this.status = 'Ok'
                Swal.fire(
                  'Creacion de domiciliar',
                  mensaje,
                  'success'
                )
                this.limpiarFomularioDomiciliar()
                this.domiciliar = 0
              } else {
                console.log(response)
                this.limpiarFomularioDomiciliar()
              }
            },
            error => {
              var errorMessage = <any>error;
              console.log(errorMessage)
              if (errorMessage != null) {
                Swal.fire(error.error.message)
                this.status = 'error'
                this.limpiarFomularioDomiciliar()
              }
            }
          )
        }
      })
    }

  }

  obtenerListadoDomiciliar() {
    this._pedidoServices.ObtenerListadoDomiciliar().subscribe(
      response => {
        let params = response.request;
        this.ObtenerListadoDomiciliar = params;
      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  obtenerDomiciliarSeleccionado(id) {
    this._pedidoServices.ObtenerDomiciliarSeleccionado(id).subscribe(
      response => {
        let params = response.request;
        this.ObtenerDomiciliarSeleccionado = params[0];
        this.EditarDatosDomiciliar.Nombres = this.ObtenerDomiciliarSeleccionado.Nombres;
        this.EditarDatosDomiciliar.Apellidos = this.ObtenerDomiciliarSeleccionado.Apellidos;
        this.IdDomiciliar = id;
      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )

  }

  EditarDatosDomiciliares() {
    this.EditarDatosDomiciliar.IdUsuario = this.identity.IdUsuarioLog;
    this.EditarDatosDomiciliar.IdDomiciliar = this.IdDomiciliar
    Swal.fire({
      title: 'Edicion de domiciliar',
      text: "¿Esta seguro de editar los datos del domiciliar seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._pedidoServices.EditarDatosDomiciliar(this.EditarDatosDomiciliar).subscribe(
          response => {
            let mensaje = response.message;
            if (response.message == 'Se ha editado exitosamente el domiciliar') {
              console.log(response.message);
              this.obtenerListadoDomiciliar();
              Swal.fire(
                'Actualizacion de datos del domiciliar',
                mensaje,
                'success'
              )
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
    })
  }

  ElminarDomiciliarSeleccionado(id) {
    let paramatro = {
      IdDomiciliar:id,
      IdUsuarioModificacion:this.identity.IdUsuarioLog
    }
      
    // console.log(paramatro);
    
    this._pedidoServices.DeBajaDomiciliar(paramatro).subscribe(
      response => {
        let params = response.message;
        console.log(params);
        Swal.fire(
          'Eliminación de domiciliar',
          params,
          'success'
        )
        this.obtenerListadoDomiciliar();
      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )

  }
  //#endregion


  //#region visualizacion de datos del usuario logueado
  visualizarIngresoSocio() {
    if (this.identity.IdSocio != 0) {
      this.rolSocio = 1
    } else {
      this.rolSocio = 0
    }
  }
  //#endregion
}
