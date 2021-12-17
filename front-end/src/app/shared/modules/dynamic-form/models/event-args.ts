import { AbstractControl } from "@angular/forms";

export abstract class EventArgs {
    abstract name: string;
    abstract source: AbstractControl;
}

export interface ValueChangedEventArgs extends EventArgs {
    oldValue: any;
    newValue: any;
}

export interface ClickEventArgs extends EventArgs {

}