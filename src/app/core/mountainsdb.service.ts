import { Injectable } from '@angular/core';
import { IMountain } from '../share/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
 providedIn: 'root'
})
export class MountaindbService {
 auxMovie: IMountain;
 auxMovieList: IMountain[] = [];
 constructor(private storage: Storage) { }
 // Stores a value
 setItem(reference: string, value: IMountain) {
 this.storage.set(reference, { id: value.id, nombre: value.nombre, descripcion:
value.descripcion, altura: value.altura, desnivel: value.desnivel, tiempo:
value.tiempo, imagen: value.imagen })
 .then(
 (data) => console.log('Stored first item!', data),
 error => console.error('Error storing item', error)
 );
 }
 // Gets a stored item
 getItem(reference):Promise<IMountain>{
 return this.storage.get(reference);
 }
 // check if it is empty
 empty(){
 return this.storage.keys()
 .then(
 (data) => {return true} ,
 error => {return false}
 );
 }
 // Retrieving all keys
 keys() : Promise<string[]> {
 return this.storage.keys();
 }
 // Retrieving all values
 getAll():Promise<IMountain[]>{
 return this.storage.keys().then( (k)=>
 {
 k.forEach(element => {
 this.getItem(element).then(
 (data:IMountain)=> this.auxMovieList.push(data)
 );
 });
 return this.auxMovieList;
 });
 }
 // Removes a single stored item
 remove(reference: string) {
 this.storage.remove(reference)
 .then(
 data => console.log(data),
 error => console.error(error)
 );
 }
 // Removes all stored values.
 clear() {
 this.storage.clear()
 .then(
 data => console.log(data),
 error => console.error(error)
 );
 }

 //update item
 update(reference: string, value: IMountain) {
    this.storage.set(reference, { id: value.id, nombre: value.nombre, descripcion:
   value.descripcion, altura: value.altura, desnivel: value.desnivel, tiempo:
   value.tiempo, imagen: value.imagen })
    .then(
    (data) => console.log('Stored first item!', data),
    error => console.error('Error storing item', error)
    );
}
}
