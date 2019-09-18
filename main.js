const { createStore } = Redux;

const initialState = {
  pups: [
    {
      rating: '5',
      url: 'https://media.giphy.com/media/O3iWjzootMuQw/giphy.gif'
    }
  ]
}

const gifReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PUP:
      const newPupArray = state.pups.concat(action.newPup)
      return Object.assign({}, state, {
        pups: newPupArray
      })
    default:
      return state;
  }
}

const newPupForm = document.getElementById('new-pup-form')

const ADD_PUP = 'ADD_PUP'

const addPupToList = newPup => {
  return {
    type: ADD_PUP,
    newPup: newPup
  }
}

newPupForm.addEventListener('submit', () => {
  event.preventDefault();
  const gifUrl = document.getElementById('gif-url').value
  const gifRating = document.getElementById('gif-rating').value
  document.getElementById('gif-url').value = ''
  document.getElementById('gif-rating').value = ''
  const newPup = { url: gifUrl, rating: gifRating }
  store.dispatch(addPupToList(newPup))
})

const store = createStore(gifReducer);
const gifList = document.getElementById('gif-list')

const render = () => {
  let newGifList = ''
  console.log(store.getState().pups);
  store.getState().pups.forEach(function(pup) {
    newGifList += `<p>${pup.rating}</p> <img src=${pup.url}/>`
  })
  gifList.innerHTML = newGifList
}

render();
store.subscribe(render);
