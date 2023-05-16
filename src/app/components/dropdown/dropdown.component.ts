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
  //"https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/a0c4c7f0-f2fa-11ed-8596-6dee554197cb?embed=true&_g=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'6dd1cc00-d39f-11ed-91b6-b3f4561f6def',key:portal,negate:!f,params:(query:presupuesto.aragon.es),type:phrase),query:(match_phrase:(portal:presupuesto.aragon.es)))),refreshInterval:(pause:!t,value:0),time:(from:now-30d%2Fd,to:now))&hide-filter-bar=true"

  baseUrl: string = 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A';
  endUrl: string = ')&hide-filter-bar=true%22';

  urlHead: string = environment.baseUrl
  urlBody: string = ",refreshInterval:(pause:!t,value:0),";
  urlTail: string = ")&hide-filter-bar=true";

  selectedPortal: string = '(query:presupuesto.aragon.es),type:phrase),query:(match_phrase:(portal:presupuesto.aragon.es))))';
  selectedDate: string = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow))';

  changePortal(newPortal: any) {
    //this.selectedValue = newPortal.iframeUrl;
    this.selectedPortal = newPortal;
  }
  changeDate(newDate: any) {
    //this.selectedValue = newDate.iframeUrl;
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
