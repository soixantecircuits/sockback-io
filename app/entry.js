'use strict'

/**
 * Load CSS here
**/
require('../node_modules/material-design-lite/material.min.css')
require('./styles/main.css')

/**
 * initialize your app here
**/

let $ = require('jQuery')
window.$ = $
window.jQuery = $

require('material-design-lite')

require('./scripts/app').init()
