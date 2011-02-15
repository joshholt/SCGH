// ==========================================================================
// Project:   Scgh.Project
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
sc_require('models/issue');

Scgh.Project = SC.Record.extend(
/** @scope Scgh.Project.prototype */ {

  remoteIssues: function() {
    var query = this._query;
    var matches = this.get('url').match(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/);
    var hasIssues = this.get('has_issues'); 
    var shouldCare = this.get('open_issues') > 0 ? true : false;
    
    if (!query && hasIssues && shouldCare) {
      query = this._query = SC.Query.local(Scgh.Issue, {
        conditions: "parentObject = {guid}",
        parameters: {
          guid: this.get('guid'),
          url: 'api/v2/json/issues/list%@%@/open'.fmt(matches[4], matches[6]),
          container: 'issues'
        }
      });
    }
    return query ? this.get('store').find(query) : [];
  }.property().cacheable()

}) ;
