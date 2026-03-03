const BASE_URL = 'https://superheroapi.com/api.php'

function getToken() {
  const token = import.meta.env.VITE_SUPERHERO_TOKEN

  if (!token || token === 'YOUR_TOKEN') {
    throw new Error('Token manquant. Definis VITE_SUPERHERO_TOKEN dans .env')
  }

  return token
}

export async function searchHeroesByName(name) {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/${token}/search/${encodeURIComponent(name)}`)

  if (!response.ok) {
    throw new Error('Erreur API pendant la recherche des heroes')
  }

  const data = await response.json()

  if (data.response === 'error') {
    throw new Error(data.error || 'Aucun hero trouve')
  }

  return data
}

export async function getHeroById(id) {
  const token = getToken()
  const response = await fetch(`${BASE_URL}/${token}/${id}`)

  if (!response.ok) {
    throw new Error('Erreur API pendant la recuperation du hero')
  }

  return response.json()
}
