export function jsonFetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    return fetch(input, init).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw res;
    });
}
