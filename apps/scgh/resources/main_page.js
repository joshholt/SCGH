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
    childViews: 'topBar repoSection issuesSection'.w(),

    topBar: SC.ToolbarView.extend({
      childViews: 'left center right'.w(),

      left: SC.View.extend({
        layout: {top: 0, bottom: 0, left: 0, width: 225},
        childViews: 'appTitle'.w(),

        appTitle: SC.LabelView.extend({
          layout: {left: 10, centerY: 0, height: 18, width: 100},
          value: "Tasks (for GitHub)"
        })
      }),

      center: SC.View.extend({
        layout: {top: 0, bottom: 0, left: 226, right: 226}
      }),

      right: SC.View.extend({
        layout: {top: 0, bottom: 0, right: 0, width: 225},
        childViews: 'actionMenu'.w(),

        actionMenu: SC.ButtonView.extend({
          layout: {right: 10, centerY: 0, height: 24, width: 75},
          titleMinWidth: 0,
          title: "Account"
        })
      })
    }),

    repoSection: SC.View.extend({
      layout: { top: 33, left: 0, width: 225, bottom: 0 },
      childViews: 'repoList'.w(),
      classNames: 'source-list'.w(),

      repoList: SC.ScrollView.extend({
        contentView: SC.ListView.extend({
          contentBinding: 'Scgh.projectsController.arrangedObjects',
          selectionBinding: 'Scgh.projectsController.selection',
          contentValueKey: 'name',
          contentUnreadCountKey: 'open_issues',
          exampleView: SC.ListItemView.extend({ classNames: 'scgh-list-item'.w() }),

          willLoseFirstResponder: function(r) {
            var sel = this.getPath('selection.firstObject');
            var ret = sc_super();

            if(sel) {
              this.itemViewForContentObject(sel).$().addClass('inactive');
            }
            return ret;
          },

          didBecomeFirstResponder: function() {
            var sel = this.getPath('selection.firstObject');
            var ret = sc_super();

            if(sel) {
              this.itemViewForContentObject(sel).$().removeClass('inactive');
            }
            return ret;
          },

          keyDown: function(evt) {
            if(evt.keyCode !== 39) {
              sc_super();
            } else {
              Scgh.sendEvent('changeFocus');
              return YES;
            }
            return NO;
          }
        })
      })

    }),

    issuesSection: SC.View.extend({
      layout: { top: 33, left: 226, right: 0, bottom: 0 },
      childViews: 'issuesList issueDetails'.w(),

      issuesList: SC.ScrollView.extend({
        layout: { bottom: 300 },
        contentView: SC.ListView.extend(SC.ContentDisplay,{
          contentBinding: 'Scgh.issuesController.arrangedObjects',
          selectionBinding: 'Scgh.issuesController.selection',
          contentValueKey: 'title',
          exampleView: SC.ListItemView.extend({ classNames: 'scgh-list-item'.w(), showAlternatingRows: true }),

          willLoseFirstResponder: function(r) {
            var sel = this.getPath('selection.firstObject');
            var ret = sc_super();

            if(sel) {
              this.itemViewForContentObject(sel).$().addClass('inactive');
            }
            return ret;
          },

          didBecomeFirstResponder: function() {
            var sel = this.getPath('selection.firstObject');
            var ret = sc_super();

            if(sel) {
              this.itemViewForContentObject(sel).$().removeClass('inactive');
            }
            return ret;
          },


          keyDown: function(evt) {
            if(evt.keyCode !== 37) {
              sc_super();
            } else {
              Scgh.sendEvent('changeFocus');
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
