import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateRoom } from '../../models/create-room.model';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent implements OnInit {

  createRoomForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateRoomDialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
