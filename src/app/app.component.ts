import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tree-grid';

  sampleData =  [{ taskID: 1, taskName: 'Development Task 1', startDate: new Date('02/17/2017'),
  endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Normal', approved: true },
{ taskID: 2, taskName: 'Development Task 2', startDate: new Date('02/17/2017'),
  endDate: new Date('02/20/2017'), duration: 4, progress: '50', priority: 'Critical', approved: true },
{ taskID: 3, taskName: 'Testing', startDate: new Date('02/21/2017'),
  endDate: new Date('02/24/2017'), duration: 2, progress: '0', priority: 'High', approved: false }
  ]
}
