import { TestBed } from '@angular/core/testing';

import { PinterestserviceService } from './pinterestservice.service';

describe('PinterestserviceService', () => {
  let service: PinterestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinterestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
