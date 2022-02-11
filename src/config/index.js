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
