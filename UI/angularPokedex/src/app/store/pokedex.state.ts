import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pokedex ,PagedPokedex } from '../models/pokedex.model';
import { AddPokedex, UpdatePokedex, GetPokedex, GetPagedPokedex, DeletePokedex } from '../store/pokedex.action';
import { PokedexService } from '../services/pokedex.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export class PokedexStateModel {
    pokedex: Pokedex[];
    pagedPokedex : PagedPokedex;
    arePokedexLoaded: boolean;
}

@State<PokedexStateModel>({
    name: 'pokedex',
    defaults: {
      pokedex: [],
      pagedPokedex: null,
      arePokedexLoaded: false
    }
})
@Injectable()
export class PokedexState {

    constructor(private pokedexService: PokedexService, private router: Router) {
    }

    @Selector()
    static getPokedexList(state: PokedexStateModel) {
        return state.pokedex;
    }

    @Selector()
    static getPagedPokedexList(state: PokedexStateModel) {
        return state.pagedPokedex;
    }

    @Selector()
    static arePokedexLoaded(state: PokedexStateModel) {
        return state.arePokedexLoaded;
    }

    @Action(GetPokedex)
    getPokedex({getState, setState}: StateContext<PokedexStateModel>) {
      return this.pokedexService.getAllPokedex().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            pokedex: result,
            arePokedexLoaded: true
          });
        })
      );
    }

    @Action(GetPagedPokedex)
    getPagedPokedex({getState, setState}: StateContext<PokedexStateModel>,{ page ,search } :GetPagedPokedex) {
      return this.pokedexService.getPagedPokedex(Number(page),search).pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            pagedPokedex: result,
            arePokedexLoaded: true
          });
        })
      );
    }

    @Action(DeletePokedex)
    deletePokedex({getState, setState}: StateContext<PokedexStateModel>, {id}: DeletePokedex) {
      return this.pokedexService.deletePokedex(id).pipe(
        tap(result => {
          const state = getState();
          const filteredArray = state.pokedex.filter(item => item.Id !== Number(id));
          setState({
            ...state,
            pokedex: filteredArray,
          });
        })
      );
    }

    @Action(UpdatePokedex)
    updatePokedex({getState, setState}: StateContext<PokedexStateModel>, {payload, id}: UpdatePokedex) {
      return this.pokedexService.updatePokedex(id, payload).pipe(
        tap(result => {
          const state = getState();
          const pokedexList = [...state.pokedex];
          const pokedexIndex = pokedexList.findIndex(item => item.Id === Number(id));
          pokedexList[pokedexIndex] = result;

          setState({
            ...state,
            pokedex: pokedexList,
          });
        })
      );
    }

    @Action(AddPokedex)
    addPokedex({getState, patchState}: StateContext<PokedexStateModel>, {payload}: AddPokedex) {
        return this.pokedexService.createPokedex(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                pokedex: [...state.pokedex, result]
            });
        }));
    }
}