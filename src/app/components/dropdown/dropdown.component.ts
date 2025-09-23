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
    console.log('[DEBUG] Portal data parsing started. Raw API data:', data);

    // Store API data for portal lookups
    this.apiPortalData = data;
    console.log('[DEBUG] API portal data stored');

    // Add "Todos" (All portals) option
    this.portals.push({ value: "Todos", iframeUrl: '', urlSnippet: "" });
    this.all_portals_id.push(0);
    console.log('[DEBUG] Added "Todos" option to portal list');

    // Add active analytics portals
    let activePortalsCount = 0;
    data.forEach((element: any) => {
      if (element.status == 1 && element.type == 'analytics') {
        this.portals.push({
          value: element.portal_name,
          iframeUrl: '', // URLs built dynamically
          urlSnippet: ''
        });
        this.all_portals_id.push(element.id_logstash);
        activePortalsCount++;
        console.log(`[DEBUG] Added portal: ${element.portal_name} (ID: ${element.id_logstash}, View: ${element.view})`);
      }
    });

    console.log(`[DEBUG] Portal parsing complete. Added ${activePortalsCount} active analytics portals`);
    console.log('[DEBUG] Final portal list:', this.portals);

    // Build initial URL
    console.log('[DEBUG] Building initial URL with default settings');
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
    console.log('[DEBUG] Portal selection started:', newPortal);

    // Update portal state
    if (newPortal.value === "Todos") {
      console.log('[DEBUG] Selected "Todos" - clearing portal filters');
      this.selectedPortalData = null;
      this.selected_portal_id = 0;
    } else {
      console.log('[DEBUG] Selecting specific portal:', newPortal.value);
      this.selectedPortalData = this.getPortalDataByName(newPortal.value);
      console.log('[DEBUG] Portal data found:', this.selectedPortalData);

      const portalIndex = this.portals.findIndex(p => p.value === newPortal.value);
      this.selected_portal_id = this.all_portals_id[portalIndex];
      console.log('[DEBUG] Portal ID set to:', this.selected_portal_id);
    }

    this.placeholderTextPortal = newPortal.value;
    console.log('[DEBUG] Portal placeholder updated to:', this.placeholderTextPortal);

    // Rebuild URL maintaining current date selection
    console.log('[DEBUG] Rebuilding URL with current date filter:', this.currentSelectedDate);
    this.updateSelectedValue();
  }

  /**
   * Handles date range selection change
   * Updates date state and maintains current portal filter
   */
  changeDate(newDate: any) {
    console.log('[DEBUG] Date selection started:', newDate);

    // Update date state
    this.currentSelectedDate = newDate.urlSnippet;
    this.selectedDate = newDate.urlSnippet; // Keep for backward compatibility
    console.log('[DEBUG] Date filter updated to:', this.currentSelectedDate);

    this.placeholderTextDate = newDate.value;
    console.log('[DEBUG] Date placeholder updated to:', this.placeholderTextDate);

    // Rebuild URL maintaining current portal selection
    console.log('[DEBUG] Rebuilding URL with current portal:', this.selectedPortalData?.portal_name || 'Todos');
    this.updateSelectedValue();
  }

  /**
   * Builds Kibana dashboard URL with current portal and date filters
   * Uses view-based filtering for consistent portal identification
   */
  private updateSelectedValue(): void {
    console.log('[DEBUG] Starting URL construction...');
    console.log('[DEBUG] Current portal data:', this.selectedPortalData);
    console.log('[DEBUG] Current date filter:', this.currentSelectedDate);

    let portalFilter = '';

    if (this.selectedPortalData && this.selectedPortalData.view) {
      // Use view-based filter for consistent portal identification
      portalFilter = `('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'6dd1cc00-d39f-11ed-91b6-b3f4561f6def',key:portal,negate:!f,params:(view:${this.selectedPortalData.view}),type:phrase),query:(match_phrase:(view:${this.selectedPortalData.view})))`;
      console.log('[DEBUG] Portal filter created for view:', this.selectedPortalData.view);
    } else {
      console.log('[DEBUG] No portal filter - showing all portals');
    }

    // Build URL with current portal and date selections
    this.selectedValue.iframeUrl = `${this.urlHead}${portalFilter}${this.urlBody}${this.currentSelectedDate}${this.urlTail}`;
    console.log('[DEBUG] Final iframe URL constructed:', this.selectedValue.iframeUrl);
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


