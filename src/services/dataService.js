import athletesData from '../data/athletes.json'

export const getAthletes = () => {
  return athletesData
}

export const getSquads = () => {
  return [...new Set(athletesData.map(athlete => athlete.squad_name))]
}

export const getPositions = () => {
  return [...new Set(athletesData.map(athlete => athlete.position))]
}

export const getPositionGroups = () => {
  return [...new Set(athletesData.map(athlete => athlete.position_group))]
}
