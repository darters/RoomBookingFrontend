import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url: string = 'http://localhost:8080/room/'
  constructor(private httpClient: HttpClient) {
  }
  public getAllHotels(): Observable<any> {
    return this.httpClient.get<any[]>(this.url + 'getAll')
  }
  public getHotelByCity(city: string) {
    return this.httpClient.get<any[]>(this.url + `getByCity/${city}`)
  }
  public getHotel(hotelId: number) {
    return this.httpClient.get(this.url + 'get/' + hotelId, {responseType: "text"})
  }

  public createHotel(room: any, photos: File[]) {
    const formData = new FormData();
    formData.append('room', new Blob([JSON.stringify(room)], { type: 'application/json' }));

    photos.forEach((photo, index) => {
      formData.append('photos', photo, photo.name);
    });

    return this.httpClient.post(this.url + 'create', formData)
  }
  public addToFavorites(roomId: number) {
    // return this.httpClient.
  }
}
