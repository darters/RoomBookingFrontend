import {Component, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {Hotel} from "../../model/hotel";
import EventEmitter from "events";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgForOf,
    StarRatingComponent,
    TextCutPipe,
    NgIf
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoritesRooms!: any
  rating: number = 1.5
  favorites!: Hotel[]
  @Output() newItemEvent = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.favorites = JSON.parse(sessionStorage.getItem('favorites'))
    console.log(this.favorites)
  }
  addToFavorites(room: Hotel) {
    const key = 'favorites'
    if(!room.isFavorite) {
      this.favorites.push(room)
      sessionStorage.setItem(key, JSON.stringify(this.favorites));
      console.log(sessionStorage.getItem(key))
    } else {
      this.favorites = this.favorites.filter((r: Hotel) => r.id != room.id)
      // @ts-ignore
      sessionStorage.setItem(key, JSON.stringify(this.favorites))

      console.log("UPDATED " + sessionStorage.getItem(key))
    }
    console.log("ROOOOOM STATUS " + room.isFavorite)
    room.isFavorite = !room.isFavorite

  }
}