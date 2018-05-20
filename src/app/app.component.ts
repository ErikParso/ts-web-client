import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: Servis[];
  selected: Servis;
  columnsToDisplay = ['receiveDate', 'attachments'];

  constructor(private apiService: ApiService) {
    apiService.httpGet<Servis[]>("/problems")
      .subscribe(servises => this.data = servises);
  }

  getAttachments(dir: string) {
    window.open(environment.apiUrl + "/attachment/" + dir, "_self");
  }

  select(row: Servis){
    this.selected = row;
  }
  
}

export class Servis {
  servisId: Number;
  receiveDate: Date;
  attachmentsDirectory: String;
  servisInformations: ServisInformation[];
}

export class ServisInformation {
  title: string;
  value: string;
}
