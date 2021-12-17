import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any) {
    return value == null || value.length === 0;
}

function hasValidLength(value: any) {
    return value != null && typeof value.length === 'number';
}

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class CustomValidator {

    public static required(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {

            return isEmptyInputValue(control.value) ? {
                'required': true
            } : null;

        };
    }

    public static requiredTrue(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {

            return control.value === true ? null : {
                'required': true
            };

        };
    }

    public static email(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {

            if (isEmptyInputValue(control.value))
                return null;

            return EMAIL_REGEXP.test(control.value) ? null : {
                'email': true
            };
        };
    }

    public static min(min: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min))
                return null;
            const value = parseFloat(control.value);

            return !isNaN(value) && value < min ? {
                'min': {
                    'min': min,
                    'actual': control.value
                }
            } : null;

        };
    }

    public static max(max: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max))
                return null;
            const value = parseFloat(control.value);

            return !isNaN(value) && value > max ? {
                'max': {
                    'max': max,
                    'actual': control.value
                }
            } : null;

        };
    }

    public static minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
                return null;
            }

            return control.value.length < minLength ? {
                'minLength': {
                    'requiredLength': minLength,
                    'actualLength': control.value.length
                }
            } : null;
        }
    }

    public static maxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
                return null;
            }

            return control.value.length > maxLength ? {
                'maxLength': {
                    'requiredLength': maxLength,
                    'actualLength': control.value.length
                }
            } : null;
        }
    }

    public static pattern(pattern: any): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {

            if (!pattern)
                return null;

            let regex: RegExp;
            let regexStr: string;

            if (typeof pattern === 'string') {
                regexStr = '';
                if (pattern.charAt(0) !== '^')
                    regexStr += '^';
                regexStr += pattern;
                if (pattern.charAt(pattern.length - 1) !== '$')
                    regexStr += '$';
                regex = new RegExp(regexStr);
            } else {
                regexStr = pattern.toString();
                regex = pattern;
            }

            if (isEmptyInputValue(control.value)) {
                return null;
                // don't validate empty values to allow optional controls
            }
            const value = control.value;

            return regex.test(value) ? null : {
                'pattern': {
                    'requiredPattern': regexStr,
                    'actualValue': value
                }
            };
        }
    }

    public static relativeMin(controlName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {

            let relativeControl = control.parent?.get(controlName);
            if (relativeControl == undefined)
                return null;

            if (control.value == undefined || relativeControl.value == undefined)
                return null;

            return control.value >= relativeControl.value ? null : {
                'relativeMin': {
                    'min': relativeControl.value,
                    'actual': control.value
                }
            };
        }
    }

    public static relativeMax(controlName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {

            let relativeControl = control.parent?.get(controlName);
            if (relativeControl == undefined)
                return null;

            if (control.value == undefined || relativeControl.value == undefined)
                return null;

            return control.value <= relativeControl.value ? null : {
                'relativeMax': {
                    'max': relativeControl.value,
                    'actual': control.value
                }
            };
        }
    }

    // public static multipleCheckboxRequiredAtLeast(count: number): ValidatorFn | null {
    //     return (control: AbstractControl): { [key: string]: boolean } | null => {

    //         const formGroup: FormGroup = control as FormGroup;

    //         let countValid = 0;

    //         Object.keys(formGroup.controls).forEach(field => {
    //             const child = control.get(field);
    //             if (child?.value) {
    //                 countValid++;
    //             }
    //         });

    //         return countValid >= count ? null : {
    //             "multipleCheckboxRequiredAtLeast": true
    //         }

    //     };
    // }

    public static match(name: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const fieldToMatch = control.parent?.get(name);

            if (fieldToMatch != undefined)
                if (fieldToMatch.value != control.value)
                    return { 'match': true };

            return null;
        };

    }

    public static doNothing(): ValidatorFn {
        return (control: AbstractControl): null => {
            return null;
        }
    }
}