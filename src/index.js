import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './js/cat-api.js'
import { fetchCatByBreed } from './js/cat-api.js'

const elements = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
} 

elements.loader.classList.add('visually-hidden');
elements.error.classList.add('visually-hidden');
elements.catInfo.classList.add('visually-hidden')

// const select = new SlimSelect({
//     select: elements.select,

//     settings: {
//         disabled: false,
//         alwaysOpen: false,
//         showSearch: true,
//         searchPlaceholder: 'Search',
//         searchText: 'No Results',
//         searchingText: 'Searching...',
//         searchHighlight: false,
//         closeOnSelect: true,
//         contentLocation: document.body,
//         contentPosition: 'absolute',
//         openPosition: 'auto',
//         placeholderText: 'Select Value',
//         allowDeselect: false,
//         hideSelected: false,
//         showOptionTooltips: false,
//         minSelected: 0,
//         maxSelected: 1000,
//         timeoutDelay: 200,
//         maxValuesShown: 20,
//         maxValuesMessage: '{number} selected',
//     },
//     // events: {
//     //      search: (search, currentData) => {
//     //   return new Promise((resolve, reject) => {
//     //     if (search.length < 2) {
//     //       return reject('Search must be at least 2 characters')
//     //     }

//         // // Fetch random first and last name data
//         // fetch('https://api.gofakeit.com/json', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify({
//         //     type: 'array',
//         //     rowcount: 10,
//         //     indent: false,
//         //     fields: [
//         //       { name: 'first_name', function: 'firstname', params: {} },
//         //       { name: 'last_name', function: 'lastname', params: {} },
//         //     ],
//         //   }),
//         // })
//         //   .then((response) => response.json())
//         //   .then((data) => {
//         //     // Take the data and create an array of options
//         //     // excluding any that are already selected in currentData
//         //     const options = data
//         //       .filter((person) => {
//         //         return !currentData.some((optionData) => {
//         //           return optionData.value === `${person.first_name} ${person.last_name}`
//         //         })
//         //       })
//         //       .map((person) => {
//         //         return {
//         //           text: `${person.first_name} ${person.last_name}`,
//         //           value: `${person.first_name} ${person.last_name}`,
//         //         }
//         //       })

//         //     resolve(options)
//         //   })
// //       })
// //     }
// //   
// })

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
                    const breedId = newVal[0].value;

                    fetchCatByBreed(breedId)
                        .then(catInfo => {
                            console.log(catInfo)
                            let { url } = catInfo[0];
                            console.log(url)
                            return url 
                        })
                        .catch(error => { console.log(error) });
                }
            }
        })
    
        return select;
        
    })
.catch(error => {
    console.log(error)
});



// function renderCard(catInfo) {
//      elements.catInfo.classList.remove('visually-hidden');
        // const { url } = catInfo[0];
        
        // const catCard = catInfo.map(({ url }) => {
        //     const { description, name, temperament } = datas[newVal[0].value];
        //     return `
        //     <div class="card-image">
        //         <img src="${url}" alt="Сat breed "${name}" width="500">
        //     </div>
        //     <div class="card-description">
        //         <h1 class="card-title">${name}</h1>
        //         <p class="card-text">${description}</p>
        //         <p class="card-text">Temperament: ${temperament}</p>
        //     </div>`
        // }).join('');
        // elements.catInfo.insertAdjacentHTML('beforeend', catCard);
// }



