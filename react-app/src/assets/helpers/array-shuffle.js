export default function arrShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  return arr;
};

// const testArr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arrShuffle(testArr));
