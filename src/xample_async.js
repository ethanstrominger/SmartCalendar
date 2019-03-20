function doubleAfter2Seconds(x,y,z) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("A");
      resolve( [4,z,x * 2 + y,7*x]);
      console.log("B")
    }, z*1000);
  });
}

doubleAfter2Seconds(10,13,2).then((r) => {
    console.log("1");
    console.log(r);
});

doubleAfter2Seconds(10,13,1).then((r) => {
  console.log("2");
  console.log(r);
});

async function j (){
  const x = await doubleAfter2Seconds(10,13,.25)
  console.log(["Here ",x])
  return x;
}

console.log('A');
const q = j();
console.log(["Whatever",q]);
doubleAfter2Seconds(10,13,10).then((r) => {
  console.log("3",r,q)
});


console.log(["Whichever",q]);