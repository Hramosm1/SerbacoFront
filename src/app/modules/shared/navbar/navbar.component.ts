import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {

  //#region  Atributos - desplegar el menu y submenu
    public isCollapse = true;
    public isSubmenuPedido = false;
    public isSubmenuMantenimiento = false;
    public isSubmenuCargasMasivas = false;
    public isSubmenuReporteria = false;
  //#endregion

  //#region Atributos - datos del usuario
    public identity;
    public usuario;
  //#endregion

  constructor(private elementRef:ElementRef,private _router:Router, private _userService:UserService) { 
    this.identity = _userService.getIdentity();
  }

  ngOnInit(){
    this.perfil()
  }

  //#region Metodo - desplegar el submenu y menu
    Collapse(): void{
      let foo = this.isCollapse;
      this.isCollapse = foo === false ? true : false;
      this.isSubmenuPedido = false;
      this.isSubmenuMantenimiento = false;
      this.isSubmenuCargasMasivas = false;
      this.isSubmenuReporteria = false;
    }

    SubmenuPedido(): void{
      let foo = this.isSubmenuPedido;
      this.isSubmenuPedido = foo === false ? true : false;
      this.isSubmenuMantenimiento = false;
      this.isSubmenuCargasMasivas = false;
      this.isSubmenuReporteria = false;
    }

    SubmenuMantenimiento(): void{
      let foo = this.isSubmenuMantenimiento;
      this.isSubmenuMantenimiento = foo === false ? true : false;
      this.isSubmenuPedido = false;
      this.isSubmenuCargasMasivas = false;
      this.isSubmenuReporteria = false;
    }

    SubmenuCargasMasivas(): void{
      let foo = this.isSubmenuCargasMasivas;
      this.isSubmenuCargasMasivas = foo === false ? true : false;
      this.isSubmenuPedido = false;
      this.isSubmenuMantenimiento = false;
      this.isSubmenuReporteria = false;
    }

    SubmenuReporteria(): void{
      let foo = this.isSubmenuReporteria;
      this.isSubmenuReporteria = foo === false ? true : false;
      this.isSubmenuPedido = false;
      this.isSubmenuMantenimiento = false;
      this.isSubmenuCargasMasivas = false;
    }
  //#endregion
  
  //#region Metodo - Informacion del usuario logueado
    logout(){
      sessionStorage.clear();
      // this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      //   this._router.navigate(['auth/login']));
                  // window.location.reload()

      // this._router.navigate(['auth/login']);    
      this._router.navigate(['auth/login'])
      .then(() => {
        window.location.reload();
      });
    }

    perfil(): void{
      this.usuario = this.identity.usuarioLogueado;

    }
  //#endregion
  
}
