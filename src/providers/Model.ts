import ModelDocument from '../interfaces/ModelDocument';

interface Model extends ModelDocument {
    entry: ModelDocument;
}

abstract class Model {

    /**
     * Model constructor.
     */
    public constructor(data: ModelDocument) {
        this._renewEntry(data);
    }

    /**
     * Merge entry data with the current model.
     */
    protected _renewEntry(entry: ModelDocument) {
        this.entry = entry;

        Object.entries(entry).forEach(([key, value]) => {
            const set = () => { this[key] = value };
            let descriptorTarget = this;
            let descriptor;

            while(!descriptor && (descriptorTarget = Object.getPrototypeOf(descriptorTarget))) {
                descriptor = Object.getOwnPropertyDescriptor(descriptorTarget, key);
            }

            if (!descriptor) {
                return set();
            }

            if (typeof descriptor.set === 'function') {
                descriptor.set(value);
                return;
            }

            if (typeof descriptor.get === 'function') {
                return;
            }

            if (typeof descriptor.value === 'function') {
                return;
            }

            set();
        });

        this.entry = entry;
        return this;
    }
}

export default Model;