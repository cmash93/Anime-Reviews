// export const getMe = (token) => {
//     return fetch('/api/users/me', {
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const createUser = (userData) => {
//     return fetch('api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
// };

// export const loginUser = (userData) => {
//     return fetch('/api/users/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON/stringify(userData),
//     });
// };

// export const saveAnime = (saveAnime, token) => {
//     return fetch9('/api/users', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(animeData),
//     });
// };

// export const deleteAnime = (animeId, token) => {
//     return fetch(`/api/users/animes/${animeId}`, {
//         method: 'DELETE',
//         headers: {
//             authorization: `Bearer ${token}`,
//         },
//     });
// };

export const searchAnimeApi = (query) => {
    return fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`);
};