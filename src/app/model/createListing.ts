import {Listing} from "./listing";

export interface CreateListing {
  listing: Listing;
  photoFiles: File[];
}
