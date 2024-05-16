
import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';
import { HttpErrorResponse, HttpHeaders} from '@angular/common/http';

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSpy:any;

  beforeEach(() => {
    httpClientSpy={
      get:jest.fn(),
      post:jest.fn()
    }
    service = new FakeService(httpClientSpy)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test getDataV1
  it('should test getDataV1', () => {
    const res =" Testing App";
    const url = 'https://jsonplaceholder.typicode/todos/1';
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.getDataV1();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);

  });

  //Test getDataV2 success
  it('should test getDataV2', (done) => {
    const res =" Testing App";
    const url = 'https://jsonplaceholder.typicode/todos/1';
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.getDataV2().subscribe(
      {
        next:(data)=>{
          expect(data).toEqual(res);
          done();
        },
        error:(error)=>{
          console.log(error)
        }
      }
    )
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);

  });

  //Test getDataV2 error
  it('should test getDataV2 throw error', (done) => {

    const errorResponse = new HttpErrorResponse({
      error:'test 404 error',
      status:404,
      statusText:'Not Found'
    })
    const url = 'https://jsonplaceholder.typicode/todos/1';
    jest.spyOn(httpClientSpy,'get').mockReturnValue(throwError(()=>errorResponse));
    service.getDataV2().subscribe(
      {
        //next:data=>console.log(data),
        error:(error)=>{
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    )
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);

  });

  //Test postDataV1
  it('should test postDataV1',(done)=>{
    const command = 'testing';
    const res= 'Testing-App';
    const url = 'https://jsonplaceholder.typicode/todos/1';
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }

    jest.spyOn(httpClientSpy,'post').mockReturnValue(of(res));
    service.postDataV1(command).subscribe({
      next:(data)=>{
        expect(data).toEqual(res);
        done();
      }
    });

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);

  })
});
