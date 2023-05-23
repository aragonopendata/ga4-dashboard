import { AppInitService } from './app-init.service';
import { APP_INITIALIZER } from '@angular/core';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class Constants {
    public static SERVER_API_LINK_AUTHENTICATE = '/authenticate';
    public static SERVER_API_LINK_ADMIN_LOGSTASH = '/logstash';
}