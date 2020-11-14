import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  submitted = false;
  userChanged = new Subject<User>();
  formgroup: FormGroup;
  constructor(public authService: AuthService,
              private modalService: NgbModal,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('inside init');
    this.initForm();
  }
  // tslint:disable-next-line:typedef
  initForm() {
    this.formgroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // tslint:disable-next-line:typedef
  loginForm() {
    this.submitted = true;
    console.log('inside submit');
    if (this.formgroup.valid) {
      this.authService.login(this.formgroup.value).subscribe(result => {
        if (this.authService.getError() !== 'no user') {
          this.user = result;
          this.userChanged.subscribe(u => this.user = u);
          console.log(this.user);
          localStorage.setItem('name', this.user.name);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('id', this.user.id);
          // this.retrieveRes = result;
          // //console.log(this.retrieveRes.picByte);
          // this.retrievedImage = `data:image/(png|jpg|jpeg);base64,${this.retrieveRes.picByte}`;
          // //console.log(this.retrievedImage);
          // localStorage.setItem('pic', this.retrievedImage);
          this.authService.toggleToken();
          localStorage.setItem('token', this.authService.getToken());
          console.log(localStorage.getItem('token'));
          this.resetForm();
          this.router.navigate(['/home'], { relativeTo: this.route });
        }
        //this.authService.recieveUserData(this.user);
      });
    }
    else {
      return;
      // alert('Fill required detail!');
    }
  }

  // tslint:disable-next-line:typedef
  resetForm() {
    this.formgroup.reset();
  }
  // tslint:disable-next-line:typedef
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.formgroup.controls; }

}
