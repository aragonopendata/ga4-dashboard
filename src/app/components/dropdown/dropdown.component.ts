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
  selectedValue: string = '';

  dates: Dates[] = [
    { value: 'Año actual', iframeUrl: 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Fd%2Cto%3Anow))&hide-filter-bar=true' },

    { value: '30 días', iframeUrl: 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Fd%2Cto%3Anow))&hide-filter-bar=true' },

    { value: '15 días', iframeUrl: 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15d%2Fd%2Cto%3Anow))&hide-filter-bar=true%22' },

    { value: '7 días', iframeUrl: 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))&hide-filter-bar=true%22' },

    { value: 'Ayer', iframeUrl: 'https://desopendataei2a.aragon.es/cobertura/kibana/app/dashboards?auth_provider_hint=anonymous1#/view/ad4977e0-cf06-11ed-91b6-b3f4561f6def?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1d%2Fd%2Cto%3Anow))&hide-filter-bar=true%22' }
  ];

}
