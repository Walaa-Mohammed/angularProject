import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegisterService } from 'src/Services/register.service';
import { IUser } from '../Interfaces/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _registerService: RegisterService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],

      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  get formFields() { return this.registerForm.controls; }

  onSubmit() {
   // debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    let newUser: IUser = {
      id: "",
      firstName: this.formFields.firstName.value,
      lastName: this.formFields.lastName.value,
      username: this.formFields.username.value,
      email: this.formFields.email.value,
      passwordHash: this.formFields.password.value,

    }
    this._registerService.addNewUser(newUser)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate([""]);
          alert("Succesfully Added User details")
        },
        error => {
         alert("failed while adding User details")

          this.error = error;
          this.loading = false;
        });

  }



}
