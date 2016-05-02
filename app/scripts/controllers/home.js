module.exports = (function home () {
  'use strict'

  const events = require('./../lib/events')

  let ctrl = {}

  ctrl.init = function init (toRoute) {
    console.log('home.js - init home controller.')
    // Launch transition In
    ctrl.transitionIn(toRoute)
  }

  ctrl.transitionIn = function transitionIn (route) {
    events.transition.dispatch('transition-in-end', route)
  }
  
  ctrl.transitionOut = function transitionOut (fromRoute, toRoute) {
    events.transition.dispatch('transition-out-end', fromRoute)
  } 

  ctrl.destroy = function destroy () {
  }

  return ctrl
})()
