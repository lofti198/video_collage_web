export const getReadableTimeString = (timeInSeconds) => {
  var hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds = timeInSeconds - hours * 3600;

  var minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds = timeInSeconds - minutes * 60;

  var retVal = `${
    timeInSeconds.toString().length == 1 ? `0${timeInSeconds}` : timeInSeconds
  }`;
  //if(minutes > 0)
  retVal = `${
    minutes.toString().length == 1 ? `0${minutes}` : minutes
  }:${retVal}`;
  //if(hours > 0)
  retVal = `${hours.toString().length == 1 ? `0${hours}` : hours}:${retVal}`;

  return retVal;
};

export const timeoutPromise = async (ms) => {
  return new Promise((res, err) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};
