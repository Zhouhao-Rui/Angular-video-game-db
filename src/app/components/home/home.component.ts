import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { APIResponse, Game } from "src/app/models";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public sort: string = "name";
  public games: Array<Game> = [];
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params["game-search"]) {
        this.searchGames("name", params["game-search"]);
      } else {
        this.searchGames("name");
      }
    });
  }

  searchGames(sort: string, search?: string) {
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        console.log(sort);
        this.games = gameList.results;
        console.log(gameList);
      });
  }
}
