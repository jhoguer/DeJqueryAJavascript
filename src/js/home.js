console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // Llamar a un api
  setTimeout(function() {
    // Luego de 3 segundos
    todoBien('Se acabo el tiempo')
  }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal) {
  // Llamar a un api
  setTimeout(function() {
    // Luego de 3 segundos
    todoBien('Se acabo el tiempo 3')
  }, 3000)
})

/*
getUser
  .then(function() {
    console.log('Todo esta bn en la vida')
  })
  .catch(function(messege) {
    console.log(messege)
  })   */

  Promise.race([getUser, getUserAll,])
    .then(function(message) {
      console.log(message)
    })
    .catch(function(message) {
      console.log(message)
    })

    $.ajax('https://randomuser.me/api/', {
      method: 'GET',
      success: function(data) {
        console.log(data)
      },
      error: function(error) {
        console.log(error)
      }
    });

  

fetch('https://randomuser.me/api/')
.then(function(response) {
  console.log(response)
  return response.json()
})
.then(function(user) {
  console.log('user', user.results[0].name.first)
})
.catch(function() {
  console.log('algo falló')
});


//Mezcla de async await y Promise
/*
(async function load() {
  

  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

   const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
   console.log('actionList', actionList)

  getData('https://yts.lt/api/v2/list_movies.json?genre=adventure')
    .then(function(data) {
      console.log('terrorList', data)
    })
    .catch(function() {
      console.log('Error en la peticion')
    })
  

 
})()
*/
(async function load() {
  

  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }
  
  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
  const terrorList = await getData('https://yts.lt/api/v2/list_movies.json?genre=adventure')
    const animationlist = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')
    
    // console.log('actionList', actionList)
    // console.log('terrorList', terrorList)
    // console.log('animationlist', animationlist)

    console.log(actionList, terrorList, animationlist)

  

 
})()
