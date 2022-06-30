import { AbstractControl } from '@angular/forms';
export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }
  static isRutValid(control: AbstractControl) {
    const value = control.value;
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(value)) {
      return { rut_invalid: true };
    }
    var tmp = value.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    var M = 0, S = 1;
    for (;rut;rut = Math.floor(rut / 10))
      S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    if ((S ? S - 1 : 'k') == digv) {
      return null;
    }
    return { rut_invalid: true };
  }
}
