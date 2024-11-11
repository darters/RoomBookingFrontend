import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Listing} from "../../model/listing";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  @Input() listings: Listing[] = []
  @Output() selectedListing = new EventEmitter<any>()
  favorites: Listing[] = []
  selectedListingId: number = 0

  private markers: google.maps.Marker[] = [];
  private map: google.maps.Map | undefined;
  advancedMarkerElement: any;
  ngOnInit(): void {
    this.initMap(this.listings)
  }
  async initMap(listings: Listing[]) {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    this.advancedMarkerElement = AdvancedMarkerElement;

    this.map = new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 51.1657, lng: 25.4515 },
      zoom: 4,
      mapId: '4504f8b37365c3d0',
    });
    await this.createMarkers(listings, this.advancedMarkerElement)
  }
  async createMarkers(listings: Listing[], AdvancedMarkerElement: any) {
    if (!this.map) return;
    this.clearMarkers();

    listings.forEach(listing => {
      const priceTag = document.createElement('div');
      priceTag.className = 'price-tag';
      priceTag.textContent = `${listing.pricePerDay}`;

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat: listing.latitude, lng: listing.longitude},
        content: priceTag
      });

      marker.addListener('click', () => {
        this.selectedListingId = listing.id;
        this.selectedListing.emit(this.selectedListingId);
      });

      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

}
