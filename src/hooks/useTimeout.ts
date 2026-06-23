import { useCallback, useEffect, useRef } from 'react';

export default function useTimeout(callback: React.RefObject<number> | number, delay: number) {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current() as React.RefObject<number>, delay);
	}, [delay]);

	const clear = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		timeoutRef.current && clearTimeout(timeoutRef.current as number);
	}, []);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}
