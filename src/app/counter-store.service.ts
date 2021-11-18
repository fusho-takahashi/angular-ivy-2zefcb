import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface State {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class CounterStoreService {
  readonly _counterState$ = new BehaviorSubject<State>({ count: 0 });

  select<T>(selector: (state: State) => T) {
    return this._counterState$.pipe(map(selector), distinctUntilChanged());
  }

  /**
   * 全部返すとき
   */
  get state$(): Observable<State> {
    return this.select<State>((state) => state);
  }

  /**
   * 特定のプロパティだけほしいとき
   */
  get count$(): Observable<number> {
    return this.select<number>((state) => state.count);
  }

  /**
   * 同期的に値がほしいとき
   */
  get countValu(): number {
    return this._counterState$.value.count;
  }

  update(fn: (state: State) => State) {
    const currentValue = this._counterState$.value;
    queueScheduler.schedule(() => {
      this._counterState$.next(fn(currentValue));
    });
  }

  incrementCount(): void {
    this.update((state) => ({ ...state, count: state.count + 1 }));
  }

  decrementCount(): void {
    this.update((state) => ({
      ...state,
      count: state.count < 1 ? state.count : state.count - 1,
    }));
  }
}
