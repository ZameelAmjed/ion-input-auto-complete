import { Component, Input, forwardRef, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputAutoCompleteComponent; }),
    multi: true
};
var css = ".text-first-capital:first-letter {text-transform:uppercase;}\n.autofill-field {\n    position: absolute;\n    margin: 0px;\n    z-index: 666;\n    background-color: #ffffff;\n    width: 98%;\n    padding: 0px;\n    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n.autofill-field ul{\n    list-style: none;\n    margin: 0px;\n    padding: 0px;\n} .autofill-field ul li{\n      padding: 15px;\n      border-bottom: 1px solid #c1c1c1;\n  }\n.autofill-field ul li:hover{\n    background-color: #f4f4f4;\n    cursor: pointer;\n}\n.hidefield{\n    display: none;\n}";
var InputAutoCompleteComponent = (function () {
    function InputAutoCompleteComponent() {
        //current form control input. helpful in validating and accessing form control
        this.ctrl = new FormControl();
        //suggestions refered from controller
        this.labeltype = 'floating';
        this.floating = 'floating';
        this.fixed = 'fixed';
        this.stacked = 'stacked';
        //The internal data model for form control value access
        this.innerValue = '';
        //propagate changes into the custom form control
        this.propagateChange = function (_) { };
        this.listarray = [];
        this.focus = false;
        if (this.labeltype == "") {
            this.labeltype = "floating";
        }
    }
    InputAutoCompleteComponent.prototype.ngOnChanges = function () {
    };
    //Lifecycle hook.
    //Lifecycle hook.
    InputAutoCompleteComponent.prototype.ngAfterViewInit = 
    //Lifecycle hook.
    function () {
        var _this = this;
        // RESET the custom input form control UI when the form control is RESET
        this.ctrl.valueChanges.subscribe(function () {
            // check condition if the form control is RESET
            if (_this.ctrl.value == "" || _this.ctrl.value == null || _this.ctrl.value == undefined) {
                try {
                    _this.innerValue = "";
                    _this.inputRef.nativeElement.value = "";
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        });
    };
    // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
    // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
    InputAutoCompleteComponent.prototype.onChange = 
    // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
    function (e, value, status) {
        this.focus = status;
        //set changed value
        this.innerValue = value;
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
    };
    Object.defineProperty(InputAutoCompleteComponent.prototype, "value", {
        //get accessor
        get: 
        //get accessor
        function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: 
        //set accessor including call the onchange callback
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    //From ControlValueAccessor interface
    //From ControlValueAccessor interface
    InputAutoCompleteComponent.prototype.writeValue = 
    //From ControlValueAccessor interface
    function (value) {
        this.innerValue = value;
    };
    //From ControlValueAccessor interface
    //From ControlValueAccessor interface
    InputAutoCompleteComponent.prototype.registerOnChange = 
    //From ControlValueAccessor interface
    function (fn) {
        this.propagateChange = fn;
    };
    //From ControlValueAccessor interface
    //From ControlValueAccessor interface
    InputAutoCompleteComponent.prototype.registerOnTouched = 
    //From ControlValueAccessor interface
    function (fn) {
    };
    InputAutoCompleteComponent.prototype.autofillCategory = function (key) {
        var _this = this;
        if (this.listprovider == "" || this.listprovider == null || this.listprovider == undefined) {
            this.listprovider = null;
        }
        else {
            this.listprovider.getResults(key).subscribe(function (result) {
                _this.listarray = result;
            });
        }
    };
    InputAutoCompleteComponent.prototype.selectCat = function (item) {
        this.listarray = [];
        this.ctrl.setValue(item);
        this.propagateChange(item);
    };
    InputAutoCompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'input-auto-complete',
                    template: '<ion-item>\n' +
                        '<ion-label color="primary"  *ngIf="labeltype === floating" floating>{{label}}</ion-label>\n' +
                        '<ion-label color="primary"  *ngIf="labeltype === fixed" fixed>{{label}}</ion-label>\n' +
                        '<ion-label color="primary"  *ngIf="labeltype === stacked" fixed>{{label}}</ion-label>\n' +
                        '<ion-input \n' +
                        '    #input\n' +
                        '    (keyup)="autofillCategory(input.value)"\n' +
                        '    (blur)="onChange($event, input.value)" >\n' +
                        '</ion-input>\n' +
                        '</ion-item>\n' +
                        '<div [ngClass]="{\'hidefield\':focus, \'autofill-field\':true }"><ul>\n' +
                        '<li *ngFor="let cat of listarray" (tap)="selectCat(cat);$event.srcEvent.stopPropagation()">{{cat}}</li>\n' +
                        '</ul>\n' +
                        '</div>',
                    styles: [css],
                    encapsulation: ViewEncapsulation.None,
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    InputAutoCompleteComponent.ctorParameters = function () { return []; };
    InputAutoCompleteComponent.propDecorators = {
        "ctrl": [{ type: Input },],
        "inputRef": [{ type: ViewChild, args: ['input',] },],
        "label": [{ type: Input },],
        "listprovider": [{ type: Input },],
        "labeltype": [{ type: Input },],
        "control": [{ type: Input },],
    };
    return InputAutoCompleteComponent;
}());
export { InputAutoCompleteComponent };
//# sourceMappingURL=input-auto-complete-component.js.map