import isEqual from 'lodash/isEqual';
import { useEffect, useRef } from 'react';

export default function useDeepCompareEffect(callback: () => void, dependencies: unknown[]) {
	const currentDependenciesRef = useRef(dependencies);

	useEffect(() => {
		if (!isEqual(currentDependenciesRef.current, dependencies)) {
			currentDependenciesRef.current = dependencies;
			callback();
		}
	}, [callback, dependencies]);
}
