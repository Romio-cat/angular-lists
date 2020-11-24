import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListsServiceService } from '../lists-service.service';
import { ListInterface } from '../list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  public title = 'Мои списки';
  public lists$: Observable<ListInterface[]>;

  constructor(private listsService: ListsServiceService) {}

  public ngOnInit(): void {
    this.lists$ = this.listsService.lists;
    this.listsService.getLists$();
  }
}
