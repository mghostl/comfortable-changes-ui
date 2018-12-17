import {Component, Input, OnInit} from '@angular/core';
import {RatesService} from '../rartes-service/rates.service';
import {AbstractControl, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {

  currencyControl = new FormControl('');
  @Input() isFrom: boolean;
  @Input() from: string;

  currencies: string[];

  constructor(private ratesService: RatesService, private appComponent: AppComponent) {
    this.currencyControl.registerOnChange(() => this.onChange());
  }
  ngOnInit(): void {
    if (this.isFrom) {
      this.ratesService.getFrom()
        .subscribe((fromCurrency => {
          this.fillCurrencies(fromCurrency);
          this.initFormControl();
        }));
    } else if (this.from) {
      this.ratesService.getTo(this.from)
        .subscribe(to => {
          this.fillCurrencies(to);
          this.initFormControl();
        });
    }
  }

  onChange() {
    if (!this.currencyControl.valid) {
      console.error(this.currencyControl.errors);

    }
    // console.log('onChange event!!' + this.currencyControl.value);
    if (this.currencyControl.valid) {
      if (this.isFrom) {
        this.appComponent.setFrom(this.currencyControl.value);
      } else {
        this.appComponent.setTo(this.currencyControl.value);
      }
    }
  }

  private fillCurrencies(currencies: string[]) {
    console.log('allCurrencies: ' + currencies);
    this.currencies = currencies;
  }

  private initFormControl(): void {
    this.currencyControl = new FormControl('', [
      Validators.required,
      currencyValidator(this.currencies)
      ]
    );
  }

}

export function currencyValidator(currencies: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null =>
    !(currencies != null && currencies.includes(control.value)) ? {'isIncludeCurrency': {value: control.value}} : null;

}
