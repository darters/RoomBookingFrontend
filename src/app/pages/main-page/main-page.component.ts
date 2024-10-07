import {Component, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {Hotel} from "../../model/hotel";
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {FindAnnouncementComponent} from "../../components/find-announcement/find-announcement.component";
import {MapComponent} from "../../components/map/map.component";
import {RoomComponent} from "../../components/room/room.component";
import {HotelService} from "../../service/hotel.service";
import {FilterListingDTO} from "../../model/filterListingDTO";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgForOf,
    StarRatingComponent,
    TextCutPipe,
    NgIf,
    GoogleMap,
    MapMarker,
    MapAdvancedMarker,
    FormsModule,
    FindAnnouncementComponent,
    MapComponent,
    RoomComponent,
    NgClass
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponentRef!: MapComponent;

  roomsOut: any[] = []
  rooms: Hotel[] = []
  favorites: Hotel[] = []
  filteredRooms: Hotel[] = []
  selectedRoom: any

  isSearched: boolean = false
  isSearchedSuccessful: boolean = false
  constructor(private hotelService: HotelService) {
  }
  ngOnInit(): void {
    this.filteredRooms = this.rooms
  }
  searchListingWithFilters(searchParams: FilterListingDTO) {
    this.hotelService.getListingsWthFilters(searchParams).subscribe((hotels: any) => {
      this.roomsOut = hotels
      this.isSearched = true
      this.isSearchedSuccessful = hotels.length != 0;

      const mapComponent = this.mapComponentRef as MapComponent;
      mapComponent.createMarkers(this.roomsOut, mapComponent.advancedMarkerElement);
    })
  }
  onSelectRoom(room: any) {
    this.selectedRoom = []
    this.selectedRoom = room
    console.log(room)
  }

  // TODO Realize the filters
  search(searchParams: { city: string, minPrice: number, maxPrice: number, rooms: number}) {
    this.searchListingWithFilters(searchParams)
    console.log(
      searchParams.city,
      searchParams.rooms,
      searchParams.minPrice,
      searchParams.maxPrice
    )
  }

}
