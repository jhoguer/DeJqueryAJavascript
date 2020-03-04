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

const load = async () => {
  const getData = async (gender) => {
    const url = `https://yts.mx/api/v2/list_movies.json?genre=${gender}`;
    const response = await fetch(url);
    const data = await response.json();
    return data

  }

  const $form = document.querySelector('#form');
  $form.addEventListener('submit', (event) => {
    event.preventDefault()
  })

  const actionList = await getData('action');
  const horrorList = await getData('horror');
  const animationList = await getData('animation');
  console.log(actionList.data.movies);
  console.log(horrorList);
  console.log(animationList);

  const videoItemTemplate = (movie) => {
    return (
      `<div class="primaryPlaylistItem">
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
        alert('click')
      })
    }
    
    const rederMovieList = (list, $container) => {
      $container.children[0].remove();
      list.map((movie) => {
        const HTMLElement = videoItemTemplate(movie)
        const movieElement = createTemplate(HTMLElement)
        $container.append(movieElement)
        addEventClick(movieElement)
      })      
    }
    
  const $actionContainer = document.querySelector('#action');
  const $horrorContainer = document.querySelector('#drama');
  const $animationContainer = document.querySelector('#animation');

  rederMovieList(actionList.data.movies, $actionContainer);
  rederMovieList(horrorList.data.movies, $horrorContainer);
  rederMovieList(animationList.data.movies, $animationContainer);
}

load();


const $featuringContainer = document.querySelector('#featuring');

const $home = document.querySelector('#home');

// const $home = $('.home .list #item');
const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

const modalTitle = document.querySelector('h1');
const modalImage = document.querySelector('img');
const modalDescription = document.querySelector('p');




// console.log(videoItemTemplate('../images/covers/bitcoin.jpg', 'Bitcoin'));

