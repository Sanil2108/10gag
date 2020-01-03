class Store {
    constructor() {
        this.keyValuePairs = {};
    }

    unsubscribe(key, callback) {
        if (this.keyValuePairs[key] === undefined) {
            return false;
        }
        this.keyValuePairs[key].callbacks.splice(
            this.keyValuePairs[key].callbacks.indexOf(callback), 1
        );
    }

    subscribe(key, callback) {
        if (this.keyValuePairs[key] === undefined) {
            return false;
        }
        this.keyValuePairs[key].callbacks.push(callback);
    }

    updateOrCreate(key, value, defaultValue = null) {
        if (this.keyValuePairs[key] === undefined) {
            this.keyValuePairs[key] = {
                value,
                callbacks: [],
            }
        }
        else {
            for (let callback of this.keyValuePairs[key].callbacks) {
                callback(key, value);
            }

            this.keyValuePairs[key].value = value;
        }
    }

    get(key) {
        if (this.keyValuePairs[key] === undefined) {
            return null;
        }
        return this.keyValuePairs[key].value;
    }

}

let store = new Store();
export default function getInstance() {
    return store;
}
