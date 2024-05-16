import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComponent } from './data.component';
import { FakeService } from '../services/fake.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock:any;

  beforeEach(() => {
    fakeServiceMock={
      getDataV1:jest.fn()
    }
    TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers:[
        {
          provide:FakeService,
          useValue:fakeServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getServiceData set serviceData',()=>{
    const res={
      data:'Testing-App'
    }
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(res));
    fixture.detectChanges();
    expect(component.serviceData).toBe(res)

  });

  it('should getServiceData set errorMessage',()=>{
    const errorMessage =new HttpErrorResponse({
      error:'test 404 error',
      status:404,
      statusText:'Not Found'
    })

    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(throwError(()=>errorMessage));
    component.getServiceData();
    expect(component.errorMessage).toBe(errorMessage)

  });

  it('should set greeting to Good day',()=>{
    const res={
      data:'Testing-App',
      time: 12
    }
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(res));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good day')
  });

  it('should set greeting to Good morning',()=>{
    const res={
      data:'Testing-App',
      time: 9
    }
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(res));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good morning')
  });

  it('should set greeting to Good Evening',()=>{
    const res={
      data:'Testing-App',
      time: 21
    }
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(res));
    fixture.detectChanges();
    expect(component.greeting).toBe('Good Evening')
  });
});
