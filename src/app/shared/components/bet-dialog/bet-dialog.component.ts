import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetGuess } from '../../models/bet-guess.model';

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.scss']
})
export class BetDialogComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<BetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BetGuess) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      teamOne: new FormControl(this.data.guessedTeamOneScore ?? 0, Validators.required),
      teamTwo: new FormControl(this.data.guessedTeamTwoScore ?? 0, Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
