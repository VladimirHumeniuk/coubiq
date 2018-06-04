import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../../shared/services/current.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public currService: CurrentService
  ) { }

  logout(): void {
    this.authService.logout()
  }

  ngOnInit() {
  }

}
