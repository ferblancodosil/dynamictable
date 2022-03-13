import { Location } from './Location'

export class Row {
  id!: number
  plate!: string
  location!: Location
  speed!: number
  speed_average!: number
  temperature_front!: number
  temperature_back!: number

  constructor({
    id,
    plate,
    location,
    speed,
    speed_average,
    temperature_front,
    temperature_back,
  }: {
    id: number
    plate: string
    location: Location
    speed: number
    speed_average: number
    temperature_front: number
    temperature_back: number
  }) {
    this.id = id
    this.plate = plate
    this.location = new Location(location)
    this.speed = speed
    this.speed_average = speed_average
    this.temperature_front = temperature_front
    this.temperature_back = temperature_back
  }
}
