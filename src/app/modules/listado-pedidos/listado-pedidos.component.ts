import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { DatosEstado } from 'src/app/models/Estado/DatosEstado.model';
import { AccesoApiTigo } from 'src/app/models/MensajesTigo/AccesoApiTigo.model';
import { fichaPedido } from 'src/app/models/FichaPedido/FichaPedido.model';
import { DetallePagoPedido } from 'src/app/models/FormaPago/DetallePagoPedido.model';
import * as html2pdf from 'html2pdf.js'
import { DatosDireccionSocioPedido } from 'src/app/models/Socio/DatosDireccionSocioPedido.model';
import { comboDepartamento } from 'src/app/models/DatosDemograficos/ComboDepartamento.model';
import { comboMunicipio } from 'src/app/models/DatosDemograficos/ComboMunicipio.model';
import { comboZona } from 'src/app/models/DatosDemograficos/ComboZona.model';
import { comboColonia } from 'src/app/models/DatosDemograficos/ComboColonia.model';
import { comboBoxDireccion } from 'src/app/models/DatosDemograficos/ComboBoxDireccion.model';
import { DatosDireccionEntregaPedido } from 'src/app/models/Cliente/DatosDireccionEntregaPedido.Model';
import * as moment from 'moment'
import { DatosPedido } from 'src/app/models/Pedido/DatosPedido.model';
import { DatosPedidoEditar } from 'src/app/models/Pedido/DatosPedidoEditar.model';
import { comboSocio } from 'src/app/models/Socio/ComboSocio.model';
import { AsignacionDomiciliar } from 'src/app/models/Domiciliar/AsignacionDomiciliar.model';
import { CreacionMisionOptacheck } from 'src/app/models/Optacheck/CreacionMision.model';
import { ExportarService } from 'src/app/services/exportar.service';
import { EditarDetallePagoPedido } from 'src/app/models/Pedido/EditarDetallePago.model';
import { DatosMontoPedido } from 'src/app/models/Pedido/DatosMontoPedido.model';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
  providers: [UserService, PedidoService, ExportarService],
})
export class ListadoPedidosComponent implements OnInit {
  //#region atributos - obtener del token y los datos del usuario
  public token;
  public identity;
  public status;
  public loading: boolean;
  //#endregion
  //#region atributos - filtrado de informacion de los pedidos
  //Atributos para visualizacion de los filtros en el submenu
  public isCollapse = true;
  public isDropdown = true;
  public isDropdownSubMenu = true;
  public isDropdownSubMenuFechaPedido = true;
  public isDropdownSubMenuEstadoPedido = true;
  public isDropdownSubMenuDomiciliarPedido = true;
  public isDropdownSubMenuSocioPedido = true;
  //Visualizacion de numeros de elementos de pedidos
  public opcionSeleccionado = 0;
  public rolSocio = 0;
  public IdPedidoBuscado = null;
  public obtenerPedidoBuscado;
  public filtroFecha = 0;
  public buscadorFecha;
  public obtenerListadoPedidoFecha;
  public fechaFin;
  public filtroRangoFecha;
  public filtroEstado;

  data = [
    {
      number: 8,
    },
    {
      number: 10,
    },
    {
      number: 18,
    },
    {
      number: 25,
    },
    {
      number: 45,
    },
    {
      number: 50,
    },
  ];
  //Datos de id para buscar el pedido en la base de datos

  //#endregion
  //#region atributos - visualizacion de listado de pedidos
  pageActual: number = 1;
  numeroItems = 30;
  public obtenerListadoPedidos;
  //#endregion
  //#region atributos - Historial de pedido
  public HistorialEstado;
  public idPedidoEstado = 0;
  public keyword = 'Descripcion';
  public listadoEstado;
  public idEstado = 0;
  public DatosEstado: DatosEstado;
  public IdFiltroDomiciliarRecepcionR = 0;
  public filtroDomiciliar;
  public IdFiltroDomiciliarEntregaR = 0;
  public IdSocio = 0;
  public filtroSocio;
  public keyword10 = 'Socio';
  //#endregion
  //#region atributos - Mensajeria tigo
  public DatosMensajeriaTigo: AccesoApiTigo;
  public ListadoInformacionTigo;
  public InformacionSocioMensajerias;
  public InformacionSocioCorreo;
  //#endregion
  //#region atributos - Descargar PDF
  public obtenerFichaPDF: fichaPedido;
  public SolicitudCobroPedido;
  public DetallePagoPedido;
  //#endregion
  //#region atributos - Edicion de pedidos seleccionados
  public DatosDireccionRecepcionPedido: DatosDireccionSocioPedido;
  public comboDepartament: comboDepartamento;
  public comboMunicipio: comboMunicipio;
  public comboZona: comboZona;
  public comboColonia: comboColonia;

  public comboDepartamentEntrega: comboDepartamento;
  public comboMunicipioEntrega: comboMunicipio;
  public comboZonaEntrega;
  public comboColoniaEntrega;

  public idDepartamentoEntrega = 0;
  public idMunicipioEntrega = 0;
  public idZonaEntrega = 0;
  public idColoniaEntrega = 0;

  public DatosDireccionEntrega: DatosDireccionEntregaPedido;
  public date;
  public fechaCambio = null;
  public datosPedido: DatosPedido;
  public DatosPedido: DatosPedidoEditar;
  public IdTipoPedido = 0;
  public IdFormaPago2 = 0;
  public IdFormaPago = 0;
  public MontoCobro;
  public MontoCobro2 = '';
  public habilitarMontoCobro = 0;
  public IdPedido;
  public idConceptoPago = 0;
  public montoCobroDetalle;
  public DatosDetallePedido: DetallePagoPedido;
  public DatosMontoPedido: DatosMontoPedido;

  public visualizarComboColoniaRecepcion = 0;
  public visualizarComboZonaRecepcion = 0;
  public hideDepartamentoEntrega;
  public hideMunicipioEntrega;
  public hideZonaEntrega;
  public hideColoniaEntrega = null;
  public idColoniaEdicion;
  public idColoniaEdicionEntrega;
  public hideDepartamentoRecepcion;

  public visualizarComboZonaEntrega = 0;
  public visualizarComboColoniaEntrega = 0;
  public obtenertTipoPedido;
  public keyword2 = 'Descripcion';
  //#endregion
  //#region Atributos - para borrar y limpiar los comoBox de direcciones
  @ViewChild('autoDepartamento') autoDepartamento;
  @ViewChild('autoMunicipio') autoMunicipio;
  @ViewChild('autoZona') autoZona;
  @ViewChild('autoColonia') autoColonia;
  @ViewChild('closeBUtton') closebutton;
  //#endregion
  //#region Atributos - Combos de seleccion
  public obtenertTipoFormaPago;
  public obtenertTipoFormaPago2;
  public ListaDomiciliar;
  public ListaDomiciliar2;
  public ListaDomiciliar3;
  public ListaDomiciliar4;
  public conceptoPago;
  //#endregion
  //#region Atributos - Domiciliar
  public asignacionDomiciliarDatos: AsignacionDomiciliar;
  public EditarDatosDomiciliar: AsignacionDomiciliar;
  public IdPedidoDomiciliar = 0;
  public obtenerDomiciliarSeleccionado;
  public DomiciliarRecepcion = '';
  public DomiciliarEntrega = '';
  public NombreDomiciliarEntrega = null;
  public IdDomiciliarRecepcion = 0;
  public IdDomiciliarEntrega = 0;
  public botonAsignar = 0;
  public keyword18 = 'Domiciliar';
  public keyword19 = 'Domiciliar';
  public keyword20 = 'Domiciliar';
  public keyword21 = 'Domiciliar';
  public CorreoDomiciliarEntrega = null;
  public CorreoDomiciliarRecepcion = null;
  public PasswordDomiciliarEntrega = null;
  public PasswordDomiciliarRecepcion = null;
  public creacionMisionesOptacheck: CreacionMisionOptacheck;
  public IdMisionRecepcion = null;
  public IdMisionEntrega = null;
  //#endregion
  //#region Atributos - Editar pedidos
  public EditarDetallePago: EditarDetallePagoPedido;
  public IdDetalleImportePago;
  public ConceptoPagoEdicion;
  public FormaPagoEdicion;
  public opcionPedidos = 1;
  public IdPedidoActualizado = 0;
  //#endregion
  //#region Atributos - Editar direccion del socio
  public comboSocio: comboSocio;
  public IdSocioEdicion;
  public obtenerDireccionesSocio;
  public keyword210 = 'Direccion';
  public NombreSocio;
  public IdDireccionRecepcion;
  //#endregion

  constructor(
    private _pedidoServices: PedidoService,
    private _userServices: UserService,
    private _exportExcelServices: ExportarService
  ) {
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.DatosEstado = new DatosEstado(0, 0, '');
    this.DatosMensajeriaTigo = new AccesoApiTigo('', '');
    this.obtenerFichaPDF = new fichaPedido('','','','','','','','','','','','','','','','',0,'',0,'','','','','','','',0,0,'','','',0,'','',0,0,0,0,0,0,0,0,0,0,'','',0);
    this.DatosDireccionRecepcionPedido = new DatosDireccionSocioPedido(
      0,
      '',
      0,
      '',
      0,
      0,
      0,
      0,
      '',
      0
    );
    this.DatosDireccionEntrega = new DatosDireccionEntregaPedido(
      0,
      0,
      '',
      '',
      '',
      0,
      0,
      0,
      0,
      ''
    );
    this.DatosPedido = new DatosPedidoEditar(
      0,
      0,
      0,
      0,
      '',
      0,
      0,
      '',
      '',
      0,
      0,
      0
    );
    this.asignacionDomiciliarDatos = new AsignacionDomiciliar(0, 0, 0, 0,0);
    this.EditarDatosDomiciliar = new AsignacionDomiciliar(0, 0, 0, 0,0);
    this.EditarDetallePago = new EditarDetallePagoPedido(0, '', 0, 0, 0);
    this.DatosDetallePedido = new DetallePagoPedido(0, 0, 0, 0, 0, 0);
    this.DatosMontoPedido = new DatosMontoPedido(0, 0);
    this.creacionMisionesOptacheck = new CreacionMisionOptacheck(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit() {
    this.visualizarIngresoSocio();
    this.listadoEstadoPedido();
    this.getComboDepartamentoEntrega();
    this.TipoPedido();
    this.obtenerFormaPago();
    this.obtenerDomiciliar();
    this.obtenerDomiciliar2();
    this.obtenerDomiciliar3();
    this.obtenerDomiciliar4();
    this.obtenerSocio();
    this.ComboConceptoPago();
    this.obtenerFormaPago2();
  }

  //#region Metodos - visualizar el menu y submenu
  Collapse(): void {
    let foo = this.isCollapse;
    this.isCollapse = foo === false ? true : false;
  }

  DropDown(): void {
    let foo = this.isDropdown;
    this.isDropdown = foo === false ? true : false;
    // this.isDropdownSubMenu = true;
    this.isDropdownSubMenuFechaPedido = true;
  }

  DropDownSubMenu(): void {
    let foo = this.isDropdownSubMenu;
    this.isDropdownSubMenu = foo === false ? true : false;
  }

  DropdownSubMenuFechaPedido(): void {
    let foo = this.isDropdownSubMenuFechaPedido;
    this.isDropdownSubMenuFechaPedido = foo === false ? true : false;
    this.isDropdownSubMenuEstadoPedido = true;
    this.isDropdownSubMenuDomiciliarPedido = true;
    this.isDropdownSubMenuSocioPedido = true;
  }

  DropdownSubMenuEstadoPedido(): void {
    let foo = this.isDropdownSubMenuEstadoPedido;
    this.isDropdownSubMenuEstadoPedido = foo === false ? true : false;
    this.isDropdownSubMenuFechaPedido = true;
    this.isDropdownSubMenuDomiciliarPedido = true;
    this.isDropdownSubMenuSocioPedido = true;
  }

  DropdownSubMenuDomiciliarPedido(): void {
    let foo = this.isDropdownSubMenuDomiciliarPedido;
    this.isDropdownSubMenuDomiciliarPedido = foo === false ? true : false;
    this.isDropdownSubMenuFechaPedido = true;
    this.isDropdownSubMenuEstadoPedido = true;
    this.isDropdownSubMenuSocioPedido = true;
  }

  DropdownSubMenuSocioPedido(): void {
    let foo = this.isDropdownSubMenuSocioPedido;
    this.isDropdownSubMenuSocioPedido = foo === false ? true : false;
    this.isDropdownSubMenuFechaPedido = true;
    this.isDropdownSubMenuEstadoPedido = true;
    this.isDropdownSubMenuDomiciliarPedido = true;
  }
  //#endregion

  //#region Metodos - filtrar los datos del pedido
  obtenerNumeroPaginacion() {
    this.numeroItems = this.opcionSeleccionado;
  }
  limpiarFiltro() {
    this.filtroFecha = 0;
    this.numeroItems = 30;
    this.buscadorFecha = null;
    this.IdPedidoBuscado = null;
    this.fechaFin = null;
    this.obtenerPedidoBuscado = null;
    this.isDropdown = true;
    this.isDropdownSubMenu = true;
    this.isDropdownSubMenuFechaPedido = true;
    this.isDropdownSubMenuEstadoPedido = true;
    this.isDropdownSubMenuDomiciliarPedido = true;
    this.IdSocio = 0;
    this.isDropdownSubMenuDomiciliarPedido = true;
  }
  obtenerIdPedido() {
    let params2 = this.rolSocio + '/' + this.IdPedidoBuscado;
    this.filtroFecha = 6;
    this._pedidoServices.busquedaPedidos(params2).subscribe(
      (response) => {
        let params = response.request;
        // console.log(params);

        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El pedido que esta buscando, no se encuentra creado en la base de datos',
          });
          this.IdPedidoBuscado = null;
        } else {
          this.obtenerPedidoBuscado = params;
          this.IdPedidoBuscado = null;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  visualizarIngresoSocio() {
    if (this.identity.IdSocio != 0) {
      this.rolSocio = 1;

      this.obtenerTipoPedido(this.identity.IdSocio);
    } else {
      this.rolSocio = 0;
      this.obtenerTipoPedido(this.identity.IdSocio);
    }
  }
  obtenerFecha(params) {
    this.buscadorFecha = params.target.value;
    let newDate = new Date(this.buscadorFecha);
    let parametro = this.buscadorFecha + '/' + this.identity.IdSocio;

    this._pedidoServices.FiltroFechaPedido(parametro).subscribe(
      (response) => {
        let params = response.request;
        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen pedidos para la fecha seleccionado.',
          });
        } else {
          this.obtenerListadoPedidoFecha = params;
          this.filtroFecha = 1;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerFechaFin(params) {
    if (this.buscadorFecha == null) {
      Swal.fire(
        'Rango de fecha',
        'Debe de ingresar la fecha de inicio',
        'info'
      );
    } else {
      this.fechaFin = params.target.value;

      let parametro =
        this.buscadorFecha + '/' + this.fechaFin + '/' + this.identity.IdSocio;
      console.log(parametro);

      this._pedidoServices.filtroRangoFecha(parametro).subscribe(
        (response) => {
          let params = response.request;
          if (params.length == 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No existen pedidos para el rango de fecha seleccionado.',
            });
            this.buscadorFecha = '';
            this.fechaFin = '';
          } else {
            this.filtroRangoFecha = params;
            this.filtroFecha = 2;
          }
        },
        (error) => {
          var erroMessage = <any>error;
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      );
    }
  }
  obtenerFiltroEstado(params) {
    let filtroIdEstado = params.IdEstadoPedido;
    let parametro = filtroIdEstado + '/' + this.identity.IdSocio;

    this._pedidoServices.filtroEstado(parametro).subscribe(
      (response) => {
        let params = response.request;

        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen pedidos para el estado seleccionado',
          });
          filtroIdEstado = 0;
        } else {
          this.filtroEstado = params;
          this.filtroFecha = 3;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliarFiltroRecepcionR(params) {
    this.IdFiltroDomiciliarRecepcionR = params.IdDomiciliar;
    let parameter = this.IdFiltroDomiciliarRecepcionR + '/' + 0 + '/' + 0;
    this._pedidoServices.filtroDomiciliar(parameter).subscribe(
      (response) => {
        let params = response.request;

        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen pedidos para el domiciliar seleccionado',
          });
        } else {
          this.filtroDomiciliar = params;
          this.filtroFecha = 4;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliarFiltroEntregaR(params) {
    this.IdFiltroDomiciliarEntregaR = params.IdDomiciliar;
    let parameter =
      this.IdFiltroDomiciliarRecepcionR +
      '/' +
      this.IdFiltroDomiciliarEntregaR +
      '/' +
      1;
    this._pedidoServices.filtroDomiciliar(parameter).subscribe(
      (response) => {
        let params = response.request;
        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen pedidos para el domiciliar seleccionado',
          });
        } else {
          this.filtroDomiciliar = params;
          this.filtroFecha = 4;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  getIdCliente(params) {
    this.IdSocio = params.IdSocio;
    this.obtenerSocioSeleccionado(this.IdSocio);
  }
  obtenerSocioSeleccionado(params) {
    this._pedidoServices.filtroSocio(params).subscribe(
      (response) => {
        let params = response.request;

        if (params.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existen pedidos para el socio seleccionado',
          });
        } else {
          this.filtroSocio = params;
          this.filtroFecha = 5;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //#endregion

  //#region Metodos - visualizacion del listado de pedidos
  obtenerTipoPedido(IdSocio) {
    this._pedidoServices.ListadoPedidos(IdSocio).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerListadoPedidos = params;
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  historiaPedidos(id) {
    this.InformacionSocioMensajeriaEstadoFinalizado(id);

    this._pedidoServices.obtenerHistorialEstado(id).subscribe(
      (response) => {
        let params = response.request;
        this.HistorialEstado = params;
        this.idPedidoEstado = id;
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  listadoEstadoPedido() {
    this._pedidoServices.listarEstadoss().subscribe(
      (response) => {
        let params = response.request;
        this.listadoEstado = params;
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getIdEstado(params) {
    this.idEstado = params.IdEstadoPedido;
  }

  crearDatosEstado() {
    this.DatosEstado.IdEstado = this.idEstado;
    this.DatosEstado.IdPedido = this.idPedidoEstado;

    if (this.idEstado == 0) {
      Swal.fire('Debe de seleccionar el tipo de estado');
    } else {
      Swal.fire({
        title: 'Cambiar el estado del pedido',
        text: '¿Esta seguro de cambiar el estado del pedido?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cambiar estado',
      }).then((result) => {
        if (result.value == true) {
          if (this.DatosEstado.IdEstado == 6) {
            this._pedidoServices
              .accesoApiTigo(this.DatosMensajeriaTigo)
              .subscribe(
                (response) => {
                  let mensaje = response.request.error_code;
                  this.status = 'Ok';
                  this.DatosMensajeriaTigo.Telefono = null;
                  if (mensaje == 202) {
                    this._pedidoServices.CambioEstado(this.DatosEstado).subscribe(
                        (response) => {
                          let mensaje = response.message;
                          if (mensaje == 'Se cambio el estado exitosamente') {
                            console.log(response.message);
                            this.historiaPedidos(this.idPedidoEstado);
                            this.status = 'Ok';
                            this.limpiarFormularioEstado();
                            this.obtenerTipoPedido(this.identity.IdSocio);
                            this.InformacionSocioCorreoEstadoFinalizado(
                              this.idPedidoEstado
                            );
                            Swal.fire({
                              icon: 'success',
                              title: 'Proceso finalizado',
                              text: 'Se ha contactado exitosamente al socio',
                            });
                          } else {
                            console.log(response);
                            this.limpiarFormularioEstado();
                          }
                        },
                        (error) => {
                          var errorMessage = <any>error;
                          console.log(errorMessage);
                          if (errorMessage != null) {
                            Swal.fire(error.error.message);
                            this.status = 'error';
                            this.limpiarFormularioEstado();
                          }
                        }
                      );
                  } else {
                    Swal.fire({
                      title: 'Finalizar el pedido',
                      text:
                        'El mensaje de texto no se ha podido enviar al socio ya que el número telefónico no existe o no cumple con ' +
                        'los parámetros en específico. ¿Desea finalizar el pedido?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Finalizar el pedido',
                      cancelButtonText: 'Cancelar',
                    }).then((result) => {
                      this._pedidoServices
                        .CambioEstado(this.DatosEstado)
                        .subscribe(
                          (response) => {
                            let mensaje = response.message;
                            if (
                              response.message ==
                              'Se cambio el estado exitosamente'
                            ) {
                              console.log(response.message);
                              this.historiaPedidos(this.idPedidoEstado);
                              this.status = 'Ok';
                              this.limpiarFormularioEstado();
                              this.obtenerTipoPedido(this.identity.IdSocio);
                              Swal.fire({
                                icon: 'success',
                                title: 'Proceso finalizado',
                                text: 'Se ha finalizado exitosamente el pedido',
                              });
                            } else {
                              console.log(response);
                              this.limpiarFormularioEstado();
                            }
                          },
                          (error) => {
                            var errorMessage = <any>error;
                            console.log(errorMessage);
                            if (errorMessage != null) {
                              Swal.fire(error.error.message);
                              this.status = 'error';
                              this.limpiarFormularioEstado();
                            }
                          }
                        );
                    });
                  }
                },
                (error) => {
                  var errorMessage = <any>error;
                  console.log(errorMessage);
                  if (errorMessage != null) {
                    Swal.fire(error.error.message);
                    this.status = 'error';
                    this.limpiarFormularioEstado();
                  }
                }
              );
          } else {
            this._pedidoServices.CambioEstado(this.DatosEstado).subscribe(
              (response) => {
                let mensaje = response.message;
                if (response.message == 'Se cambio el estado exitosamente') {
                  console.log(response.message);
                  this.historiaPedidos(this.idPedidoEstado);
                  this.status = 'Ok';
                  this.limpiarFormularioEstado();
                  this.obtenerTipoPedido(this.identity.IdSocio);
                } else {
                  console.log(response);
                  this.limpiarFormularioEstado();
                }
              },
              (error) => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                  Swal.fire(error.error.message);
                  this.status = 'error';
                  this.limpiarFormularioEstado();
                }
              }
            );
          }
        }
      });
    }
  }

  public limpiarFormularioEstado() {
    this.DatosEstado = new DatosEstado(0, 0, '');
  }

  InformacionSocioMensajeriaEstadoFinalizado(IdPedido) {
    this._pedidoServices.InformacionSocioMensajeria(IdPedido).subscribe(
      (response) => {
        let params = response.request;
        this.InformacionSocioMensajerias = params[0];
        if (this.InformacionSocioMensajerias.Telefono.length < 8) {
          Swal.fire('No cumple con el formato del numero');
        } else {
          this._pedidoServices.InformacionTigo().subscribe(
            (response) => {
              let params = response.request;
              this.ListadoInformacionTigo = params[0];
              console.log(this.InformacionSocioMensajerias.Telefono.toString());

              this.DatosMensajeriaTigo.Telefono =
                this.InformacionSocioMensajerias.Telefono;
              this.DatosMensajeriaTigo.Text =
                'SERBACO: Te informamos que el pedido ' +
                this.InformacionSocioMensajerias.IdPedido +
                ' ya fue entregado a: ' +
                this.InformacionSocioMensajerias.Cliente;
            },
            (error) => {
              var erroMessage = <any>error;
              if (erroMessage != null) {
                this.status = 'error';
              }
            }
          );
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  InformacionSocioMensajeriaEstadoEnRuta(IdPedido) {
    this._pedidoServices.InformacionSocioMensajeria(IdPedido).subscribe(
      (response) => {
        let params = response.request;
        this.InformacionSocioMensajerias = params[0];
        if (this.InformacionSocioMensajerias.Telefono.length < 8) {
          Swal.fire('No cumple con el formato del numero');
        } else {
          this._pedidoServices.InformacionTigo().subscribe(
            (response) => {
              let params = response.request;
              this.ListadoInformacionTigo = params[0];
              this.DatosMensajeriaTigo.Telefono =
                this.InformacionSocioMensajerias.Telefono;
              this.DatosMensajeriaTigo.Text =
                'SERBACO: Te informamos que el pedido ' +
                this.InformacionSocioMensajerias.IdPedido +
                ' se encuentra en ruta y será entregado por el domiciliar: ' +
                this.NombreDomiciliarEntrega +
                ' al cliente: ' +
                this.InformacionSocioMensajerias.Cliente;
            },
            (error) => {
              var erroMessage = <any>error;
              if (erroMessage != null) {
                this.status = 'error';
              }
            }
          );
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  InformacionSocioMensajeriaCambioFecha(IdPedido) {
    this._pedidoServices.InformacionSocioMensajeria(IdPedido).subscribe(
      (response) => {
        let params = response.request;
        this.InformacionSocioMensajerias = params[0];
        if (this.InformacionSocioMensajerias.Telefono.length < 8) {
          Swal.fire('No cumple con el formato del numero');
        } else {
          this._pedidoServices.InformacionTigo().subscribe(
            (response) => {
              let params = response.request;
              this.ListadoInformacionTigo = params[0];
              this.DatosMensajeriaTigo.Telefono =
                this.InformacionSocioMensajerias.Telefono;
              this.DatosMensajeriaTigo.Text =
                'SERBACO: Te informamos que el pedido ' +
                this.InformacionSocioMensajerias.IdPedido +
                ' para el cliente: ' +
                this.InformacionSocioMensajerias.Cliente +
                ',se cambio la fecha de entrega para el día ' +
                this.fechaCambio;
            },
            (error) => {
              var erroMessage = <any>error;
              if (erroMessage != null) {
                this.status = 'error';
              }
            }
          );
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  InformacionSocioCorreoEstadoFinalizado(IdPedido) {
    this._pedidoServices.EnvioCorreo(IdPedido).subscribe(
      (response) => {
        let params = response.message;
        this.InformacionSocioCorreo = params;
        console.log(this.InformacionSocioCorreo);

        if (this.InformacionSocioCorreo == 'Message sent') {
          console.log(this.InformacionSocioCorreo);
        }
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //#endregion

  //#region Metodos - Descargar PDF
  dowlandPDF(id) {
    this._pedidoServices.FichaPDF(id).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerFichaPDF = params[0];
        console.log(this.obtenerFichaPDF );

        if (this.obtenerFichaPDF.SolicitudCobro2 == 1) {
          this.SolicitudCobroPedido = 1;
          this.ObtenerDetallePedido(id);

          let parameter =
            'SERBACO' +
            ' ' +
            this.obtenerFichaPDF.FechaCreacion +
            '/' +
            this.obtenerFichaPDF.IdPedido;
          const options = {
            margin: 1.5,
            fileName: 'Serbaco.pdf',
            image: { type: 'jpeg' },
            html2canvas: {},
            jsDPF: { orientation: 'portrait', unit: 'in', format: '4*4' },
          };

          const element: Element = document.getElementById('pruebaPd');
          html2pdf().from(element).set(options).save(parameter);
        } else {
          this.SolicitudCobroPedido = 0;
          let parameter ='SERBACO' +' ' +this.obtenerFichaPDF.FechaCreacion +'/' +this.obtenerFichaPDF.IdPedido;
          const options = {
            margin: 1.5,
            fileName: 'Serbaco.pdf',
            // image: { type: 'pdf' },
            html2canvas: {},
            jsDPF: { orientation: 'horizontal', unit: 'in', format: 'B4' },
          };

          const element: Element = document.getElementById('pruebaPd');
          html2pdf().from(element).set(options).save(parameter);
        }
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  ObtenerDetallePedido(params) {
    this._pedidoServices.ObtenerDetallePedido(params).subscribe(
      (response) => {
        let params = response.request;
        this.DetallePagoPedido = params;

        //   let parameter =
        //     'SERBACO' +
        //     ' ' +
        //     this.obtenerFichaPDF.FechaCreacion +
        //     '/' +
        //     this.obtenerFichaPDF.IdPedido;
        //   const options = {
        //     margin: 1.5,
        //     fileName: 'Serbaco.pdf',
        //     image: { type: 'jpeg' },
        //     html2canvas: {},
        //     jsDPF: { orientation: 'portrait', unit: 'in', format: 'letter' },
        //   };

        //   const element: Element = document.getElementById('pruebaPd');
        //   html2pdf().from(element).set(options).save(parameter);
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //#endregion

  //#region Metodos - Actualizar datos del pedido
  ActualizacionDatosPedido() {
    Swal.fire({
      title: 'Editar datos del pedido',
      text: '¿Esta seguro de editar los datos del pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value == true) {
        this.DatosDireccionEntrega.IdDireccionEntrega =
          this.obtenerFichaPDF.IdDireccionEntrega;
        this.DatosDireccionEntrega.DireccionEntrega =
          this.obtenerFichaPDF.DireccionEntrega;
        this.DatosDireccionEntrega.ReferenciaDireccionEntrega =
          this.obtenerFichaPDF.ReferenciaEntrega;
        this.DatosDireccionEntrega.IdUsuario = this.identity.IdUsuarioLog;
        this.DatosDireccionEntrega.Nombre = this.obtenerFichaPDF.NombreRecibe;
        this.DatosDireccionEntrega.Telefono =
          this.obtenerFichaPDF.TelefonoRecibe;

        this.DatosDireccionEntrega.IdDepartamentoEntrega =
          this.idMunicipioEntrega;
        this.DatosDireccionEntrega.IdMunicipioEntrega = this.idMunicipioEntrega;
        this.DatosDireccionEntrega.IdZonaEntrega = this.idZonaEntrega;
        this.DatosDireccionEntrega.IdColoniaEntrega = this.idColoniaEntrega;

        this._pedidoServices
          .EditarDatosPedidosSocioCliente(this.DatosDireccionEntrega)
          .subscribe(
            (response) => {
              if (
                response.message ==
                'Se ha actualizado correctamento los datos del pedido del cliente'
              ) {
                this.status = 'Ok';
                let newDate = new Date(this.date);
                let parameter = moment(newDate).format('YYYY/MM/DD hh:mm a');

                if (this.date != null) {
                  this.DatosPedido.FechaHoraEntrega = parameter;
                } else {
                  this.DatosPedido.FechaHoraEntrega =
                    this.obtenerFichaPDF.FechaHoraEntregaT;
                }

                if (this.IdTipoPedido != 0) {
                  this.DatosPedido.IdTipoPedido = this.IdTipoPedido;
                } else {
                  this.DatosPedido.IdTipoPedido =
                    this.obtenerFichaPDF.IdTipoProducto;
                }

                if (this.IdFormaPago != 0) {
                  this.DatosPedido.IdFormaPago = this.IdFormaPago;
                } else {
                  this.DatosPedido.IdFormaPago =
                    this.obtenerFichaPDF.IdFormaPago;
                }
                this.DatosPedido.SolicitudCobro =
                  this.obtenerFichaPDF.SolicitudCobro2;
                this.DatosPedido.IdUsuario = this.identity.IdUsuarioLog;
                this.DatosPedido.IdMoneda = 1;
                this.DatosPedido.IdPedido = this.obtenerFichaPDF.IdPedido;
                this.DatosPedido.Observaciones =
                  this.obtenerFichaPDF.Observaciones;
                this.DatosPedido.Especificaciones =
                  this.obtenerFichaPDF.Especificaciones;
                this.DatosPedido.IdCuentaBancaria = 0;
                this.DatosPedido.IdDireccionRecepcion =
                  this.IdDireccionRecepcion;

                this._pedidoServices
                  .EditarDatosPedido(this.DatosPedido)
                  .subscribe(
                    (response) => {
                      let mensaje = response.message;
                      if (
                        response.message ==
                        'Se ha actualizado correctamento los datos del pedido'
                      ) {
                        if (this.fechaCambio != null) {
                          //Envio de mensaje de texto cuando se encuentra en ruta
                          this._pedidoServices.accesoApiTigo(this.DatosMensajeriaTigo).subscribe(
                              (response) => {
                                let mensaje = response.request.error_code;
                                this.status = 'Ok';
                                this.DatosMensajeriaTigo.Telefono = null;
                                this.DatosMensajeriaTigo.Text = null;
                              },
                              (error) => {
                                var errorMessage = <any>error;
                                console.log(errorMessage);
                                if (errorMessage != null) {
                                  Swal.fire(error.error.message);
                                  this.status = 'error';
                                  this.limpiarFormularioEstado();
                                }
                              }
                            );
                        }
                        this.status = 'Ok';
                        this.obtenerTipoPedido(this.identity.IdSocio);
                        this.editarPedidos(this.IdPedido);
                        this.limpiarPedido();
                        this.obtenerFichaPDF = new fichaPedido('','','','','','','','','','','','','','','','',0,'',0,'','','','','','','',0,0,'','','',0,'','',0,0,0,0,0,0,0,0,0,0,'','',0);

                        Swal.fire({
                          icon: 'success',
                          title: 'Edición del pedido',
                          text: 'Se han actualizado correctamente los datos del pedido',
                        });
                      }
                    },
                    (error) => {
                      var errorMessage = <any>error;
                      console.log(errorMessage);
                      if (errorMessage != null) {
                        Swal.fire(error.error.message);
                        this.status = 'error';
                      }
                    }
                  );
              } else {
                Swal.fire(
                  'NO SE HA PODIDO GUARDAR LOS DATOS DE ENTREGA DEL CLIENTE'
                );
              }
            },
            (error) => {
              Swal.fire(
                'SE OBTUVO UN ERROR AL MOMENTO DE CONSUMIR EL API',
                error
              );
              this.status = 'error';
            }
          );
      }
    });
  }
  ObtenerDetallePedido2(params) {
    this._pedidoServices.ObtenerDetallePedido(params).subscribe(
      (response) => {
        let params = response.request;
        this.DetallePagoPedido = params;
        console.log( this.DetallePagoPedido);

      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  //Cuando se selecciona en la tabla
  editarPedidos(id) {
    this.IdPedidoActualizado = id;
    this.hideColoniaEntrega = 0;
    this.ObtenerDetallePedido2(id);
    this.habilitarMontoCobro = 0;
    this.MontoCobro2 = '';
    this._pedidoServices.FichaPDF(id).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerFichaPDF = params[0];
        this.IdPedido = this.obtenerFichaPDF.IdPedido;
        this.NombreSocio = this.obtenerFichaPDF.Socio;
        this.IdDireccionRecepcion = this.obtenerFichaPDF.IdDireccionRecepcion;
        this.listarDireccionSocio(this.IdDireccionRecepcion);
        //#region datos demograficos entrega
        this.hideDepartamentoEntrega =
          this.obtenerFichaPDF.IdDepartamentoEntrega;
        this.hideMunicipioEntrega = this.obtenerFichaPDF.IdMunicipioEntrega;
        this.hideZonaEntrega = this.obtenerFichaPDF.IdZonaEntrega;
        this.hideColoniaEntrega = this.obtenerFichaPDF.IdColoniaEntrega;

        this.MunicipioDireccionEntrega(this.hideDepartamentoEntrega);

        if (this.hideZonaEntrega == null) {
          this.visualizarComboZonaEntrega = 0;
          this.idZonaEntrega = 0;
          this.ZonaDireccionEntrega(this.hideMunicipioEntrega);
        } else {
          this.visualizarComboZonaEntrega = 1;
          this.idZonaEntrega = 0;
          this.ZonaDireccionEntrega(this.hideMunicipioEntrega);
          this.ColoniaDireccionEntrega(this.hideZonaEntrega);
        }

        if (this.hideColoniaEntrega == null) {
          this.visualizarComboColoniaEntrega = 0;
          this.idColoniaEdicionEntrega = 0;
          this.idColoniaEntrega = 0;
        } else {
          this.visualizarComboColoniaEntrega = 1;
          // this.idColoniaEdicionEntrega = 0;
          // this.idColoniaEntrega = 0;
          this.ColoniaDireccionEntrega(this.hideZonaEntrega);
        }
        //#endregion
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  IdTipoPedidoS(params) {
    this.IdTipoPedido = params.IdTipoPedido;
  }

  TipoPedido() {
    this._pedidoServices.ObtenerTipoPedido().subscribe(
      (response) => {
        let params = response.request;
        this.obtenertTipoPedido = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  obtenerFechaPedido(params) {
    this.date = params.target.value;

    let newDate = new Date(this.date);
    let parameter = moment(newDate).format('DD-MM-YYYY');
    this.fechaCambio = parameter;

    this.InformacionSocioMensajeriaCambioFecha(this.IdPedidoActualizado);
  }

  //#endregion

  //#region Metodos - Detalle de cobro
  ComboConceptoPago() {
    this._pedidoServices.ComboConceptoPago().subscribe(
      (response) => {
        let params = response.request;
        this.conceptoPago = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  IdConceptoPagoS(params) {
    this.idConceptoPago = params.IdConceptoPago;
  }

  obtenerFormaPago2() {
    this._pedidoServices.ObtenerFormaPago().subscribe(
      (response) => {
        let params = response.request;
        this.obtenertTipoFormaPago2 = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  IdFormaPagoS2(params) {
    this.IdFormaPago2 = params.IdFormaPago;
  }

  obtenerMontoDetallePago(params) {
    this.montoCobroDetalle = params.target.value;
  }

  agregarFormaPago() {
    if (this.montoCobroDetalle == null) {
      Swal.fire({
        icon: 'info',
        title: 'Edición del pedido',
        text: 'Debe de ingresar el monto de cobro',
      });
    } else {
      this.DatosDetallePedido.IdPedido = this.IdPedido;
      this.DatosDetallePedido.IdConceptoPago = this.idConceptoPago;
      this.DatosDetallePedido.IdFormaPago = this.IdFormaPago2;
      this.DatosDetallePedido.IdUsuarioRegistro = this.identity.IdUsuarioLog;
      this.DatosDetallePedido.MontoCobro = this.montoCobroDetalle;
      this.DatosDetallePedido.IdMoneda = 1;

      this._pedidoServices.AgregarPagoPedido(this.DatosDetallePedido).subscribe(
        (response) => {
          let mensaje = response.message;
          if (
            response.message == 'Se ha creado exitosamente el detalle del pago'
          ) {
            console.log(response.message);
            this.status = 'Ok';
            this.ObtenerDetallePedido2(this.IdPedido);

            this.DatosMontoPedido.IdPedido = this.IdPedido;
            this.DatosMontoPedido.IdUsuarioModificacion =
              this.identity.IdUsuarioLog;
            this._pedidoServices
              .edicionMontoPedido(this.DatosMontoPedido)
              .subscribe(
                (response) => {
                  let mensaje = response.message;
                  if (
                    response.message ==
                    'Se ha realizado exitosamente la edicion del monto de cobro'
                  ) {
                    this.idConceptoPago = 0;
                    this.IdFormaPago2 = 0;
                    this.obtenerTipoPedido(this.identity.IdSocio);
                    this.status = 'Ok';
                  }
                },
                (error) => {
                  var errorMessage = <any>error;
                  console.log(errorMessage);
                  if (errorMessage != null) {
                    Swal.fire(error.error.message);
                    this.status = 'error';
                  }
                }
              );
          } else {
            this.desactivarCarga();
            console.log(response);
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            Swal.fire(error.error.message);
            this.status = 'error';
          }
        }
      );
    }
  }

  //#endregion

  //#region Metodos - combosDemograficos
  //Datos demograficos de las entregas
  getIdSocio(params) {
    this.IdSocioEdicion = params.IdSocio;
    this.listarDireccionSocio(this.IdSocioEdicion);
  }

  listarDireccionSocio(params) {
    this._pedidoServices.listaDireccionesSocio(params).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerDireccionesSocio = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getIdDireccion(params) {
    this.IdDireccionRecepcion = params.IdDireccion;
  }

  getComboDepartamentoEntrega() {
    this._pedidoServices.comboDepartamento().subscribe(
      (response) => {
        let params = response.request;
        this.comboDepartamentEntrega = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo seleccionandolo
  getComboMunicipioEntrega(params) {
    this.idDepartamentoEntrega = params.IdDepartamento;
    this._pedidoServices.comboMunicipio(this.idDepartamentoEntrega).subscribe(
      (response) => {
        let params = response.request;
        this.comboMunicipioEntrega = params;
        // console.log(this.idDepartamento);
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo del municipio desde el codigo obtenido desde la base de datos
  MunicipioDireccionEntrega(params) {
    this.idDepartamentoEntrega = params;
    this._pedidoServices.comboMunicipio(params).subscribe(
      (response) => {
        let params = response.request;
        this.comboMunicipioEntrega = params;
        // console.log(this.idDepartamento);
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo seleccionandolo
  getComboZonaEntrega(params) {
    this.idMunicipioEntrega = params.IdMunicipio;
    this._pedidoServices.comboZona(this.idMunicipioEntrega).subscribe(
      (response) => {
        let params = response.request;
        this.comboZonaEntrega = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo del municipio desde el codigo obtenido desde la base de datos
  ZonaDireccionEntrega(params) {
    this.idMunicipioEntrega = params;
    this._pedidoServices.comboZona(this.idMunicipioEntrega).subscribe(
      (response) => {
        let params = response.request;
        this.comboZonaEntrega = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo seleccionandolo
  getComboColoniaEntrega(params) {
    this.idZonaEntrega = params.IdZona;
    this._pedidoServices.comboColonia(this.idZonaEntrega).subscribe(
      (response) => {
        let params = response.request;
        this.comboColoniaEntrega = params;
        if (params != '') {
          params = '';
        } else {
          return params;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo del municipio desde el codigo obtenido desde la base de datos
  ColoniaDireccionEntrega(params) {
    this.idZonaEntrega = params;
    this._pedidoServices.comboColonia(this.idZonaEntrega).subscribe(
      (response) => {
        let params = response.request;
        this.comboColoniaEntrega = params;
        // console.log(this.idZona)
        if (params != '') {
          params = '';
          // console.log(params);
        } else {
          return params;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //Llenar el combo seleccionandolo
  getIdColoniaEntrega(params) {
    this.idColoniaEntrega = params.IdColonia;
    this.idColoniaEdicionEntrega = params.IdColonia;
  }

  //#endregion

  //#region Metodos - Limpiar los objetos
  public desactivarCarga() {
    this.loading = false;
  }
  public limpiarPedido() {
    this.DatosPedido = new DatosPedidoEditar(
      0,
      0,
      0,
      0,
      '',
      0,
      0,
      '',
      '',
      0,
      0,
      0
    );
  }
  public limpiarFormDirecciones() {
    this.DatosDireccionRecepcionPedido = new DatosDireccionSocioPedido(
      0,
      '',
      0,
      '',
      0,
      0,
      0,
      0,
      '',
      0
    );
    this.closebutton.nativeElement.click();
    this.idColoniaEdicion = 0;
  }
  public limpiarFormDireccionesEntrega() {
    this.DatosDireccionEntrega = new DatosDireccionEntregaPedido(
      0,
      0,
      '',
      '',
      '',
      0,
      0,
      0,
      0,
      ''
    );
    this.closebutton.nativeElement.click();
    this.getComboDepartamentoEntrega();
    this.idMunicipioEntrega = 0;
    this.idZonaEntrega = 0;
    this.idColoniaEntrega = 0;
    this.idColoniaEdicionEntrega = 0;
  }
  public limpiarFormDireccionSeleccionado() {
    this.DatosDireccionRecepcionPedido = new DatosDireccionSocioPedido(
      0,
      '',
      0,
      '',
      0,
      0,
      0,
      0,
      '',
      0
    );
  }
  //#endregion

  //#region Metodos - Combos de seleccion
  obtenerFormaPago() {
    this._pedidoServices.ObtenerFormaPago().subscribe(
      (response) => {
        let params = response.request;
        this.obtenertTipoFormaPago = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliar() {
    this._pedidoServices.ObtenerDomiciliar().subscribe(
      (response) => {
        let params = response.request;
        this.ListaDomiciliar = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliar2() {
    this._pedidoServices.ObtenerDomiciliar().subscribe(
      (response) => {
        let params = response.request;
        this.ListaDomiciliar2 = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliar3() {
    this._pedidoServices.ObtenerDomiciliar().subscribe(
      (response) => {
        let params = response.request;
        this.ListaDomiciliar3 = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerDomiciliar4() {
    this._pedidoServices.ObtenerDomiciliar().subscribe(
      (response) => {
        let params = response.request;
        this.ListaDomiciliar4 = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  obtenerSocio() {
    this._pedidoServices.comboObtenerSocio().subscribe(
      (response) => {
        let params = response.request;
        this.comboSocio = params;
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  //#endregion

  //#region Metodos - Reasignacion de domiciliar
  asignacionDomiciliar(id) {
    this.IdPedidoDomiciliar = id;

    this.obtenerDomiciliarPedido(id);
    this._pedidoServices.FichaPDF(id).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerFichaPDF = params[0];

        if (this.obtenerFichaPDF.SolicitudCobro2 == 1) {
          this.SolicitudCobroPedido = 1;
        } else {
          this.SolicitudCobroPedido = 0;
        }
      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  async obtenerDomiciliarPedido(id) {
    await this._pedidoServices.ObtenerDomiciliarSeleccionadoPedido(id).subscribe(
      (response) => {
        let params = response.request;
        this.obtenerDomiciliarSeleccionado = params[0];

        if (this.obtenerDomiciliarSeleccionado == undefined) {
          this.DomiciliarRecepcion = '';
          this.IdDomiciliarRecepcion = 0;
          this.DomiciliarEntrega = '';
          this.IdDomiciliarEntrega = 0;
          this.botonAsignar = 0;
        } else{
          if (this.obtenerDomiciliarSeleccionado.DomiciliarRecepcion != null && this.obtenerDomiciliarSeleccionado.DomiciliarEntrega != null) {
            this.DomiciliarRecepcion =this.obtenerDomiciliarSeleccionado.DomiciliarRecepcion;
            this.IdDomiciliarRecepcion = 0;
            this.DomiciliarEntrega = this.obtenerDomiciliarSeleccionado.DomiciliarEntrega;
            this.IdDomiciliarEntrega = 0;
            this.botonAsignar = 1;
          }
          else if (this.obtenerDomiciliarSeleccionado.DomiciliarRecepcion != null && this.obtenerDomiciliarSeleccionado.DomiciliarEntrega == null) {
            this.DomiciliarRecepcion =this.obtenerDomiciliarSeleccionado.DomiciliarRecepcion;
            this.IdDomiciliarRecepcion = 0;
            this.DomiciliarEntrega = '';
            this.IdDomiciliarEntrega = 0;
            this.botonAsignar = 0;
          }
        }

      },
      (error) => {
        var erroMessage = <any>error;
        console.log(erroMessage);
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  async crearAsignacionPedidoD() {
    if (this.botonAsignar == 0) {
      // Visualizar en la base de datos si se encuentra ya asignada los pedidos

      await this._pedidoServices.ObtenerDomiciliarSeleccionadoPedido(this.IdPedidoDomiciliar).subscribe(
        (response) => {
          let request = response.request;

          if (request.length == 0) {
            if(this.IdDomiciliarRecepcion != 0 && this.IdDomiciliarEntrega != 0){
              this.crearAsignacionDomiciliar(this.identity.IdUsuarioLog,this.IdPedidoDomiciliar,this.IdDomiciliarEntrega,
              this.IdDomiciliarRecepcion,1,'ASIGNACION PARA EL DOMICILIAR DE ENTREGA Y RECEPCION',2)
            }else if(this.IdDomiciliarRecepcion != 0 && this.IdDomiciliarEntrega == 0){
              this.crearAsignacionDomiciliar(this.identity.IdUsuarioLog,this.IdPedidoDomiciliar,0,this.IdDomiciliarRecepcion,
              2,'ASIGNACION PARA EL DOMICILIAR DE RECEPCION',2)
            }
          } else  {
            this.obtenerDomiciliarSeleccionado = request[0]
            if(this.obtenerDomiciliarSeleccionado.DomiciliarRecepcion != null && this.obtenerDomiciliarSeleccionado.DomiciliarEntrega == null){
              if (this.IdDomiciliarRecepcion != 0 && this.IdDomiciliarEntrega == 0) {
                this.editarAsignacionDomiciliar(this.IdPedidoDomiciliar,this.IdDomiciliarRecepcion,0,this.identity.IdUsuarioLog,2)
              }else if (this.IdDomiciliarRecepcion == 0 && this.IdDomiciliarEntrega != 0) {
                this.crearAsignacionDomiciliar(this.identity.IdUsuarioLog,this.IdPedidoDomiciliar,this.IdDomiciliarEntrega,this.IdDomiciliarRecepcion,3,'ASIGNACION PARA EL DOMICILIAR DE ENTREGA',1)

              }

                
              
              // if(this.IdDomiciliarEntrega != 0){
              //   this.crearAsignacionDomiciliar(this.identity.IdUsuarioLog,this.IdPedidoDomiciliar,this.IdDomiciliarEntrega,this.IdDomiciliarRecepcion,3,'ASIGNACION PARA EL DOMICILIAR DE ENTREGA',1)

              // }else {
              //   Swal.fire(
              //     'Reasignacion domiciliar',
              //     'Debe de seleccionar el domiciliar de entrega para su actualizacion',
              //     'info'
              //   )
              // }
            }
          }
          },
          (error) => {
            var errorMessage = <any>error;
            if (errorMessage != null) {
              Swal.fire(error.error.message);
              this.status = 'error';
            }
          }
        );
    } else if (this.botonAsignar == 1){
      if (this.DomiciliarRecepcion != null && this.DomiciliarEntrega != null) {
        if (this.IdDomiciliarRecepcion != 0 && this.IdDomiciliarEntrega != 0) {
          this.editarAsignacionDomiciliar(this.IdPedidoDomiciliar,this.IdDomiciliarRecepcion,this.IdDomiciliarEntrega,this.identity.IdUsuarioLog,1)
        }else if (this.IdDomiciliarRecepcion != 0 && this.IdDomiciliarEntrega == 0) {
          this.editarAsignacionDomiciliar(this.IdPedidoDomiciliar,this.IdDomiciliarRecepcion,0,this.identity.IdUsuarioLog,2)
        }else if (this.IdDomiciliarRecepcion == 0 && this.IdDomiciliarEntrega != 0) {
          this.editarAsignacionDomiciliar(this.IdPedidoDomiciliar,0,this.IdDomiciliarEntrega,this.identity.IdUsuarioLog,3)
        }else {
          Swal.fire(
            'Reasignacion domiciliar',
            'Debe de seleccionar el domiciliar de recepcion o de entrega para su actualizacion',
            'info'
          )
        }
      }
    }
  }

  async crearAsignacionDomiciliar(IdUsuario, IdPedido,  IdDomiciliarEntrega, IdDomiciliarRecepcion, opcion, observacionEstado, tipoOpcion) {
    this.asignacionDomiciliarDatos.IdUsuario = IdUsuario;
    this.asignacionDomiciliarDatos.IdPedido = IdPedido;
    this.asignacionDomiciliarDatos.IdDomiciliarRecepcion = IdDomiciliarRecepcion;
    this.asignacionDomiciliarDatos.IdDomiciliarEntrega = IdDomiciliarEntrega;
    this.asignacionDomiciliarDatos.Opcion = tipoOpcion;

    Swal.fire({
      title: 'Asignacion domiciliar',
      text: '¿Esta seguro de asignar al domiciliar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value == true) {
        this._pedidoServices.AsignacionDomiciliar(this.asignacionDomiciliarDatos).subscribe(
            (response) => {
              let mensaje = response.message;
              if (response.message == mensaje) {

                if (opcion == 1) {
                  this.DatosEstado.IdEstado = 2;
                  this.DatosEstado.IdPedido = IdPedido
                  this.DatosEstado.Observacion = observacionEstado
                  this._pedidoServices.CambioEstado(this.DatosEstado).subscribe(
                    response => {
                      let mensaje = response.message;
                      if (response.message == mensaje) {
                        this.status = 'Ok'
                        this.obtenerTipoPedido(this.identity.IdSocio)
                        this.CreacionMisionesOptacheckRecepcion(this.CorreoDomiciliarRecepcion,'RECEPCION');
                        this.CreacionMisionesOptacheckEntrega(this.CorreoDomiciliarEntrega,'ENTREGA');
                        this.IdDomiciliarRecepcion = 0;
                        this.IdDomiciliarEntrega = 0;
                        Swal.fire(
                          'Asignacion domiciliar',
                          'La asignacion del domiciliar fue exitosamente para la recepcion y entrega del pedido',
                          'success'
                        )
                        this.botonAsignar = 1
                        this.DatosEstado = new DatosEstado(0, 0, '');
                      } else {
                        this.desactivarCarga()
                        this.limpiarFormularioEstado();
                        Swal.fire(
                          'Actualizacion asignacion domiciliar',
                          'No se ha podido crear la asignación, favor comunicarse con el equipo de desarrollo',
                          'error'
                        )
                      }
                    },
                    error => {
                      var errorMessage = <any>error;
                      console.log(errorMessage)
                      if (errorMessage != null) {
                        this.desactivarCarga()
                        Swal.fire(error.error.message)
                        this.status = 'error'
                        this.limpiarFormularioEstado()
                      }
                    }
                  )


                }else if(opcion == 2){
                  this.DatosEstado.IdEstado = 2;
                  this.DatosEstado.IdPedido = IdPedido
                  this.DatosEstado.Observacion = observacionEstado
                  this._pedidoServices.CambioEstado(this.DatosEstado).subscribe(
                    response => {
                      let mensaje = response.message;
                      if (response.message == mensaje) {
                        this.status = 'Ok'
                        this.obtenerTipoPedido(this.identity.IdSocio)
                        this.CreacionMisionesOptacheckRecepcion(this.CorreoDomiciliarRecepcion,'RECEPCION');
                        this.IdDomiciliarRecepcion = 0;
                        this.IdDomiciliarEntrega = 0;
                        Swal.fire(
                          'Asignacion domiciliar',
                          mensaje,
                          'success'
                        )
                        this.botonAsignar = 0
                        this.DatosEstado = new DatosEstado(0, 0, '');
                      } else {
                        this.desactivarCarga()
                        this.limpiarFormularioEstado();
                        Swal.fire(
                          'Actualizacion asignacion domiciliar',
                          'No se ha podido crear la asignación, favor comunicarse con el equipo de desarrollo',
                          'error'
                        )
                      }
                    },
                    error => {
                      var errorMessage = <any>error;
                      console.log(errorMessage)
                      if (errorMessage != null) {
                        this.desactivarCarga()
                        Swal.fire(error.error.message)
                        this.status = 'error'
                        this.limpiarFormularioEstado()
                      }
                    }
                  )
                }else if(opcion == 3){
                  this.DatosEstado.IdEstado = 2;
                  this.DatosEstado.IdPedido = IdPedido
                  this.DatosEstado.Observacion = observacionEstado
                  this._pedidoServices.CambioEstado(this.DatosEstado).subscribe(
                    response => {
                      let mensaje = response.message;
                      if (response.message == mensaje) {
                        this.status = 'Ok'
                        this.obtenerTipoPedido(this.identity.IdSocio)
                        this.CreacionMisionesOptacheckEntrega(this.CorreoDomiciliarEntrega,'ENTREGA');
                        this.IdDomiciliarRecepcion = 0;
                        this.IdDomiciliarEntrega = 0;
                        Swal.fire(
                          'Asignacion domiciliar',
                          mensaje,
                          'success'
                        )
                        this.DatosEstado = new DatosEstado(0, 0, '');
                      } else {
                        this.desactivarCarga()
                        this.limpiarFormularioEstado();
                        Swal.fire(
                          'Actualizacion asignacion domiciliar',
                          'No se ha podido crear la asignación, favor comunicarse con el equipo de desarrollo',
                          'error'
                        )
                      }
                    },
                    error => {
                      var errorMessage = <any>error;
                      console.log(errorMessage)
                      if (errorMessage != null) {
                        this.desactivarCarga()
                        Swal.fire(error.error.message)
                        this.status = 'error'
                        this.limpiarFormularioEstado()
                      }
                    }
                  )
                }


                this.status = 'Ok';
                this.botonAsignar = 1;
              } else {
                console.log(response);
              }
            },
            (error) => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              if (errorMessage != null) {
                Swal.fire(error.error.message);
                this.status = 'error';
              }
            }
          );
      }
    });
  }

  async editarAsignacionDomiciliar(IdPedido,  IdDomiciliarRecepcion, IdDomiciliarEntrega, IdUsuario, opcion){
    this.EditarDatosDomiciliar.IdPedido = IdPedido;
    this.EditarDatosDomiciliar.IdDomiciliarRecepcion = IdDomiciliarRecepcion;
    this.EditarDatosDomiciliar.IdDomiciliarEntrega = IdDomiciliarEntrega;
    this.EditarDatosDomiciliar.IdUsuario = IdUsuario;
    this.EditarDatosDomiciliar.Opcion = null

    Swal.fire({
      title: 'Reasignacion domiciliar',
      text: '¿Esta seguro de reasignar al domiciliar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value == true) {
        this._pedidoServices.EditarDomiciliarAsignado(this.EditarDatosDomiciliar).subscribe(
            (response) => {
              let request = response.request;

              console.log(request);

              if (request.length != 0) {
                if (opcion == 1) {
                  this.IdMisionRecepcion = request[0].IdMisionRecepcion
                  this.IdMisionEntrega = request[0].IdMisionEntrega


                  this.EliminarMisionesOptacheckRecepcion(this.IdMisionRecepcion);
                  this.EliminarMisionesOptacheckEntrega(this.IdMisionEntrega);

                  this.CreacionMisionesOptacheckRecepcion(this.CorreoDomiciliarRecepcion,'RECEPCION');
                  this.CreacionMisionesOptacheckEntrega(this.CorreoDomiciliarEntrega,'ENTREGA');


                  Swal.fire(
                    'Reasignacion domiciliar',
                    'La reasignacion de los domiciliares ha sido exitosa',
                    'success'
                  )
                  this.obtenerTipoPedido(this.identity.IdSocio)
                  this.IdDomiciliarEntrega = 0
                  this.IdDomiciliarRecepcion = 0
                  this.IdMisionRecepcion = 0
                  this.IdMisionEntrega = 0
                }else if(opcion == 2){
                  this.IdMisionRecepcion = request[0].IdMision
                  this.EliminarMisionesOptacheckRecepcion(this.IdMisionRecepcion);
                  this.CreacionMisionesOptacheckRecepcion(this.CorreoDomiciliarRecepcion,'RECEPCION');

                  Swal.fire(
                    'Reasignacion domiciliar',
                    'La reasignacion del domiciliar de recepcion ha sido exitosa',
                    'success'
                  )
                  this.IdDomiciliarEntrega = 0
                  this.IdDomiciliarRecepcion = 0
                  this.IdMisionRecepcion = 0
                  this.obtenerTipoPedido(this.identity.IdSocio)


                }else if(opcion == 3){
                  this.IdMisionEntrega = request[0].IdMision
                  this.EliminarMisionesOptacheckEntrega(this.IdMisionEntrega);
                  this.CreacionMisionesOptacheckEntrega(this.CorreoDomiciliarEntrega,'ENTREGA');

                  Swal.fire(
                    'Reasignacion domiciliar',
                    'La reasignacion del domiciliar de entrega ha sido exitosa',
                    'success'
                  )
                  this.IdDomiciliarEntrega = 0
                  this.IdDomiciliarRecepcion = 0
                  this.IdMisionEntrega = 0
                  this.obtenerTipoPedido(this.identity.IdSocio)

                }
              }
            },
            (error) => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              if (errorMessage != null) {
                Swal.fire(error.error.message);
                this.status = 'error';
              }
            }
          );
      }
    });

  }

  ObtenerDomiciliarRecepcion(params) {
    this.IdDomiciliarRecepcion = params.IdDomiciliar;
    this.CorreoDomiciliarRecepcion = params.Correo;
    this.PasswordDomiciliarRecepcion = params.Contrasena;
    console.log(this.CorreoDomiciliarRecepcion);
  }

  ObtenerDomiciliarEntrega(params) {
    this.IdDomiciliarEntrega = params.IdDomiciliar;
    this.NombreDomiciliarEntrega = params.Domiciliar;
    this.CorreoDomiciliarEntrega = params.Correo;
    this.PasswordDomiciliarEntrega = params.Contrasena;
    this.InformacionSocioMensajeriaEstadoEnRuta(this.IdPedidoDomiciliar);
  }
  //#endregion

  //#region Metodos - Optacheck
  CreacionMisionesOptacheckEntrega(correo, tipoAccion) {
    this.creacionMisionesOptacheck = new CreacionMisionOptacheck(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    );
    this.creacionMisionesOptacheck.correo = correo;
    this.creacionMisionesOptacheck.cliente = this.obtenerFichaPDF.NombreRecibe;
    this.creacionMisionesOptacheck.correlativo = this.obtenerFichaPDF.FechaHoraEntregaC +'/' +this.obtenerFichaPDF.IdPedido +'    ' +'(' +tipoAccion +')';
    this.creacionMisionesOptacheck.direccionEntrega = this.obtenerFichaPDF.DireccionEntrega +' ' + this.obtenerFichaPDF.ZonaEntrega +' ' +this.obtenerFichaPDF.ReferenciaEntrega;
    this.creacionMisionesOptacheck.direccionRecepcion = this.obtenerFichaPDF.DireccionRecepcion +' ' +this.obtenerFichaPDF.ZonaRecepcion +' ' +this.obtenerFichaPDF.ReferenciaRecepcion;

    this.creacionMisionesOptacheck.especificacion = this.obtenerFichaPDF.Especificaciones;

    this.creacionMisionesOptacheck.municipioEntrega = this.obtenerFichaPDF.MunicipioEntrega;
    this.creacionMisionesOptacheck.municipioRecepcion = this.obtenerFichaPDF.MunicipioRecepcion;
    this.creacionMisionesOptacheck.observacion = this.obtenerFichaPDF.Observaciones;
    this.creacionMisionesOptacheck.recibePago = this.obtenerFichaPDF.SolicitudCobro;
    this.creacionMisionesOptacheck.socio = this.obtenerFichaPDF.Socio;
    this.creacionMisionesOptacheck.telefono = this.obtenerFichaPDF.TelefonoRecibe;
    this.creacionMisionesOptacheck.fechaEntrega = this.obtenerFichaPDF.FechaHoraEntrega;

    if (this.obtenerFichaPDF.SolicitudCobro == 'SI') {
      this.creacionMisionesOptacheck.conceptoPagoMensajeria = this.obtenerFichaPDF.CobroMensajeria+''+this.obtenerFichaPDF.FormaPagoMensajeria
      this.creacionMisionesOptacheck.conceptoPagoProducto = this.obtenerFichaPDF.CobroProducto+''+this.obtenerFichaPDF.FormaPagoProducto
      this.creacionMisionesOptacheck.montoTotal = this.obtenerFichaPDF.MontoCobro.toString();
    }

    this._pedidoServices.CreacionMisionOptacheckEntrega(this.creacionMisionesOptacheck).subscribe(
        (response) => {
          let mensaje =response;
          // if (response.message == mensaje) {
            this.status = 'Ok';

            this._pedidoServices.MisionRespuestaEntrega(mensaje).subscribe(
              (response) => {
                let mensaje = response.message;
                if (response.message == mensaje) {
                  this.status = 'Ok';
                  console.log(mensaje);
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
          // }
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
  }
  CreacionMisionesOptacheckRecepcion(correo, tipoAccion) {
    this.creacionMisionesOptacheck.correo = correo;
    this.creacionMisionesOptacheck.cliente = this.obtenerFichaPDF.NombreRecibe;
    this.creacionMisionesOptacheck.correlativo =
      this.obtenerFichaPDF.FechaHoraEntregaC +
      '/' +
      this.obtenerFichaPDF.IdPedido +
      '    ' +
      '(' +
      tipoAccion +
      ')';
    this.creacionMisionesOptacheck.direccionEntrega =
      this.obtenerFichaPDF.DireccionEntrega +
      ' ' +
      this.obtenerFichaPDF.ZonaEntrega +
      ' ' +
      this.obtenerFichaPDF.ReferenciaEntrega;
    this.creacionMisionesOptacheck.direccionRecepcion =
      this.obtenerFichaPDF.DireccionRecepcion +
      ' ' +
      this.obtenerFichaPDF.ZonaRecepcion +
      ' ' +
      this.obtenerFichaPDF.ReferenciaRecepcion;

    this.creacionMisionesOptacheck.especificacion =
      this.obtenerFichaPDF.Especificaciones;

    this.creacionMisionesOptacheck.municipioEntrega =
      this.obtenerFichaPDF.MunicipioEntrega;
    this.creacionMisionesOptacheck.municipioRecepcion =
      this.obtenerFichaPDF.MunicipioRecepcion;
    this.creacionMisionesOptacheck.observacion =
      this.obtenerFichaPDF.Observaciones;
    this.creacionMisionesOptacheck.recibePago =
      this.obtenerFichaPDF.SolicitudCobro;
    this.creacionMisionesOptacheck.socio = this.obtenerFichaPDF.Socio;
    this.creacionMisionesOptacheck.telefono =
      this.obtenerFichaPDF.TelefonoRecibe;
    this.creacionMisionesOptacheck.fechaEntrega =
      this.obtenerFichaPDF.FechaHoraEntrega;

      if (this.obtenerFichaPDF.SolicitudCobro == 'SI') {
        this.creacionMisionesOptacheck.conceptoPagoMensajeria = this.obtenerFichaPDF.CobroMensajeria+''+this.obtenerFichaPDF.FormaPagoMensajeria
        this.creacionMisionesOptacheck.conceptoPagoProducto = this.obtenerFichaPDF.CobroProducto+''+this.obtenerFichaPDF.FormaPagoProducto
        this.creacionMisionesOptacheck.montoTotal = this.obtenerFichaPDF.MontoCobro.toString();
      }

    this._pedidoServices
      .CreacionMisionOptacheckRecepcion(this.creacionMisionesOptacheck).subscribe(
        (response) => {
          let mensaje = response;
          this.status = 'Ok';
          this._pedidoServices.MisionRespuestaEntrega(mensaje).subscribe(
            (response) => {
              let mensaje = response.message;
              if (response.message == mensaje) {
                this.status = 'Ok';
                console.log(mensaje);
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
  }
  EliminarMisionesOptacheckRecepcion(IdMisionRecepcion) {
    this._pedidoServices.EliminarMisionOptacheck(IdMisionRecepcion).subscribe(
        (response) => {
          let mensaje = response.message;
          if (response.message == mensaje) {
            this.status = 'Ok';
            console.log(mensaje + 'RECEPCION');
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
  }
  EliminarMisionesOptacheckEntrega(IdMisionEntrega) {
    this._pedidoServices.EliminarMisionOptacheck(IdMisionEntrega).subscribe(
        (response) => {
          let mensaje = response.message;
          if (response.message == mensaje) {
            this.status = 'Ok';
            console.log(mensaje + 'ENTREGA');
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
  }
  //#endregion

  //#region Metodos - Descargar Excel
  descargarExcel() {
    if (this.filtroFecha == 1) {
      this._exportExcelServices.exportToExcel(
        this.obtenerListadoPedidoFecha,
        'my_export'
      );
    } else if (this.filtroFecha == 2) {
      this._exportExcelServices.exportToExcel(
        this.filtroRangoFecha,
        'my_export'
      );
    } else if (this.filtroFecha == 3) {
      this._exportExcelServices.exportToExcel(this.filtroEstado, 'my_export');
    } else if (this.filtroFecha == 4) {
      this._exportExcelServices.exportToExcel(
        this.filtroDomiciliar,
        'my_export'
      );
    } else if (this.filtroFecha == 5) {
      this._exportExcelServices.exportToExcel(this.filtroSocio, 'my_export');
    } else if (this.filtroFecha == 6) {
      this._exportExcelServices.exportToExcel(
        this.obtenerPedidoBuscado,
        'my_export'
      );
    } else {
      this._exportExcelServices.exportToExcel(
        this.obtenerListadoPedidos,
        'my_export'
      );
    }
  }
  //#endregion

  //#region Metodos - Editar pedidos
  editarDetallePago(id) {
    this.IdDetalleImportePago = id;
    this._pedidoServices.IdObtenerDetallePedido(id).subscribe(
      (response) => {
        let params = response.request;
        this.habilitarMontoCobro = 1;
        this.MontoCobro2 = params[0].MontoCobro;
        this.ConceptoPagoEdicion = params[0].ConceptoPago;
        this.FormaPagoEdicion = params[0].FormaPago;
        this.idConceptoPago = params[0].IdConceptoPago;
        this.IdFormaPago2 = params[0].IdFormaPago;
      },
      (error) => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  ObtenerMonto(params) {
    this.MontoCobro = params.target.value;
  }

  edicionMontoDetallePagoSeleccionado() {
    if (this.MontoCobro == undefined) {
      this.EditarDetallePago.MontoCobro = this.MontoCobro2;
    } else {
      this.EditarDetallePago.MontoCobro = this.MontoCobro;
    }
    Swal.fire({
      title: 'Edicion del monto detalle de cobro',
      text: '¿Esta seguro de editar el monto de cobro del detalle seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.EditarDetallePago.IdDetalleImportePedido =
          this.IdDetalleImportePago;
        this.EditarDetallePago.IdUsuarioModificacion =
          this.identity.IdUsuarioLog;
        this.EditarDetallePago.IdConceptoPago = this.idConceptoPago;
        this.EditarDetallePago.IdFormaPago = this.IdFormaPago2;

        this._pedidoServices
          .EditarDetallePagoPedido(this.EditarDetallePago)
          .subscribe(
            (response) => {
              if (
                response.message ==
                'Se ha creado exitosamente la edicion del detalle importe de pago'
              ) {
                console.log(response.message);
                this.status = 'Ok';
                this.obtenerTipoPedido(this.identity.IdSocio);
                this.editarPedidos(this.IdPedido);
                this.idConceptoPago = 0;
                this.IdFormaPago2 = 0;
                this.habilitarMontoCobro = 0;
              }
            },
            (error) => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              if (errorMessage != null) {
                Swal.fire(error.error.message);
                this.status = 'error';
                this.MontoCobro = '';
                this.MontoCobro2 = '';
                this.habilitarMontoCobro = 0;
              }
            }
          );
      }
    });
  }
  //#endregion
}
