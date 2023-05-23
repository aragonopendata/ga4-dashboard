import { TestBed } from '@angular/core/testing';

import { LogstashService } from './logstash.service';

describe('LogstashService', () => {
  let service: LogstashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogstashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
