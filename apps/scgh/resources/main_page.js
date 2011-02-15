// ==========================================================================
// Project:   Scgh - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh */

// This page describes the main user interface for your application.  
Scgh.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'repoSection issuesSection'.w(),
    
    repoSection: SC.View.extend({
      layout: { top: 0, left: 0, width: 225, bottom: 0 },
      childViews: 'repoList'.w(),

      repoList: SC.ScrollView.extend({
        contentView: SC.ListView.extend({
          contentBinding: 'Scgh.projectsController.arrangedObjects',
          selectionBinding: 'Scgh.projectsController.selection',
          contentValueKey: 'name',
          contentUnreadCountKey: 'open_issues',

          keyDown: function(evt) {
            if(evt.keyCode !== 39) {
              sc_super();
            }
            else {
              SC.RunLoop.begin();
              Scgh.issuesController.selectObject(Scgh.issuesController.get('firstObject'));
              var nr =  Scgh.getPath('mainPage.issuesList');
              if (nr) nr.becomeFirstResponder();
              SC.RunLoop.end();
              return YES;
            }
            return NO;
          }
        })
      })

    }),

    issuesSection: SC.View.extend({
      layout: { top: 0, left: 225, right: 0, bottom: 0 },
      childViews: 'issuesList issueDetails'.w(),

      issuesList: SC.ScrollView.extend({
        layout: { bottom: 300 },
        contentView: SC.ListView.extend(SC.ContentDisplay,{
          contentBinding: 'Scgh.issuesController.arrangedObjects',
          selectionBinding: 'Scgh.issuesController.selection',
          contentValueKey: 'title',

          keyDown: function(evt) {
            console.log(evt.keyCode);
            if(evt.keyCode !== 37) {
              sc_super();
            }
            else {
              SC.RunLoop.begin();
              var nr =  Scgh.getPath('mainPage.repoList');
              if (nr) nr.becomeFirstResponder();
              SC.RunLoop.end();
              return YES;
            }
            return NO;
          }
        })
      }),

      issueDetails: SC.TextFieldView.extend({
        layout: { bottom: 0, height: 300 },
        contentBinding: 'Scgh.issueController',
        contentValueKey: 'body',
        isTextArea: YES
      })

    })
  }),

  repoList: SC.outlet('mainPane.repoSection.repoList.contentView'),
  issuesList: SC.outlet('mainPane.issuesSection.issuesList.contentView')

});
