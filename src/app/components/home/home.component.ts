import { APIResponse } from './../../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games?: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      params['game-search'] != null
        ? this.searchGames('metacrit', params['game-search'])
        : this.searchGames('metacrit');
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: number) : void {
    this.router.navigate(['details', id])

  }

  ngOnDestroy(): void {

    this.gameSub ? this.gameSub.unsubscribe() : "";
    this.routeSub ? this.routeSub.unsubscribe() : "";

  }
}
