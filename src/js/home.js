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

  const actionList = await getData('action');
  const horrorList = await getData('horror');
  const animationList = await getData('animation');
  console.log(actionList.data.movies);
  console.log(horrorList);
  console.log(animationList);
}

load();
