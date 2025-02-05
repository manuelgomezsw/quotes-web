import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, switchMap, map} from 'rxjs/operators';

/**
 * Configura un observable filtrado para un autocomplete.
 * @param control El FormControl asociado al input.
 * @param getOptionsFn Una función que retorna un Observable con el array completo de opciones.
 * @param filterFn Función que recibe el valor del input y las opciones y retorna el array filtrado.
 * @returns Observable<T[]> con las opciones filtradas.
 */
export function setupAutocompleteFromService<T>(
  control: FormControl,
  getOptionsFn: () => Observable<T[]>,
  filterFn: (value: string, options: T[]) => T[]
): Observable<T[]> {
  return getOptionsFn().pipe(
    // Una vez obtenemos las opciones, combinamos con los cambios del control
    switchMap(options =>
      control.valueChanges.pipe(
        startWith(''),
        map(value => filterFn(value, options))
      )
    )
  );
}
