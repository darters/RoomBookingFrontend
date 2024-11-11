import
{ Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterListingDTO} from "../model/filterListingDTO";
import {Listing} from "../model/listing";
import {CreateListing} from "../model/createListing";

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private url: string = 'http://localhost:8081/listing/'
  constructor(private httpClient: HttpClient) {
  }

  public getAllListing(): Observable<Listing[]> {
    return this.httpClient.get<Listing[]>(this.url + 'getAll')
  }
  public getListingsWthFilters(filter: FilterListingDTO) :Observable<Listing[]> {
    let params = new HttpParams()
      .set('city', filter.city)
    if (filter.rooms != null) {
      params = params.set('rooms', filter.rooms.toString());
    }
    if (filter.minPrice != null) {
      params = params.set('minPrice', filter.minPrice.toString());
    }
    if (filter.maxPrice != null) {
      params = params.set('maxPrice', filter.maxPrice.toString());
    }
    return this.httpClient.get<Listing[]>(this.url + 'filter', { params });
  }

  public getListing(hotelId: number): Observable<Listing> {
    return this.httpClient.get<Listing>(this.url + `get/${hotelId}`)
  }

  public createListing(createListing: CreateListing) {
    const formData = new FormData
    console.log("FF " + createListing.listing + " AAAA " + createListing.listing.title)

    for(const key in createListing.listing) {
      // @ts-ignore
      formData.append(`listing.${key}`, createListing.listing[key])
    }
    createListing.photoFiles.forEach((photo, index) => {
      formData.append('photoFiles', photo, photo.name);
    });
    return this.httpClient.post(this.url + 'create', formData)
  }

}
