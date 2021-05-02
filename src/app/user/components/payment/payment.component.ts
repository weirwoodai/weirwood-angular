import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';
import { CurrentSessionService } from 'src/app/services/current-session/current-session.service';
import { FinTenService } from 'src/app/services/fin-ten/fin-ten.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  amount = 5000; // € 50.00

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private finten: FinTenService,
    private currentSession: CurrentSessionService
  ) {}

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: [, [Validators.required]],
      email: [
        this.currentSession.getCurrentSession().user.email,
        [Validators.required, Validators.email]
      ],
      amount: new FormControl({ value: this.amount / 100, disabled: true }, [
        Validators.required,
        Validators.pattern(/\d+/)
      ])
    });
  }

  createToken(): void {
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(async (result) => {
        if (result.token) {
          console.log({ t: result.token });
          const fintenResponse = await this.finten.sendPaymentToken(
            JSON.stringify(result.token)
          );
          console.log({ fintenResponse });
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

  pay(): void {
    if (!this.stripeForm.valid) {
      return console.log(this.stripeForm);
    }

    this.createPaymentIntent(this.stripeForm.get('amount').value)
      .pipe(
        switchMap((paymentIntent) =>
          this.stripeService.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: this.stripeForm.get('name').value,
                email: this.stripeForm.get('email').value
              }
            }
          })
        )
      )
      .subscribe((result) => {
        if (result.error) {
          console.log(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment successful!', { result });
          }
        }
      });
  }

  createPaymentIntent(amount: number) {
    return this.finten.createPaymentIntent(amount * 100);
  }
}
