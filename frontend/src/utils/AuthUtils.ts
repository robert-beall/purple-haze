export const isLoggedIn = (): boolean => {
    if (typeof localStorage.getItem('purple-token') !== 'undefined' && localStorage.getItem('purple-token') !== null) {
        return true;
    }

    return false;
}