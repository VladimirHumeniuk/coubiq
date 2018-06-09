import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../services/current.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public currService: CurrentService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
  }
}
