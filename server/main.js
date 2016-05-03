'use strict'

require('./TimelineLite')
require('./TimelineMax')

const _ = require('lodash')
let tl

 var playFrames = function (timeline, io) {
    tl = new TimelineMax({ repeat: -1, repeatDelay: 5})
    let timePosition = 0
    _.each(timeline, function (el, index) {
      if (index === 0) {
        timePosition = 0
      } else {
        timePosition = '+' + timeline[index - 1].time
      }
      tl.add(function emitEvent(){io.emit(el.eventName, el.data)}, timePosition)
    })
  }

module.exports = {
  init: function (app, window) {
    let io = require('socket.io')(3300)
    console.log('Launch server')

    const ipcMain = require('electron').ipcMain
    ipcMain.on('startPlay', function playReceived(event, data) {
      console.log(data)
      playFrames(data, io)
    })
    ipcMain.on('stopPlay', function stopReceived(event, data) {
      console.log(data)
      tl.pause()
      tl.clear()
    })

    io.on('connection', function (socket) {
      let counter = 0
      /*setInterval(function repeatEmit(params) {
        socket.emit('bodyFrame', counter++)
      }, 500)*/
      socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg)
      })
      socket.on('disconnect', function () {
        io.emit('user disconnected')
      })
    })
  }
}
