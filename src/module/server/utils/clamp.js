define(() => {
  function clamp (number, lower, upper, def = null) {
    if (Number.isNaN(number)) {
      return def;
    }

    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    
    return number;
  };

  return clamp;
});
