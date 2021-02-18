import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MountaincrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Mountain(record) {
    return this.firestore.collection('Mountains').add(record);
  }
  read_Mountains() {
    return this.firestore.collection('Mountains').snapshotChanges();
  }
  update_Mountain(recordID, record) {
    this.firestore.doc('Mountains/' + recordID).update(record);
  }
  delete_Mountain(record_id) {
    this.firestore.doc('Mountains/' + record_id).delete();
  }

}
