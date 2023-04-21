export const apiUrl = 'https://asteroids.dev.mediasia.cn'

export function getMinersList(callback) {
  fetch(`${apiUrl}/miners`)
  .then(res => res.json())
  .then(
    (result) => {
      if (callback) {
        callback(result)
      }
    }
  )
}

export function getMinerHistory(params, callback) {
  fetch(`${apiUrl}/history?minerId=${params.minerId}`)
  .then(res => res.json())
  .then(
    (result) => {
      if (callback) {
        callback(result)
      }
    }
  )
}


export function getAsteroids(params, callback) {
  fetch(`${apiUrl}/asteroids`)
  .then(res => res.json())
  .then(
    (result) => {
      if (callback) {
        callback(result)
      }
    }
  )
}

export function getPlanets(params, callback) {
  fetch(`${apiUrl}/planets`)
  .then(res => res.json())
  .then(
    (result) => {
      if (callback) {
        callback(result)
      }
    }
  )
}

export function createMiner(params, callback) {
  fetch(`${apiUrl}/miners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  .then(res => res.json())
  .then(
    (result) => {
      if (callback) {
        callback(result)
      }
    }
  )
}