import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hotel} from "../../model/hotel";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @Input() rooms: Hotel[] = []
  @Output() selectedRoom = new EventEmitter<any>()
  favorites: Hotel[] = []
  selectedRoomId: number = 0

  private markers: google.maps.Marker[] = [];
  private map: google.maps.Map | undefined;
  advancedMarkerElement: any;
  ngOnInit(): void {
    this.initMap(this.rooms)
  }
  async initMap(rooms: Hotel[]) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    this.advancedMarkerElement = AdvancedMarkerElement;

    this.map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 51.1657, lng: 25.4515 },
      zoom: 4,
      mapId: '4504f8b37365c3d0',
    });
    await this.createMarkers(rooms, this.advancedMarkerElement)
  }
  async createMarkers(rooms: Hotel[], AdvancedMarkerElement: any) {
    if (!this.map) return;
    this.clearMarkers();

    rooms.forEach(room => {
      const priceTag = document.createElement('div');
      priceTag.className = 'price-tag';
      priceTag.textContent = `${room.pricePerDay}`;

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: room.latitude, lng: room.longitude},
        content: priceTag
      });

      marker.addListener('click', () => {
        this.selectedRoomId = room.id;
        this.selectedRoom.emit(this.selectedRoomId);
      });

      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

}
