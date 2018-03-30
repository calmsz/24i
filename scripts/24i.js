require.config({
    baseUrl: './scripts/'
});

require(['searchAndShow'], function (searchAndShow) {
    document.getElementById('searchButton').onclick = searchAndShow.imagesAndText;
    document.getElementById('q').onkeydown = ((e) => {if (e.keyCode === 13) {searchAndShow.imagesAndText();} })
    return true;
});