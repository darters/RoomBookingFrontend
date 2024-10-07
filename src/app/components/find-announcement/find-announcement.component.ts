import {Component, EventEmitter, Output} from '@angular/core';
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
  @Output() searchParams = new EventEmitter<{ city: string, rooms: number, minPrice: number, maxPrice: number}>()
  invalidPriceRange: boolean = false
  isOpen: boolean = false
  wasOpened: boolean = false
  rooms: number = 0
  minPrice: number = 0
  maxPrice: number = 0

  constructor() {
  }
  increaseCount() {
    this.rooms++
  }
  decreaseCount() {
    if (this.rooms > 0) {
      this.rooms--
    }
  }
  toggleDropdown() {
    this.wasOpened = true
    this.isOpen = !this.isOpen
  }
  searchAnnouncement(textFromInput: HTMLInputElement) {
    if(this.checkPriceRange()) {
      this.searchIfValid(textFromInput.value)
      if (this.wasOpened) this.toggleDropdown()
    }
  }

  checkPriceRange(): boolean {
    if(this.minPrice > this.maxPrice) {
      [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
    }
    if(this.minPrice != 0 && this.minPrice == this.maxPrice) {
      this.invalidPriceRange = true
      return false;
    }
    this.invalidPriceRange = false
    return true;
  }
  searchIfValid(textFromInput: string) {
    if (textFromInput.trim().length > 1) {
      this.searchParams.emit({
        city: textFromInput,
        rooms: this.rooms,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      })
    }
  }



}
