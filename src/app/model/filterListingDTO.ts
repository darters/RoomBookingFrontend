export class FilterListingDTO {
  city: string;
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;

  constructor(city: string, rooms?: number, minPrice?: number, maxPrice?: number) {
    this.city = city;
    this.rooms = rooms;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}

