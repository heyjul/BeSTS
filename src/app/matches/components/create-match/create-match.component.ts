import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FullMatch } from 'src/app/shared/models/full-match.model';
import { Team } from 'src/app/shared/models/team.model';
import { MatchService } from '../../../shared/services/match.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {

  createMatchForm = this.fb.group({
    teamOne: new FormControl('', Validators.required),
    teamTwo: new FormControl('', Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    winnerPoints: new FormControl(1, [Validators.required, Validators.min(1)]),
    guessPoints: new FormControl(3, [Validators.required, Validators.min(1)])
  });
  teams!: Team[];
  private roomId!: string;
  private matchId?: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
    private location: Location) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.setData(data));
    this.roomId = this.route.snapshot.params["roomId"];
  }

  setData(data: Data): void {
    this.teams = data['teams'];
    const match = data['match'] as FullMatch;
    if (!match)
      return;

    this.matchId = match.id;
    this.createMatchForm.reset({
      teamOne: this.teams.find(x => x.name === match.teamOne)?.id,
      teamTwo: this.teams.find(x => x.name === match.teamTwo)?.id,
      startDate: new Date(match.startDate),
      winnerPoints: match.winnerPoints,
      guessPoints: match.guessPoints,
    });
  }

  save(): void {
    const val = this.createMatchForm.value;

    this.matchService.createOrUpdate({
      id: this.matchId,
      teamOneId: val.teamOne!,
      teamTwoId: val.teamTwo!,
      startDate: new Date(val.startDate!),
      winnerPoints: Number(val.winnerPoints!),
      guessPoints: Number(val.guessPoints!),
      roomId: this.roomId,
    }, this.roomId)
      .subscribe(() => this.router.navigateByUrl(`/rooms/${this.roomId}`));
  }

  close(): void {
    this.location.back();
  }
}
