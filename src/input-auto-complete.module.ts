import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputAutoCompleteComponent } from './components/input-auto-complete-component';
import { IonicModule } from 'ionic-angular';
 
@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        InputAutoCompleteComponent
    ],
    exports: [
        InputAutoCompleteComponent
    ]
})
export class InputAutoCompleteModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: InputAutoCompleteModule,
        };
    }
}