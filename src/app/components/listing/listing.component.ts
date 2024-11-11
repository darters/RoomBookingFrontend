import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {Listing} from "../../model/listing";


@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    NgIf,
    StarRatingComponent,
    TextCutPipe
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit{
  @Output() listingsOut = new EventEmitter<Listing[]>()
  @Input() listing!: Listing
  rating: number = 1.5;
  listings: Listing[] = []
  favorites: Listing[] = []
  filteredListings: Listing[] = []

  ngOnInit(): void {
    this.filteredListings = this.listings
  }

  addToFavorites(listingInFavorite: Listing) {
    const key = 'favorites'
    if(!listingInFavorite.isFavorite) {
      listingInFavorite.isFavorite = !listingInFavorite.isFavorite
      this.favorites.push(listingInFavorite)
      sessionStorage.setItem(key, JSON.stringify(this.favorites));
      console.log(sessionStorage.getItem(key))
    } else {
      listingInFavorite.isFavorite = !listingInFavorite.isFavorite
      this.favorites = this.favorites.filter((r: Listing) => r.id != listingInFavorite.id)
      sessionStorage.setItem(key, JSON.stringify(this.favorites))

    }
  }

}
