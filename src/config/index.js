const baseSearchUrl = "https://api.jikan.moe/v4/anime";

export const getUpcomingAPI = () => {
    return fetch(`https://api.jikan.moe/v4/seasons/upcoming`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getSeasonAPI = (year, season) => {
    return fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}`).then(
        (res) => res.json().then((results) => Promise.resolve(results))
    );
};

export const getAiringAPI = () => {
    return fetch(`https://api.jikan.moe/v4/seasons/now`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getSearchAPI = (keyword, num) => {
    return fetch(
        `https://api.jikan.moe/v4/anime?q=${keyword}&page=${num}`
    ).then((res) => res.json().then((results) => Promise.resolve(results)));
};

export const getTodayAPI = () => {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d = new Date();
    let day = weekday[d.getDay()];
    return fetch(`https://api.jikan.moe/v4/schedules?filter=${day}`).then(
        (res) => res.json().then((results) => Promise.resolve(results))
    );
};

export const getRandomAPI = () => {
    return fetch(`https://api.jikan.moe/v4/random/anime`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getDetailsAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getVideosAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/videos`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getEpisodesAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getReviewsAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getRecommendationsAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`).then(
        (res) => res.json().then((results) => Promise.resolve(results))
    );
};

export const getStatAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/statistics`).then(
        (res) => res.json().then((results) => Promise.resolve(results))
    );
};

export const getCharactersAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/characters`).then(
        (res) => res.json().then((results) => Promise.resolve(results))
    );
};
export const getStaffAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/staff`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};

export const getMoreInfoAPI = (id) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/moreinfo`).then((res) =>
        res.json().then((results) => Promise.resolve(results))
    );
};
