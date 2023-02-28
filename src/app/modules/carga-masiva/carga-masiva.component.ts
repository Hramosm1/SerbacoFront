import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { comboSocio } from 'src/app/models/ComboBox/ComboSocio.model';
import { DatosContactoMasivo } from 'src/app/models/CargaMasiva/DatosContactoMasivo.model';
import { DatosDireccionMasivo } from 'src/app/models/CargaMasiva/DatosDireccionMasivo.model';
import { DatosPedido } from 'src/app/models/Pedido/DatosPedido.model';
import { DetallePagoPedido } from 'src/app/models/Pedido/DetallePagoPedido.model';
import { DatosDireccionSocio } from 'src/app/models/Socio/DatosDireccionSocio.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';
import * as moment from 'moment'

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss'],
  providers: [UserService, PedidoService]
})
export class CargaMasivaComponent implements OnInit {
  //#region Atributos - parametros para los datos del usuario logueado
    public token;
    public identity;
    public status;
    public usuario;
    public loading: boolean;
    public rolSocio = 0;
  //#endregion

  //#region Atributos - listado de los socios
    public comboSocio : comboSocio;
    public keyword10 = 'Socio';
    public IdSocio = 0;
    public keyword1 = 'Direccion'
    public obtenerDireccionesSocio;
    public IdDireccion = 0;
    public Direccion = '';
    public Zona = '';
    public Colonia = '';
    public Municipio = '';
    public Departamento = '';
    public obtenerCuentaBancaria;
    public keyword9 = 'NumeroCuenta';
    public IdCuentaBancaria = 0;
  //#endregion

  //#region Atributos - flies upload
    public fileUpload = null
    public files: NgxFileDropEntry[] = [];
    public arrayBuffers;
    public jsonExcel = [];
    public pageChange = 1;
    public verDatos = 0;
    public nombresColumnas;
    public nombresColumnasEspacio;
    public nombreHoja;
    public listaJson
    public valoresJson = [];
    public dato;
  //#endregion

  //#region Atributos - obtener id de las direcciones y contacto
    public IdMunicipio;
    public IdZona;
    public IdColonia;
    public IdContacto;
    public IdTelefono;
    public IdDireccionEntrega;
  //#endregion

  //#region Atributos - modelos para agregar los datos masivos
    public DatosContactoMasivo : DatosContactoMasivo
    public DatosDireccionMasivo : DatosDireccionMasivo
    public DatosPedido : DatosPedido
    public DatosDireccion : DatosDireccionSocio
    public DatosDetallePedido : DetallePagoPedido
  //#endregion
  
  constructor(private _userServices:UserService, private _router:Router, private _pedidoServices: PedidoService,) { 
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.DatosContactoMasivo = new DatosContactoMasivo('',0,'',0);
    this.DatosDireccionMasivo = new DatosDireccionMasivo('','','','',0,'',0);
    this.DatosPedido = new DatosPedido(0,0,0,0,0,0,'',0,0,'','',0,'','',0);
    this.DatosDireccion = new DatosDireccionSocio(0,0,'',0,0,0,0,0,'',0,0);
    this.DatosDetallePedido = new DetallePagoPedido(0,0,0,0,0,0);
  }

  ngOnInit(){
    this.obtenerSocio();
  }

  //#region Metodos - Obtener el listado de los socios
    listarDireccionSocio(params){
      this._pedidoServices.listaDireccionesSocio(params).subscribe(
        response=>{
          let params = response.request;
          this.obtenerDireccionesSocio = params;
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

    getIdCliente(params){
      this.IdSocio = params.IdSocio
      this.listarDireccionSocio(params.IdSocio)
      this.ObtenerCuentasBancariasSocio(params.IdSocio)
    }

    getIdDireccion(params){
      this.IdDireccion = params.IdDireccion;
      this.Direccion = params.Direccion;
      this.Zona = params.Zona;
      this.Colonia = params.Colonia;
      this.Municipio = params.Municipio;
      this.Departamento = params.Departamento;

    }

    obtenerIdCuentaBancaria(params){
      this.IdCuentaBancaria = params.IdNumeroCuenta;
    }

    ObtenerCuentasBancariasSocio(params){
      this._pedidoServices.listarDatosFinancieros(params).subscribe(
        response=>{
          let params = response.request;
          this.obtenerCuentaBancaria = params;

        },error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if (erroMessage != null) {
            this.status = 'error';
          }
        }
      )
    }
  //#endregion
  //#region funcion para el draw and drop
    public dropped(files: NgxFileDropEntry[]) {
      this.jsonExcel = []
      this.files = files;
      for (const droppedFile of files) {
  
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
  
            var tipoArchivo = file.name
            var formato = tipoArchivo.slice(-5)
  
            //Validar que el formato sea .xlsx
            if(formato == ".xlsx"){
  
              const reader : FileReader = new FileReader();
              reader.onload =  (e : any)=>{
                const bstr : string = e.target.result;
  
                //Lectura del archivo excel
                const wb : XLSX.WorkSheet  = XLSX.read(bstr,{type: 'binary',cellDates:true})
                const jDatos = [];
                var nombreHoja = wb.SheetNames; // regresa un array
  
                //Validacion de los nombres de las hojas
                for(let i = 0; i < nombreHoja.length; i++){
                  this.nombreHoja = nombreHoja[i].match(/FormatoPedido/)
                }
  
                if(this.nombreHoja){
                    for(let i = 0; i < nombreHoja.length; i++){
                      let datos = XLSX.utils.sheet_to_json(wb.Sheets[nombreHoja[i]],{ raw: true,defval :'null' });
  
                      //console.log(datos.length == 0);
                      
                      if(datos.length == 0){
                        Swal.fire({
                          icon: 'info',
                          title: 'Archivo Excel',
                          text: 'El archivo se encuentra vacio, por lo que no se puede cargar ',
                        })
                      }else{
                        for (let i = 0; i < datos.length; i++) {
                          const dato = datos[i];
                          
                         
                            jDatos.push({...(dato as [])});
                          
                                                  
                        };
                        // console.log(jDatos);
                        
                        jDatos.forEach(element => {
                           if (element.NombreContacto == 'null' && element.Telefono == 'null' && element.DireccionContacto == 'null' 
                          && element.MunicipioEntrega == 'null') {
                              console.log('No se cargaron los datos');
                              
                            }else{
                              this.jsonExcel.push({
                                NombreContacto: element.NombreContacto,
                                Telefono : element.Telefono,
                                DireccionContacto : element.DireccionContacto,
                                MunicipioEntrega : element.MunicipioEntrega,
                                ZonaEntrega : element.ZonaEntrega,
                                ColoniaEntrega : element.ColoniaEntrega,
                                Fecha : element.Fecha,
                                SolicitudCobro : element.SolicitudCobro,
                                Monto : element.Monto,
                                Observacion : element.Observacion,
                                Especificaciones : element.Especificaciones
                              })
                            }
                        });
                        
                        console.log(this.jsonExcel);
                        
                        this.listaJson = jDatos
                        this.verDatos = 1
  
                        // Obtener el nombres de las columnas
                        this.nombresColumnas = Object.keys(jDatos[0])
                        for(let i=0; i < this.nombresColumnas.length; i++){
                          this.nombresColumnasEspacio = this.nombresColumnas[i].replace(/ /g,"");
                        }
                      }              
                    }
                  }else{
                    let mensaje = 'El nombre de las hojas del archivo excel, debe de iniciar con FormatoPedido, para ' +
                      'poder realizar el proceso de carga masiva'
  
                    this.verDatos = 1
                    Swal.fire({
                      icon: 'info',
                      title: 'Nombre de las hojas',
                      text: mensaje
                    })
                  }
              }
              reader.readAsBinaryString(file);
            }else{
              Swal.fire({
                icon: 'info',
                title: 'Formato del archivo',
                text: 'El formato del archivo para realizar el proceso debe de ser .xlsx',
              })
            }
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
  
    realizarProceso() {
      let cont = 0;
      if (this.IdSocio != 0) {
        if (this.IdDireccion != 0) {
          if (this.IdCuentaBancaria != 0) {
            Swal.fire({
              title: 'Creación de cargar masiva',
              text: "¿Se encuentra seguro de realizar el proceso de la carga masiva del pedido?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#FF8000',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Iniciar proceso',
              cancelButtonText: 'Cancelar'
        
            }).then((result) => {
              if (result.isConfirmed) {
                this.DatosDireccionMasivo.IdSocio = this.IdSocio;
                this.DatosDireccionMasivo.IdUsuario = this.identity.IdUsuarioLog;
        
                for (let i = 0; i < this.jsonExcel.length; i++) {
        
                  if (this.jsonExcel[i].NombreContacto == 'null' || this.jsonExcel[i].NombreContacto == '') {
                    Swal.fire({
                      icon: 'info',
                      title: 'Nombre del cliente vacío',
                      text: 'El campo nombre del cliente se encuentra vacío',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  } else if (this.jsonExcel[i].Telefono == "null" || this.jsonExcel[i].Telefono.length >= 10 || this.jsonExcel[i].Telefono == "") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Telefono del cliente incorrecto',
                      text: 'El número de teléfono del cliente se encuentra vacío o no cumple con el formato establecido de nueve dígitos',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  } else if (this.jsonExcel[i].DireccionContacto == "null" || this.jsonExcel[i].DireccionContacto == "") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Dirección del cliente se encuentra vacío',
                      text: 'La dirección de entrega del pedido se encuentra vacío',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  } else if (this.jsonExcel[i].MunicipioEntrega == "null" || this.jsonExcel[i].MunicipioEntrega == "") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Municipio de entrega se encuentra vacío',
                      text: 'La celda de Municipio de entrega del pedido se encuentra vacío',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  } else if (this.jsonExcel[i].ZonaEntrega == 'null' && this.jsonExcel[i].ColoniaEntrega != "null") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Error con la zona y colonia de entrega',
                      text: 'La zona de entrega se encuentra vacía, por lo que NO se debe de colocar ningúna colonia, ya que no se tiene referencia de que zona pertenece',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  }else if (this.jsonExcel[i].Fecha == 'N/A' || this.jsonExcel[i].Fecha == "n/A" || this.jsonExcel[i].Fecha == "N/a" || this.jsonExcel[i].Fecha == "null" || this.jsonExcel[i].Fecha == "") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Error en la fecha de entrega',
                      text: 'La fecha de entrega no se ha colocado, y debe de ser con el formato dd/mm/yyyy',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  }else if (this.jsonExcel[i].SolicitudCobro == 'N/A' || this.jsonExcel[i].SolicitudCobro == "n/A" || this.jsonExcel[i].SolicitudCobro == "N/a" || this.jsonExcel[i].SolicitudCobro == "null" || this.jsonExcel[i].SolicitudCobro == "") {
                    Swal.fire({
                      icon: 'info',
                      title: 'Solicitud de cobro incorrecta',
                      text: 'La solicitud de cobro debe de ser SI/NO, para realizar el cobro del pedido',
                      footer: 'Error en la fila: ' + i
        
                    })
                    break;
                  }
  
  
                  else {
                    cont += 1;
                  }
                }
                
                  if (cont == this.jsonExcel.length) {
                    for (let i = 0; i < this.jsonExcel.length; i++) {
                      if (this.jsonExcel[i].ZonaEntrega == "null") {
                        this.DatosDireccionMasivo.Zona = "NULL";
                        this.DatosDireccionMasivo.Colonia = "NULL";
                        this.DatosDireccionMasivo.Municipio = this.jsonExcel[i].MunicipioEntrega;
                        this.DatosDireccionMasivo.Nombre = this.jsonExcel[i].NombreContacto;
                        this.DatosDireccionMasivo.Telefono = this.jsonExcel[i].Telefono;
          
                        console.log(this.jsonExcel[i].Fecha);
                        let fecha = new Date(this.jsonExcel[i].Fecha)
                        let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
                        
                        this._pedidoServices.AgregarDireccionMasivo(this.DatosDireccionMasivo).subscribe(
                          response => {
                            let mensaje = response.message;
                            if (response.message == 'Se ha creado exitosamente la direccion masiva') {
                              this.IdMunicipio = response.IdMunicipioOutput
                              this.IdZona = response.IdZonaOutput
                              this.IdColonia = response.IdColoniaOutput
                              this.IdContacto = response.IdContactoOutput
                              this.IdTelefono = response.IdTelefonoOutput
          
                              this.DatosDireccion.Direccion = this.jsonExcel[i].DireccionContacto
                              this.DatosDireccion.IdColonia = this.IdColonia
                              this.DatosDireccion.IdContacto = this.IdContacto
                              this.DatosDireccion.IdDepartamento = 1;
                              this.DatosDireccion.IdMunicipio = this.IdMunicipio
                              this.DatosDireccion.IdSocio = this.IdSocio
                              this.DatosDireccion.IdTipoDireccion = 2;
                              this.DatosDireccion.IdUsuario = this.identity.IdUsuarioLog;
                              this.DatosDireccion.IdZona = this.IdZona;
                              this.DatosDireccion.Predeterminado = 1;
          
          
                              this._pedidoServices.agregarDireccionSocio(this.DatosDireccion).subscribe(
                                response => {
                                  let mensaje = response.message;
                                  if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                                    this.IdDireccionEntrega = response.IdDireccion
          
                                    if (this.jsonExcel[i].SolicitudCobro == 'si' || this.jsonExcel[i].SolicitudCobro == 'SI'
                                      || this.jsonExcel[i].SolicitudCobro == 'Si' || this.jsonExcel[i].SolicitudCobro == 'sI') {
                                      this.DatosPedido.SolicitudCobro = 1
                                      this.DatosPedido.IdFormaPago = 1
                                      this.DatosPedido.Observaciones = this.jsonExcel[i].Observacion
                                      this.DatosPedido.MontoCobro = this.jsonExcel[i].Monto
                                      this.DatosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                      this.DatosPedido.IdTipoPedido = 1
                                      this.DatosPedido.IdTelefono = this.IdTelefono
                                      this.DatosPedido.IdMoneda = 1
                                      this.DatosPedido.IdDireccionRecepcion = this.IdDireccion;
                                      this.DatosPedido.IdDireccionEntrega = this.IdDireccionEntrega;
                                      this.DatosPedido.IdCuentaBancaria = this.IdCuentaBancaria;
                                      this.DatosPedido.HoraAntesDe = '07:00'
                                      this.DatosPedido.HoraDespuesDe = '17:00'
                                      let fecha = new Date(this.jsonExcel[i].Fecha)
                                      let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
                                      this.DatosPedido.Especificaciones = this.jsonExcel[i].Especificaciones
                                      this.DatosPedido.FechaHoraEntrega = parameter
                                      let params = JSON.stringify(this.DatosPedido)
          
                                      console.log(params,'opcion 1');
                                      
                                      this._pedidoServices.agregarPedidoMasivo(params).subscribe(
                                        response => {
                                          let mensaje = response.message;
                                          if (response.message == 'Se ha creado exitosamente el pedido') {
                                            console.log(response.message);
                                            this.status = 'Ok'
                                            let IdPedido = response.IdPedido
          
                                            this.DatosDetallePedido.IdConceptoPago = 2;
                                            this.DatosDetallePedido.IdFormaPago = 1;
                                            this.DatosDetallePedido.IdMoneda = 1;
                                            this.DatosDetallePedido.IdPedido = IdPedido;
                                            this.DatosDetallePedido.IdUsuarioRegistro = this.identity.IdUsuarioLog;
                                            this.DatosDetallePedido.MontoCobro = this.jsonExcel[i].Monto;
                                            let parameter = JSON.stringify(this.DatosDetallePedido)
                                            this._pedidoServices.AgregarDetallePagoPedido(parameter).subscribe(
                                              response => {
                                                let mensaje = response.message;
                                                if (response.message == 'Se ha creado exitosamente el detalle del pago') {
                                                  this.status = 'Ok'
                                                } else {
                                                  Swal.fire(mensaje)
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
                                            Swal.fire(mensaje)
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
                                      this.DatosPedido.SolicitudCobro = 0
                                      this.DatosPedido.IdFormaPago = 1
                                      this.DatosPedido.Observaciones = this.jsonExcel[i].Observacion
                                      this.DatosPedido.MontoCobro = this.jsonExcel[i].Monto
                                      this.DatosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                      this.DatosPedido.IdTipoPedido = 1
                                      this.DatosPedido.IdTelefono = this.IdTelefono
                                      this.DatosPedido.IdMoneda = 1
                                      this.DatosPedido.IdDireccionRecepcion = this.IdDireccion;
                                      this.DatosPedido.IdDireccionEntrega = this.IdDireccionEntrega;
                                      this.DatosPedido.IdCuentaBancaria = this.IdCuentaBancaria;
                                      this.DatosPedido.HoraAntesDe = '07:00'
                                      this.DatosPedido.HoraDespuesDe = '17:00'
                                      let fechaPrueba = new Date((this.jsonExcel[0].Fecha * 24 * 60 * 60 * 1000))
                                      let fecha = new Date(this.jsonExcel[i].Fecha)
                                      let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
                                      this.DatosPedido.Especificaciones = this.jsonExcel[i].Especificaciones
                                      this.DatosPedido.FechaHoraEntrega = parameter
                                      let params = JSON.stringify(this.DatosPedido)
                                      console.log(params,'opcion 2');
                                      
                                      this._pedidoServices.agregarPedidoMasivo(params).subscribe(
                                        response => {
                                          let mensaje = response.message;
                                          if (response.message == 'Se ha creado exitosamente el pedido') {
                                            console.log(response.message);
                                            this.status = 'Ok'
                                            // Swal.fire({
                                            //   icon: 'success',
                                            //   title: 'Carga Masiva existosa',
                                            //   text: mensaje,
                                            // })
                                            // window.location.reload()
          
                                          } else {
                                            Swal.fire(mensaje)
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
          
                      } else {
                        this.DatosDireccionMasivo.Zona = this.jsonExcel[i].ZonaEntrega
                        this.DatosDireccionMasivo.Colonia = this.jsonExcel[i].ColoniaEntrega;
          
                        this.DatosDireccionMasivo.Municipio = this.jsonExcel[i].MunicipioEntrega;
                        this.DatosDireccionMasivo.Nombre = this.jsonExcel[i].NombreContacto;
                        this.DatosDireccionMasivo.Telefono = this.jsonExcel[i].Telefono;
                        
                        console.log(this.jsonExcel[i].Fecha);
                        let fecha = new Date(this.jsonExcel[i].Fecha)
                        let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
                        console.log(parameter);
                        
          
                        this._pedidoServices.AgregarDireccionMasivo(this.DatosDireccionMasivo).subscribe(
                          response => {
                            let mensaje = response.message;
                            if (response.message == 'Se ha creado exitosamente la direccion masiva') {
                              this.IdMunicipio = response.IdMunicipioOutput
                              this.IdZona = response.IdZonaOutput
                              this.IdColonia = response.IdColoniaOutput
                              this.IdContacto = response.IdContactoOutput
                              this.IdTelefono = response.IdTelefonoOutput
          
                              this.DatosDireccion.Direccion = this.jsonExcel[i].DireccionContacto
                              this.DatosDireccion.IdColonia = this.IdColonia
                              this.DatosDireccion.IdContacto = this.IdContacto
                              this.DatosDireccion.IdDepartamento = 1;
                              this.DatosDireccion.IdMunicipio = this.IdMunicipio
                              this.DatosDireccion.IdSocio = this.IdSocio
                              this.DatosDireccion.IdTipoDireccion = 2;
                              this.DatosDireccion.IdUsuario = this.identity.IdUsuarioLog;
                              this.DatosDireccion.IdZona = this.IdZona;
                              this.DatosDireccion.Predeterminado = 1;
          
          
                              this._pedidoServices.agregarDireccionSocio(this.DatosDireccion).subscribe(
                                response => {
                                  let mensaje = response.message;
                                  if (response.message == 'Se ha creado exitosamente la direccion del socio') {
                                    this.IdDireccionEntrega = response.IdDireccion
          
                                    if (this.jsonExcel[i].SolicitudCobro == 'si' || this.jsonExcel[i].SolicitudCobro == 'SI'
                                      || this.jsonExcel[i].SolicitudCobro == 'Si' || this.jsonExcel[i].SolicitudCobro == 'sI') {
                                      this.DatosPedido.SolicitudCobro = 1
                                      this.DatosPedido.IdFormaPago = 1
                                      this.DatosPedido.Observaciones = this.jsonExcel[i].Observacion
                                      this.DatosPedido.MontoCobro = this.jsonExcel[i].Monto
                                      this.DatosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                      this.DatosPedido.IdTipoPedido = 1
                                      this.DatosPedido.IdTelefono = this.IdTelefono
                                      this.DatosPedido.IdMoneda = 1
                                      this.DatosPedido.IdDireccionRecepcion = this.IdDireccion;
                                      this.DatosPedido.IdDireccionEntrega = this.IdDireccionEntrega;
                                      this.DatosPedido.IdCuentaBancaria = this.IdCuentaBancaria;
                                      this.DatosPedido.HoraAntesDe = '07:00'
                                      this.DatosPedido.HoraDespuesDe = '17:00'
                                      let fecha = new Date(this.jsonExcel[i].Fecha)
                                      let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
                                      this.DatosPedido.Especificaciones = this.jsonExcel[i].Especificaciones
                                      this.DatosPedido.FechaHoraEntrega = parameter
                                      let params = JSON.stringify(this.DatosPedido)
          
                                      console.log(params,'opcion 3');
                                      
                                      this._pedidoServices.agregarPedidoMasivo(params).subscribe(
                                        response => {
                                          let mensaje = response.message;
                                          if (response.message == 'Se ha creado exitosamente el pedido') {
                                            console.log(response.message);
                                            this.status = 'Ok'
                                            let IdPedido = response.IdPedido
          
                                            this.DatosDetallePedido.IdConceptoPago = 2;
                                            this.DatosDetallePedido.IdFormaPago = 1;
                                            this.DatosDetallePedido.IdMoneda = 1;
                                            this.DatosDetallePedido.IdPedido = IdPedido;
                                            this.DatosDetallePedido.IdUsuarioRegistro = this.identity.IdUsuarioLog;
                                            this.DatosDetallePedido.MontoCobro = this.jsonExcel[i].Monto;
                                            let parameter = JSON.stringify(this.DatosDetallePedido)
          
                                            this._pedidoServices.AgregarDetallePagoPedido(parameter).subscribe(
                                              response => {
                                                let mensaje = response.message;
                                                if (response.message == 'Se ha creado exitosamente el detalle del pago') {
                                                  this.status = 'Ok'
                                                  Swal.fire({
                                                    icon: 'success',
                                                    title: 'Carga Masiva existosa',
                                                    text: mensaje,
                                                  })
                                                  window.location.reload()
          
                                                } else {
                                                  Swal.fire(mensaje)
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
                                            Swal.fire(mensaje)
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
                                      this.DatosPedido.SolicitudCobro = 0
                                      this.DatosPedido.IdFormaPago = 1
                                      this.DatosPedido.Observaciones = this.jsonExcel[i].Observacion
                                      this.DatosPedido.MontoCobro = this.jsonExcel[i].Monto
                                      this.DatosPedido.IdUsuario = this.identity.IdUsuarioLog;
                                      this.DatosPedido.IdTipoPedido = 1
                                      this.DatosPedido.IdTelefono = this.IdTelefono
                                      this.DatosPedido.IdMoneda = 1
                                      this.DatosPedido.IdDireccionRecepcion = this.IdDireccion;
                                      this.DatosPedido.IdDireccionEntrega = this.IdDireccionEntrega;
                                      this.DatosPedido.IdCuentaBancaria = this.IdCuentaBancaria;
                                      this.DatosPedido.HoraAntesDe = '07:00'
                                      this.DatosPedido.HoraDespuesDe = '17:00'
  
                                      let fecha = new Date(this.jsonExcel[i].Fecha)
                                      let parameter = moment(fecha).format('YYYY-MM-DDT00:00:00')
  
                                      this.DatosPedido.Especificaciones = this.jsonExcel[i].Especificaciones
                                      this.DatosPedido.FechaHoraEntrega = this.jsonExcel[i].Fecha
                                      let params = JSON.stringify(this.DatosPedido)
          
                                      console.log(fecha,'opcion 4');
                                      this._pedidoServices.agregarPedidoMasivo(params).subscribe(
                                        response => {
                                          let mensaje = response.message;
                                          if (response.message == 'Se ha creado exitosamente el pedido') {
                                            console.log(response.message);
                                            this.status = 'Ok'
                                            Swal.fire({
                                              icon: 'success',
                                              title: 'Carga Masiva existosa',
                                              text: mensaje,
                                            })
                                            window.location.reload()
          
                                          } else {
                                            Swal.fire(mensaje)
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
                    }
                  }
                }
              
              if(result.isDismissed){
                Swal.fire('No se ha podido realizar proceso ', '', 'info')
              }
            })
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Seleccione la cuenta bancaria del socio',
              text: 'Debe de seleccionar la cuenta bancaria del socio, para continuar con el proceso de carga masiva',
            })
          }
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Seleccione la direccion del socio',
            text: 'Debe de seleccionar la direccion del socio, para realizar la recepcion del pedido y continuar con el proceso de carga masiva',
          })
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Seleccione el socio',
          text: 'Debe de seleccionar el socio para realizar el proceso de la carga masiva',
        })
      }
    }
  
  
  
    public fileOver(event){
      console.log(event,'entro aqui 3');
    }
  
    public fileLeave(event){
      console.log(event,'entro aqui 4');
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
