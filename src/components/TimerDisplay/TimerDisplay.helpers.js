import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function getShowTime(sec) {
	sec = Math.ceil(sec / 10)
	let min = ((sec - (sec % 60)) / 60).toString().padStart(2, '0')
	sec = (sec % 60).toString().padStart(2, '0')
	return `${min}:${sec}`
}