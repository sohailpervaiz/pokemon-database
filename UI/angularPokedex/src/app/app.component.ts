import { tap } from 'rxjs/operators';
import { Pokedex, PagedPokedex } from './models/pokedex.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetPokedex, DeletePokedex, UpdatePokedex, GetPagedPokedex } from './store/pokedex.action';
import { PokedexState } from './store/pokedex.state';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUpdateRecord } from './dialogAddUpdateRecord';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  displayedColumns: string[] = ['img', 'num', 'name', 'type', 'action'];

  title = 'angularPokedex';
  value = '';
  pageIndex = "";


  @Select(PokedexState.getPokedexList) pokedex$: Observable<Pokedex[]>;

  @Select(PokedexState.getPagedPokedexList) pokedexPaged$: Observable<PagedPokedex>;

  @Select(PokedexState.arePokedexLoaded) arePokedexLoaded$;

  pokedexToBeAdded = {} as Pokedex;

  arePokedexLoadedSub: Subscription;

  constructor(private store: Store, public dialog: MatDialog) {
  }

  ngOnInit() {

    /*   this.arePokedexLoadedSub = this.arePokedexLoaded$.pipe(
         tap((arePokedexLoaded) => {
           if (!arePokedexLoaded) {
             this.store.dispatch(new GetPokedex());
           }
         })
       ).subscribe(value => {
         console.log("hw", value);
       });*/

    this.arePokedexLoadedSub = this.arePokedexLoaded$.pipe(
      tap((arePokedexLoaded) => {
        if (!arePokedexLoaded) {
          this.store.dispatch(new GetPagedPokedex("", ""));
        }
      })
    ).subscribe(value => {
      console.log("out", value);
    });
  }


  onClick_Pagination(event) {
    this.pageIndex = event.pageIndex + 1;
    this.store.dispatch(new GetPagedPokedex(this.pageIndex, this.value));
  }

  openDialog(pokedex: Pokedex, flag: boolean): void {

    const dialogRef = this.dialog.open(DialogAddUpdateRecord, {
      width: '450px',
      data: { pokedex: pokedex, flag: flag }
    });
  }

  searchPokedex() {
    this.store.dispatch(new GetPagedPokedex("", this.value));
  }

  deletePokedex(Id: string) {
    this.store.dispatch(new DeletePokedex(Id));
    this.store.dispatch(new GetPagedPokedex(this.pageIndex, ""));
  }

  ngOnDestroy() {
    this.arePokedexLoadedSub.unsubscribe();
  }

}
