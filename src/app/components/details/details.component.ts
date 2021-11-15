import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/models';
import { getCurrencySymbol } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameRating: number = 0;
  public gameId!: string;
  public game!: Game;
  public routeSub!: Subscription;
  public gameSub!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })

  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;

      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    })
  }

  getColor(value: number): string {
    let color: string = '';
    value > 75
      ? (color = '#5ee432')
      : value > 50
      ? (color = '#fffa50')
      : value > 30
      ? (color = '#f7aa38')
      : (color = '#ef4655');
    return color;
  }

  ngOnDestroy(): void {
    //this.gameSub ? this.gameSub.unsubscribe : "";
    //this.routeSub ? this.routeSub.unsubscribe : "";
  }

}
