import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftMenuComponent implements OnInit {

  menuAdmin: { name: string, ref: string, exact?: boolean }[] = [
    { name: 'Панель управления', ref: '/admin', exact: true },
    { name: 'Список клиентов', ref: '/admin/users' },
    { name: 'Список упражнений', ref: '/admin/exercises' },
    { name: 'Редактировать профиль', ref: '/admin/edit' }
  ]

  menuUser: { name: string, ref: string, exact?: any }[] = [
    { name: 'Тренировки', ref: '/account/training' },
    { name: 'Прогресс', ref: '/account/progress' },
    { name: 'Список упражнений', ref: '/account/exercises' }
  ]

  isAdmin: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()
  }

}
