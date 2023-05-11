import { Component } from '@angular/core';

interface Dates {
  value: string;
  iframeUrl: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent {
  baseUrl: string = 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A';
  endUrl: string = ')&hide-filter-bar=true%22';

  dates: Dates[] = [
    { value: 'Año actual', iframeUrl: `${this.baseUrl}(from%3Anow-1y%2Fd%2Cto%3Anow)${this.endUrl}` },
    { value: '30 días', iframeUrl: `${this.baseUrl}(from%3Anow-30d%2Fd%2Cto%3Anow)${this.endUrl}` },

    { value: '15 días', iframeUrl: `${this.baseUrl}(from%3Anow-15d%2Fd%2Cto%3Anow)${this.endUrl}` },

    { value: '7 días', iframeUrl: `${this.baseUrl}(from%3Anow-7d%2Fd%2Cto%3Anow)${this.endUrl}` },

    { value: 'Ayer', iframeUrl: `${this.baseUrl}(from%3Anow-1d%2Fd%2Cto%3Anow)${this.endUrl}` }
  ];

  selectedValue: string = this.dates[1].iframeUrl;
}
