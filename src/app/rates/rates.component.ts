import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {InMemoryRatesStorageService} from '../storage/in-memory-rates-storage.service';
import {MatPaginator, MatSort} from '@angular/material';
import {RatesService} from '../rartes-service/rates.service';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatesComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private ratesService: RatesService) {
  }

  @Input() from: string;

  @Input() to: string;

  itemColumns: string[] = ['in', 'out'];
  displayedColumns: string[] = ['in', 'out', 'exchange-name'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  isViewInit = false;

  dataSource: InMemoryRatesStorageService;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // noinspection JSMethodCanBeStatic
  onRowClicked(raw) {
    window.open(raw.exchange.ref);
    console.log('Clicked the raw: ' + raw);
  }

  ngOnInit() {
    this.dataSource = new InMemoryRatesStorageService(this.ratesService);
    this.dataSource.loadItems(this.from, this.to, 0, 10);
  }

  ngAfterViewInit() {

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 100;
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadItemsPage())
      )
      .subscribe();
    this.isViewInit = true;
  }

  loadItemsPage() {
    console.log('load items');
    console.log('from: ' + this.from);
    console.log('to: ' + this.to);
    console.log('pageIndex' + this.paginator.pageIndex);
    console.log('pageSize' + this.paginator.pageSize);
      this.dataSource.loadItems(
        this.from,
        this.to,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.to) {
      this.to = changes.to.currentValue;
    }
    if (changes.from) {
      this.from = changes.from.currentValue;
    }
    console.log('from: ' + this.from + ' to: ' + this.to);
    console.log('isViewInit ' + this.isViewInit);
    if (this.isViewInit) {
      this.loadItemsPage();
    }
  }
}
