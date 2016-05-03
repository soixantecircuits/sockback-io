module.exports = (function home() {
  'use strict'

  const events = require('./../lib/events')
  const Vue = require('vue')
  const VueMdl = require('vue-mdl')
  const ElapsedTime = require('elapsed-time')
  const ipcRenderer = require('electron').ipcRenderer
  const fs = require('fs')
  const dialog = require('electron').remote.dialog

  Vue.use(VueMdl.default)

  let ctrl = {}

  ctrl.init = function init(toRoute) {
    console.log('home.js - init home controller.')

    ctrl.vue = new Vue({
      el: '#sockback-io',
      data: {
        host: '',
        port: '',
        frames: [],
        sPlayFrames: ''
      },
      computed: {
        sFrames: function () {
          return JSON.stringify(this.frames)
        },
        lengthFrame: function () {
          return this.frames.length
        }
      },
      methods: {
        startPlay: function () {
          try {
            let timeline = JSON.parse(ctrl.vue.sPlayFrames)
            ipcRenderer.send('startPlay', timeline)
          } catch (err) {
            alert(err)
          }
        },
        stopPlay: function () {
          ipcRenderer.send('stopPlay')
        },
        disconnect: function (event) {

        },
        openAs: function () {
          dialog.showOpenDialog(function (fileNames) {
            if (fileNames === undefined) {
              return
            }
            var fileName = fileNames[0]
            fs.readFile(fileName, 'utf-8', function (err, data) {
              ctrl.vue.sPlayFrames = data
            })
          })
        },
        saveAs: function () {
          dialog.showSaveDialog(null, function (filePath) {
            fs.writeFile(filePath, ctrl.vue.sFrames, (err) => {
              if (err) {
                throw err
              } else {
                console.log('It\'s saved!')
              }
            })
          })
        },
        connect: function (event) {
          var socket = io(`http://${ctrl.vue.host}:${ctrl.vue.port}`)
          var onevent = socket.onevent
          socket.onevent = function (packet) {
            var args = packet.data || []
            onevent.call(this, packet)    // original call
            packet.data = ["*"].concat(args)
            onevent.call(this, packet)     // additional call to catch-all
          }

          socket
            .on('connect', function onConnect() {
              console.log('connected')
            })
            .on('*', function (event, data) {
              //console.log(event)
              //console.log(data)
              if (ctrl.et) {
                //console.log(ctrl.et.getValue())
                ctrl.vue.frames.push(
                  {
                    time: ctrl.et.getValue(),
                    eventName: event,
                    data: data
                  }
                )
              }
            })
            .on('event', function eventReceived(data) {
              console.log('event:')
              console.log(data)
              if (ctrl.et) {
                console.log(ctrl.et.getValue())
              }
            })
            .on('disconnect', function onDisconnect() {
              console.log('disconnected')
            })
        },
        startRecord: function () {
          console.log('Start recording')
          ElapsedTime.setDefaultFormatter(function (data) {
            return data / 1e9
          })
          ctrl.et = ElapsedTime.new().start()
        },
        stopRecord: function () {
          console.log('Stop recording')
          ctrl.et = ctrl.et.reset()
          ctrl.et = undefined
        }
      }
    })

    ctrl.transitionIn(toRoute)
  }

  ctrl.transitionIn = function transitionIn(route) {
    events.transition.dispatch('transition-in-end', route)
  }

  ctrl.transitionOut = function transitionOut(fromRoute, toRoute) {
    events.transition.dispatch('transition-out-end', fromRoute)
  }

  ctrl.destroy = function destroy() {
  }

  return ctrl
})()
