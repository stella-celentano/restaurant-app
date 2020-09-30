import { Restaurant } from './restaurant.model'

export interface Chef {
    _id: String,
    name: String,
    city: String,
    education?: String,
    imagems: String,
    restaurant: Restaurant
}