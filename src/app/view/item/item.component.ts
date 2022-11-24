import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnDestroy {
  itemsList!: Item[];
  constructor(private todoService: TodoService) {}

  //თუ დავაკვირდებით ჩვენს აპლიკაციაში ბევრი subscribe გვაქვს,
  //რაც ხშირად ხდება memory leak ის მიზეზი,ამიტომაც საჭიოა
  //მოვახდინოთ მათი unsubscribe
  //ამისათვის შევქმნათ subscription ის ტიპის ცვლადი,მას
  //გავუტოლოთ რომელიმე საბსქრაიბი და დისთროიზე გამოვიძახოთ ანსაბსაქრაიბი

  itemSubscription$ = new Subscription();

  ngOnInit(): void {
    this.todoService.getToDos().subscribe((res) => {
      this.itemsList = res;
    });
    this.itemSubscription$ = this.todoService.toDoListUpdate$.subscribe(
      (res) => {
        this.itemsList = res;
      }
    );
  }
  onDeleteItem(item: Item) {
    this.todoService.onDeleteTodo(item.key).subscribe((res) => {
      console.log(res);
    });
  }
  onDone(item: Item) {
    this.todoService.onDone({ ...item, done: !item.done }).subscribe();
  }

  ngOnDestroy(): void {
    this.itemSubscription$.unsubscribe();
  }
}
