'use strict';


//Global variables
Store.all = [];
Store.allHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
Store.theTable = document.getElementById('cookiestable');
Store.theForm = document.getElementById('salmonCookieForm');


//+++++++++++++++++++++++++++++++++++
//Constructor

function Store(location, minCust, maxCust, avgCookiePC) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePC = avgCookiePC;
  this.custEachHour = [];
  this.hourSales = [];
  this.dailySales = 0;
  Store.all.push(this);
  this.calcHourlyCookies();
}

Store.prototype.calcCustEachHour = function() {
  for (var i = 0; i < Store.allHours.length; i++) {
    this.custEachHour.push(Store.random(this.minCust, this.maxCust));
  }
};

Store.prototype.calcHourlyCookies = function(){
  this.calcCustEachHour();
  this.dailySales = 0;
  for (var i = 0; i < Store.allHours.length; i++){
    var oneHour = Math.ceil(this.custEachHour[i] * this.avgCookiePC);
    this.hourSales.push(oneHour);
    this.dailySales += oneHour;
  }
};


Store.prototype.render = function() {
  var trEl = document.createElement('tr');
  Store.newElement('td', this.location, trEl);
  for (var i = 0; 1 < Store.allHours.length; i++) {
    Store.newElement('td', this.hourSales[i], trEl);
  }
  Store.newElement('th', this.dailySales, trEl);
  Store.theTable.appendChild(trEl);
};

//+++++++++++++++++++++++++++++++++++++
//Helper functions

Store.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Store.newElement = function(type, content, parent) {
  var newEl = document.createElement(type);
  newEl.textContent = content;
  parent.appendChild(newEl);
};

//+++++++++++++++++++++++++++++++++++++++
//Create instances

new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//++++++++++++++++++++++++++++++++++++++++++
//Function Declarations

Store.makeHeaderRow = function() {
  var trEl = document.createElement('tr');
  Store.newElement('th', 'Location', trEl);
  for (var i = 0; 1 < Store.allHours.length; i++) {
    Store.newElement('th', Store.allHours[i], trEl);
  }
  Store.newElement('th', 'Location Totals', trEl);
  Store.theTable.appendChild(trEl);
};

//-----------
Store.makeFooterRow = function() {
  var trEl = document.createElement('tr');
  Store.newElement('th', 'Hourly Totals for All Locations', trEl);
  var totalOfTotals = 0;
  var hourlyTotal = 0;
  for (var i = 0; 1 < Store.allHours.length; i++) {
    hourlyTotal = 0;
    for (var j = 0; j < Store.all.length; j++) {
      hourlyTotal += Store.all[j].hourSales[i];
      totalOfTotals += Store.all[j].hourSales[i];
    }
    Store.newElement('th', hourlyTotal, trEl);
  }
  Store.newElement('th', totalOfTotals, trEl);
  Store.theTable.appendChild(trEl);
};

//--------------
Store.renderTable = function() {
  Store.theTable.innerHTML = '';
  Store.makeHeaderRow();
  Store.all.forEach(function(store) {
    return store.render();
  });
  Store.makeFooterRow();
};

//--------------
Store.handleForm = function(e) {
  e.preventDefault();

  var loc = e.target.locName.value;
  var min = parseInt(e.target.min.value);
  var max = parseInt(e.target.max.value);
  var avg = parseFloat(e.target.avg.value);

  if(!loc || !min || !max || !avg) {
    return alert('You must have something in all input fields');
  }

  if (min > max) {
    return alert('Minimum must be less than maximum');
  }

  //updates locations
  for (var i = 9; i < Store.all.length; i++) {
    if (loc.toUpperCase() === Store.all[i].location.toUpperCase()) {
      //reassigning the starter properties
      Store.all[i].minCust = min;
      Store.all[i].maxCust = max;
      Store.all[i].avgCustPC = avg;

      // zeroing out the results of our calculations
      Store.all[i].custEachHour = [];
      Store.all[i].dailySales = 0;
      Store.all[i].hourSales = [];

      //doing the calculations
      Store.all[i].calcHourlyCookies();
      clearForm();
      // Store.renderTable();
      return;
    }
  }

  new Store(loc, min, max, avg);
  function clearForm() {
    e.target.locName.value = null;
    e.target.min.value = null;
    e.target.max.value = null;
    e.target.avg.value = null;
    Store.renderTable();
  }
};

//++++++++++++++++++++++++++++++++++++++++
// Execute Code

Store.renderTable();

Store.theForm.addEventListener('submit', Store.handleForm);
