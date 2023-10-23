import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './js/cat-api.js'
import { fetchCatByBreed } from './js/cat-api.js'
import Notiflix from 'notiflix';

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
} 

elements.loader.classList.add('visually-hidden');
elements.error.classList.add('visually-hidden');
elements.catInfo.classList.add('visually-hidden')

fetchBreeds()
    .then(datas => {

        const listBreed = datas.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`
        }).join('');
        elements.select.insertAdjacentHTML('beforeend', listBreed);
        
    
        const select = new SlimSelect({
            select: elements.select,

            settings: {
                disabled: false,
                alwaysOpen: false,
                showSearch: true,
                searchPlaceholder: 'Search',
                searchText: 'No Results',
                searchingText: 'Searching...',
                searchHighlight: false,
                closeOnSelect: true,
                contentLocation: document.body,
                contentPosition: 'absolute',
                openPosition: 'auto',
                placeholderText: 'Select Value',
                allowDeselect: false,
                hideSelected: false,
                showOptionTooltips: false,
                minSelected: 0,
                maxSelected: 1000,
                timeoutDelay: 200,
                maxValuesShown: 20,
                maxValuesMessage: '{number} selected',
            },
            events: {
                afterChange: (newVal) => {
            
                    onLoad();
                    

                    const breedId = newVal[0].value;
                
                    fetchBreeds()
                        .then(data => {
                        elements.catInfo.classList.remove('visually-hidden');
                        
                        const catArr = data.filter(element => {return element.id === breedId});
                        const { description, name, temperament } = catArr[0];

                        fetchCatByBreed(breedId)
                            .then(catInfo => {
                                const { url } = catInfo[0];
                               
                                const catCard = catInfo.map(({ url }) => {
                                    return `
                                        <div class="card">
                                            <img src="${url}" alt="Сat breed '${name}'" width="400" class="card-image">
                                            <div class="card-description">
                                                <h1 class="card-title">${name}</h1>
                                                <p class="card-text">${description}</p>
                                                <p class="card-text"><span class="card-text-color">Temperament:</span><br><span class="card-text">${temperament}</span></p>
                                            </div>
                                        </div>
                                    `
                                }).join('');

                                elements.catInfo.innerHTML = catCard;

                                onFinish() 
                            })
                            .catch(error => {
                                onError(error)
                                console.log(error)
                            });
                        
                        // onFinish()
                        })
                        .catch(error => {
                            onError(error);
                            console.log(error);
                        })
                }
            }
        })

    return select; 

})
.catch(error => {
    onError(error);
    console.log(error);
});


function onLoad() {
    elements.loader.textContent = '';
    elements.catInfo.classList.add('visually-hidden');
    elements.loader.classList.remove('visually-hidden');
    
}
function onFinish(catCard) {
    // elements.catInfo.remove()
    //  elements.catInfo.innerHTML = catCard;
    elements.catInfo.classList.remove('visually-hidden');
    elements.loader.classList.add('visually-hidden');
}

function onError(error) {
    elements.error.textContent = '';
    Notiflix.Notify.warning('Oops! Something went wrong! Try reloading the page!')
}