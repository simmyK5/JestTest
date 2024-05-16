import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesComponent } from './matches.component';

describe('MatchesComponent', () => {
  let component: MatchesComponent;
  let fixture: ComponentFixture<MatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchesComponent]
    });
    fixture = TestBed.createComponent(MatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test exact Equality use toBe
  it('two plus two is four', () => {
    expect(2+2).toBe(4)
  });

  //Test object value use toEqual
  it('Object value', () => {
    const data ={name:"Test-App"}
    expect(data).toEqual({name:"Test-App"})
  });

  //Test truthiness
  it('null', () => {
    const n =null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it('zero', () => {
    const z =0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  //Numbers
  it('two plus two', () => {
    const value =2+2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    //ToBe and ToEqual function the same for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);

  });

  it('adding floating point numbers',()=>{
    const value =0.1 + 0.2;
    //expect(value).toBe(0.3);
    expect(value).toBeCloseTo(0.3)
  });

  //Strings
  it('there is no R in Testing-App',()=>{
    expect('Testing-App').not.toMatch(/R/);
  })

  it('there is "development" in Testing-App development',()=>{
    expect('Testing-App development').toMatch(/development/);
  })

  //Arrays and Iterations
  it('the shopping list has green-tea on it',()=>{
    const shoppingList =[
      'bread',
      'salt',
      'eggs',
      'green-tea',
      'oil'
    ]
    expect(shoppingList).toContain('green-tea');
    expect(new Set(shoppingList)).toContain('green-tea') //checking sets
  });

  //Exceptions
  it('compiling android goes as expected',()=>{
    const error ="You are using Old Angular";
    expect(()=>component.compileAndroidCode()).toThrow();
    expect(()=>component.compileAndroidCode()).toThrow(Error);

    //You can also use the exact error message or a regexp
    expect(()=>component.compileAndroidCode()).toThrow(error)
    expect(()=>component.compileAndroidCode()).toThrow(/Angular/)
  })

});
