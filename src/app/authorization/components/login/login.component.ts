import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  account: any = [];
  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
      this.buildForm();
      this.form.setErrors({ unauthenticated: false });
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.internalLogin(email, password)
        .subscribe(auth => {
          this.account = auth;
          this.redirect();
        },
        (error) => this.form.setErrors({ unauthenticated: true }));
    }
  }

  redirect() {
    if (this.account.res === 200) {
      this.router.navigate([`/home`]);
      window.localStorage.setItem('user', JSON.stringify(this.account.dataValues));
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
