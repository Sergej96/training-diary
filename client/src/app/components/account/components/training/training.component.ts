import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/interfaces/Training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainings$!: Observable<Training[]>

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainings$ = this.trainingService.listTrainings()
  }

}
