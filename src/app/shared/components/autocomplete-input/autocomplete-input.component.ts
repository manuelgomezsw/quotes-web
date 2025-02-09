import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from 'rxjs';

import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgForOf,
    MatInputModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.css'
})
export class AutocompleteInputComponent {
  // Determina si está en modo consulta para habilitar el botón de búsqueda.
  @Input() isSearchMode: boolean = false;
  // Texto del label, por ejemplo, "¿Quién es el autor?" o "¿Cuál es la obra?"
  @Input() label: string = "";
  // FormControl que controla el input
  @Input() control: FormControl = new FormControl();
  // Observable con las opciones filtradas (por ejemplo, Observable<string[]>)
  @Input() filteredOptions: Observable<string[]> | undefined;
  // Este output permitirá comunicar al componente padre el evento de consultar.
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  // Este output permitirá comunicar al componente padre la opción seleccionada.
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: MouseEvent): void {
    // Obtenemos el valor actual del control
    const inputValue = this.control.value;
    // Emitimos el valor mediante el output "search"
    this.search.emit(inputValue);
  }

  onSelectedValueChange(selectedValue: MatAutocompleteSelectedEvent): void {
    this.selectedValue.emit(selectedValue.option.value);
  }

  onFocusOut() {
    this.selectedValue.emit(this.control.value);
  }
}
