'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pike = {
  minCust: 23,
  maxCust: 65,
  avgCookiePC: 6.3,
  avg: 0,
  totalCookies: 0,
  getAvg: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + this.minCust) * (this.avgCookiePC) / 2);
  },
  render: function() {
    for (var i = 0; i < hours.length; i++) {
      var pikeUl = document.getElementById('pike');
      var liEl = document.createElement('li');
      var theAverage = this.getAvg();
      liEl.textContent = hours[i] + ': ' + theAverage + ' cookies';
      pikeUl.appendChild(liEl);

      this.totalCookies += theAverage;
    }
    var totalEl = document.createElement('li');
    totalEl.textContent = 'Total: ' + this.totalCookies + ' cookies';
    pikeUl.appendChild(totalEl);
  }
};
pike.render();
