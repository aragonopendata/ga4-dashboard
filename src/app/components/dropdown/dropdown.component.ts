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

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    // Initialize with default 30-day period
    this.currentSelectedDate = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow)';
    this.getPortals();
  }

  getPortals() {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<any>(environment.AODBACK_LOGSTASH_ENDPOINT, { headers }).subscribe(data => {
      this.parsePortals(data.message)
    });
  }

  /**
   * Processes API response to build portal dropdown options
   * Stores original API data for consistent URL construction
   */
  parsePortals(data: any) {
    // Store API data for portal lookups
    this.apiPortalData = data;
    
    // Add "Todos" (All portals) option
    this.portals.push({ value: "Todos", iframeUrl: '', urlSnippet: "" });
    this.all_portals_id.push(0);

    // Add active analytics portals
    data.forEach((element: any) => {
      if (element.status == 1 && element.type == 'analytics') {
        this.portals.push({ 
          value: element.portal_name, 
          iframeUrl: '', // URLs built dynamically
          urlSnippet: '' 
        });
        this.all_portals_id.push(element.id_logstash);
      }
    });

    // Build initial URL
    this.updateSelectedValue();
  }




  urlHead: string = environment.baseUrl
  urlBody: string = "),refreshInterval:(pause:!t,value:0),";
  urlTail: string = ")&hide-filter-bar=true";


  selectedDate: string = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow)';
  selectedPortal: string = '';

  placeholderTextDate: string = '30 Días';
  placeholderTextPortal: string = 'Todos';

  // State management for dropdown coordination
  /** Stores the original API data for the currently selected portal */
  selectedPortalData: any = null;
  /** Stores the complete API response for portal lookups */
  apiPortalData: any[] = [];
  /** Current selected date filter snippet */
  currentSelectedDate: string = 'time:(from%3Anow-30d%2Fd%2Cto%3Anow)';

  /**
   * Handles portal selection change
   * Updates portal state and maintains current date filter
   */
  changePortal(newPortal: any) {
    // Update portal state
    if (newPortal.value === "Todos") {
      this.selectedPortalData = null;
      this.selected_portal_id = 0;
    } else {
      this.selectedPortalData = this.getPortalDataByName(newPortal.value);
      const portalIndex = this.portals.findIndex(p => p.value === newPortal.value);
      this.selected_portal_id = this.all_portals_id[portalIndex];
    }
    
    this.placeholderTextPortal = newPortal.value;
    
    // Rebuild URL maintaining current date selection
    this.updateSelectedValue();
  }

  /**
   * Handles date range selection change
   * Updates date state and maintains current portal filter
   */
  changeDate(newDate: any) {
    // Update date state
    this.currentSelectedDate = newDate.urlSnippet;
    this.selectedDate = newDate.urlSnippet; // Keep for backward compatibility
    this.placeholderTextDate = newDate.value;
    
    // Rebuild URL maintaining current portal selection
    this.updateSelectedValue();
  }

  /**
   * Builds Kibana dashboard URL with current portal and date filters
   * Uses view-based filtering for consistent portal identification
   */
  private updateSelectedValue(): void {
    let portalFilter = '';
    
    if (this.selectedPortalData && this.selectedPortalData.view) {
      // Use view-based filter for consistent portal identification
      portalFilter = `('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'6dd1cc00-d39f-11ed-91b6-b3f4561f6def',key:portal,negate:!f,params:(view:${this.selectedPortalData.view}),type:phrase),query:(match_phrase:(view:${this.selectedPortalData.view})))`;
    }
    
    // Build URL with current portal and date selections
    this.selectedValue.iframeUrl = `${this.urlHead}${portalFilter}${this.urlBody}${this.currentSelectedDate}${this.urlTail}`;
  }

  /**
   * Finds portal data by name from the API response
   */
  private getPortalDataByName(portalName: string): any {
    return this.apiPortalData.find(p => p.portal_name === portalName);
  }

  reloadDash() {
    console.log("reloading")
    this.selectedValue.iframeUrl = ``;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister()
          }
        })
    }
    setTimeout(() => {
      this.updateSelectedValue();
    }, 1);
  }

  // Date options without static URLs (URLs built dynamically)
  dates: URLBuilder[] = [
    { value: 'Año actual', iframeUrl: '', urlSnippet: 'time:(from:now-1y%2Fd,to:now)' },
    { value: '30 días', iframeUrl: '', urlSnippet: 'time:(from:now-30d%2Fd,to:now)' },
    { value: '15 días', iframeUrl: '', urlSnippet: 'time:(from:now-15d%2Fd,to:now)' },
    { value: '7 días', iframeUrl: '', urlSnippet: 'time:(from:now-7d%2Fd,to:now)' },
    { value: 'Ayer', iframeUrl: '', urlSnippet: 'time:(from:now-1d%2Fd,to:now)' }
  ];

  portals: URLBuilder[] = [
  ];
  selectedValue: URLBuilder = { value: "", iframeUrl: "", urlSnippet: "" };

  all_portals_id: number[] = [];
  selected_portal_id: number = 0;
}


