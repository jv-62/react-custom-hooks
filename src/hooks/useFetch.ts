import { useCallback, useEffect, useRef, useState } from 'react';

export default function useFetch<T = unknown>(url: string, options?: RequestInit) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const controllerRef = useRef<AbortController | null>(null);

	const fetchData = useCallback(
		async (inputUrl?: string) => {
			const fetchUrl = inputUrl ?? url;
			if (!fetchUrl) return null;

			controllerRef.current?.abort();
			const controller = new AbortController();
			controllerRef.current = controller;

			setLoading(true);
			setError(null);
			try {
				const res = await fetch(fetchUrl, { signal: controller.signal, ...(options || {}) });
				if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
				const json = await res.json();
				setData(json);
				return json;
			} catch (err: unknown) {
				if (err instanceof Error && err.name === 'AbortError') return null;
				setError(err instanceof Error ? err : new Error('An unknown error occurred'));
				return null;
			} finally {
				setLoading(false);
			}
		},
		[url, options]
	);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (url) fetchData(url);
		return () => controllerRef.current?.abort();
	}, [url, fetchData]);

	return { data, loading, error, refetch: fetchData };
}
