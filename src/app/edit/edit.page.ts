import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MountaindbService } from '../core/mountainsdb.service';
import { IMountain } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  public mountain: IMountain;
  mountainForm:FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mountaindbService: MountaindbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.mountaindbService.getItem(this.id).then(
      (data: IMountain) => {
        
        this.mountain = data;
        
        this.mountainForm.get('nombre').setValue(this.mountain.nombre),
        this.mountainForm.get('descripcion').setValue(this.mountain.descripcion),
        this.mountainForm.get('altura').setValue(this.mountain.altura),
        this.mountainForm.get('desnivel').setValue(this.mountain.desnivel),
        this.mountainForm.get('tiempo').setValue(this.mountain.tiempo),
        this.mountainForm.get('imagen').setValue(this.mountain.imagen)
      
      })
    /*Creo formulario vacío*/
    this.mountainForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      altura: new FormControl(''),
      desnivel: new FormControl(''),
      tiempo: new FormControl(''),
      imagen: new FormControl(''),
    });

  }

  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Actualizar Montaña',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.updateMountain();
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

  updateMountain() {
    this.mountain = this.mountainForm.value;
    let nextKey = this.mountain.nombre.trim();
    this.mountain.id = nextKey;
    //primero la borro
    this.mountaindbService.remove(this.id);
    //Luego creo otra con los nuevos valores
    this.mountaindbService.setItem(this.id, this.mountain);
    console.warn(this.mountainForm.value);
  }
}
