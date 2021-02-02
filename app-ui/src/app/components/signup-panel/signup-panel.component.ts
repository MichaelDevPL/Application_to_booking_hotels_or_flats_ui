import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-panel',
  templateUrl: './signup-panel.component.html',
  styleUrls: ['./signup-panel.component.scss']
})
export class SignupPanelComponent implements OnInit {

  public accountDataForm: FormGroup;
  public userDataForm: FormGroup;
  public submitted = false;
  public loginIsNotAvailable = false;
  public emailIsNotAvailable = false;
  public passwordMatchValid = false;
  public passwordConfirm: string;

  constructor(
    private loginDataFormBuilder: FormBuilder,
    private userDataFormBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.accountDataForm = this.loginDataFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_CLIENT', Validators.required],
    });

    this.userDataForm = this.userDataFormBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  // convenience getter for easy access to form fields
  get getFromAccountDataForm(): any {
    return this.accountDataForm.controls;
  }

  get getFromUserDataForm(): any {
    return this.userDataForm.controls;
  }

  public passwordMatchValidator(): void {
    const passwordVal: string = this.getFromAccountDataForm.password.value;
    this.passwordMatchValid = (passwordVal === this.passwordConfirm);
  }

  public verificationTaskCompletionStatus(respValues: boolean): void{
    if (respValues) {
       this.router.navigate(['/signin']);
    }else{
      this.loginIsNotAvailable = true;
    }
  }

  submit(): void {
    this.submitted = true;
    this.emailIsNotAvailable = false;
    this.loginIsNotAvailable = false;
    this.passwordMatchValidator();

    if (!this.accountDataForm.invalid && !this.userDataForm.invalid && this.passwordMatchValid) {
      this.auth.signup(this.accountDataForm.getRawValue(), this.userDataForm.getRawValue())
        .subscribe((resp: boolean) => {
          this.verificationTaskCompletionStatus(resp);
        }, error => {
            this.emailIsNotAvailable = true;
            console.error(error);
      });
    }
  }
}
