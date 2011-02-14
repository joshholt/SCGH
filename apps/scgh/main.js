// ==========================================================================
// Project:   Scgh
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

Scgh.main = function main() {

  Scgh.getPath('mainPage.mainPane').append() ;

  var issues = Scgh.store.find(Scgh.ISSUES_QUERY);
  var projects = Scgh.store.find(Scgh.PROJECTS_QUERY);

  Scgh.issuesController.set('content', issues);
  Scgh.projectsController.set('content', projects);

};

function main() { Scgh.main(); }
