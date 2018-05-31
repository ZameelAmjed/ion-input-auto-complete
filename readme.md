# ion-input-auto-complete
An autocomplete component which can be used in ion-list along with ion-item and ion-input.

![autocomplete](https://thumbs.gfycat.com/SmoggyDaringFoxhound-size_restricted.gif)

## Installation
1. Import the package for your ionic project from this repo

`npm install https://github.com/ZameelAmjed/ion-input-auto-complete.git`

2. Load it in your **app.module.ts**
```typescript
import {InputAutoCompleteModule} from 'ion-input-auto-complete';
import {InputAutoCompleteComponent} from 'ion-input-auto-complete';
@NgModule({
  imports: [
   ...
    InputAutoCompleteModule
  ],
  entryComponents: [
   ...
    InputAutoCompleteComponent
  ]
})
```

3. Create a data provider for suggestions and inject it to your ionic page `ionic generate provider DataProvider`. The function **getResults(Keyword: string){}** will return the suggestions to the autocomplete box and i have used restcountries api to get names of countries in this simple example and if you want to limit the number of suggestions and restrict keyword length you can do it in your data provider.
```typescript

getResults(keyword:string){
return this.http.get('https://restcountries.eu/rest/v2/name/'+keyword+'?fields=name;')
  .map(
      result =>
      {
        let resultArray = [];
          for(let res in result){
            resultArray.push(result[res].name);
          }
          return resultArray;
      });
}
```

4. Use it in your Ionic Page along with other fields **ionicpage.html**
```html
<input-auto-complete
    [ctrl]="addProductForm.controls['product_country']"
    [label]="'Product Made In'"
    [listprovider]="autofillData"
    [labeltype]="'floating'"
    formControlName="product_country" >
</input-auto-complete>
```
**ionicpage.ts**
```typescript
import { DataProvider } from '../../providers/data/data';
...
public addProductForm: FormGroup;

  constructor(
  	fb: FormBuilder,
  	public autofillData: DataProvider
  	)
  {
  	this.addProductForm = fb.group({
        product_country: new FormControl('')
    });
  }
  ```

## Auto complete label options
based on `<ion-input>` directive there are three labels types available floating, stacked and fixed. you may use the type here  `[labeltype]="'floating'"` to set the type.

## About
if you need a search based autocomplete i would highly recommend @kadoshms 's awasome [ionic2-autocomplete](https://github.com/kadoshms/ionic2-autocomplete) however, i had some issues with styling in ion-input within ion-item. This component can be used with other input fields in ion-list.
```html
<ion-list>
  <ion-item>
    <ion-label color="primary" floating>Product Name</ion-label>
    <ion-input formControlName="product_name"></ion-input>
  </ion-item>
  <input-auto-complete
      [ctrl]="addProductForm.controls['product_country']"
      [label]="'Product Made In'"
      [listprovider]="autofillData"
      [labeltype]="'floating'"
      formControlName="product_country">
  </input-auto-complete>
</ion-list>
```

## Contributing
You are always welcome to contribute to this project.   