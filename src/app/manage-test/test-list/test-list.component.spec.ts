import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test } from 'app/models/test.model';
import { TestListComponent } from './test-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from '../test.service';
import { TestCategory } from 'app/models/test-category.model';
import { RouterTestingModule } from '@angular/router/testing';
import { TestCategoryService } from 'app/manage-test-category/test-category.service';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;
  let testService: TestService;
  let testCategoryService: TestCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestListComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(TestService);
    testCategoryService = TestBed.inject(TestCategoryService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 1: Describe the test case
  it('should retrieve all test categories on initialization', async () => {

    // Step 2: Prepare mock data for test categories
    const categories: TestCategory[] = [
      { categoryID: 1, name: 'Category 1', Active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { categoryID: 2, name: 'Category 2', Active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];

    // Step 3: Create a spy to mock the 'getAllCategories' function of the testService
    spyOn(testCategoryService, 'getAllCategories').and.returnValue(Promise.resolve(categories));

    // Step 4: Call the component's initialization function
    component.ngAfterViewInit();

    // Step 5: Verify that 'getAllCategories' was called and the testCategories were set correctly
    await expect(testCategoryService.getAllCategories).toHaveBeenCalled();

    expect(component.testCategories).toEqual(categories);
  });

  // Step 1: Describe the test case
  it('should retrieve all tests on initialization', async () => {
    // Step 2: Prepare mock data for tests

    const tests: Test[] = [
      { testID: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { testID: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];

    // Step 3: Create a spy to mock the 'getAllTest' function of the testService
    spyOn(testService, 'getAllTests').and.returnValue(Promise.resolve(tests));

    // Step 4: Call the component's initialization function
    component.ngAfterViewInit();

    // Step 5: Verify that 'getAllTest' was called and the tests were set correctly
    await expect(testService.getAllTests).toHaveBeenCalled();

    // Assert that dataSource is assigned correctly
    expect(component.dataSource).toBeDefined();
    expect(component.dataSource instanceof MatTableDataSource).toBe(true);
    expect(component.dataSource.data).toEqual(tests);

    // Assert that sort property is set
    expect(component.sort).toBeDefined()
    expect(component.dataSource.data).toEqual(tests);
  });

  it('should filter tests by description', async () => {
    const tests: Test[] = [
      { testID: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { testID: 2, description: 'Test 2', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];
    component.dataSource = new MatTableDataSource<Test>(tests);
    await component.doFilter('Test 1');
    expect(component.dataSource.filter).toEqual('test 1');
  });

  it('should navigate to test details page when createTest called', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();

    component.createTest();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/create')
  });

});
