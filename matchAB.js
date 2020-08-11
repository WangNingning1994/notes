const matchAB = (str) => {
  const pattern = 'ab';
  for (let i = 0; i < str.length; i++) {
    if (i < (str.length - 1)) {
      if (`${str[i]}${str[i+1]}` === pattern) {
        return true;
      }
    }
  }
  return false;
}
matchAB('I am f aba c');
