import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/Usuario.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public status;
  public token = null;
  public token2;
  public identity2;
  public identity;
  public ruta = ActivatedRoute;

  constructor(private _userService: UserService, private _router: Router, private zone: NgZone) {
    this.user = new User('', '')
    this.token2 = _userService.getToken();
  }

  ngOnInit() {
    // window.location.reload()
    // this._router.routeReuseStrategy.shouldReuseRoute = () => tru;
  }

  // cleanVariable(){
  //   this.usuario = new User('','')
  // }

  // reloadPage(){
  //   window.location.reload();
  // }

  //   reloadPage() { // click handler or similar
  //     this.zone.runOutsideAngular(() => {
  //         location.reload();
  //     });
  // }
  public gettoken() {
    this._userService.login(this.user, 'true').subscribe(
      response => {
        this.token = response.prueba;
        if (this.token.length <= 0) this.status = 'error'
        else {
          sessionStorage.setItem('token', this.token)
        }
      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) this.status = 'error';
      }
    )
  }

  login() {
    this._userService.login(this.user).subscribe(
      response => {
        this.identity2 = response.mensaje2;
        this.token = response.prueba;
        this.identity = response.user;

        if (!this.token) {
          if (this.identity2 == 'La contraseña es incorrecta') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La contraseña es incorrecta',
            })
          } else if (this.identity2 == 'Se ha excedido el número de intentos para loguearse') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha excedido el número de intentos para loguearse',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El usuario no existe',
            })
          }
          this.status = 'error';
        } else {
          sessionStorage.setItem('identity', JSON.stringify(this.identity));
          if (this.identity2 == 'Se ha logeado exitosamente') {
            // Swal.fire({
            //   icon: 'success',
            //   title: 'FELICIDADES',
            //   text: 'Ha ingresado exitosamente',
            //   timer: 2500
            // })

            sessionStorage.setItem('token', this.token)
            // window.location.reload()

              // Navigates to start page first to "destroy" detail components if on same url
              this._router.navigate(['listadoPedido/listadoPedido'])
              .then(() => {
                window.location.reload();
              });
              // this._router.navigate(['/']).then(() => {
              //   // Then navigates to desired url 
              //   // let navigationExtras: NavigationExtras = { queryParams: { 'id': id} };
              //   this._router.navigate(['listadoPedido/listadoPedido']);
              // });
          
            // this._router.navigate(['listadoPedido/listadoPedido'])
            // this._router.navigate(['listadoPedido/listadoPedido'])
            // window.location.reload()
            this.status = 'ok'

          }
        }
      },
      error => {
        var errorMessage = <any>error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error de conexión con la base de datos, favor notificarlo a desarrollo',
        })
      }
    )
  }

}
