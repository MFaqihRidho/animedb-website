export const getUpcomingAPI = () => {
    return fetch(`https://api.jikan.moe/v4/seasons/upcoming`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};
