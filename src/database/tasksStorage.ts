// Indexed Database for Quote storage and fetch

export const initialTaskDb = async () => {
  let validDbObject: IDBDatabase;

  const taskDbName = 'TasksDb';
  const taskDbVersion = 1;
  let openRequest = indexedDB.open(taskDbName, taskDbVersion);

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

export const createTaskObjectStore = (validDbObject: IDBDatabase) => {
  // Creating an object store to perform actions on it.
  validDbObject.createObjectStore('tasks', { keyPath: 'id' });
};

export const createTaskTransaction = (validDbObject: IDBDatabase) => {
  // Transactions can be performed based on two modes, readonly/readwrite
  const transaction = validDbObject.transaction('tasks', 'readwrite');
  return transaction;
};

export const createTaskStore = (transaction: IDBTransaction) => {
  const tasks = transaction.objectStore('tasks');
  return tasks;
};

export const performTransactionForTaskDb = (tasks: IDBObjectStore, dataToAdd: string[]) => {
  // Loop through the list to store as key value pairs
  dataToAdd.map((item, index) => {
    const objectToStore = {
      id: `Task_${index}`,
      quote: item
    };

    // To add the available list to the store db
    let request = tasks.add(objectToStore);

    request.onsuccess = () => {
      console.log('Tasks added to the store', request.result);
    };

    request.onerror = () => {
      console.log('Error in adding task list to the store', request.error);
    };
  });
};

export const getDataFromTaskDb = (taskStore: IDBObjectStore, index: number) => {
  taskStore.get(`Task_${index}`);
};

export const getAllTasksFromDb = (taskStore: IDBObjectStore) => {
  taskStore.getAll();
};
