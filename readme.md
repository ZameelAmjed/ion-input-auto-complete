# ion-input-auto-complete
An autocomplete component which can be used for ionic text inputs within ion-list along with ion-item.

![autocomplete](https://thumbs.gfycat.com/SmoggyDaringFoxhound-size_restricted.gif)

##How to install ion-input-auto-complete component
1. Import the package for your ionic project from this repo
`npm install https://github.com/ZameelAmjed/ion-input-auto-complete.git`

2. Load it in your app.module.ts
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

3. Create a data provider for suggestions and inject it to your ionic page `ionic generate provider DataProvider`. The function getResults(Keyword: string){} will return the suggestion to the autocomplete box and i have used restcountries api to get names of countries in this simple example.
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

4. Use it in your Ionic Page along with other fields 
home.html
```html
<input-auto-complete
    [ctrl]="addProductForm.controls['product_country']"
    [label]="'Product Made In'"
    [listprovider]="autofillData"
    [labeltype]="'floating'"
    formControlName="product_country" >
</input-auto-complete>
```
home.ts
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
