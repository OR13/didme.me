const uuid = require('uuid');

const gladstone = (database = 'Gladstone') => {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;
  return {
    database,
    id: () => {
      const graphId = `urn:uuid:${uuid.v4()}`;
      return graphId;
    },
    open: function (collection = 'Documents') {
      const database = this.database;
      const open = indexedDB.open(database, 1);
      open.onupgradeneeded = function () {
        const db = open.result;
        db.createObjectStore('Identifiers', { keyPath: 'id' });
        db.createObjectStore('Keys', { keyPath: 'id' });
        db.createObjectStore('Images', { keyPath: 'id' });
      };

      return new Promise(function (resolve) {
        open.onsuccess = function () {
          const db = open.result;
          resolve({
            get: function (id) {
              return new Promise(function (resolve) {
                const tx = db.transaction(collection, 'readwrite');
                const store = tx.objectStore(collection);
                const open = store.get(id);
                open.onsuccess = function () {
                  if (open.result) {
                    resolve(open.result.value);
                  } else {
                    resolve(undefined);
                  }
                };
              });
            },
            set: function (id, value) {
              if (!value) {
                throw new Error('A value is required when calling set.');
              }
              return new Promise(function (resolve) {
                const tx = db.transaction(collection, 'readwrite');
                const store = tx.objectStore(collection);
                const open = store.put({ id, value });
                open.onsuccess = function () {
                  resolve(open.result);
                };
              });
            },
            list: function () {
              return new Promise(function (resolve) {
                const tx = db.transaction(collection, 'readwrite');
                const store = tx.objectStore(collection);
                const open = store.getAll();
                open.onsuccess = function () {
                  resolve(open.result);
                };
              });
            },
            unset: function (id) {
              return new Promise(function (resolve) {
                const tx = db.transaction(collection, 'readwrite');
                const store = tx.objectStore(collection);
                const open = store.delete(id);
                open.onsuccess = function () {
                  resolve(open.result);
                };
              });
            },
            close: () => {
              db.close();
            }
          });
        };
      });
    }
  };
};

export default gladstone;
