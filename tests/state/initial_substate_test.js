// ==========================================================================
// Ember.State Unit Test
// ==========================================================================
/*globals SC externalState1 externalState2 */

var statechart, root, monitor, stateA, stateB, stateC, stateD, stateE, stateF;

module("Ember.Statechart: State Initial Substate Tests", {
  setup: function() {

    statechart = Ember.Statechart.create({
      
      monitorIsActive: YES,
      
      rootState: Ember.State.extend({
        
        initialSubstate: 'a',
        
        a: Ember.State.extend({
          initialSubstate: 'c',
          c: Ember.State.extend(),
          d: Ember.State.extend()
        }),
        
        b: Ember.State.extend({
          e: Ember.State.extend(),
          f: Ember.State.extend()
        })
        
      })
      
    });
    
    statechart.initStatechart();
    
    root = statechart.get('rootState');
    monitor = statechart.get('monitor');
    stateA = statechart.getState('a');
    stateB = statechart.getState('b');
    stateC = statechart.getState('c');
    stateD = statechart.getState('d');
    stateE = statechart.getState('e');
    stateF = statechart.getState('f');
  },
  
  teardown: function() {
    statechart = root = stateA = stateB = stateC = stateD = stateE = stateF = null;
  }
});

test("check initial substates", function() {
  equals(root.get('initialSubstate'), stateA, "root state's initial substate should be state A");
  equals(stateA.get('initialSubstate'), stateC, "state a's initial substate should be state c");
  equals(stateC.get('initialSubstate'), null, "state c's initial substate should be null");
  equals(stateD.get('initialSubstate'), null, "state d's initial substate should be null");
  equals(stateB.get('initialSubstate') instanceof Ember.EmptyState, true, "state b's initial substate should be an empty state");
  equals(stateE.get('initialSubstate'), null, "state e's initial substate should be null");
  equals(stateF.get('initialSubstate'), null, "state f's initial substate should be null");
});

test("go to state b and confirm current state is an empty state", function() {
  equals(stateC.get('isCurrentState'), true);
  monitor.reset();
  statechart.gotoState(stateB);
  ok(monitor.matchSequence().begin().exited(stateC, stateA).entered(stateB, stateB.get('initialSubstate')).end(), "state sequence should match expected");
  equals(stateB.getPath('initialSubstate.isCurrentState'), true, "state b\'s initial substate should be the current state");
});