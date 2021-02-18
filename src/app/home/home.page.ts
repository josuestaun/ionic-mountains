import { Component, OnInit } from '@angular/core';
import { IMountain } from '../share/interfaces';
import { MountaindbService } from '../core/mountainsdb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
import { MountaincrudService } from '../core/mountaincrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public mountains: IMountain[];
  mountainsinit: IMountain[] = [];

  constructor(private mountaincrudService: MountaincrudService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  
  inicialization() {
    this.mountaincrudService.read_Mountains().subscribe(data => {
      this.mountains = data.map(e => {
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
      console.log(this.mountains);
    });
  }
  mountainTapped(mountain) {
    this.route.navigate(['details', mountain.id]);
  }
}
