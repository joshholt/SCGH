// ==========================================================================
// Project:   Scgh
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

Scgh.main = function main() {

  Scgh.getPath('mainPage.mainPane').append() ;

  var projects = Scgh.store.find(Scgh.PROJECTS_QUERY);

  Scgh.projectsController.set('content', projects);

};

function main() { Scgh.main(); }
