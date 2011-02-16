// ==========================================================================
// Project:   Scgh
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Scgh Ki*/

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Scgh = SC.Application.create(Ki.StatechartManager,
  /** @scope Scgh.prototype */ {

  NAMESPACE: 'Scgh',
  VERSION: '0.1.0',

  store: SC.Store.create().from('Scgh.GhDataSource'),

  /**
   * Now that Ki auto-inits the statechart by default
   * we need to turn it off when mixing into the 
   * Application Object
   */
  autoInitStatechart: false,

  rootState: Ki.State.design({

    initialSubstate: 'defaultState',

    defaultState: Ki.State.design({

      enterState: function() {
        this._view = Scgh.getPath('mainPage.repoList');
        if (this._view) {
          this._view.becomeFirstResponder();
        }
      },

      exitState:  function() {},

      changeFocus: function(){
        var sel = Scgh.issueController.get('content');
        if (!sel) {
          Scgh.issuesController.selectObject(Scgh.issuesController.get('firstObject'));
        }
        this.gotoState('issueFocusedSate');
      }

    }),

    issueFocusedSate: Ki.State.design({

      enterState: function() {
        var view = Scgh.getPath('mainPage.issuesList');
        if (view) {
          view.becomeFirstResponder();
        }
      },

      exitState:  function() {},

      changeFocus: function() {
        this.gotoState('defaultState');
      }
    })

  })

});
