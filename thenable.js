// thenables
// quote from JSInfo
/*
 *To be precise, a handler may return not exactly a promise, 
  but a so-called “thenable” object – an arbitrary object that has a method .then
  It will be treated the same way as a promise.
  The idea is that 3rd-party libraries may implement “promise-compatible” objects of their own. 
  They can have an extended set of methods, 
  but also be compatible with native promises, because they implement .then
 */

class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    setTimeout(resolve(this.num), 1000);
  }
}
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2 success')
  }, 1000);
});
promise2.then(res => {
  return new Thenable(2);
}).then(res => {
  console.log(res);
})



