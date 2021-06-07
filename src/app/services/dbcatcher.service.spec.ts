import { TestBed } from '@angular/core/testing';

import { DBCatcherService } from './dbcatcher.service';

describe('DBCatcherService', () => {
  let service: DBCatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBCatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
