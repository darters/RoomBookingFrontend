import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {trimValidator} from "../../validators/trimValidator";
import {GoogleMap, MapAdvancedMarker, MapMarker} from "@angular/google-maps";
import {HotelService} from "../../service/hotel.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-hotel',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    GoogleMap,
    MapMarker,
    MapAdvancedMarker
  ],
  templateUrl: './create-hotel.component.html',
  styleUrl: './create-hotel.component.scss'
})
export class CreateHotelComponent implements OnInit {
  @ViewChild('map') map!: GoogleMap;
  createHotelForm!: FormGroup
  isValidFilesType: boolean = true
  isValidFilesCount: boolean = true
  isValidAddress: boolean = true
  address: string = '';
  marker: google.maps.Marker | null = null;
  files: File[] = []
  center: google.maps.LatLngLiteral = { lat: 50, lng: 10 };
  zoom = 5;
  options: google.maps.MapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    rotateControl: false
  };

  constructor(private formBuilder: FormBuilder,
              private hotelService: HotelService,
              private router: Router) {
  }

  onMapClick(event: any) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.createHotelForm.patchValue({
      latitude: lat,
      longitude: lng
    });
    this.getCityName(lat, lng);
  }

  getCityName(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);
    if(this.marker) {
      this.marker.setPosition({ lat, lng })
    } else {
      this.marker = new google.maps.Marker({
        position: {lat, lng},
        icon: {
          url: 'assets/img/location-point.svg',
          scaledSize: new google.maps.Size(40, 40)
        },
        map: this.map.googleMap
      });
    }
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const address = results[0].formatted_address;
        this.address = this.cleanAddress(address);
        this.createHotelForm.patchValue( { address: this.address })
        this.checkAddressValid()
      }
    });
  }
  cleanAddress(address: string): string {
    const olcRegex = /^[A-Z0-9\+]+\s+/;
    return address.replace(olcRegex, '').trim()
  }
  ngOnInit(): void {
    this.createHotelForm = this.formBuilder.group({
        title: ['', [ trimValidator(), Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
        description: ['', [ trimValidator(), Validators.required, Validators.minLength(100), Validators.maxLength(300)]],
        rooms: [null, [ trimValidator(), Validators.required, Validators.min(1), Validators.max(30) ]],
        pricePerDay: [null, [ trimValidator(), Validators.required, Validators.min(1), Validators.max(900000)]],
        address: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required]
      }
    )
  }

  fileBrowseHandler(event: any): void {
    const inputFile = event.target.files;
    this.isValidFilesType = true
    if (inputFile) {
      for (const file of inputFile) {
        if(file.type === "image/jpeg" || file.type === "image/jpg") {
          this.files.push(file)
        } else {
          this.isValidFilesType = false
        }
      }
      this.checkCountOfFiles()
    }

}
  removeFile(file: File): void {
    this.files = this.files.filter(f => f !== file);
    this.checkCountOfFiles()
  }

  submit(): void {
    console.log(this.createHotelForm.value);
    if (this.isValidAddress && this.isValidFilesCount && this.createHotelForm.valid) {
      this.hotelService.createHotel(this.createHotelForm.value, this.files).subscribe((response: any) => {
      })
      this.router.navigate([''])
    }
    this.checkAddressValid()
    this.checkCountOfFiles()
    Object.keys(this.createHotelForm.controls).forEach(field => {
      const control = this.createHotelForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  private checkCountOfFiles() {
    if(this.files.length > 4 && this.files.length < 20) {
      this.isValidFilesCount = true
    } else {
      this.isValidFilesCount = false
    }
  }
  private checkAddressValid() {
    if(this.address.length > 5) {
      this.isValidAddress = true
    } else {
      this.isValidAddress = false
    }
  }
}
