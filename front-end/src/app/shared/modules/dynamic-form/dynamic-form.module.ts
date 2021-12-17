import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS, } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS, } from "@angular-material-components/datetime-picker";
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, } from "@angular-material-components/moment-adapter";

import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AutoCompleteModule, DropDownListModule, MultiSelectModule } from "@syncfusion/ej2-angular-dropdowns";

import { DynamicFieldDirective } from "./directives/dynamic-field.directive";
import { FormComponent } from "./components/form/form.component";
import { LabelComponent } from "./components/label/label.component";
import { DummyDummyComponent, InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { CheckboxGroupComponent } from "./components/checkbox-group/checkbox-group.component";
import { DateComponent } from "./components/date/date.component";
import { PasswordStrengthMeterComponent } from "./components/password-strength-meter/password-strength-meter.component";
import { MatIconModule } from "@angular/material/icon";
import { ValidatorService } from "./services/validator.service";
import { TextAreaComponent } from "./components/text-area/text-area.component";
import { TimeComponent } from "./components/time/time.component";
import { DateTimeComponent } from "./components/datetime/datetime.component";
import { ChipsComponent } from './components/chips/chips.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SharedDirectivesModule } from "../../shared-directives/shared-directive.module";
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { FormControlAccessoryComponent } from './components/form-control-accessory/form-control-accessory.component';

export const CUSTOM_MOMENT_FORMATS = {
    parse: {
        dateInput: "l, LT",
    },
    display: {
        dateInput: "dddd, DD MMMM  hh:mm",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

//and in the module providers

@NgModule({
    declarations: [
        DynamicFieldDirective,
        FormComponent,
        LabelComponent,
        InputComponent,
        ButtonComponent,
        SelectComponent,
        RadiobuttonComponent,
        CheckboxComponent,
        CheckboxGroupComponent,
        DateComponent,
        PasswordStrengthMeterComponent,
        TextAreaComponent,
        TimeComponent,
        DateTimeComponent,
        ChipsComponent,
        FormWrapperComponent,
        FormControlAccessoryComponent,
        DummyDummyComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        DateTimePickerModule,
        DropDownListModule,
        MultiSelectModule,

        SharedDirectivesModule,

        NgxMaterialTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
    ],
    providers: [
        ValidatorService,
        //{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
        {
            provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: true },
        },
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS },
        { provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
    ],
    exports: [FormComponent, FormWrapperComponent],
})
export class DynamicFormModule { }
