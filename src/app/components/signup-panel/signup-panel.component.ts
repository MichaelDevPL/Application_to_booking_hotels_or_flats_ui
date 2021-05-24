import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {AccountRole} from '../../shared/enums/account-role.enum';
import {map} from 'rxjs/operators';
import {SignupResponseModel} from '../../shared/models/user/signup-response.model';

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
  public accountTypes = Object.values(AccountRole).filter(
    (value => typeof value === 'string')
  );

  constructor(
    private loginDataFormBuilder: FormBuilder,
    private userDataFormBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
  ) {
  }

  // convenience getter for easy access to form fields
  get getFromAccountDataForm(): any {
    return this.accountDataForm.controls;
  }

  get getFromUserDataForm(): any {
    return this.userDataForm.controls;
  }

  ngOnInit(): void {
    this.accountDataForm = this.loginDataFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      questionToRemindPassword: ['', Validators.required],
      answerToRemindPassword: ['', Validators.required],
    });

    this.userDataForm = this.userDataFormBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  public passwordMatchValidator(): void {
    const passwordVal: string = this.getFromAccountDataForm.password.value;
    this.passwordMatchValid = (passwordVal === this.passwordConfirm);
  }

  public verificationTaskCompletionStatus(signupResponse: SignupResponseModel): void {
    if (signupResponse.successAccountCreate) {
      this.router.navigate(['/signin']);
    }

    if (signupResponse.emailExist && signupResponse.loginExist) {
      this.emailIsNotAvailable = true;
      this.loginIsNotAvailable = true;
    }

    if (signupResponse.emailExist) {
      this.emailIsNotAvailable = true;
    }

    if (signupResponse.loginExist) {
      this.loginIsNotAvailable = true;
    }

  }

  submit(): void {
    this.submitted = true;
    this.emailIsNotAvailable = false;
    this.loginIsNotAvailable = false;
    this.passwordMatchValidator();

    if (!this.accountDataForm.invalid && !this.userDataForm.invalid && this.passwordMatchValid) {
      console.log(this.accountDataForm.getRawValue());
      this.auth.signup(this.accountDataForm.getRawValue(), this.userDataForm.getRawValue())
        .pipe(map(value => Object.assign(SignupResponseModel, value)))
        .subscribe(value => {
          this.verificationTaskCompletionStatus(value);
        }, error => {
          console.error(error);
        });
    }
  }
}
