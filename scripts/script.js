

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getSum(myArray) {
  var sum = 0;
  myArray.forEach(function(num) {
    sum += num;
  });
  return sum;
}

$(document).ready(function(){

  // 31 random integers that add up to 37806, within a range from 79 to 1437
  $("#gen-btn-1").click(function() {
    // clear old output first
    $("#seed-list").empty();
    $("#sum").text("0");
    var rndArr = [];
    var finalArr = [];
    var masterSum = 37806;
    var lowBound = 79;
    var highBound = 1437;
    var numbersNeeded = 31;
    var diff1 = 0;
    var diff2 = 0;
    var lastnum = 0;
    var distNum = 0;
    var distRemain = 0;

    // populate start array values
    var tmpsum = 0;
    while ( (tmpsum < ( masterSum - 5000) ) || (tmpsum > masterSum) ) {
      rndArr = [];
      for (i=0;i<numbersNeeded;i++) {
        var rnd = getRandomIntInclusive(lowBound, highBound);
        rndArr.push(rnd);
      }
      tmpsum = getSum(rndArr);
    }
    console.log("rndArrSum = ", getSum(rndArr));

    // distribute remaining numbers across array
    finalArr = rndArr;
    diff1 = masterSum - getSum(rndArr);
    distRemain = diff1 % numbersNeeded;
    diff1 -= distRemain;
    distNum = diff1 / numbersNeeded;
    rndArr.forEach(function(num, i) {
      if (finalArr[i] + distNum <= highBound) {
        finalArr[i] += distNum;
      }
    });
    // add the small remaining number to smallest element in array
    diff2 = masterSum - getSum(rndArr);
    console.log("diff2 = ", diff2);
    var min = Math.min.apply(Math, finalArr);
    console.log("finalArr min = ", min);
    finalArr[finalArr.indexOf(min)] += diff2;

    //output
    finalArr.forEach(function(num) {
      $("#seed-list").append("<li>" + num + "</li>");
    });
    $("li:odd").css( "background-color", "lightgrey" );
    $("#sum").text(getSum(finalArr));
  });

  // 10 random integers that add up to 8919, within a range from 421 to 1183
  $("#gen-btn-2").click(function() {
    // clear old output first
    $("#seed-list").empty();
    $("#sum").text("0");
   var rndArr = [];
   var finalArr = [];
   var masterSum = 8919;
   var lowBound = 421;
   var highBound = 1183;
   var numbersNeeded = 10;
   var diff1 = 0;
   var diff2 = 0;
   var lastnum = 0;
   var distNum = 0;
   var distRemain = 0;

    // populate start array values
    var tmpsum = 0;
    while ( (tmpsum < ( masterSum - 400)) || (tmpsum > masterSum) ) {
      rndArr = [];
      for (i=0;i<numbersNeeded;i++) {
        var rnd = getRandomIntInclusive(lowBound, highBound);
        rndArr.push(rnd);
      }
      tmpsum = getSum(rndArr);
    }
    console.log("rndArrSum = ", getSum(rndArr));

    // distribute remaining numbers across array
    finalArr = rndArr;
    diff1 = masterSum - getSum(rndArr);
    distRemain = diff1 % numbersNeeded;
    diff1 -= distRemain;
    distNum = diff1 / numbersNeeded;
    rndArr.forEach(function(num, i) {
      if (finalArr[i] + distNum <= highBound) {
        finalArr[i] += distNum;
      }
    });
    // add the small remaining number to smallest element in array
    diff2 = masterSum - getSum(rndArr);
    console.log("diff2 = ", diff2);
    var min = Math.min.apply(Math, finalArr);
    console.log("finalArr min = ", min);
    finalArr[finalArr.indexOf(min)] += diff2;

    //output
    finalArr.forEach(function(num) {
      $("#seed-list").append("<li>" + num + "</li>");
    });
    $("li:odd").css( "background-color", "lightgrey" );
    $("#sum").text(getSum(finalArr));
  });

});
