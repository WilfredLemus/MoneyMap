import Dexie from 'dexie';


export class TransactionAppDB extends Dexie {
  transactions: Dexie.Table<ITransaction, number>;
  wallets: Dexie.Table<IWallet, number>;

  constructor() {
    super("MoneyMapAppDB");
    this.version(1).stores({
      transactions: '++id, amount, lat, lng, title, imageURL'
    });
    this.version(2).stores({
      transactions: '++id, amount, lat, lng, title, imageURL',
      wallets: '++id, amount, name'
    });
    this.version(3).stores({
      transactions: '++id, amount, lat, lng, title, imageURL, walletId',
      wallets: '++id, amount, name'
    });

    this.transactions.mapToClass(Transaction);
    this.wallets.mapToClass(Wallet);
  }
}

export class ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageURL: string;
  walletId: number;
}

export class Transaction implements ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageURL: string;
  walletId: number;

  constructor(amount: number, title: string,
    lat?: number, lng?: number,
    id?: number, imageURL?: string, walletId?: number) {

    this.amount = amount;
    this.title = title;
    if (lat) this.lat = lat;
    if (lng) this.lng = lng;
    if (id) this.id = id;
    if (imageURL) this.imageURL = imageURL;
    if (walletId) this.walletId = walletId;
  }

  save() {
    return db.transactions.add(this);
  }

  setCoords(coords) {
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }

  cleanCoords() {
    this.lat = null;
    this.lng = null;
  }

  getImage(): string {
    if (this.imageURL) {
      return this.imageURL;
    } else {
      return "blue";
    }
  }

  hasLocation(): boolean {
    return !!(this.lat && this.lng);
  }

  static all(walletID) {
    // Transaction.all() => Todas las transactions
    // return promise
    return db.transactions
              .where("walletId")
              .equals(walletID)
              .reverse()
              .toArray();
  }
}

export class IWallet {
  id?: number;
  amount: number;
  name: string;
}

export class Wallet implements IWallet {
  id?: number;
  amount: number;
  name: string;

  constructor(amount: number, name: string, id?: number){
    this.amount = amount;
    this.name = name;
    if(id) this.id = id;
  }

  save() {
    return db.wallets.add(this);
  }

  static deleteWallet(wallet){
    return db.wallets.delete(wallet.id);
  }

  static createFirst(){
    let wallet = new Wallet(0, "Primera Cartera");
    return wallet.save();
  }

  static first(){
    return db.wallets.orderBy("id").limit(1).first();
  }

  static all() {
    // Transaction.all() => Todas las transactions
    // return promise
    return db.wallets.orderBy("id").toArray();
  }

  static getWalletId(wallet){
    // Transaction.all() => Todas las transactions
    // return promise
    return db.wallets
              .where("id")
              .equals(wallet.id)
              .toArray();
  }

  static find(id: number){
    return db.wallets.get(id);
  }

  static update(id, newAmount: number){
    return db.wallets.update(id, {amount: newAmount});
  }

  updateWallet(wallet) {
    return db.wallets.update(wallet.id, {name: wallet.name, amount: wallet.amount});
  }


}

export let db = new TransactionAppDB();

// Wallet.createFirst();