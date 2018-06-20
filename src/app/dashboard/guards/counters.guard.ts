import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountersService } from '../services/counters.service';
import { MessagesService } from '../../shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class CountersGuard implements CanActivate {
  constructor (
    private messagesService: MessagesService,
    private countersService: CountersService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.countersService.getCounters) {
        return true
      } else {
        this.messagesService.createMessage('warning', 'Спочатку заповніть тарифи по лічильникам.');
        this.router.navigate(['/dashboard/my-counters']);

        return false
      }
  }
}
