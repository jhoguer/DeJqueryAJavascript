console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise((todoBien, todoMal) => {
  setTimeout(() => {
    todoBien('Se acabo el tiempo 5000')
  }, 5000)
})

const getUser = new Promise((todoBien, todoMal) => {
  setTimeout(() => {
    todoBien('Se acabo el tiempo 3000')
  }, 3000)
})

// getUser
//   .then(() => console.log('Todo esta bien en la vida'))
//   .catch(msg => console.log(`Fallo!!! ${msg}`))

Promise.race([
  getUser,
  getUserAll
])
.then((message) => console.log(message))
.catch((message) => console.log(message));

// $.ajax('https://randomuser.me/api/sdsf', {
//   method: 'GET',
//   success: (data) => {
//     console.log(data)
//   },
//   error: (error) => {
//     console.log(error)
//   }
// })

// fetch('https://randomuser.me/api/')
//   .then(response => {
//     return response.json()
//     // console.log(response)
//   })
//   .then(data => console.log(data.results[0].name.first))
//   .catch(error => console.log(error))


// const load = async () => {
//   try {
//     const response = await fetch('https://randomuser.me/api/');
//     const data = await response.json();
//     console.log(data.results[0].name.first)
//   } catch (err) {
//     console.log(err)
//   }
// }

// load();

const load = async (direccion) => {
  const getData = async (direccion) => {
    const url = direccion;
      try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.movie_count > 0) {
        return data
      } else {

      }
    } catch (err) {
      alert('Fallo la api')
    }
    

  }

  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home');
  const $featuringContainer = document.getElementById('featuring');


  const setAttributes = ($element, attributes) => {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }
  
  const BASE_API = 'https://yts.mx/api/v2/';

  const featuringTemplate = (peli) => {
    return (
      `pokemon
      <pokemon
       pokemon>
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault()


    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)

    const data = new FormData($form);
    try {
      const {
        data: {
          movies: pelis,
        }
      } = await getData(`${BASE_API}list_movies.json?limit=&query_term=${data.get('name')}`)
      // const pelis = await getData(`${BASE_API}list_movies.json?limit=&query_term=${data.get('name')}`)
   
      const HTMLString = featuringTemplate(pelis[0])  
      $featuringContainer.innerHTML = HTMLString;
      
    } catch (err) {
      
      alert(err.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }
    
  })

  

  const videoItemTemplate = (movie, category) => {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
      )
    }

    const createTemplate = (HTMLElement) => {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLElement;
      return html.body.children[0]
    }

    const addEventClick = ($element) => {
      $element.addEventListener('click', () => {
        // alert('click')
        showModal($element)
      })
    }
    
    const rederMovieList = (list, $container, category) => {
      $container.children[0].remove();
      list.map((movie) => {
        const HTMLElement = videoItemTemplate(movie, category)
        const movieElement = createTemplate(HTMLElement)
        $container.append(movieElement);
        const image = movieElement.querySelector('img');
        image.addEventListener('load', () => {
          event.srcElement.classList.add('fadeIn');
        })
        addEventClick(movieElement)
      })      
    }

    const cacheExist = async (category) => {
      const listName = `${category}List`
      const cacheList = window.localStorage.getItem(listName);

      if (cacheList) {
        return JSON.parse(cacheList);
      }
        const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`);
        window.localStorage.setItem(listName, JSON.stringify(data));
        return data;

    }

    // const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`);
    const actionList = await cacheExist('action');
    const $actionContainer = document.querySelector('#action');
    rederMovieList(actionList, $actionContainer, 'action');

    const horrorList = await cacheExist('horror');
    const $horrorContainer = document.querySelector('#drama');
    rederMovieList(horrorList, $horrorContainer, 'drama');

    const animationList = await cacheExist('animation');
    const $animationContainer = document.querySelector('#animation');
    rederMovieList(animationList, $animationContainer, 'animation');

    





  // const $home = $('.home .list #item');
const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

const modalTitle = $modal.querySelector('h1');
const modalImage = $modal.querySelector('img');
const modalDescription = $modal.querySelector('p');

const findById = (list, id) => {
  return list.find((movie) => movie.id === parseInt(id, 10))
}

const findMovie = (id, category) => {
  switch (category) {
    case 'action' : {
      return findById(actionList, id)
    }
    case 'drama' : {
      return findById(horrorList, id)
    }
    default: {
      return findById(animationList, id)
    }
  }
}

const showModal= ($element) => {
  $overlay.classList.add('active');
  $modal.style.animation = 'modalIn .8s forwards';
  const id = $element.dataset.id;
  const category = $element.dataset.category;
  const data = findMovie(id, category)

  modalTitle.textContent = data.title;
  modalImage.setAttribute('src', data.medium_cover_image);
  modalDescription.textContent = data.description_full;
}

$hideModal.addEventListener('click', () => {
  $overlay.classList.remove('active');
  $modal.style.animation = 'modalOut .8s forwards';
});
}

load();





// const hideModal = () => {
//   $overlay.classList.remove('active');
//   $modal.style.animation = 'modalOut .8s forwards';
// }




// console.log(videoItemTemplate('../images/covers/bitcoin.jpg', 'Bitcoin'));

