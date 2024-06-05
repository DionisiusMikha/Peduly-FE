function reverseNumber(input) {
  return [].map
    .call(input, function (x) {
      return x;
    })
    .reverse()
    .join('');
}

function plainNumber(number) {
  return number.split('.').join('');
}

function splitInDots(input) {
  if (input) {
    var value = input,
      plain = plainNumber(value),
      reversed = reverseNumber(plain),
      reversedWithDots = reversed.match(/.{1,3}/g).join('.'),
      normal = reverseNumber(reversedWithDots);
  }

  console.log("Input:", input);
  console.log("Plain:", plain);
  console.log("Reversed:", reversed);
  console.log("Reversed with Dots:", reversedWithDots);
  console.log("Normal:", normal);
  return normal;
}

export default splitInDots;
