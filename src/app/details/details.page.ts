import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MountaindbService } from '../core/mountainsdb.service';
import {MountaincrudService} from '../core/mountaincrud.service';
import { IMountain } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public mountain: IMountain;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mountaindbService: MountaindbService,
    private mountaincrudService: MountaincrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;

    //Firebase
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
        }
      });

      console.log(this.mountain);
    });
  }

  editRecord(mountain) {
    this.router.navigate(['edit', mountain.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar montaña',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.mountaincrudService.delete_Mountain(this.mountain.id);
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
}
