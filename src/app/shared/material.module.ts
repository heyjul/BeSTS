import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSelectModule,
        MatStepperModule,
        MatChipsModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatDialogModule,
        MatBadgeModule,
        MatListModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatBottomSheetModule,
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, verticalPosition: 'bottom' } }
    ]
})
export class MaterialModule { }