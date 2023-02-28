import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { AccesoApiTigo } from '../models/MensajesTigo/AccesoApiTigo.model';
import { DatosEstado } from '../models/Estado/DatosEstado.model';
import { comboBoxDireccion } from '../models/DatosDemograficos/ComboBoxDireccion.model';
import { DatosDireccionSocioPedido } from '../models/Socio/DatosDireccionSocioPedido.model';
import { DatosDireccionEntregaPedido } from '../models/Cliente/DatosDireccionEntregaPedido.Model';
import { DatosPedidoEditar } from '../models/Pedido/DatosPedidoEditar.model';
import { AsignacionDomiciliar } from '../models/Domiciliar/AsignacionDomiciliar.model';
import { ObtenerDatosSocio } from '../models/Socio/ObtenerDatosSocio.model';
import { ObtenerDireccionSocio } from '../models/Socio/ObtenerDireccionSocio.model';
import { DatosDireccionSocio } from '../models/Socio/DatosDireccionSocio.model';
import { ObtenerDatosContacto } from '../models/Socio/ObtenerDatosContacto.model';
import { DatosContactoSocio } from '../models/Socio/DatosContactoSocio.model';
import { DatosTelefono } from '../models/Socio/DatosTelefono.model';
import { DatosCorreo } from '../models/Socio/DatosCorreo.model';
import { ObtenerDatosBancariosId } from '../models/Socio/ObtenerDatosBancariosId.model';
import { DatosFinancieros } from '../models/Socio/DatosFinancieros.model';
import { EditarDetallePagoPedido } from '../models/Pedido/EditarDetallePago.model';
import { CuentaSocio } from 'src/app/models/Socio/CuentaSocio.model';
import { DatosSocio } from 'src/app/models/Socio/DatosSocio.model';
import { MontoTarifa } from '../models/Tarifado/MontoTarifa.model';
import { DatosTarifaRuta } from '../models/Tarifado/DatosTarifaRuta.model';
import { DatosPedido } from '../models/Pedido/DatosPedido.model';
import { DetallePagoPedido } from '../models/Pedido/DetallePagoPedido.model';
import { DatosDireccionMasivo } from '../models/CargaMasiva/DatosDireccionMasivo.model';
import { EditarDatosDomiciliar } from '../models/Domiciliar/EditarDatosDomiciliar.model';
import { DatosDomiciliar } from '../models/Domiciliar/DatosDomiciliar.model';
import { DatosMontoPedido } from 'src/app/models/Pedido/DatosMontoPedido.model';
import { DatosTarifa } from '../models/Tarifado/DatosTarifa.model';
import { EditarDatosTarifa } from '../models/Tarifado/EditarDatosTarifa.model';
import { DatosRuta } from '../models/Tarifado/DatosRuta.model';
import { EditarDatosRuta } from '../models/Tarifado/EditarDatosRuta.model';
import { EditarDatosSector } from '../models/Tarifado/EditarDatosSector.model';
import { DatosSector } from '../models/Tarifado/DatosSector.model';
import { CreacionMisionOptacheck } from '../models/Optacheck/CreacionMision.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public url: String;
  
  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  agregarDatosSocio(cliente:DatosSocio):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarDatosSocio',params,{headers:this.headers})
  }

  CrearCuentaSocio(CuentaSocio: CuentaSocio):Observable<any>{
    let params = JSON.stringify(CuentaSocio);
    return this._http.post(this.url + '/CrearCuenta', params, {headers:this.headers})
  }

  //APIS filtrado de pedidos
  busquedaPedidos(params):Observable<any>{
    return this._http.get(this.url + '/busquedaPedido/'+params,{headers:this.headers})
  }

  ListadoPedidos(id):Observable<any>{
    return this._http.get(this.url + '/ListadoPedidos/'+id,{headers:this.headers})
  }

  //APIS Estados del pedido
  obtenerHistorialEstado(id):Observable<any>{
    return this._http.get(this.url + '/obtenerHistorialEstado/'+id,{headers:this.headers})
  }

  listarEstadoss():Observable<any>{
    return this._http.get(this.url + '/listarEstado',{headers:this.headers})
  }

  accesoApiTigo(AccesoApiTigo: AccesoApiTigo):Observable<any>{
    let params = JSON.stringify(AccesoApiTigo)
    return this._http.post(this.url + '/DatosApiTigo',params,{headers:this.headers})
  }  

  CambioEstado(DatosEstado: DatosEstado):Observable<any>{
    let params = JSON.stringify(DatosEstado);
    return this._http.post(this.url + '/CambioEstadoPedido', params, {headers:this.headers})
  }

  //APIS Descargar PDF
  FichaPDF(id):Observable<any>{
    return this._http.get(this.url + '/fichaPDF/'+id,{headers:this.headers})
  }

  ObtenerDetallePedido(IdPedido):Observable<any>{
    return this._http.get(this.url + '/obtenerDetallePedido/'+IdPedido,{headers:this.headers})
  }

  AgregarMunicipio(municipio:comboBoxDireccion):Observable<any>{
    let params = JSON.stringify(municipio);
    return this._http.post(this.url + '/AgregarDatosMunicipio', params, {headers:this.headers})
  }

  AgregarZonas(zona:comboBoxDireccion):Observable<any>{
    let params = JSON.stringify(zona);
    return this._http.post(this.url + '/AgregarDatosZona', params, {headers:this.headers})
  }

  AgregarColonia(colonia:comboBoxDireccion):Observable<any>{
    let params = JSON.stringify(colonia);
    return this._http.post(this.url + '/AgregarDatosColonia', params, {headers:this.headers})
  }

  EditarDatosPedidosSocio(DatosDireccionSocio: DatosDireccionSocioPedido):Observable<any>{
    let params = JSON.stringify(DatosDireccionSocio);
    return this._http.post(this.url + '/EditarDatosPedidosSocio', params, {headers:this.headers})
  }
  EditarDatosPedidosSocioCliente(DatosDireccionEntrega: DatosDireccionEntregaPedido):Observable<any>{
    let params = JSON.stringify(DatosDireccionEntrega);
    return this._http.post(this.url + '/EditarDatosPedidosContacto', params, {headers:this.headers})
  }

  EditarDatosPedido(DatosPedido: DatosPedidoEditar):Observable<any>{
    let params = JSON.stringify(DatosPedido);
    return this._http.post(this.url + '/EditarDatosPedido', params, {headers:this.headers})
  }

  comboDepartamento():Observable<any>{
    return this._http.get(this.url + '/comboDepartamento',{headers:this.headers});
  }

  comboMunicipio(id):Observable<any>{
    return this._http.get(this.url + '/comboMunicipio/'+id,{headers:this.headers});
  }

  comboZona(id):Observable<any>{
    return this._http.get(this.url + '/comboZona/'+id, {headers:this.headers});   
  }

  comboColonia(id):Observable<any>{
    return this._http.get(this.url + '/comboColonia/'+id,{headers:this.headers});
  }

  ObtenerTipoPedido():Observable<any>{
    return this._http.get(this.url + '/ObtenerTipoPedido',{headers:this.headers})
  }

  ObtenerFormaPago():Observable<any>{
    return this._http.get(this.url + '/ObtenerFormaPago',{headers:this.headers})
  }

  ObtenerDomiciliar():Observable<any>{
    return this._http.get(this.url + '/ObtenerDomiciliar',{headers:this.headers})
  }

  comboObtenerSocio():Observable<any>{
    return this._http.get(this.url + '/ObtenerSocios',{headers:this.headers});
  }

  ComboConceptoPago():Observable<any>{
    return this._http.get(this.url + '/ComboConceptoPago',{headers:this.headers})
  }

  ObtenerDomiciliarSeleccionadoPedido(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDomiciliarSeleccionadoPedido/'+id,{headers:this.headers})
  }

  AsignacionDomiciliar(asignacion: AsignacionDomiciliar):Observable<any>{
    let params = JSON.stringify(asignacion);
    return this._http.post(this.url + '/AsignacionDomiciliar', params, {headers:this.headers})
  }

  EditarDomiciliarAsignado(EditarAsignacionDomiciliar: AsignacionDomiciliar):Observable<any>{
    let params = JSON.stringify(EditarAsignacionDomiciliar);
    return this._http.post(this.url + '/EdicionAsignacionDomiciliar', params, {headers:this.headers})
  }

  FiltroFechaPedido(id):Observable<any>{
    return this._http.get(this.url + '/filtroFecha/'+id,{headers:this.headers})
  }

  filtroRangoFecha(id):Observable<any>{
    return this._http.get(this.url + '/filtroRangoFecha/'+id,{headers:this.headers})
  }

  filtroEstado(id):Observable<any>{
    return this._http.get(this.url + '/filtroEstado/'+id,{headers:this.headers})
  }

  filtroDomiciliar(Id):Observable<any>{
    return this._http.get(this.url + '/filtroDomiciliar/'+Id,{headers:this.headers})
  }

  filtroSocio(params):Observable<any>{
    return this._http.get(this.url + '/filtroSocio/'+params,{headers:this.headers})
  }

  obtenerDatosSocio(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerParametrosSocio/'+id,{headers:this.headers})
  }

  //Apis para la actualizacion de los datos del socio.
  EditarDatosSocio(datosSocio: ObtenerDatosSocio):Observable<any>{
    let params = JSON.stringify(datosSocio);
    return this._http.post(this.url + '/EditarDatosSocio', params, {headers:this.headers})
  }

  listaDireccionesSocio(id):Observable<any>{
    return this._http.get(this.url + '/ListarDireccionesSocio/'+id,{headers:this.headers})
  }

  ObtenerDireccionSocioId(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDireccionSocioId/'+id,{headers:this.headers})
  }

  EditarDatosDireccionSocio(DatosDireccionSocio: ObtenerDireccionSocio):Observable<any>{
    let params = JSON.stringify(DatosDireccionSocio);
    return this._http.post(this.url + '/EditarDireccionSocio', params, {headers:this.headers})
  }

  comboMunicipioDireccion(id):Observable<any>{
    return this._http.get(this.url + '/ComboMunicipioDireccion/'+id,{headers:this.headers});
  }

  agregarDireccionSocio(cliente:DatosDireccionSocio):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarDireccionSocio', params, {headers:this.headers})
  }

  listarContactosSocio(id):Observable<any>{
    return this._http.get(this.url + '/ListarContactosSocio/'+id,{headers:this.headers})
  }

  ObtenerDatosContactoId(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDatosContactoId/'+id,{headers:this.headers})
  }

  comboTipoTelefono():Observable<any>{
    return this._http.get(this.url + '/ComboTipoTelefono',{headers:this.headers})
  }

  EditarDatosContactos(DatosContactoSocio: ObtenerDatosContacto):Observable<any>{
    let params = JSON.stringify(DatosContactoSocio);
    return this._http.post(this.url + '/EditarDatosContacto', params, {headers:this.headers})
  }

  agregarDatosContacto(cliente:DatosContactoSocio):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarContactoSocio', params, {headers:this.headers})
  }

  obtenerContacto(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerContactosSocio/'+id,{headers:this.headers})
  }

  agregarDatosTelefono(cliente:DatosTelefono):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarTelefonos', params, {headers:this.headers})
  }

  agregarDatosCorreo(cliente:DatosCorreo):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarCorreos', params, {headers:this.headers})
  }

  comboTipoCorreo():Observable<any>{
    return this._http.get(this.url + '/ComboTipoCorreo',{headers:this.headers})
  }

  comboCliente():Observable<any>{
    return this._http.get(this.url + '/comboCliente',{headers:this.headers});
  }

  ObtenerDatosFinancierosId(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDatosFinancierosId/'+id,{headers:this.headers})
  }

  ComboTipoProducto():Observable<any>{
    return this._http.get(this.url + '/ComboTipoProducto',{headers:this.headers});
  }

  ComboTipoPago():Observable<any>{
    return this._http.get(this.url + '/ComboTipoPago',{headers:this.headers});
  }

  listarDatosFinancieros(id):Observable<any>{
    return this._http.get(this.url + '/ListarDatosFinancieros/'+id,{headers:this.headers})
  }

  comboBanco():Observable<any>{
    return this._http.get(this.url + '/ComboBanco',{headers:this.headers});
  }

  comboTipoCuenta():Observable<any>{
    return this._http.get(this.url + '/ComboTipoCuentaBancaria',{headers:this.headers});
  }

  EditarDatosFinancieros(DatosFinancieros: ObtenerDatosBancariosId):Observable<any>{
    let params = JSON.stringify(DatosFinancieros);
    return this._http.post(this.url + '/EditarDatosFinancieros', params, {headers:this.headers})
  }

  agregarDatosFinancieros(cliente:DatosFinancieros):Observable<any>{
    let params = JSON.stringify(cliente);
    return this._http.post(this.url + '/AgregarCuentaBancaria', params, {headers:this.headers})
  }

  IdObtenerDetallePedido(IdPedido):Observable<any>{
    return this._http.get(this.url + '/IdDetalleImportePedido/'+IdPedido,{headers:this.headers})
  }

  EditarDetallePagoPedido(EditarDetallePagoPedido : EditarDetallePagoPedido):Observable<any>{
    let params = JSON.stringify(EditarDetallePagoPedido);
    return this._http.post(this.url + '/EdicionDetalleImportePago', params, {headers:this.headers})
  }

  //Apis para obtener el listado de los clientes
  obtenerDatosClientes(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerClienteCombo/'+id,{headers:this.headers})
  }

  obtenerDireccionCliente(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDireccionClientes/'+id,{headers:this.headers})

  }
  ObtenerMontoTarifa(MontoTarifa: MontoTarifa):Observable<any>{
    let params = JSON.stringify(MontoTarifa);
    return this._http.post(this.url + '/ObtenerMontoTarifa', params, {headers:this.headers})
  }

  DatosTarifaPedido(datosTarifaPedido: DatosTarifaRuta):Observable<any>{
    let params = JSON.stringify(datosTarifaPedido);
    return this._http.post(this.url + '/CrearTarifaPedido', params, {headers:this.headers})
  }

  fechaHoraEntrega():Observable<any>{
    return this._http.get(this.url + '/fechaHoraEntrega',{headers:this.headers})
  }

  agregarPedido(pedido:DatosPedido):Observable<any>{
    let params = JSON.stringify(pedido);
    return this._http.post(this.url + '/AgregarPedido', params, {headers:this.headers})
  }

  AgregarPagoPedido(PagoPedido: DetallePagoPedido):Observable<any>{
    let params = JSON.stringify(PagoPedido);
    return this._http.post(this.url + '/AgregarDetallePago', params, {headers:this.headers})
  }

  ObtenerListadoPedidoLiquidaciones(id):Observable<any>{
    return this._http.get(this.url + '/ListadoPagoLiquidaciones/'+id,{headers:this.headers})
  }

  AgregarLiquidaciones(parametro):Observable<any>{
    //let params = JSON.stringify(DatosLiquidacion);
    return this._http.post(this.url + '/AgregarLiquidaciones', parametro, {headers:this.headers})
  }

  AgregarDireccionMasivo(DatosDireccionMasivo: DatosDireccionMasivo):Observable<any>{
    let params = JSON.stringify(DatosDireccionMasivo);
    return this._http.post(this.url + '/AgregarDireccionMasivo', params, {headers:this.headers})
  }

  agregarPedidoMasivo(params):Observable<any>{
    //let params = JSON.stringify(pedido);
    return this._http.post(this.url + '/AgregarPedido', params, {headers:this.headers})
  }

  AgregarDetallePagoPedido(params):Observable<any>{
    //let params = JSON.stringify(PagoPedido);
    return this._http.post(this.url + '/AgregarDetallePago', params, {headers:this.headers})
  }

  InformacionTigo():Observable<any>{
    return this._http.get(this.url + '/InformacionTigo',{headers:this.headers})
  }

  InformacionSocioMensajeria(params):Observable<any>{
    return this._http.get(this.url + '/InformacionSocioMensajeria/'+params,{headers:this.headers})
  }

  EditarDatosDomiciliar(EditarDatosDomiciliar: EditarDatosDomiciliar):Observable<any>{
    let params = JSON.stringify(EditarDatosDomiciliar);
    return this._http.post(this.url + '/EditarDomiciliar', params, {headers:this.headers})
  }

  ObtenerDomiciliarSeleccionado(id):Observable<any>{
    return this._http.get(this.url + '/ObtenerDomiciliarSeleccionado/'+id,{headers:this.headers})
  }

  ObtenerListadoDomiciliar():Observable<any>{
    return this._http.get(this.url + '/ObtenerListadoDomiciliar',{headers:this.headers})
  }

  CrearDatosDomiciliar(DatosDomiciliar: DatosDomiciliar):Observable<any>{
    let params = JSON.stringify(DatosDomiciliar);
    return this._http.post(this.url + '/AgregarDomiciliar', params, {headers:this.headers})
  }

  edicionMontoPedido(DatosMontoPedidos: DatosMontoPedido):Observable<any>{
    let params = JSON.stringify(DatosMontoPedidos)
    return this._http.post(this.url + '/EdicionMontoCobroPedido',params,{headers:this.headers})
  }

  obtenerDatosDireccionClienteCF(id):Observable<any>{
    return this._http.get(this.url + '/obtenerDatosDireccionClienteCF/'+id,{headers:this.headers})
  }

  obtenerDatosClienteCF():Observable<any>{
    return this._http.get(this.url + '/obtenerDatosClienteCF',{headers:this.headers})
  }

  ObtenerSector():Observable<any>{
    return this._http.get(this.url + '/ObtenerSector',{headers:this.headers})
  }

  AgregarDatosTarifa(DatosTarifa: DatosTarifa):Observable<any>{
    let params = JSON.stringify(DatosTarifa);
    return this._http.post(this.url + '/CrearRutaTarifa', params, {headers:this.headers})
  }

  ObtenerTarifaRuta():Observable<any>{
    return this._http.get(this.url + '/ObtenerTarifaRuta',{headers:this.headers})
  }

  EditarDatosTarifa(EditarDatosTarifa: EditarDatosTarifa):Observable<any>{
    let params = JSON.stringify(EditarDatosTarifa);
    return this._http.post(this.url + '/EditarRutaTarifa', params, {headers:this.headers})
  }

  ObtenerRutaTarifa():Observable<any>{
    return this._http.get(this.url + '/ObtenerRutaTarifa',{headers:this.headers})
  }

  ObtenerRuta():Observable<any>{
    return this._http.get(this.url + '/ObtenerRuta',{headers:this.headers})
  }

  AgregarDatosRuta(DatosRuta: DatosRuta):Observable<any>{
    let params = JSON.stringify(DatosRuta);
    return this._http.post(this.url + '/CrearRuta', params, {headers:this.headers})
  }

  EditarDatosRuta(EditarDatosRuta: EditarDatosRuta):Observable<any>{
    let params = JSON.stringify(EditarDatosRuta);
    return this._http.post(this.url + '/EditarRuta', params, {headers:this.headers})
  }

  EditarrDatosSector(EditarDatosSector: EditarDatosSector):Observable<any>{
    let params = JSON.stringify(EditarDatosSector);
    return this._http.post(this.url + '/EditarSector', params, {headers:this.headers})
  }

  AgregarDatosSector(DatosSector: DatosSector):Observable<any>{
    let params = JSON.stringify(DatosSector);
    return this._http.post(this.url + '/CrearSector', params, {headers:this.headers})
  }

  DeBajaDomiciliar(parametro):Observable<any>{
    let params = JSON.stringify(parametro);
    return this._http.post(this.url + '/DeBajaDomiciliar', params, {headers:this.headers})
  }

  CreacionMisionOptacheckEntrega(CreacionMisionOptacheck:CreacionMisionOptacheck):Observable<any>{
    let params = JSON.stringify(CreacionMisionOptacheck);    
    return this._http.post(this.url + '/optacheck/misionEntrega', params, {headers:this.headers})
  }

  CreacionMisionOptacheckRecepcion(CreacionMisionOptacheck:CreacionMisionOptacheck):Observable<any>{
    let params = JSON.stringify(CreacionMisionOptacheck);    
    return this._http.post(this.url + '/optacheck/misionRecepcion', params, {headers:this.headers})
  }

  EnvioCorreo(IdPedido):Observable<any>{
    return this._http.post(this.url + '/envioCorreo/'+IdPedido, {headers:this.headers})
  }

  EliminarMisionOptacheck(IdMision):Observable<any>{
    return this._http.get(this.url + '/optacheck/eliminarMision/'+IdMision, {headers:this.headers})
  }

  MisionRespuestaEntrega(Mision):Observable<any>{   
    return this._http.post(this.url + '/optacheck/misionRespuestaEntrega',Mision, {headers:this.headers})
  }

}

