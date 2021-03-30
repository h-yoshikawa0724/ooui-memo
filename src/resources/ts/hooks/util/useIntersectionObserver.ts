import React, { useCallback, useEffect } from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import { AxiosError } from 'axios';

type Argument = {
  root?: React.RefObject<HTMLElement> | null;
  target: React.RefObject<HTMLElement>;
  onIntersect: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<unknown, AxiosError>>;
  threshold?: number | number[];
  rootMargin?: string;
  enabled?: boolean;
};

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: Argument): void => {
  const newIntersectionObserver = useCallback(
    () =>
      new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => entry.isIntersecting && onIntersect()),
        {
          root: root && root.current,
          rootMargin,
          threshold,
        }
      ),
    [root, onIntersect, threshold, rootMargin]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const el = target && target.current;

    if (!el) {
      return;
    }

    const observer = newIntersectionObserver();

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(el);
    };
  }, [enabled, target, newIntersectionObserver]);
};

export default useIntersectionObserver;
