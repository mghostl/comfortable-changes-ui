export class Currency {
  name: string;
  source: string;

  constructor(name: string, source?: string) {
    this.name = name;
    this.source = '/img/currencies/' + source;
  }
}
