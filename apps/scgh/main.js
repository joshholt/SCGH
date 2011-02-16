// ==========================================================================
// Project:   Scgh
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

Scgh.main = function main() {

  SC.RootResponder.responder.set('defaultResponder', Scgh);
  Scgh.getPath('mainPage.mainPane').append();
  Scgh.projectsController.set('content',Scgh.store.find(Scgh.PROJECTS_QUERY));
  Scgh.initStatechart();
};

function main() { 
  Scgh.main(); 
}
