import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ExportarService } from 'src/app/services/exportar.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
import { DatosLiquidaciones } from 'src/app/models/Liquidacion/DatosLiquidaciones.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
  providers: [UserService, PedidoService, ExportarService]
})
export class LiquidacionComponent implements OnInit {
  //#region Atributos - parametros para los datos del usuario logueado
  public token;
  public identity;
  public status;
  public usuario;
  public loading: boolean;
  public rolSocio = 0;
  public obtenerListadoPedidoFecha;
  //#endregion
  //#region Atributos - flies upload
  public fileUpload = null
  public files: NgxFileDropEntry[] = [];
  public arrayBuffers;
  public jsonExcel;
  public pageChange = 1;
  public verDatos = 0;
  public nombresColumnas;
  public nombresColumnasEspacio;
  public nombreHoja;
  public listaJson = []
  public valoresJson;
  //#endregion
  //#region Atributos - parametros para filtros de fecha
  public buscadorFecha;
  public fechaFin;
  public DatosLiquidaciones: DatosLiquidaciones
  //#endregion
  constructor(private _userServices: UserService, private _router: Router, private _pedidoServices: PedidoService, private _exportExcelServices: ExportarService) {
    this.token = _userServices.getToken();
    this.identity = _userServices.getIdentity();
    this.DatosLiquidaciones = new DatosLiquidaciones('', '', 0, 0);
  }

  ngOnInit() {
  }

  //#region Metodos -  realiza la obtencion de datos por medio de la fecha
  descargarExcel() {
    if (this.fechaFin != null) {
      this._exportExcelServices.exportToExcel(this.obtenerListadoPedidoFecha, 'my_export')
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Seleccione la fecha final',
        text: 'Debe de seleccionar el rango de fecha para descargar el archivo excel',
      })
    }
  }

  obtenerFechaFin(params) {
    this.fechaFin = params.target.value;

    let parametro = this.fechaFin

    this._pedidoServices.ObtenerListadoPedidoLiquidaciones(parametro).subscribe(
      response => {
        let params = response.request;
        this.obtenerListadoPedidoFecha = params;

      }, error => {
        var erroMessage = <any>error;
        if (erroMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  //#endregion
  
  //#region drag and drop
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          var tipoArchivo = file.name
          var formato = tipoArchivo.slice(-5)

          //Validar que el formato sea .xlsx
          if (formato == ".xlsx") {

            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
              const bstr: string = e.target.result;

              //Lectura del archivo excel
              const wb: XLSX.WorkSheet = XLSX.read(bstr, { type: 'binary' })
              const jDatos = [];
              var nombreHoja = wb.SheetNames; // regresa un array

              //Validacion de los nombres de las hojas
              for (let i = 0; i < nombreHoja.length; i++) {
                let datos = XLSX.utils.sheet_to_json(wb.Sheets[nombreHoja[i]], { raw: true, defval: 'null' });
                for (let i = 0; i < datos.length; i++) {
                  const dato = datos[i];
                  jDatos.push({ ...(dato as []) });
                };
              }

              this.jsonExcel = jDatos;

              if (this.jsonExcel.length != 0) {
                this.nombresColumnas = Object.keys(jDatos[0])
                for (let i = 0; i < this.nombresColumnas.length; i++) {
                  this.nombresColumnasEspacio = this.nombresColumnas[i].replace(/ /g, "");
                }

                for (let index = 0; index < jDatos.length; index++) {
                  this.valoresJson = Object.values(jDatos[index])
                  //let params = this.valoresJson
                  this.listaJson.push(this.valoresJson)

                  // JSON.stringify(this.listaJson)
                }
              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Sin contenido',
                  text: 'El archivo de liquidación, se encuentra vacío, por lo que no se puede realizar el proceso',
                })
              }


            }
            reader.readAsBinaryString(file);
          } else {
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

  crearProceso() {
    this.DatosLiquidaciones.UsuarioRegistro = this.identity.IdUsuarioLog;
    if (this.jsonExcel.length != 0) {
      for (let i = 0; i < this.jsonExcel.length; i++) {
        this.DatosLiquidaciones.IdDetalleImportePedido = this.jsonExcel[i].IdDetalle;
        this.DatosLiquidaciones.Observacion = this.jsonExcel[i].Observacion;
        this.DatosLiquidaciones.Liquidacion = this.jsonExcel[i].Liquidacion;

        if (this.jsonExcel[i].IdDetalle != 'null') {
          let params = JSON.stringify(this.DatosLiquidaciones)
          console.log(params);
          
          this._pedidoServices.AgregarLiquidaciones(params).subscribe(
            response => {
              let mensaje = response.message;
              if (response.message == 'Se ha creado exitosamente la liquidacion') {
                Swal.fire({
                  icon: 'info',
                  title: 'Liquidación completada',
                  text: mensaje,
                })
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
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin contenido',
        text: 'El archivo de liquidación, se encuentra vacío, por lo que no se puede realizar el proceso',
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

}
