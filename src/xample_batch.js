function logTimeLapsed(message) {
  var endTime = new Date().getTime();
  console.log(message, (endTime - startTime) / 1000);
}

async function loopit(val) {
  let proc = "loopit";
  logTimeLapsed(proc + " " + "Start loopit")
  for (var x = 0; x < 2000000000; x++) {
    var laughString = 'ha';
  }
  logTimeLapsed(proc + " " + "End of loopit")
  return laughString
}

async function loopit2(val, time, retval) {
  let proc = "loopit2"
  logTimeLapsed(proc + " " + "Start loop 2")
  for (var x = 0; x < 2000000000; x++) {
    var laughString = 'ha';
  }
  logTimeLapsed(proc + " " + "End of loop 2");
  var x = await returnValAfterSeconds("loopit2", val * 10, time);
  var y = x * 2
  logTimeLapsed(proc + " " + "End of await");
  return ["Original retval", retval, "Promise retval", x];
}

async function loopit3(val, time, retval) {
  let proc = "loopit3"
  var x = await returnValAfterSeconds("loopit3", val * 10, time);
  var y = x * 2
  logTimeLapsed(proc + " " + "End of await");
  logTimeLapsed(proc + " " + "Start loop 3")
  for (var x = 0; x < 2000000000; x++) {
    var laughString = 'ha';
  }
  logTimeLapsed(proc + " " + "End of loop 3");

  return ["Original retval", retval, "Promise retval", x];
}
function returnValAfterSeconds(msg, val, seconds) {
  let proc = "returnValAfterSeconds"
  return new Promise(xyz => {
    setTimeout(() => {
      logTimeLapsed(proc + " " + msg + ' returnValAfterSeconds start')
      xyz("Elephant "+val);
      logTimeLapsed(proc + " " + msg + ' returnValAfterSeconds end')
    }, seconds * 1000);
  });
}
var startTime = new Date().getTime();
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = returnValAfterSeconds("foo 5", 5)
var promise4 = returnValAfterSeconds("foo .5", .5)
var promise5 = returnValAfterSeconds("foo 4", 4)
var promise6 = loopit(9999999999999)
logTimeLapsed("Calling loopit2")
var promise7 = loopit2(9999999999999, 7, 1.4444)
console.log("Promise 7 is ", promise7)
logTimeLapsed("End calling loopit2")
logTimeLapsed("Calling loopit3")
var promise8 = loopit3(9999999999999, 7, 1.4444)
console.log("Promise 8 is ", promise8)
logTimeLapsed("End calling loopit3")

Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]).then(function (values) {
  console.log(values);
});
console.log("Semi end")
// expected output: Array [3, 42, "foo"]
