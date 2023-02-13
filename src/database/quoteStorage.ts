// Indexed Database for Quote storage and fetch

export const initialQuoteDb = async () => {
  let validDbObject: IDBDatabase;

  const quoteDbName = 'QuoteDB';
  const quoteDbVersion = 1;
  let openRequest = indexedDB.open(quoteDbName, quoteDbVersion);

  openRequest.onupgradeneeded = () => {
    // Used if upgrade of version is required after rollout
    // Triggers if the client had no database and performs initialization
  };

  openRequest.onerror = () => {
    // When the connection is not open
    console.error('Error in opening indexed db for quote storage', openRequest.error);
  };

  openRequest.onsuccess = () => {
    // When the connection is open and functioning properly
    validDbObject = openRequest.result;

    validDbObject.onversionchange = () => {
      // Can prompt the user to save data before the connection is closed or intimate user to update version.
      validDbObject.close();
      alert('Database is outdated, please reload the page.');
    };
    return validDbObject;
  };

  openRequest.onblocked = () => {
    // This event shouldn't trigger if we handle onversionchange correctly
    // Means that there's another open connection to the same database
    // It wasn't closed after db.onversionchange triggered for it
    console.log(
      'Request blocked due to different version update.There is a connection to an outdated version elsewhere, and it does not close, so the newer connection cannot be made'
    );
  };
};

export const createQuoteObjectStore = (validDbObject: IDBDatabase) => {
  // Creating an object store to perform actions on it.
  validDbObject.createObjectStore('quotes', { keyPath: 'id' });
};

export const createTransaction = (validDbObject: IDBDatabase) => {
  // Transactions can be performed based on two modes, readonly/readwrite
  const transaction = validDbObject.transaction('quotes', 'readwrite');
  return transaction;
};

export const createStore = (transaction: IDBTransaction) => {
  const quotes = transaction.objectStore('quotes');
  return quotes;
};

export const performTransactionForQuoteDb = (quotes: IDBObjectStore, dataToAdd: string[]) => {
  // Loop through the list to store as key value pairs
  dataToAdd.map((item, index) => {
    const objectToStore = {
      id: `Quote_${index}`,
      quote: item
    };

    // To add the available list to the store db
    let request = quotes.add(objectToStore);

    request.onsuccess = () => {
      console.log('Quotes added to the store', request.result);
    };

    request.onerror = () => {
      console.log('Error in adding initial list to the store', request.error);
    };
  });
};

export const getDataFromDb = (quoteStore: IDBObjectStore, index: number) => {
  quoteStore.get(`Quote_${index}`);
};
