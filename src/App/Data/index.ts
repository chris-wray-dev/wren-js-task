export class Sheep {
  name: string;
  sex: string;
  branded: boolean;
  lineage: {
    father: string,
    mother: string
  };
  bred: boolean;

  constructor (name: string, sex: string, branded: boolean = false, father: string = "unknown", mother: string = "unkown") {
    this.name = name;
    this.sex = sex;
    this.branded = branded;
    this.lineage = {
      father,
      mother
    };
    this.bred = false;
  }

  brand = () => {
    this.branded = true;
  }

  debrand = () => {
    this.branded = false;
  }

  rename = (name: string) => {
    this.name = name;
  }
}

export class Farm {
  name: string;
  season: number;
  flock: Array<Sheep>;

  constructor (name: string = "The Farm", flock: Array<Sheep> = []) {
    this.name = name;
    this.season = 1;
    this.flock = flock;
  }

  addSheep = (sheep: Sheep) => {
    this.flock.push(sheep);
  }

  breedSheep = (father: Sheep, mother: Sheep) => {
    const sex: string = Math.random() > 0.5 ? "male" : "female";  // assume 50/50 chance of male/female
    const babySheep = new Sheep("unknown", sex, false, father.name, mother.name);
    this.addSheep(babySheep);
  }

  rollSeason = () => {
    // split flock into male and female
    const maleFlock: Array<Sheep> = this.flock.filter(sheep => sheep.sex === "male");
    const femaleFlock: Array<Sheep> = this.flock.filter(sheep => sheep.sex === "female");

    // mark all female sheep as 'not bred'
    femaleFlock.map(female => {
      return {
        ...female,
        bred: false
      }
    });

    maleFlock.forEach(male => {
      femaleFlock.forEach((female, i) => {
        if (!female.bred && !female.branded) {
          // set success as 50/50
          const success: boolean = Math.random() > 0.5 ? true : false;

          if (success) {
            this.breedSheep(male, female);
            femaleFlock[i].bred = true;
          }

        }
      });
    });

    // increment season number
    this.season++
  }
}

// test data
export const theFarm = new Farm (
  "Chris' Farm",
  [
    new Sheep('Sheep 1', 'female', false),
    new Sheep('Sheep 2', 'female', true),
    new Sheep('Sheep 3', 'male', false),
    new Sheep('Sheep 4', 'female', false),
    new Sheep('Sheep 5', 'female', true),
    new Sheep('Sheep 6', 'female', true)
  ]
)
