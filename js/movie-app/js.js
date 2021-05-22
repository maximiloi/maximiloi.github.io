const url = 'https://api.themoviedb.org/3/search/movie?api_key=1643477465d09ade7403a888871a1709&query=%D1%81%D0%B5%D0%BA%D1%81&language=ru&include_adult=true&page=499';
const pageActive = 499;


console.log('url replace: ', url.replace(pageActive, () => {
    return pageActive - 1;
}));

console.log('url replace: ', url.replace(pageActive, pageActive - 1));