import { useCallback, useEffect, useRef } from "react";

export function useMinLoadingTime(dispatch, MIN_LOADING_TIME = 3000) {
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const enforceMinLoadingTime = useCallback(
    (startTime, action) => {
      clearTimeout(timerRef.current);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      timerRef.current = setTimeout(() => {
        dispatch(action);
      }, remainingTime);

      return () => clearTimeout(timerRef.current);
    },
    [dispatch, MIN_LOADING_TIME],
  );

  return enforceMinLoadingTime;
}
