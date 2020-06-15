export class Currency {
  name: string;
  source: string;

  constructor(name: string, source?: string) {
    this.name = name;
    this.source = 'assets/img/currencies/' + (source != null ? source : '_default.png');
  }
}
