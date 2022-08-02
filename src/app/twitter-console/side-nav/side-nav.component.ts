import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RouterLinkDetails } from './router-link-details';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  routingdetails = RouterLinkDetails;

  constructor(private route : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  logoutFromApp(){
    localStorage.removeItem(environment.tokenKeyName);
    this.route.navigate(['']);
    this.toastr.success("Logout successful","Sign out");
  }

}
