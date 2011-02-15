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

// Scgh.REMOTE_ISSUES_QUERY  = SC.Query.remote(Scgh.Issue, { 
  // url: "issues/list/suvajitgupta/Tasks/open",
  // container: 'issues'
// });

// Scgh.REMOTE_PROJECTS_QUERY = SC.Query.remote(Scgh.Project, {
  // url: "repos/show/suvajitgupta",
  // container: 'repositories'
// });

// Scgh.ISSUES_QUERY = SC.Query.local(Scgh.Issue, {
  // url: "/api/v2/json/issues/list/suvajitgupta/Tasks/open",
  // container: 'issues'
// });

Scgh.PROJECTS_QUERY = SC.Query.local(Scgh.Project, {
  url: "/api/v2/json/repos/show/joshholt",
  container: 'repositories'
});

Scgh.REMOTE_SERVER = "http://codeismyart.no.de/_proxy/%@";

Scgh.GhDataSource = SC.DataSource.extend(
/** @scope Scgh.GhDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    var url = query.parameters ? query.parameters.url : query.url;

    if (url) {
      SC.Request.getUrl(url)
        .header({'Accept': 'application/json'})
        .json()
        .notify(this, 'localFetchComplete', store, query)
        .send();
      return YES;
    }

    return NO ; // return YES if you handled the query
  },

  localFetchComplete: function(response, store, query) {
    if (SC.ok(response)) {
      var params = query.parameters ? query.parameters : query;
      var body = response.get('body')[params.container], newBody;

      if (body) {
        body.map(function(r) { 
          r.guid = SC.generateGuid(r) || SC.generateGuid(r,"%@".fmt(query.recordType.toString()));
          if (params.guid) {
            r.parentObject = params.guid;
          }
        });
        store.loadRecords(query.recordType, body);
        store.dataSourceDidFetchQuery(query);
      }
      else {
        store.dataSourceDidErrorQuery(query);
      }
    }
    else {
      store.dataSourceDidErrorQuery(query);
    }
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
