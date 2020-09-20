export interface Pokedex {
    Id: number;
    Num: string;
    Name: string;
    Img: string;
    Type: string;
    Height: string;
    Weight: string;
}

export interface PagedPokedex {
    count: number;
    next: string;
    previous: string;
    results: Pokedex[];
}