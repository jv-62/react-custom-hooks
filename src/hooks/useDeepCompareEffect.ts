import { useEffect, useRef } from 'react';
import { isEqual } from 'react-lodash';

export default function useDeepCompareEffect(callback: () => void, dependencies: unknown[]) {
	const currentDependenciesRef = useRef(dependencies);

	useEffect(() => {
		if (!isEqual(currentDependenciesRef.current, dependencies)) {
			currentDependenciesRef.current = dependencies;
			callback();
		}
	}, [callback, dependencies]);
}
