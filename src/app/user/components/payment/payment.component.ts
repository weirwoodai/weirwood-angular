import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  amount = 500; // $ 5.00

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

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private finten: FinTenService,
    private currentSession: CurrentSessionService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: [
        this.currentSession.getCurrentSession().user.email,
        [Validators.required]
      ],
      amount: [
        this.amount / 100,
        [Validators.required, Validators.pattern(/\d+/)]
      ]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
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
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount').value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get('name').value
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
    } else {
      console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number) {
    return this.finten.createPaymentIntent(amount);
  }
}
