import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MountaindbService } from '../core/mountainsdb.service';
import {MountaincrudService} from '../core/mountaincrud.service';
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
    private mountaincrudService: MountaincrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
        /*Creo formulario vacío*/
        this.mountainForm = new FormGroup({
          nombre: new FormControl(''),
          descripcion: new FormControl(''),
          altura: new FormControl(''),
          desnivel: new FormControl(''),
          tiempo: new FormControl(''),
          imagen: new FormControl(''),
        });
    this.id = this.activatedrouter.snapshot.params.id;
    
      //firebase
      this.mountaincrudService.read_Mountains().subscribe(data => {
        let mountains = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nombre: e.payload.doc.data()['nombre'],
            descripcion: e.payload.doc.data()['descripcion'],
            altura: e.payload.doc.data()['altura'],
            desnivel: e.payload.doc.data()['desnivel'],
            tiempo: e.payload.doc.data()['tiempo'],
            imagen: e.payload.doc.data()['imagen']
          };
        })
  
        mountains.forEach(element => {
          if(element.id == this.id){
            this.mountain = element;
            this.mountainForm.get('nombre').setValue(this.mountain.nombre),
            this.mountainForm.get('descripcion').setValue(this.mountain.descripcion),
            this.mountainForm.get('altura').setValue(this.mountain.altura),
            this.mountainForm.get('desnivel').setValue(this.mountain.desnivel),
            this.mountainForm.get('tiempo').setValue(this.mountain.tiempo),
            this.mountainForm.get('imagen').setValue(this.mountain.imagen)
          }
        });
  
        console.log(this.mountain);
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
    //Firebase
    this.mountain.nombre = this.mountainForm.get('nombre').value;
    this.mountain.descripcion = this.mountainForm.get('descripcion').value;
    this.mountain.altura = this.mountainForm.get('altura').value;
    this.mountain.desnivel = this.mountainForm.get('desnivel').value;
    this.mountain.tiempo = this.mountainForm.get('tiempo').value;
    this.mountain.imagen = this.mountainForm.get('imagen').value;
    this.mountaincrudService.update_Mountain(this.mountain.id, this.mountain);
  }
} 
