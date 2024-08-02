import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {StarRatingComponent} from "../../star-rating/star-rating.component";
import {TextCutPipe} from "../../pipes/text-cut.pipe";
import {HotelService} from "../../service/hotel.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [
        NgForOf,
        RouterOutlet,
        StarRatingComponent,
        TextCutPipe
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  rating: number = 1.5;
  firstPhoto: string = '';
  rooms: any[] = []
  description: string = "Experience comfort and elegance in our well-appointed hotel room, featuring a plush queen-size bed, modern furnishings, and complimentary high-speed Wi-Fi. Enjoy a relaxing stay with amenities such as a flat-screen TV, mini-fridge, and a spacious en-suite bathroom with luxurious toiletries. Perfect for both business and leisure travelers"
  constructor(private hotelService: HotelService) {
  }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.hotelService.getAllHotels().subscribe((hotels: any) => {
      this.rooms = hotels
      console.log(hotels)
    })
  }

}
