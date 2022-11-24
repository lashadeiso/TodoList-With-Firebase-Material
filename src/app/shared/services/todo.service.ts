import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseURL = environment.baseURL;
  toDoList: Item[] = [];

  toDoListUpdate$ = new Subject<Item[]>();
  //Subject არის ობზერვებლის ტიპის ობიექტი.
  //რომელსაც შეგვიძლია სურვილისამებრ რაიმე მნიშვნელობა
  //დავა emit ებინოთ,დაემიტება ხდება next ის საშუალებით

  //tap ოპერატორი საშუალებას გვაძლავს გავატაროთ ლოგიკა
  //გარკვეულ შუალედში ისე რომ ასბოლოო შედეგზე გავლენა არ ვიქონიოთ

  constructor(private http: HttpClient) {}

  onAddToDo(item: HTMLInputElement) {
    const newTodo = {
      description: item.value,
      done: false,
    };
    if (item.value && item.value.split('')[0] != ' ') {
      this.http
        .post(`${this.baseURL}/todoList.json`, newTodo)
        .pipe(
          tap((res: any) => {
            if (res) {
              this.toDoList.unshift({ ...newTodo, key: res.name });
              this.toDoListUpdate$.next(this.toDoList);
            }
          })
        )
        .subscribe();
      item.value = '';
    }
  }
  getToDos(): Observable<Item[]> {
    return this.http.get(`${this.baseURL}/todoList.json`).pipe(
      map((res) => {
        if (res) {
          let tmpList = [];
          for (let key in res) {
            tmpList.push({ ...res[key], key: key });
          }
          return tmpList;
        } else {
          return [];
        }
      }),
      tap((res) => {
        this.toDoList = res;
      })
    );
  }
  onDeleteTodo(key: string) {
    console.log(key);
    return this.http.delete(`${this.baseURL}/todoList/${key}.json`).pipe(
      tap(() => {
        let index = this.toDoList.map((item) => item.key).indexOf(key);
        this.toDoList.splice(index, 1);
        this.toDoListUpdate$.next(this.toDoList);
      })
    );
  }

  onDone(item: Item) {
    return this.http
      .patch(`${this.baseURL}/todoList/${item.key}.json`, {
        description: item.description,
        done: item.done,
      })
      .pipe(
        tap(() => {
          let index = this.toDoList.map((item) => item.key).indexOf(item.key);
          this.toDoList[index] = item;
          this.toDoListUpdate$.next(this.toDoList);
        })
      );
  }
}
