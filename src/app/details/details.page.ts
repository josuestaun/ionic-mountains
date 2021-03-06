import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MountaindbService } from '../core/mountainsdb.service';
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
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.mountaindbService.getItem(this.id).then(
      (data: IMountain) => this.mountain = data
    );
  }

  editRecord(mountain) {
    this.router.navigate(['edit', mountain.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.mountaindbService.remove(id);
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
