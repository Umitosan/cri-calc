

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

  // Custom user input with validation
  $("#gen-btn-3").click(function() {
    clearOut();
    var userLower = parseInt($("#lower-bounds").val());
    var userUpper = parseInt($("#upper-bounds").val());
    var userSum = parseInt($("#desired-sum").val());
    var userQuantity = parseInt($("#quantity-returned").val());
    var foundErrors = false;
    console.log("typeof userLower = ", typeof userLower);
    console.log("");
    console.log("Lower: "+userLower+"  Upper: "+userUpper+"  Sum: "+userSum+"  Quantity: "+userQuantity);

    // input error handling
    $("#input-err").css('color', 'red');
    if (userUpper <= userLower) {
      $("#input-err").text("lower-bound must be <= upper-bound");
      foundErrors = true;
    } else if ( userQuantity >= (userUpper - userLower) ) {
      $("#input-err").text("too many Quantity for given range");
      foundErrors = true;
    } else if ( userUpper > userSum ) {
      $("#input-err").text("upper bounds must be less than sum");
      foundErrors = true;
    } else if (userSum <= userLower) {
      $("#input-err").text("sum must be > the lower bounds");
      foundErrors = true;
    } else if ((userQuantity * userLower) >= userSum) {
      $("#input-err").text("quantity or lower bounds too large");
      foundErrors = true;
    } else if ((userQuantity * userUpper) <= userSum) {
      $("#input-err").text("quantity or upper bounds too small");
      foundErrors = true;
    } else {
      $("#input-err").css('color', 'green');
      $("#input-err").text("input valid");
      foundErrors = false;
    }

    // if no errors proceed to calc and show output
    if (foundErrors == false) {
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
        // check to make sure the scaled number is in range
        var newScaledNum = Math.round( num * scaler )
        var growthDiff = newScaledNum - num;
        if (newScaledNum > userUpper) {
          scaledArr.push(num);
        } else if (newScaledNum < userLower) {
          scaledArr.push(num);
        } else {
          scaledArr.push(newScaledNum);
        }
      });
      console.log("scaledArr before adjustment = ", scaledArr);
      var newSum = getSum(scaledArr);
      console.log("scaledArr sum = ", newSum);

      // final adjustment
      var diff;
      diff = (newSum - userSum);
      console.log("diff = ", diff);
      // try to add a bit of the remainder to each element in array until remainder == 0
      var remainder = diff;
      var sliceNum;
      if (diff > 0) {
        while (remainder > 0) {
          var sliceNum = getRandomIntInclusive(1, remainder);
          var sliceUsed = false;
          scaledArr.forEach(function(oldNum, i) {
            var newNum = (oldNum - sliceNum);
            var indexToAddTo;
            if (sliceUsed == false) {
              if ( ( newNum <= userUpper ) && ( newNum >= userLower) ) {
                console.log("slice: ", sliceNum, " added to oldNum: ", oldNum, " at index: ", i, " newNum = ", newNum);
                scaledArr[i] = newNum;
                remainder -= sliceNum;
                console.log("remainder now is: ", remainder);
                sliceUsed = true;
              }
            }
          });
        } // END while
      } // END if
      if (diff < 0) {
        while (remainder < 0) {
          var sliceNum = getRandomIntInclusive(1, Math.abs(remainder));
          var sliceUsed = false;
          scaledArr.forEach(function(oldNum, i) {
            var newNum = (oldNum + sliceNum);
            var indexToAddTo;
            if (sliceUsed == false) {
              if ( ( newNum <= userUpper ) && ( newNum >= userLower) ) {
                console.log("slice: ", sliceNum, " added to oldNum: ", oldNum, " at index: ", i, " newNum = ", newNum);
                scaledArr[i] = newNum;
                remainder += sliceNum;
                console.log("remainder now is: ", remainder);
                sliceUsed = true;
              }
            }
          });
        } // END while
      }
      console.log("final array = ", scaledArr);
      console.log("final array sum = ", getSum(scaledArr));

      //output list of numbers and sum
      scaledArr.forEach(function(num) {
        $("#seed-list").append("<li>" + num + "</li>");
      });
      $("li:odd").css( "background-color", "lightgrey" );
      $("#sum").text(getSum(scaledArr));
    } // end IF

  }); // end btn-3 click

});
