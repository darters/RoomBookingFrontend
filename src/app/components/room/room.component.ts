import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {HotelService} from "../../service/hotel.service";
import {Router} from "@angular/router";
import {Hotel} from "../../model/hotel";

@Component({
  selector: 'app-room',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        StarRatingComponent,
        TextCutPipe
    ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  @Output() roomsOut = new EventEmitter<Hotel[]>()
  // @ts-ignore
  @Input() room!: Hotel
  rating: number = 1.5;
  rooms: Hotel[] = []
  favorites: Hotel[] = []
  filteredRooms: Hotel[] = []
  selectedRoomId: number = 0
  constructor(private hotelService: HotelService,
              private router: Router) {
  }
  ngOnInit(): void {
    // this.getByCity()
    this.filteredRooms = this.rooms
  }
  // getByCity() {
  //   this.hotelService.getHotelByCity('Murowane').subscribe((hotels: any) => {
  //     this.rooms = hotels
  //     const rooms: Hotel [] = this.rooms
  //     this.roomsOut.emit(rooms)
  //   })
  // }

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
      sessionStorage.setItem(key, JSON.stringify(this.favorites))

      console.log("UPDATED " + sessionStorage.getItem(key))
    }
    console.log("ROOOOOM STATUS " + room.isFavorite)
  }
}
