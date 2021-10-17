/* Magic Mirror
 * Module: MMM-python
 *
 * By Brian Lang
 * MIT Licensed.
 */

Module.register('MMM-python', {

  defaults: {
	updateInterval: 1000000,
	animationSpeed: 0,
	header: 'Python Script Title'
  },

    getStyles: function () {
        return ["MMM-python.css"];
    },  
  
  // Define start sequence
  start: function() {
    Log.log('Starting module: ' + this.name);
    this.stats = {};
    this.stats.python = '#';
    this.sendSocketNotification('CONFIG', this.config);
  },

  socketNotificationReceived: function(notification, payload) {
    //Log.log('MMM-python: socketNotificationReceived ' + notification);
    //Log.log(payload);
    if (notification === 'STATS') {
	  this.stats.python = payload.python;
      this.updateDom(this.config.animationSpeed);
    }
  },

  // Override dom generator.
  getDom: function() {
	var wrapper = document.createElement('div');
	var header = document.createElement("header");
    //header.classList.add("align-left");
	var name = document.createElement("span");
    name.innerHTML = "" + this.config.header;
    header.appendChild(name);
	wrapper.appendChild(header);
	
    var table = document.createElement('table');
    table.classList.add("large", "table");

    table.innerHTML = '<tr>' +
	'<td class="bright">' +
	(this.stats.python) + 					
	'</td>' + 
	'</tr>';
    
	wrapper.appendChild(table);
	return wrapper;
  },
});
