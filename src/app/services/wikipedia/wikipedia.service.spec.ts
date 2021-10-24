import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WikipediaService } from './wikipedia.service';

const mockHttpClient = {

}

describe('WikipediaService', () => {
  let service: WikipediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: mockHttpClient
        }
      ]
    });
    service = TestBed.inject(WikipediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
