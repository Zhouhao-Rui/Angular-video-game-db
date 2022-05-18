import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { APIResponse, Game } from "src/app/models";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = "name";
  public games: Array<Game> = [];
  private routeSub: Subscription;
  private gameSub: Subscription;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params["game-search"]) {
        this.searchGames("name", params["game-search"]);
      } else {
        this.searchGames("name");
      }
    });
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        console.log(sort);
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  ngOnDestroy(): void {
    this.gameSub && this.gameSub.unsubscribe();
    this.routeSub && this.routeSub.unsubscribe();
  }

  openGameDetails(id: string): void {
    this.router.navigate(["details", id]);
  }
}
