const form = document.querySelector('#searchForm');
const input = document.querySelector('.input-container input');
const searchButton = document.querySelector('.input-container button');
const inputContainer = document.querySelector('.input-container');
const showsList = document.querySelector('.container-fluid .row.shows');
const colorFocus = 'rgb(28, 32, 35)';
const colorBlur = 'rgb(38, 42, 46)';

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    showsList.textContent = '';
    addShows(await getShows());
    input.value = '';
})

const getShows = async () => {
    try{
        const searchTerm = form.elements.query.value;
        const config = {params: {q: searchTerm} }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        return res.data;
    }catch (err){
        console.log("ERROR", err)
    }
}

const addShows = async (shows) => {
    try{
        for (let result of shows){
            if(result.show.image){
                let newColumn = document.createElement('div');
                const {show} = result;
                newColumn.classList.add('col-6');
                newColumn.classList.add('col-sm-4');
                newColumn.classList.add('col-md-3');
                newColumn.classList.add('col-lg-2');

                const markup = `<div class="show-container">
                <div class="image-container">
                  <img
                    src="${show.image.medium}"
                    alt=""
                  />
                </div>
                <div class="tittle-container">
                  <p>${show.name} <span>${show.premiered.slice(0,4)}</span></p>
                </div>
              </div>`;

              newColumn.innerHTML = markup;
              showsList.append(newColumn);
            }
        }
    }catch(err){
        console.log('ERROR', err)
    }
}

input.addEventListener('focus', () => {
    applyColor(colorFocus);
})

input.addEventListener('blur', () => {
    applyColor(colorBlur);
})

const applyColor = (color) => {
    searchButton.style.background = color;
    input.style.background = color;
    inputContainer.style.background = color;
}
