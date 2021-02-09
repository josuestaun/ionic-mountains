import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MountaindbService } from '../core/mountainsdb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMountain } from '../share/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  mountain: IMountain;
  mountainForm: FormGroup;
  constructor(
    private router: Router,
    private moviedbService: MountaindbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.mountainForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      altura: new FormControl(''),
      desnivel: new FormControl(''),
      tiempo: new FormControl(''),
      imagen: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar montaña',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveMountain();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveMountain() {
    this.mountain = this.mountainForm.value;
    let nextKey = this.mountain.nombre.trim();
    this.mountain.id = nextKey;
    this.moviedbService.setItem(nextKey, this.mountain);
    console.warn(this.mountainForm.value);
  }
}
