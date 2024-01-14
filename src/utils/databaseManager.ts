import React, { useContext } from 'react';
import PouchDB from 'pouchdb-react-native';
import PouchAuth from 'pouchdb-authentication';
import AuthContext from '../contexts/auth';

PouchDB.plugin(PouchAuth);
PouchDB.plugin(require('pouchdb-upsert'));
PouchDB.plugin(require('pouchdb-find'));

PouchDB.plugin(require('pouchdb-adapter-memory'));

// const LocalDatabase = new PouchDB('cdd', {
//   adapter: 'asyncstorage',
// });
let LocalDatabase = new PouchDB('cdd', {adapter: 'memory'});

export const SyncToRemoteDatabase = async ({
  no_sql_user,
  no_sql_pass,
  no_sql_db_name,
}) => {
  if(LocalDatabase._destroyed){
    LocalDatabase = new PouchDB('cdd', {adapter: 'memory'});
  }
  // console.log(username, password);
  //change <couch-ip> to the endpoint for couchdb
  const remoteDB = new PouchDB(`http://54.183.195.20:5984`, {
    skip_setup: true,
  });
  try {
    await remoteDB.login(no_sql_user, no_sql_pass);
    const syncDb = LocalDatabase.sync(remoteDB, {
      live: true,
      retry: true,
    });

    const syncStates = [
      'change',
      'paused',
      'active',
      'denied',
      'complete',
      'error',
    ];
    syncStates.forEach(state => {
      syncDb.on(state, currState => {
        if (__DEV__) {
          console.log(`[Sync EADL: ${JSON.stringify(currState)}]`);
        }
      });
    });
    return true;
  } catch (e) {
    console.log('Error!:', e);
    const { signOut } = useContext(AuthContext);
    signOut();
    
    return false;
  }
};

export default LocalDatabase;
