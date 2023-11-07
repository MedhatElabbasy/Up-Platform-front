import { TestBed } from '@angular/core/testing';

import { ServicesapiService } from './servicesapi.service';

describe('ServicesapiService', () => {
  let service: ServicesapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
