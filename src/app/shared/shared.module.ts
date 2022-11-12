import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BetDialogComponent } from './components/bet-dialog/bet-dialog.component';
import { InstallPromptComponent } from './components/install-prompt/install-prompt.component';
import { ActionSwipeDirective } from './directives/action-swipe.directive';

@NgModule({
    declarations: [
        ConfirmDialogComponent,
        BetDialogComponent,
        InstallPromptComponent,
        ActionSwipeDirective,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        ActionSwipeDirective,
    ]
})
export class SharedModule { }
