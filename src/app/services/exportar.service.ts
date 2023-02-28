import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import * as moment from 'moment'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx' 

@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  constructor() { }

  exportToExcel(json:any[],excelFileName: string):void{
    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook : XLSX.WorkBook = {
        Sheets : {'data':worksheet},
        SheetNames : ['data']
      };
    const excelBuffer : any = XLSX.write(workbook , {bookType: 'xlsx', type:'array'})
    //call method bufeer and  fileName
    this.saveAsExcel(excelBuffer,excelFileName);
  }

  private saveAsExcel(buffer:any, fileName:string):void{
    let newDate = new Date()
    let parameter = moment(newDate).format('YYYY/MM/DD')

    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName = 'ReporteSerbaco' + parameter + EXCEL_EXT);
  }
}
