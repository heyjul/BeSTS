import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';
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
    startDate: new FormControl('', [Validators.required, Validators.min(Date.now())]),
    winnerPoints: new FormControl(1, [Validators.required, Validators.min(1)]),
    guessPoints: new FormControl(3, [Validators.required, Validators.min(1)])
  });
  teams!: Team[];
  private roomId!: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.teams = data['teams']);
    this.roomId = this.route.snapshot.params["id"];
  }

  save(): void {
    const val = this.createMatchForm.value;

    this.matchService.create({
      teamOneId: val.teamOne!,
      teamTwoId: val.teamTwo!,
      startDate: new Date(val.startDate!),
      winnerPoints: val.winnerPoints!,
      guessPoints: val.guessPoints!,
      roomId: this.roomId,
    }, this.roomId)
      .subscribe(() => this.router.navigateByUrl(`rooms/${this.roomId}`));
  }
}
