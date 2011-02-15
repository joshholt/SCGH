// ==========================================================================
// Project:   Scgh.projectsController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Scgh.projectsController = SC.ArrayController.create(
/** @scope Scgh.projectsController.prototype */ {

  allowsEmptySelection: false,

  contentDidChange: function() {
    var c = this.get('content');
    var l = c.get('length');
    var beenCalled = false;

    if (l > 0 && beenCalled !== true) {
      beenCalled = true;

      var view = Scgh.getPath('mainPage.mainPane.repoSection.repoList.contentView');

      if (view) {
        SC.RunLoop.begin();
        view.reload(null);
        SC.RunLoop.end();
      }
    }
  }.observes('*content.length')

}) ;
