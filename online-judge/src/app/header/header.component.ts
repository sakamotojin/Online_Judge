import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.auth.logout();
  }
}
