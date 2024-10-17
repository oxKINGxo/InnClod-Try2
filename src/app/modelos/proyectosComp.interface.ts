export interface proyectosCI{
    id: number|null|undefined,
    name: string|null,
    username: string|null,
    email: string|null,
    address: {
      street: string|null,
      suite: string|null,
      city: string|null,
      zipcode: string|null,
      geo: {
        lat: string|null,
        lng: string|null
      }
    },
    phone: string|null,
    website: string|null,
    company: {
      name: string|null,
      catchPhrase: string|null,
      //bs: string|null
    }
  }