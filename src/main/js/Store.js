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
        console.assert(callback instanceof Function);

        if (this.keyValuePairs[key] === undefined) {
            return false;
        }
        this.keyValuePairs[key].callbacks.push(callback);
        return true;
    }

    sync(key) {
        if (!localStorage.getItem(key)) {
            return;
        }
        this.updateOrCreate(key, JSON.parse(localStorage.getItem(key)));
    }

    updateOrCreate(key, value, defaultValue = null) {
        try {
            if (this.keyValuePairs[key] === undefined) {
                this.keyValuePairs[key] = {
                    value,
                    callbacks: [],
                }
            }
            else {
                for (let callback of this.keyValuePairs[key].callbacks) {
                    callback(key, this.keyValuePairs[key].value, value);
                }

                this.keyValuePairs[key].value = value;
            }
        }
        finally {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    get(key, fromLocalStorage = true) {
        if (this.keyValuePairs[key] === undefined) {
            if (fromLocalStorage && localStorage.getItem(key)) {
                return JSON.parse(localStorage.getItem(key));
            }
            console.error("Store - get - Key does not exist")
            return null;
        }
        return this.keyValuePairs[key].value;
    }

}

let store = new Store();
export default function getInstance() {
    return store;
}
