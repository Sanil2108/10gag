export default class Store {

    static instance = new Store();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        this.keyValuePairs = {};
    }

    updateOrCreate(key, value, callback) {
        if (this.keyValuePairs[key] === undefined) {
            this.keyValuePairs[key] = {
                value,
                callbacks: [callback],
            }
        }
        else {
            for (let callback of this.keyValuePairs[key].callbacks) {
                callback(key, value);
            }

            this.keyValuePairs[key].value = value;
            this.keyValuePairs[key].callbacks.push(callback);
        }
    }

    get(key) {
        return this.keyValuePairs[key].value;
    }

}
