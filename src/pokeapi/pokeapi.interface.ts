export interface Pokemon {
  name: string;
  url: string;
}

export interface PokeApiCollection<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
