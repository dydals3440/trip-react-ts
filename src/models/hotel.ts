import TextField from '@shared/TextField'

export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: { directions: string; pointGeolocation: { x: number; y: number } }
  mainImageUrl: string
  name: string
  price: number
  starRating: number
  events: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
  recommendHotels: string[]
  forms: ReservationForm[]
}

interface Baseform {
  id: string
  label: string
  required: string
  helpMessage?: string
}

interface TextFieldForm extends Baseform {
  type: 'TEXT_FIELD'
}

interface SelectField extends Baseform {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

export type ReservationForm = TextFieldForm | SelectField
