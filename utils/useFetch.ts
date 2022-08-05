import { useReducer, useEffect } from "react";
import { API_URL } from './config';
import Auth from '@aws-amplify/auth';

type useFetchData<Type> = {
    data: Type,
    loaded: boolean,
    error: string
};

type useFetchReducerAction = {
    type: string,
    data?: any,
    error?: string
};

const useFetchReducer = <Type>(state: useFetchData<Type>, action: useFetchReducerAction) => {
    switch (action.type) {
        case 'uFStarted':
            return { ...state, loaded: false, error: null, data: null };
        case 'uFSuccess':
            return { ...state, loaded: true, error: null, data: action.data };
        case 'uFFailed':
            return { ...state, loaded: false, error: action.error, data: null };
        default:
            throw new Error('uknown action type: ' + action.type);
    }
};

type useFetchParams = {
    do_load?: boolean,
    auth?: boolean,
    extract?: (data: any) => any,
    api?: string
};

// Hook to fetch data from API.
// :returns state object with `{ data: <any>, loaded: <bool>, error: <any> }`,
//   where `data` and `error` use `null` as null-value.
// The hook takes care of a clean up when component is unmounted, or reload
// is needed. In this case, slow fetch() calls are killed.
//
// To reload the data fetched, the URL has to change; this can be achieved by simply
// appending a bogus random query parameter to the URL.
//
// the options object may contain the following:
// - do_load - boolean, if present and false, the fetch() is not actually triggered,
//   and state object contains `{ data: null, loaded: false, error: null }`,
//   with no updates being done
// - auth - boolean, to include Authorization header, default is `true`
// - extract - function `(data) => { ... }` to process the response
// - api - base URL of API, if it differs from the default utils/config:API_URL
const useFetch = <Type = any>(url: string, { do_load = true, auth = true, extract = null, api = null }: useFetchParams = {}): useFetchData<Type> => {
    // we're using useReducer() rather than useState() here, as useState()
    // may suffer from race conditions on fast updates, while useReducer() does not
    const [state, dispatch] = useReducer(useFetchReducer, { data: null, loaded: false, error: null });

    useEffect(() => {
        // signal object to kill async fetch request on clean up
        const abortCtrl = new AbortController();

        // we cannot async within useEffect(), so just define and call it right away
        const doFetch = async () => {
            if (do_load) {
                dispatch({ type: 'uFStarted' });
                // load the options
                const full_url = (api || API_URL) + url;
                var fetch_opts: RequestInit = {
                    mode: 'cors',
                    signal: abortCtrl.signal,
                    headers: {}
                };
                if (auth) {
                    const session = await Auth.currentSession();
                    fetch_opts.headers = { 'Authorization': session.getIdToken().getJwtToken() };
                }

                try {
                    const response = await fetch(full_url, fetch_opts);
                    if (!response.ok)
                        throw new Error(`${response.status} ${response.statusText}`);

                    const data = await response.json();
                    dispatch({ type: 'uFSuccess', data: extract ? extract(data) : data });
                } catch (e) {
                    // aborted fetch actually throws, so make sure this is not the case...
                    if (!abortCtrl.signal.aborted)
                        dispatch({ type: 'uFFailed', error: e.message });
                }
            } else {
                // no load, no nothing for ya...
            }
        };
        doFetch();

        // clean up function that aborts the fetch call if it's taking too long...
        return () => { abortCtrl.abort() };
    }, [url]);

    return state;
};

export default useFetch;
