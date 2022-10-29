import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, _form: FormGroupDirective | NgForm): boolean {
        return control.parent!.invalid &&
            control.parent!.hasError('confirmEqual') &&
            control.touched;
    }
}