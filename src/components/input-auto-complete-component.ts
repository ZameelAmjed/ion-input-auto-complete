import { Component, Input, forwardRef, AfterViewInit, OnChanges, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputAutoCompleteComponent),
    multi: true
};
const css = `.text-first-capital:first-letter {text-transform:uppercase;}
.autofill-field {
    position: absolute;
    margin: 0px;
    z-index: 666;
    background-color: #ffffff;
    width: 98%;
    padding: 0px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.autofill-field ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
} .autofill-field ul li{
      padding: 15px;
      border-bottom: 1px solid #c1c1c1;
  }
.autofill-field ul li:hover{
    background-color: #f4f4f4;
    cursor: pointer;
}
.hidefield{
    display: none;
}`;

@Component({
    selector: 'input-auto-complete',
    template:'<ion-item>\n' +
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
    styles:[css],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class InputAutoCompleteComponent implements ControlValueAccessor, AfterViewInit, OnChanges {

     //current form control input. helpful in validating and accessing form control
    @Input() ctrl:FormControl = new FormControl();

    // get reference to the input element
    @ViewChild('input')  inputRef:ElementRef;
    // label name
    @Input() label: string;
    //suggestions refered from controller
    @Input() listprovider: any; 
    //suggestions refered from controller
    @Input() labeltype: string = 'floating';

    @Input() control: FormControl;
    focus: boolean;
    public listarray;
    floating : string = 'floating';
    fixed : string = 'fixed';
    stacked : string = 'stacked';

    constructor() {
        this.listarray = [];
        this.focus = false;
        if(this.labeltype == ""){
            this.labeltype = "floating";
        }
    }

    ngOnChanges(){
    }

    //Lifecycle hook.
    ngAfterViewInit(){
        // RESET the custom input form control UI when the form control is RESET
        this.ctrl.valueChanges.subscribe(
            () => {
                // check condition if the form control is RESET
                if (this.ctrl.value == "" || this.ctrl.value == null || this.ctrl.value == undefined) {
                    try{
                        this.innerValue = "";
                        this.inputRef.nativeElement.value = "";
                    }catch(e){
                        console.log(e.message);
                    }
                }
            }
        );
    }

    //The internal data model for form control value access
    private innerValue: any = '';

    // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
    onChange(e:Event, value:any, status){
        this.focus = status;
        //set changed value
        this.innerValue = value;
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
    }


    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    //propagate changes into the custom form control
    propagateChange = (_: any) => { }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        this.innerValue = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
    }

    autofillCategory(key){
        if (this.listprovider == "" || this.listprovider == null || this.listprovider == undefined){
            this.listprovider = null;
        }else{
            this.listprovider.getResults(key).subscribe(result=>{
                this.listarray = result;
            });
        }
    }

    selectCat(item){
        this.listarray = [];
        this.ctrl.setValue(item);
        this.propagateChange(item);
    }
}