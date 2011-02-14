// ==========================================================================
// Project:   Scgh.GhDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/

sc_require('models/issue');
sc_require('models/project');

Scgh.ISSUES_QUERY  = SC.Query.remote(Scgh.Issue, { 
  url: "issues/list/suvajitgupta/Tasks/open",
  container: 'issues',
  modelType: Scgh.Issue
});

Scgh.PROJECTS_QUERY = SC.Query.remote(Scgh.Project, {
  url: "repos/show/suvajitgupta",
  container: 'repositories',
  modelType: Scgh.Project
});

Scgh.REMOTE_SERVER = "http://codeismyart.no.de/_proxy/%@";

Scgh.GhDataSource = SC.DataSource.extend(
/** @scope Scgh.GhDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    if (query.url) {
      SC.$.getJSON(Scgh.REMOTE_SERVER.fmt(query.url), this.fetchComplete(store, query));
      return YES;
    }

    return NO ; // return YES if you handled the query
  },

  fetchComplete: function(store, query) {
    return function(data) {
      if (data) {
        var storeKeys = store.loadRecords(query.modelType, data[query.container]);
        store.loadQueryResults(query, storeKeys);
      }
      else {
        store.dataSourceDidErrorQuery(query, data);
      }
    };
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
