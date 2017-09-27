'use strict';

var allHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var cookieTable = document.getElementById('cookies');

function Store(location, minCust, maxCust, avgCookiePC) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePC = avgCookiePC;
  this.avg = 0;
  this.totalCookies = 0;
  this.getAvg = function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
  };
  this.render = function() {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = this.location;
    trEl.appendChild(tdEl);

    for (var i = 0; i < allHours.length; i++) {
      tdEl = document.createElement('td');

      //creates variable to store average for use in total
      var theAverage = this.getAvg();
      tdEl.textContent = theAverage;
      trEl.appendChild(tdEl);
      this.totalCookies += theAverage;
    }
    // outside the for loop to display total
    var totalTd = document.createElement('td');
    totalTd.textContent = this.totalCookies;
    trEl.appendChild(totalTd);
    //final step prints whole row to table
    cookieTable.appendChild(trEl);
  };
}

var pike = new Store('1st and Pike', 23, 65, 6.3);
var seatac = new Store('SeaTac', 3, 24, 1.2);
var seatcenter = new Store('Seattle Center', 11, 38, 3.7);
var caphill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

//new function to display header with hours array
function header(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);

  for(var i = 0; i < allHours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = allHours[i];
    trEl.appendChild(thEl);
  }
  cookieTable.appendChild(trEl);
}

header();

pike.render();
seatac.render();
seatcenter.render();
caphill.render();
alki.render();
