'use strict';

var allHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allStores = [];
var allStoreTotals = [];
var totalTotal = 0;
var cookieTable = document.getElementById('cookies');
var newStoreForm = document.getElementById('salmonCookieForm');

function Store(location, minCust, maxCust, avgCookiePC) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePC = avgCookiePC;
  this.hourSales = [];
  this.dailySales = 0;
  allStores.push(this);
}

Store.prototype.avgHourCust = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust;
};

Store.prototype.hourlyCookies = function(){
  for (var i = 0; i < allHours.length; i++){
    var numCust = this.avgHourCust();
    this.hourSales.push(Math.round(numCust * this.avgCookiePC));
  }
};

Store.prototype.dailyCookies = function(){
  for (var i in this.hourSales){
    this.dailySales += this.hourSales[i];
  }
};

Store.prototype.render = function() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = this.location;
  trEl.appendChild(thEl);


  for (var i = 0; i < this.hourSales.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = this.hourSales[i];
    trEl.appendChild(tdEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = this.dailySales;
  trEl.appendChild(thEl);

  //final step prints whole row to table
  cookieTable.appendChild(trEl);
};

new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//new function to display header with hours array
function header(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Cookie Store';
  trEl.appendChild(thEl);

  for(var i = 0; i < allHours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = allHours[i];
    trEl.appendChild(thEl);
  }
  cookieTable.appendChild(trEl);
}

function renderTable(){
  for(var i in allStores){
    allStores[i].hourlyCookies();
    allStores[i].dailyCookies();
    allStores[i].render();
  }
}


function columnSum(){
  for (var i = 0; i < allHours.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < allStores.length; j++){
      storeTotal += allStores[j].hourSales[i];
    }
    allStoreTotals.push(storeTotal);
  }
}

function totalTotalSum(){
  for (var i in allStoreTotals){
    totalTotal += allStoreTotals[i];
  }
}

function renderAllTotals() {
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'All Stores Totals';
  trEl.appendChild(thEl);

  for (var i = 0; i < allHours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = allStoreTotals[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = totalTotal;
  trEl.appendChild(thEl);

  cookieTable.appendChild(trEl);
}

//----------------------------------------------

function renderFooter(){
  columnSum();
  totalTotalSum();
  renderAllTotals();
}


function newTableRender(){
  cookieTable.innerHTML = '';
  // new variables
  var newStoreName = event.target.inputStoreName.value;
  var newMinCusts = event.target.inputMinCust.value;
  var newMaxCusts = event.target.inputMaxCusts.value;
  var newAvgSales = event.target.inputAvgSales.value;


  if (counter === 0){
    new Store(newStoreName, parseInt(newMinCusts), parseInt(newMaxCusts), parseInt(newAvgSales));

  }

  for (var j = 0; j < allStores.length; j++){
    renderTable.appendChild(allStores[j].render());
  }
}


function submitNewStore(event){

  event.preventDefault();

  if (!event.target.inputStoreName.value || !event.target.inputMinCusts.value || !event.target.inputMaxCusts.value || !event.target.inputAvgSales.value ) {
    return alert('Please fill in all fields!');
  }

  //FIGURE THIS PART OUT FOR INPUT
  // var newComment = new Comment(commenter, remark);
  //
  // // console.log('Comment by ' + event.target.who.value + ' at ' + Date());
  //
  // event.target.who.value = null;
  // event.target.says.value = null;
  //
  // allComments.push(newComment);


  header();

  newTableRender();

  renderFooter();
}



newStoreForm.addEventListener('submit', submitNewStore);



//--------------------------------------------

header();

renderTable();

renderFooter();
