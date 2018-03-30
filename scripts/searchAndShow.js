define(function () {
    const domImageGrid = document.getElementById('imageGrid');
    const domTextList = document.getElementById('textList');

    let doSearch = function (type) {
        let query = document.getElementById('q');
        let action = `https://www.googleapis.com/customsearch/v1?`
        .concat(`key=AIzaSyDmpjDnq1249wBcZD04fyE0sJ3HK8C0zqY`)
        .concat(`&cx=013657240802926337286:caq989bexze`);

        if (type === 'image') {
            action = action.concat(`&searchType=image`)
                .concat(`&num=9`);
            loading(domImageGrid);
        } else {
            action = action
                .concat(`&num=4`);
            loading(domTextList);
        }

        action = action.concat(`&q=${query.value}`);
        
        if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 6 and older
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        try {
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        let output = JSON.parse(httpRequest.responseText).items;
                        if (output) {
                            if (type === 'image') {
                                parseImages(output);
                                doSearch('text');
                            }
                            else
                                parseText(output);                                                
                        } 
                } 
            };
        } catch (error) {
            console.log(error);
        }

        httpRequest.open('GET', action, true);
        httpRequest.send();
    };

    let both = function () {        
        doSearch('image');
    }

    let parseImages = function(content) {
        let container = domImageGrid;
        let contentDommed = ``;

        content.forEach(item => {
            contentDommed = contentDommed.concat(`<div><img src="${item.link}" alt=""></div>`);
        });

        container.innerHTML = contentDommed;
    }

    let parseText = function(content) {
        let container = domTextList;
        let contentDommed = ``;
        
        content.forEach(item => {
            contentDommed = contentDommed.concat(`<div>
            <p><strong>${item.htmlTitle}</strong></p>
            <a href="${item.link}">${item.displayLink}</a>
            <p>${item.htmlSnippet}</p>
          </div>`);
        });

        container.innerHTML = contentDommed;
    }

    let loading = function(element){
        element.innerHTML = `<img style="margin:auto" src="clipart/three-bar-loader.gif" alt="searching and loading..">`;
    }


    return {
        imagesAndText: both
    }
});
