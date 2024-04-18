export class GoodOrNot {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  static isValid(goodOrNot: string): string {
    if (goodOrNot !== "Yes" && goodOrNot !== "No") {
      throw new Error("Insert 'Yes' or 'No'");
    }
    return goodOrNot;
  }
}
