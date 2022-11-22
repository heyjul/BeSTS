import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullBet } from '../../models/full-bet.model';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {

  bets!: FullBet[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.bets = data['bets']);
  }
}
