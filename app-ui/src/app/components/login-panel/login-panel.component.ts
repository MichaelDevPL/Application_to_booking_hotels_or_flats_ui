import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

//  private loginData: LoginData = new LoginData('test', 'password');
  public loginForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get getFromForm(): any {
    return this.loginForm.controls;
  }

  submit(): void {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.authService.sighIn(this.loginForm.value);
      console.log(this.loginForm.value);
    }
  }
}
