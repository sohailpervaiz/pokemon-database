import { Pokedex, PagedPokedex } from '../models/pokedex.model';

export class AddPokedex {
  static readonly type = '[Pokedex] Add';

  constructor(public payload: Pokedex) {
  }
}

export class GetPokedex {
  static readonly type = '[Pokedex] Get';
}

export class GetPagedPokedex {
  static readonly type = 'PagedPokedex Get';

  constructor(public page: string,public search: string) {
  }
}

export class UpdatePokedex {
  static readonly type = '[Pokedex] Update';

  constructor(public payload: Pokedex, public id: string) {
  }
}

export class DeletePokedex {
  static readonly type = '[Pokedex] Delete';

  constructor(public id: string) {
  }
}