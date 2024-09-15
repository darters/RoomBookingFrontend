import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
   constructor(private router: Router) {
  }

  createHotel() {
     this.router.navigate(['/create-hotel'])
  }
}
