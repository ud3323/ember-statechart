// ==========================================================================
// SC Unit Test
// ==========================================================================
/*globals SC */

var statechart1, statechart2, statechart3, statechart4;

module("Ember.Statechart: Namespace - Access Substate Tests", {
  setup: function() {
    
    statechart1 = Ember.Statechart.create({
      
      rootState: Ember.State.extend({
        initialSubstate: 'a',
        a: Ember.State.extend({ value: 'state A' }),
        b: Ember.State.extend({ value: 'state B' })
      })
      
    });
    
    statechart2 = Ember.Statechart.create({
      
      rootState: Ember.State.extend({
        initialSubstate: 'a',
        a: Ember.State.extend({
          value: 'state A',
          initialSubstate: 'c',
          c: Ember.State.extend({ value: 'state C' }),
          d: Ember.State.extend({ value: 'state D' })
        }),
        
        b: Ember.State.extend({
          value: 'state B',
          initialSubstate: 'e',
          e: Ember.State.extend({ value: 'state E' }),
          f: Ember.State.extend({ value: 'state F' })
        })
      })
      
    });
    
    statechart3 = Ember.Statechart.create({
      
      rootState: Ember.State.extend({
        initialSubstate: 'a',
        a: Ember.State.extend({ value: 'state A' }),
        b: Ember.State.extend({
          value: 'state B',
          initialSubstate: 'a',
          a: Ember.State.extend({ value: 'state B.A' }),
          c: Ember.State.extend({
            value: 'state C',
            initialSubstate: 'a',
            a: Ember.State.extend({ value: 'state B.C.A' }),
            d: Ember.State.extend({ value: 'state D' })
          })
        })
      })
      
    });
    
    statechart4 = Ember.Statechart.create({
      
      rootState: Ember.State.extend({
        initialSubstate: 'a',
        a: Ember.State.extend({
          value: 'state A',
          initialSubstate: 'x',
          x: Ember.State.extend({ value: 'state A.X' }),
          y: Ember.State.extend({ value: 'state A.Y' })
        }),
        
        b: Ember.State.extend({
          value: 'state B',
          initialSubstate: 'x',
          x: Ember.State.extend({ value: 'state B.X' }),
          y: Ember.State.extend({ value: 'state B.Y' })
        })
      })
      
    });
    
    statechart1.initStatechart();
    statechart2.initStatechart();
    statechart3.initStatechart();
    statechart4.initStatechart();
  },
  
  teardown: function() {
    statechart1.destroy();
    statechart2.destroy();
    statechart3.destroy();
    statechart4.destroy();
    statechart1 = statechart2 = statechart3 = statechart4 = null;
  }
});

test("access statechart1 states", function() {
  var state;
      
  state = statechart1.getState('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state A', 'state a should have value "state A"');
  
  state = statechart1.getState('b');
  equals(Ember.none(state), false, 'state b should not be null');
  equals(state.get('value'), 'state B', 'state a should have value "state B"');
});

test("access statechart2 states", function() {
  var state;
      
  state = statechart2.getState('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state A', 'state a should have value "state A"');
  
  state = statechart2.getState('b');
  equals(Ember.none(state), false, 'state b should not be null');
  equals(state.get('value'), 'state B', 'state b should have value "state B"');
  
  state = statechart2.getState('c');
  equals(Ember.none(state), false, 'state c should not be null');
  equals(state.get('value'), 'state C', 'state c should have value "state C"');
  
  state = statechart2.getState('d');
  equals(Ember.none(state), false, 'state d should not be null');
  equals(state.get('value'), 'state D', 'state d should have value "state D"');
  
  state = statechart2.getState('e');
  equals(Ember.none(state), false, 'state e should not be null');
  equals(state.get('value'), 'state E', 'state d should have value "state E"');
  
  state = statechart2.getState('f');
  equals(Ember.none(state), false, 'state f should not be null');
  equals(state.get('value'), 'state F', 'state d should have value "state F"');
  
  state = statechart2.getState('a.c');
  equals(Ember.none(state), false, 'state a.c should not be null');
  equals(state, statechart2.getState('c'), 'state a.c should be equal to state c');
  equals(state.get('value'), 'state C', 'state a.c should have value "state C"');
  
  state = statechart2.getState('a.d');
  equals(Ember.none(state), false, 'state a.d should not be null');
  equals(state, statechart2.getState('d'), 'state a.d should be equal to state d');
  equals(state.get('value'), 'state D', 'state a.d should have value "state D"');
  
  state = statechart2.getState('b.e');
  equals(Ember.none(state), false, 'state b.e should not be null');
  equals(state, statechart2.getState('e'), 'state b.e should be equal to state e');
  equals(state.get('value'), 'state E', 'state b.e should have value "state E"');
  
  state = statechart2.getState('b.f');
  equals(Ember.none(state), false, 'state b.f should not be null');
  equals(state, statechart2.getState('f'), 'state b.f should be equal to state f');
  equals(state.get('value'), 'state F', 'state b.f should have value "state F"');
});

test("access all A states in statechart3", function() {
  var state;
      
  state = statechart3.getState('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state A', 'state a should have value "state A"');
  
  state = statechart3.getState('b.a');
  equals(Ember.none(state), false, 'state b.a should not be null');
  equals(state.get('value'), 'state B.A', 'state a should have value "state B.A"');
  
  state = statechart3.getState('b.c.a');
  equals(Ember.none(state), false, 'state b.c.a should not be null');
  equals(state.get('value'), 'state B.C.A', 'state a should have value "state B.C.A"');
});

test("access all A states relative to state B in statechart3", function() {
  var state,
      stateB = statechart3.getState('b');
      
  state = stateB.getSubstate('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state B.A', 'state a should have value "state B.A"');
  
  state = stateB.getSubstate('c.a');
  equals(Ember.none(state), false, 'state c.a should not be null');
  equals(state.get('value'), 'state B.C.A', 'state a should have value "state B.C.A"');
});

test("access all A states relative to state C in statechart3", function() {
  var state,
      stateC = statechart3.getState('c');
      
  state = stateC.getSubstate('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state B.C.A', 'state a should have value "state B.C.A"');
});

test("access all states in statechart4", function() {
  var state, 
      stateA = statechart4.getState('a'),
      stateB = statechart4.getState('b');
      
  state = statechart4.getState('a');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state A', 'state a should have value "state A"');
  
  state = statechart4.getState('a.x');
  equals(Ember.none(state), false, 'state a.x should not be null');
  equals(state.get('value'), 'state A.X', 'state a should have value "state A.X"');
  
  state = statechart4.getState('a.y');
  equals(Ember.none(state), false, 'state a.y should not be null');
  equals(state.get('value'), 'state A.Y', 'state a should have value "state A.Y"');
  
  state = statechart4.getState('b');
  equals(Ember.none(state), false, 'state a should not be null');
  equals(state.get('value'), 'state B', 'state b should have value "state B"');
  
  state = statechart4.getState('b.x');
  equals(Ember.none(state), false, 'state b.x should not be null');
  equals(state.get('value'), 'state B.X', 'state b should have value "state B.X"');
  
  state = statechart4.getState('b.y');
  equals(Ember.none(state), false, 'state b.y should not be null');
  equals(state.get('value'), 'state B.Y', 'state a should have value "state B.Y"');
  
  console.log('expecting to get an error message...');
  state = statechart4.getState('x');
  equals(Ember.none(state), true, 'state x should be null');
  
  console.log('expecting to get an error message...');
  state = statechart4.getState('y');
  equals(Ember.none(state), true, 'state y should be null');
  
  state = stateA.getSubstate('x');
  equals(Ember.none(state), false, 'state a.x should not be null');
  equals(state.get('value'), 'state A.X', 'state a should have value "state A.X"');
  
  state = stateA.getSubstate('y');
  equals(Ember.none(state), false, 'state a.y should not be null');
  equals(state.get('value'), 'state A.Y', 'state a should have value "state A.Y"');
  
  state = stateB.getSubstate('x');
  equals(Ember.none(state), false, 'state b.x should not be null');
  equals(state.get('value'), 'state B.X', 'state a should have value "state B.X"');
  
  state = stateB.getSubstate('y');
  equals(Ember.none(state), false, 'state b.y should not be null');
  equals(state.get('value'), 'state B.Y', 'state a should have value "state B.Y"');
});