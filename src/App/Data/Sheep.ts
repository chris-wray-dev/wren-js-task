export class Sheep {
  name: string;
  sex: { label: string, value: string };
  branded: { label: string, value: boolean };
  lineage: {
    father: string,
    mother: string
  };
  bred: boolean;

  constructor (
    name: string,
    sex: { label: string, value: string } = { label: "Female", value: "female" },
    branded: { label: string, value: boolean } = { label: "No", value: false },
    father: string = "unknown",
    mother: string = "unknown"
  ) {
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
    this.branded = { label: "Yes", value: true };
  }

  debrand = () => {
    this.branded = { label: "No", value: false };
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
    this.flock = [...this.flock];
  }

  breedSheep = (father: Sheep, mother: Sheep) => {
    const sex: { label: string, value: string } = Math.random() > 0.5 
      ? { label: "Female", value: "female" } 
      : { label: "Male", value: "male" };  // assume 50/50 chance of male/female
    const babySheep = new Sheep("unknown", sex, { label: "No", value: false }, father.name, mother.name);
    this.addSheep(babySheep);
  }

  rollSeason = () => {
    // split flock into male and female
    // console.log(this)
    const maleFlock: Array<Sheep> = this.flock.filter(sheep => {
      if (sheep.sex) {
        return sheep.sex.value === "male"
      }
      return false
    });
    let femaleFlock: Array<Sheep> = this.flock.filter(sheep => {
      if (sheep.sex) {
        return sheep.sex.value === "female"
      }
      return false
    });

    femaleFlock = femaleFlock.map(female => {
      return {
        ...female,
        bred: false
      }
    });

    maleFlock.forEach(male => {
      if (!male.branded.value) {
        femaleFlock.forEach((female, i) => {
          if (!female.bred && !female.branded.value) {
            // set success as 50/50
            const success: boolean = Math.random() > 0.5 ? true : false;
  
            if (success) {
              this.breedSheep(male, female);
              femaleFlock[i].bred = true;
            }
          }
        });
      }
    });

    // increment season number
    this.season = this.season + 1
    return this;
  }
}

// test data
export const theFarm = new Farm (
  "Wren Farm",
  [
    new Sheep('Wrenny', { label: "Female", value: "female" }, { label: "No", value: false })
  ]
);
