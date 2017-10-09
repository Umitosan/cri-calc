

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

$(document).ready(function() {

  function clearOut() {
    $("#seed-list").empty();
    $("#sum").text("0");
  }

  function clearIn() {
    $("#lower-bounds").val(0);
    $("#upper-bounds").val(0);
    $("#quantity-returned").val(0);
  }

  // 31 random integers that add up to 37806, within a range from 79 to 1437
  $("#gen-btn-1").click(function() {
    clearOut();

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
    clearOut();

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

  // Custom user input
  $("#gen-btn-3").click(function() {
    clearOut();
    var userLower = parseInt($("#lower-bounds").val());
    var userUpper = parseInt($("#upper-bounds").val());
    var userSum = parseInt($("#desired-sum").val());
    var userQuantity = parseInt($("#quantity-returned").val());
    console.log("typeof userLower = ", typeof userLower);
    console.log("");
    console.log("Lower: "+userLower+"  Upper: "+userUpper+"  Sum: "+userSum+"  Quantity: "+userQuantity);

    // input error handling
    $("#input-err").css('color', 'red');
    if (userUpper <= userLower) {
      $("#input-err").text("lower-bound must be <= upper-bound");
    } else if ( userQuantity >= (userUpper - userLower) ) {
      $("#input-err").text("too many Quantity for given range");
    } else if (userSum <= userUpper) {
      $("#input-err").text("sum can't be less than upper bounds");
    } else if (userQuantity >= (userUpper - userLower)) {
      $("#input-err").text("quantity can't fit into range");
    } else {
      $("#input-err").css('color', 'green');
      $("#input-err").text("input valid");
    }

    // randomize starting array
    var baseArr = [];
    for (i=0 ; i<userQuantity ; i++) {
      var num = getRandomIntInclusive(userLower,userUpper);
      baseArr.push(num);
    }
    console.log("baseArr = ", baseArr);
    var baseArrSum = getSum(baseArr);
    console.log("baseArrSum = ", baseArrSum);
    var scaler = userSum / baseArrSum;
    console.log("scaler = ", scaler);
    var scaledArr = [];
    baseArr.forEach(function(num, i) {
      scaledArr.push(Math.round( num * scaler ));
    });
    console.log("scaledArr = ", scaledArr);
    var newSum = getSum(scaledArr);
    console.log("scaledArr sum = ", newSum);
    var diff = 0;
    if (newSum > userSum) {
      diff = newSum - userSum;
      if ((scaledArr[0] - diff) == 0) {
        scaledArr[1] -= diff;
      } else {
        scaledArr[0] -= diff;
      }
    } else if (newSum < userSum) {
      diff = userSum - newSum;
      if ((scaledArr[0] + diff) == 0) {
        scaledArr[1] += diff;
      } else {
        scaledArr[0] += diff;
      }
    } else {
      console.log("diff is 0");
    }
    console.log("diff = ", diff);
    console.log("final array sum = ", getSum(scaledArr));
  });

});
