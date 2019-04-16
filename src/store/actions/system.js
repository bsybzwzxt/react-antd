export const SET_LOADING = 'SET_LOADING';

export function setLoading(state) {
    return { type: SET_LOADING, preload: { loading: state } }
}


export const SET_COLLAPSED = 'SET_COLLAPSED';

export function setCollapsed(state) {
    return { type: SET_COLLAPSED, preload: { collapsed: state } }
}
