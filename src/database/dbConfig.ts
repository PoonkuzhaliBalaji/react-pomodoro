
export const DbConfig = {
  name: 'QuoteTaskDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'quotes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'quote', keypath: 'quote', options: { unique: false } }]
    },
    {
      store: 'tasks',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'task', keypath: 'task', options: { unique: false } }]
    }
  ]
};
