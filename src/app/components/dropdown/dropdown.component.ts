import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

interface URLBuilder {
  value: string;
  iframeUrl: string;
  urlSnippet: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})


export class DropdownComponent {

  urlHead: string = environment.baseUrl
  urlBody: string = ",refreshInterval:(pause:!t,value:0),";
  urlTail: string = ")&hide-filter-bar=true";

  selectedPortal: string = '(query:presupuesto.aragon.es),type:phrase),query:(match_phrase:(portal:presupuesto.aragon.es))))';
  selectedDate: string = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow))';

  changePortal(newPortal: any) {
    console.log(newPortal)
    this.selectedPortal = newPortal;
  }
  changeDate(newDate: string) {
    this.selectedDate = newDate;
  }

  dates: URLBuilder[] = [
    { value: 'Año actual', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-1y%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-1y%2Fd,to:now)' },

    { value: '30 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-30d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-30d%2Fd,to:now)' },

    { value: '15 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-15d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-15d%2Fd,to:now)' },

    { value: '7 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-7d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-7d%2Fd,to:now)' },

    { value: 'Ayer', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-1d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-1d%2Fd,to:now)' }
  ];

  portals: URLBuilder[] = [
    { value: 'presupuestos.aragon.es', iframeUrl: `${this.urlHead}(query:presupuesto.aragon.es),type:phrase),query:(match_phrase:(portal:presupuesto.aragon.es))))${this.urlBody}${this.selectedDate}${this.urlTail}`, urlSnippet: '(query:presupuesto.aragon.es),type:phrase),query:(match_phrase:(portal:presupuesto.aragon.es))))' },
  ];


  selectedValue: URLBuilder = { value: "", iframeUrl: this.dates[1].iframeUrl, urlSnippet: "" };
}
