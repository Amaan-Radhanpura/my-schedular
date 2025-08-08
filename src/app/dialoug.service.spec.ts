import { TestBed } from '@angular/core/testing';

import { DialougService } from './dialoug.service';

describe('DialougService', () => {
  let service: DialougService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialougService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
