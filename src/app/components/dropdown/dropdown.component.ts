import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


export class DropdownComponent implements OnInit {

  environment = environment;

  constructor(private readonly http:HttpClient) { }

  ngOnInit() {
    var intervalfunc = this.updateIframeHeight
    setInterval(function () {
      intervalfunc
    }, 100)
    this.getPortals();


  }
  getPortals(){
    const headers = { 'Content-Type': 'application/json'};
  
      return this.http.get<any>(environment.AODBACK_LOGSTASH_ENDPOINT,{headers}).subscribe(data => {
        this.parsePortals(data.message) 
      });
    }

  parsePortals(data: any)
  {
    this.portals.push(    { value: "Todos", iframeUrl: `${this.urlHead}${this.urlBody}${this.selectedDate}${this.urlTail}`, urlSnippet: "" });
    this.all_portals_id.push(0)
   

    data.forEach((element: any) => { 
      if (element.status == 1 && element.type == 'analytics_GA4'){
        this.portals.push({value: element.url, iframeUrl: `${this.urlHead}('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'6dd1cc00-d39f-11ed-91b6-b3f4561f6def',key:portal,negate:!f,params:(query:${element.url}),type:phrase),query:(match_phrase:(portal:${element.url})))${this.urlBody}${this.selectedDate}${this.urlTail}`, urlSnippet: `('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'6dd1cc00-d39f-11ed-91b6-b3f4561f6def',key:portal,negate:!f,params:(query:${element.url}),type:phrase),query:(match_phrase:(portal:${element.url})))` });
        this.all_portals_id.push(element.id_logstash)
      }
      
    });
    
  }
 

  urlHead: string = environment.baseUrl
  urlBody: string = "),refreshInterval:(pause:!t,value:0),";
  urlTail: string = ")&hide-filter-bar=true";

  
  selectedDate: string = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow)';
  selectedPortal: string = '';

  placeholderTextDate: string = '30 Días';
  placeholderTextPortal: string = 'Todos';

  iframe: any = document.getElementById("myiframe");

  updateIframeHeight() {
    this.iframe.height = this.iframe.contentWindow.document.body.scrollHeight;

  }

  changePortal(newPortal: any) {
    this.selectedPortal = newPortal.urlSnippet;
    this.placeholderTextPortal = newPortal.value;
    var tmpIndex = this.portals.findIndex(x => x.urlSnippet === this.selectedPortal);
    this.portals[tmpIndex].iframeUrl = `${this.urlHead}${this.selectedPortal}${this.urlBody}${this.selectedDate}${this.urlTail}`
    this.selected_portal_id = this.all_portals_id[tmpIndex];
  }

  changeDate(newDate: any) {
    this.selectedDate = newDate.urlSnippet;
    this.placeholderTextDate = newDate.value;
    var tmpIndex = this.dates.findIndex(x => x.urlSnippet === this.selectedDate);
    this.dates[tmpIndex].iframeUrl = `${this.urlHead}${this.selectedPortal}${this.urlBody}${this.selectedDate}${this.urlTail}`
  }

  dates: URLBuilder[] = [
    { value: 'Año actual', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-1y%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-1y%2Fd,to:now)' },
    { value: '30 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-30d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-30d%2Fd,to:now)' },

    { value: '15 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-15d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-15d%2Fd,to:now)' },

    { value: '7 días', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-7d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-7d%2Fd,to:now)' },

    { value: 'Ayer', iframeUrl: `${this.urlHead}${this.selectedPortal}${this.urlBody}time:(from:now-1d%2Fd,to:now)${this.urlTail}`, urlSnippet: 'time:(from:now-1d%2Fd,to:now)' }
  ];

  portals: URLBuilder[] = [
  ];
  selectedValue: URLBuilder = { value: "", iframeUrl: this.dates[1].iframeUrl, urlSnippet: "" };

  all_portals_id: number[] = [];
  selected_portal_id: number = 0;
}


