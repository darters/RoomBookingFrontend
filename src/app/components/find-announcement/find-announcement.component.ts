import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {OnlyNumbersDirective} from "../directive/only-numbers.directive";
import {Router} from "@angular/router";

@Component({
  selector: 'app-find-announcement',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    OnlyNumbersDirective
  ],
  templateUrl: './find-announcement.component.html',
  styleUrl: './find-announcement.component.scss'
})
export class FindAnnouncementComponent {
  cityName: string = ''
  isOpen: boolean = false
  rooms: number = 0
  minPrice: number = 0
  maxPrice: number = 0

  constructor(private router: Router) {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }
  increaseCount() {
    this.rooms++
  }
  decreaseCount() {
    if (this.rooms > 0) {
      this.rooms--
    }
  }

  searchAnnouncement() {
    this.checkValidPriceRange()
  }

  checkValidPriceRange() {
    if(this.minPrice > this.maxPrice) {
      [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
    }
  }
}
