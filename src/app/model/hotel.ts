export interface Hotel {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  numberOfRooms: number;
  roomRating: number;
  pricePerDay: number;
  latitude: number;
  longitude: number;
  city: string;
  isFavorite: boolean;
  photosUrl: string[]
}
