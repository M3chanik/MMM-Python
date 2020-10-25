'use strict';

/* Magic Mirror
 * Module: MMM-python
 *
 * By Brian Lang
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var async = require('async');
var exec = require('child_process').exec;

module.exports = NodeHelper.create({
  start: function() {
    console.log('Starting node helper: ' + this.name);
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    var self = this;

    if (notification === 'CONFIG') {
      this.config = payload;
      setInterval(function() {
        self.getStats();
      }, this.config.updateInterval);
    }
  },

  getStats: function() {
    var self = this;
	var path = this.config.pythonscript + " ";

    async.parallel([
      async.apply(exec, 'python3 /home/pi/MagicMirror/modules/MMM-python/maskday.py')
    ],
    function (err, res) {
      var stats = {};
	  stats.python = res[0][0];
      console.log(stats);
      self.sendSocketNotification('STATS', stats);
    });
  },

});
