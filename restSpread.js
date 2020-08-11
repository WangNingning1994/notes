function calc(...args) {
  let res = 0;
  for (const num of args) {
    res += num;
  } 
  return res;
}
calc(1, 2, 3, 4);

function xyz(x, y, ...z) {
  console.log(x);
  console.log(y);
  console.log(z);
}
xyz('test', 'param', 'wow', 'even', 'more');

const arr = [1, 2, 3];
const arr2 = [...arr];
console.log(arr);