import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ItemComponent } from './item/item.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const ViewComponents = [InputComponent, ItemComponent];
const Material = [MatInputModule, MatButtonModule];
@NgModule({
  declarations: [InputComponent, ItemComponent],
  imports: [CommonModule, [...Material]],
  exports: [...ViewComponents],
})
export class ViewModule {}
