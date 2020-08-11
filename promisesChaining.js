const promise = new Promise((resolve, reject) => {
  resolve(1);
});

// simply returns
promise.then(res => {
  console.log(res);
  return res * 2;
}).then(res => {
  console.log(res);
  return res * 2;
}).then(res => {
  console.log(res);
  return res * 2;
}).then(res => {
  console.log(res);
});
// outputs 1, 2, 4, 8

const promise1 = new Promise((resolve, reject) => {
  resolve(1);
});

// return promises in each then's handler
promise1.then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res * 2);
    }, 1000)
  });
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res * 2);
    }, 1000)
  });
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res * 2);
    }, 1000)
  });
}).then(res => {
  console.log(res);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res * 2);
    }, 1000)
  });
})
// outputs 1, 2, 4, 8 as well

// quote from JSInfo: callback style, code grows to right
// People who start to use promises sometimes don’t know about chaining, 
// so they write it this way. Generally, chaining is preferred
// loadScript("/article/promise-chaining/one.js").then(script1 => {
//   loadScript("/article/promise-chaining/two.js").then(script2 => {
//     loadScript("/article/promise-chaining/three.js").then(script3 => {
//       // this function has access to variables script1, script2 and script3
//       one();
//       two();
//       three();
//     });
//   });
// });






