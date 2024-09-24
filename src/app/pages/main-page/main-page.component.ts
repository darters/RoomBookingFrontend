import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {HotelService} from "../../service/hotel.service";
import {Hotel} from "../../model/hotel";
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {FindAnnouncementComponent} from "../../components/find-announcement/find-announcement.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    StarRatingComponent,
    TextCutPipe,
    NgIf,
    GoogleMap,
    MapMarker,
    MapAdvancedMarker,
    FormsModule,
    FindAnnouncementComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  rating: number = 1.5;
  rooms: Hotel[] = []
  favorites: Hotel[] = []
  filteredRooms: Hotel[] = []
  selectedRoomId: number = 0
  constructor(private hotelService: HotelService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.getAll()
    this.filteredRooms = this.rooms
  }
  getAll() {
    this.hotelService.getAllHotels().subscribe((hotels: any) => {
      this.rooms = hotels
      console.log(this.rooms)
      this.initMap(this.rooms)
    })
    this.hotelService.getHotelByCity('Murowane').subscribe((room: any) => {
      console.log(JSON.stringify(room))
    })
  }

  async initMap(rooms: Hotel[]) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 51.1657, lng: 25.4515 },
      zoom: 4,
      mapId: '4504f8b37365c3d0',
    });

    rooms.forEach(room => {
      const priceTag = document.createElement('div');
      priceTag.className = 'price-tag';
      priceTag.textContent = `${room.pricePerDay}`;

      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: room.latitude, lng: room.longitude },
        content: priceTag,
      });

      marker.addListener('click', () => {
        this.selectRoom(room.id)
        // this.router.navigate([`/${room.r}`])
      })
    })
  }
  selectRoom(roomId: number) {
    this.selectedRoomId = roomId
    const selectedRoom = this.rooms.find(room => room.id == roomId)
    if(selectedRoom) {
      this.rooms = this.rooms.filter(room => room.id !== roomId)
      this.rooms.unshift(selectedRoom)
    }

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
      sessionStorage.setItem(key, JSON.stringify(this.favorites))

      console.log("UPDATED " + sessionStorage.getItem(key))
    }
    console.log("ROOOOOM STATUS " + room.isFavorite)
  }
}
