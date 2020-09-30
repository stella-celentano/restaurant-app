import { Chef } from './chef.model'

export interface Restaurant {
    _id: String,
    name: String,
    contact: String,
    city: String,
    address: String,
    typeFood?: String,
    chefs: Chef[]
}