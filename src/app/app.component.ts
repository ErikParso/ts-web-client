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
  columnsToDisplay = [ 'id', 'receiveDate', 'attachments'];

  constructor(private apiService: ApiService) {
    apiService.httpGet<Servis[]>("/problems")
      .subscribe(servises => this.data = servises);
  }

  getAttachments(dir: string) {
    window.open(environment.apiUrl + "/attachment/" + dir, "_self");
  }

  markSolved(servis: Servis) {
    this.apiService.httpGet<Servis[]>("/solved/" + servis.servisId).subscribe();
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
  solved: boolean;
}

export class ServisInformation {
  title: string;
  value: string;
}
