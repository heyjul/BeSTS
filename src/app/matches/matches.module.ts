import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@NgModule({
    declarations: [
        CreateMatchComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        CreateMatchComponent,
    ]
})
export class MatchesModule { }
