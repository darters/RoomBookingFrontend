import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {HotelService} from "../../service/hotel.service";
import {Hotel} from "../../model/hotel";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    StarRatingComponent,
    TextCutPipe,
    NgIf,
    GoogleMap
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  rating: number = 1.5;
  firstPhoto: string = '';
  rooms: Hotel[] = []
  roomIsFavorite: boolean = false;
  favorites: Hotel[] = []

  constructor(private hotelService: HotelService) {
  }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.hotelService.getAllHotels().subscribe((hotels: any) => {
      this.rooms = hotels
      console.log(hotels)
    })
  }
  addToFavorites(room: Hotel) {
    const key = 'favorites'
    if(!room.isFavorite) {
      room.isFavorite = !room.isFavorite
      this.favorites.push(room)
      sessionStorage.setItem(key, JSON.stringify(this.favorites));
      console.log(sessionStorage.getItem(key))
    } else {
      room.isFavorite = !room.isFavorite
      this.favorites = this.favorites.filter((r: Hotel) => r.id != room.id)
      // @ts-ignore
      sessionStorage.setItem(key, JSON.stringify(this.favorites))

      console.log("UPDATED " + sessionStorage.getItem(key))
    }
    console.log("ROOOOOM STATUS " + room.isFavorite)
  }
}
