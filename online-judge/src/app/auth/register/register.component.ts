import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  regBtnClicked: boolean;
  formgroup: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('inside init');
    this.initForm();
    this.regBtnClicked = false;
  }
  // tslint:disable-next-line:typedef
  initForm() {
    this.formgroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // tslint:disable-next-line:typedef
  submitUserForm() {
    this.submitted = true;
    console.log('inside submit');
    if (this.formgroup.valid && this.regBtnClicked === false) {
      this.authService.register(this.formgroup.value).subscribe();
      if (this.authService.getError() !== 'email error') {
        this.regBtnClicked = true;
      }
      //this.resetForm();
      //alert('Thank You for registering');
    }
    else {
      return;
    }
  }

  // tslint:disable-next-line:typedef
  resetForm() {
    this.formgroup.reset();
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.formgroup.controls; }
}
