import { useRef, useEffect } from 'react';

export function makeCancelable(promise) {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val => (isCanceled ? reject(new Error('Promise is canceled')) : resolve(val)))
      .catch(val => (isCanceled ? reject(new Error('Promise is canceled')) : reject(val)))
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    }
  }
};

export default function useCancelablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true);

  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error('promise wrapper argument must provide a cancel() function')
  }

  const promises = useRef();

  useEffect(
    () => {
      promises.current = promises.current || [];
      return function cancel() {
        promises.current.forEach(p => p.cancel());
        promises.current = [];
      };
    }, []
  );

  function cancellablePromise(p) {
    const cPromise = cancelable(p);
    promises.current.push(cPromise);
    return cPromise.promise;
  }

  return { cancellablePromise };

}