export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    console.log(res);
    return Promise.reject(`Ошибка ${res.status}`);
}
export const request = async (url, options) => {
    const res = await fetch(url, options);
    return checkResponse(res);
}