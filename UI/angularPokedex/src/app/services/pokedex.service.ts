import { Pokedex, PagedPokedex } from '../models/pokedex.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class PokedexService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllPokedex(): Observable<Pokedex[]> {
    return this.http.get<Pokedex[]>('http://127.0.0.1:8000/pokedex');
  }

  getPagedPokedex(page: string | number, search: string): Observable<PagedPokedex> {
    if (page != null && page != undefined && page != "") {
      return this.http.get<PagedPokedex>('http://127.0.0.1:8000/pokedex/list_paged?page=' + page);
    }
    if (search != null && search != undefined && search != "") {
      return this.http.get<PagedPokedex>('http://127.0.0.1:8000/pokedex/list_paged?name=' + search);
    }
    return this.http.get<PagedPokedex>('http://127.0.0.1:8000/pokedex/list_paged');
  }

  createPokedex(pokedex: Pokedex): Observable<Pokedex> {
    return this.http.post<Pokedex>('http://127.0.0.1:8000/pokedex/', pokedex);
  }

  deletePokedex(Id: string): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/pokedex/' + Id);
  }

  updatePokedex(Id: string | number, pokedex: Pokedex): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/pokedex/' + Id, pokedex);
  }
}