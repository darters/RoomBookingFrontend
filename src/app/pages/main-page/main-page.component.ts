import {Component, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {FindAnnouncementComponent} from "../../components/find-announcement/find-announcement.component";
import {MapComponent} from "../../components/map/map.component";
import {ListingService} from "../../service/listing.service";
import {FilterListingDTO} from "../../model/filterListingDTO";
import {Listing} from "../../model/listing";
import {ListingComponent} from "../../components/listing/listing.component";

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
    NgClass,
    ListingComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponentRef!: MapComponent;

  listingsOut: Listing[] = []
  listings: Listing[] = []
  favorites: Listing[] = []
  filteredListings: Listing[] = []
  selectedListing: any

  isSearched: boolean = false
  isSearchedSuccessful: boolean = false
  constructor(private hotelService: ListingService) {
  }
  ngOnInit(): void {
    this.filteredListings = this.listings
  }
  searchListingWithFilters(searchParams: FilterListingDTO) {
    this.hotelService.getListingsWthFilters(searchParams).subscribe((listings: Listing[]) => {
      this.listingsOut = listings
      this.isSearched = true
      if(listings.length != 0) {
        this.isSearchedSuccessful = true
        this.mapComponentRef.createMarkers(this.listingsOut, this.mapComponentRef.advancedMarkerElement);
      }
    })
  }
  onSelectListing(listing: Listing) {
    this.selectedListing = []
    this.selectedListing = listing
  }

  search(searchParams: { city: string, minPrice: number, maxPrice: number, rooms: number}) {
    this.searchListingWithFilters(searchParams)
  }

}
