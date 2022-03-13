export class Location {
  country!: string
  city!: string
  postal_code!: string
  address!: string
  constructor({
    country,
    city,
    postal_code,
    address,
  }: {
    country: string
    city: string
    postal_code: string
    address: string
  }) {
    this.country = country
    this.city = city
    this.postal_code = postal_code
    this.address = address
  }
}
