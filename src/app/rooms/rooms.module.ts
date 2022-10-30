import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateRoomDialogComponent } from './components/create-room-dialog/create-room-dialog.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { JoinRoomDialogComponent } from './components/join-room-dialog/join-room-dialog.component';

@NgModule({
    declarations: [
        RoomsComponent,
        CreateRoomDialogComponent,
        JoinRoomDialogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        RoomsComponent,
    ]
})
export class RoomsModule { }
