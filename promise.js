Error.prototype.toString = () => {
  return 'oh fu*k';
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('error'));
  }, 1000);
});

// first handler in then is for fulfilled result
// second handler in then is for rejected result
promise.then(null, err => {
  console.log('err happens');
  return err.toString();
}).then(res => { // When a handler returns a value, it becomes the **result** of that promise
  console.log('2nd res handler'); // this will run even first call to promise actually handles err
  console.log(res);
}, err => {
  console.log('2nd err handler');
  console.log(err);
});

function boringTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('a')
    }, 10000);
  });
}

async function getBoringTaskResult() {
  let b = 'b';
  let a = await boringTask(); // pause function's code till a get its result
  console.log('dancing bite');
  console.log(a);
  console.log(b);
}

function normalTask() {
  console.log('normal task');
}

getBoringTaskResult();
normalTask(); // this will excuate first

// convert setTimeout to promise's style
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, ms)
  });
}
delay(1000).then(res => { console.log(res) });