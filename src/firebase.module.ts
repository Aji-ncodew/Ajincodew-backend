import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseRepository } from './FirebaseRepository';


const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [],
  useFactory: () => {
    const firebaseConfig = {
        type: 'service_account',
        project_id: 'ajincodew-a61d8',
        private_key_id: 'ffd2fedf72ce536a4f210c05b1c509f0f516b144',
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgvJVyuRHa1kZy\nkpSBxBEfSWK6HXefbdqTtvEoomCH94ZSMbpVN/XYRF2CClmigNJAtjMiDRjaQkcx\nUR3n2YUzIkaGwRkCIi3qHpF2PxDTWIsTIl5Y07eau/Wu0x6RLGcgVLlyYdoUooLW\nWYSMAr/eEqlJ2JWBOfFnW2PxC5EpSPZsdONtPpj0nSv0Mkn48LUMYzFl2w/LwYRn\nceUfwvFXmUV/mzXLCDXL653OF0WcNEqGQTMcCOZ90/17/xPk+BC3+s66Rmwy/QkH\nyyw2GXCkwxzbo/k+fbcYVVdr1JqAPRUv/OstdJxAuZIXov23sMdb/O8mfAPGKdvs\nRF7BWUN3AgMBAAECggEADWqkv2cWDkr5hLCEhiS24vfGGZdVw2JTCLuEtSjQe32G\n+tQ2LA09s44NSQymIkHvi2Z1MgS3JZyMVIDjuKovPgi/Th8sB4kT1aTCiV0le4CP\nOPK10Da/gNDUz32SFxegBnmYYqA93TqAdhx9AcDORIs3qQ1xi3fylfmKQ2Mt5Nl2\nEhSKi90FsvsEy0lHFxwvt5+cQfWda8KHYqAUR3Md6O8X7OsM5YS2a4e6NS8QyddK\nUVu9l/7uH5NbXqGlY1qivxnMSbJy2Re/WWSebJlIonIV1ZWslrvVZArKY57fdwdg\n4GSCFRzLQqkdE+TX2NITil7x/r+qhOGdrIriMwEmdQKBgQD9VksmDCoxHON3rcsj\nGonnvBq4OxVVNhDuZHZizy5P1FngWeZy2OBK38uxfDrrO+ets8rJR07svMfQtnK/\nJYiyjqRB27RPFBuiurmNnSj7cDP74Ppd9EvCU2y5fGKxk7tpbulJqaw0baOKng1U\nYk+lCX8dGRwrk0ZRJckAhiXAqwKBgQDjGVRDB2bP8ZbYFCWhZW8GYdR4q/mO6uJ3\nxbVXGHKEhfZ7KgaxkcS6Ut/7LbErkPE6NRivqdWtjxeQQr/836AsSY9ieGJg7/4g\ntKYP+cOW4y5ODNoUcSHA9Klhz00RAcgt6XzxucWRT5wuNbRuXoMaHTLYUio0v46s\nj2rt09zAZQKBgHuc4ao9AVFZkTxSVu5YArZKOJdwbOZZLUXFS2bHRQe6y+gGtcWQ\nQVEHhjKiNXWWk2NUeTxhSQeGzdDvVWojfGHz6/4eoAp9+0YZ6nRJHTgi9ZqPmlrB\n2z2Ey2ZuZRHUzfuSHM7OtbIXVVdL66EjH02eJqIiIHa6s/LghwV0b3NlAoGBAJhH\nPrond2hOPfCsKcN8iaME7HzyDEgp9iuL9hntubRlQ664sn5VGU47DheWPuvQqAB4\n5BG+VxqnDYzdRXFh3jx0IuJLiOQpaQUzPPsPZniB42XQtlbouVJyfDWq1KlnwXwP\nyYkpIXJbqIVP26n6U/ypwZNOHSD7pcbN8EyDOM4FAoGBAPTOG4xcNiOHH9mtKmr1\nM3rSwKH8+PqlEROIP4fO/s09hNE1ZqnqYqhtjsj6VOm5P+TT/oxFkpLsKzF4l8Sg\nB9XgPR2q9Xc73zEfxIbr1CUheL59nqsasj0EyZZfPZMoG+quwaa5f9VZVxC/+UJw\n+j0TYlxy2rdS7WQaK1zb1FqQ\n-----END PRIVATE KEY-----\n",
        client_email: 'firebase-adminsdk-sekdm@ajincodew-a61d8.iam.gserviceaccount.com',
        client_id: '113779957545375230127',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sekdm%40ajincodew-a61d8.iam.gserviceaccount.com',
        universe_domain: 'googleapis.com'
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: 'https://ajincodew-a61d8-default-rtdb.firebaseio.com/',
      storageBucket: 'ajincodew-a61d8.appspot.com',
    });    
  },
};

@Module({
    imports: [ConfigModule],
    providers: [firebaseProvider, FirebaseRepository],
    exports: [FirebaseRepository, 'FIREBASE_APP'],
  })
  export class FirebaseModule {}