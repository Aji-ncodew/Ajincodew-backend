import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
require('dotenv').config();

@Injectable()
export class FirebaseRepository {
  #db: FirebaseFirestore.Firestore;

  constructor(@Inject(process.env.FIREBASE_APP) private firebaseApp: app.App) {
    this.#db = firebaseApp.firestore();
  }

  getCollection(collectionName: string): FirebaseFirestore.CollectionReference {
    return this.#db.collection(collectionName);
  }
}
