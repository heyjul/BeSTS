import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { Score } from '../../models/score.model';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  constructor(private route: ActivatedRoute,) { }

  scores!: Score[];

  ngOnInit(): void {
    this.route.data.pipe(
      first(),
      map(data => data['scores'] as Score[]),
      map(scores => {
        let i = 1;
        let prev = scores[0];
        for (let score of scores) {
          if (prev.score !== score.score)
            i++;
          score.ranking = i;
          prev = score;
        }

        return scores;
      })
    ).subscribe(scores => this.scores = scores);
  }
}
