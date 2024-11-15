export interface Listing {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  address: string
  numberOfRooms: number;
  roomRating: number;
  pricePerDay: number;
  latitude: number;
  longitude: number;
  city: string;
  isFavorite: boolean;
  photosUrl: string[]
}
