import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { BetsComponent } from './components/bets/bets.component';
@NgModule({
    declarations: [
        CreateMatchComponent,
        BetsComponent,
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
