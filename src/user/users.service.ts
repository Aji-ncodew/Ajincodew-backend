import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private readonly db: admin.database.Database;

  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {
    // Get a reference to the Firebase Realtime Database
    this.db = this.firebaseApp.database();
  }

  async addUser(user: any): Promise<void> {
    await this.db.ref('users').push(user);
  }

  async getUserById(userId: string): Promise<any> {
    const snapshot = await this.db.ref(`users/${userId}`).once('value');
    return snapshot.val();
  }

  async getUserByUsername(username: string): Promise<any> {
    const snapshot = await this.db.ref(`users/${username}`).once('value');
    return snapshot.val();
  }

  async getUsers(): Promise<User[]> {
    const snapshot = await this.db.ref(`users`).once('value');
    const users: User[] = [];

    snapshot.forEach(childSnapshot => {
        const user: User = {
            id: childSnapshot.key,
            ...childSnapshot.val()
        };
        users.push(user);
    });

    return users;
}

}
