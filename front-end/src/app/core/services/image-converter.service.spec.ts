/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageConverterService } from './image-converter.service';

describe('Service: ImageConverter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageConverterService]
    });
  });

  it('should ...', inject([ImageConverterService], (service: ImageConverterService) => {
    expect(service).toBeTruthy();
  }));
});
