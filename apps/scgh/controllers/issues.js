// ==========================================================================
// Project:   Scgh.issuesController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Scgh.issuesController = SC.ArrayController.create(
/** @scope Scgh.issuesController.prototype */ {

  contentBinding: 'Scgh.projectController.remoteIssues',

  contentDidChange: function() {
    var c = this.get('content');
    var l = c.get('length');
    var beenCalled = false;

    if (l > 0 && beenCalled !== true) {
      beenCalled = true;

      var view = Scgh.getPath('mainPage.mainPane.issuesSection.issuesList.contentView');

      if (view) {
        SC.RunLoop.begin();
        view.reload(null);
        SC.RunLoop.end();
      }
    }
  }.observes('*content.length')

}) ;
