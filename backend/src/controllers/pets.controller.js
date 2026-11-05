import pets from '../data/pets.js'

export function getPets(req, res) {
  res.json(pets)
}

export function getPetById(req, res) {
  const pet = pets.find(
    (item) => item.id === Number(req.params.id)
  )

  if (!pet) {
    return res.status(404).json({
      error: 'Mascota no encontrada',
    })
  }

  res.json(pet)
}