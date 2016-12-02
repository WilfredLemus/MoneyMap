import Dexie from 'dexie';


export class TransactionAppDB extends Dexie{
    transactions: Dexie.Table<ITransaction,number>;
    
    constructor(){
        super("MoneyMapAppDB");
        this.version(1).stores({
            transactions: '++id, amount, lat, lng, title, imageURL'
        });

        this.transactions.mapToClass(Transaction);
    }
}

export class ICategory{

}

export class ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageURL: string;
}

export class Transaction implements ITransaction{
    id?: number;
    amount: number;
    lat: number;
    lng: number;
    title: string;
    imageURL: string;

    constructor(amount: number, title: string, 
                lat?: number, lng?: number, 
                id?: number, imageURL?: string){
                    
        this.amount = amount;
        this.title = title;
        if(lat) this.lat = lat;
        if(lng) this.lng = lng;
        if(id) this.id = id;
        if(imageURL) this.imageURL = imageURL;
    }
    
    save(){
        return db.transactions.add(this);
    }

    setCoords(coords){
        this.lat = coords.latitude;
        this.lng = coords.longitude;
    }

    cleanCoords(){
        this.lat = null;
        this.lng = null;
    }

    getImage(): string{
        if(this.imageURL){
            return this.imageURL;
        }else{
            return "blue";
        }
    }

    hasLocation(): boolean{
        return !!(this.lat && this.lng);
    }

    static all(){
        // Transaction.all() => Todas las transactions
        // return promise
        return db.transactions.orderBy("id").reverse().toArray();
    }
}

export let db = new TransactionAppDB();