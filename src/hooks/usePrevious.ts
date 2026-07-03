import { useEffect, useRef, useState } from 'react';

export default function usePrevious(value: number) {
	const currentRef = useRef(value);
	const previousRef = useRef<number | undefined>(undefined);
	const [previous, setPrevious] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (currentRef.current !== value) {
			previousRef.current = currentRef.current;
			currentRef.current = value;
			setPrevious(previousRef.current);
		}
	}, [value]);

	return previous;
}
