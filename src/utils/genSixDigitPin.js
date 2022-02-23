const genSixDigitPin = (pin) => {
  if (/\d{6}/.test(pin)) {
    return pin;
  } else {
    const randomSixDigits = Math.floor(Math.random() * 1_000_000);
    return genSixDigitPin(randomSixDigits);
  }
};

export default genSixDigitPin;
