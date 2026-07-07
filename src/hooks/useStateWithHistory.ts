import { useCallback, useRef, useState } from 'react';

export interface stateWithHistoryOptions {
	history: stateWithHistoryOptions[];
	pointer: number;
	back: () => void;
	forward: () => void;
	go: (index: number) => void;
	capacity: number;
}

export default function useStateWithHistory(defaultValue: number, { capacity = 10 } = {} as stateWithHistoryOptions) {
	const [value, setValue] = useState(defaultValue);
	const [history, setHistory] = useState([defaultValue]);
	const [pointer, setPointer] = useState(0);
	const historyRef = useRef(history);
	const pointerRef = useRef(pointer);

	const set = useCallback(
		(v: unknown | ((prev: unknown) => unknown)) => {
			const resolvedValue = typeof v === 'function' ? v(value) : v;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				let nextHistory = historyRef.current;

				if (pointerRef.current < nextHistory.length - 1) {
					nextHistory = nextHistory.slice(0, pointerRef.current + 1);
				}

				nextHistory = [...nextHistory, resolvedValue];

				while (nextHistory.length > capacity) {
					nextHistory.shift();
				}

				historyRef.current = nextHistory;
				pointerRef.current = nextHistory.length - 1;
				setHistory(nextHistory);
				setPointer(pointerRef.current);
			}

			setValue(resolvedValue);
		},
		[capacity, value]
	);

	const back = useCallback(() => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setPointer(pointerRef.current);
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setPointer(pointerRef.current);
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const go = useCallback((index: number) => {
		if (index < 0 || index > historyRef.current.length - 1) return;
		pointerRef.current = index;
		setPointer(index);
		setValue(historyRef.current[index]);
	}, []);

	return [value, set, history, pointer, back, forward, go];
}
