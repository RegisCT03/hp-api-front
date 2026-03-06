export interface Character {
  id: string;
  name: string;
  house: string;
  actor: string;
  image: string;
  species: string;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
}