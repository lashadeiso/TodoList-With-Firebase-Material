import { Component } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  constructor(private todoService: TodoService) {}
  onAddToDo(item: HTMLInputElement) {
    this.todoService.onAddToDo(item);
  }
}
