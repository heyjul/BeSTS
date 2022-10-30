import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateRoomDialogComponent } from '../create-room-dialog/create-room-dialog.component';

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss']
})
export class JoinRoomDialogComponent implements OnInit {

  linkCtrl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<CreateRoomDialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
