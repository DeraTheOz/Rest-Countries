import { useCallback } from "react";

export function useMinLoadingTime(dispatch, MIN_LOADING_TIME = 3000) {
  const enforceMinLoadingTime = useCallback(
    (onSuccess) => {
      const startTime = Date.now();

      return () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

        const timer = setTimeout(() => {
          dispatch(onSuccess());
        }, remainingTime);

        return () => clearTimeout(timer);
      };
    },
    [dispatch, MIN_LOADING_TIME],
  );

  return enforceMinLoadingTime;
}
