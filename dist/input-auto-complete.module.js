import { NgModule } from '@angular/core';
import { InputAutoCompleteComponent } from './components/input-auto-complete-component';
import { IonicModule } from 'ionic-angular';
var InputAutoCompleteModule = (function () {
    function InputAutoCompleteModule() {
    }
    InputAutoCompleteModule.forRoot = function () {
        return {
            ngModule: InputAutoCompleteModule,
        };
    };
    InputAutoCompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule
                    ],
                    declarations: [
                        InputAutoCompleteComponent
                    ],
                    exports: [
                        InputAutoCompleteComponent
                    ]
                },] },
    ];
    return InputAutoCompleteModule;
}());
export { InputAutoCompleteModule };
//# sourceMappingURL=input-auto-complete.module.js.map