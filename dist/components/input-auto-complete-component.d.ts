import { AfterViewInit, OnChanges, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class InputAutoCompleteComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
    ctrl: FormControl;
    inputRef: ElementRef;
    label: string;
    listprovider: any;
    labeltype: string;
    control: FormControl;
    focus: boolean;
    listarray: any;
    floating: string;
    fixed: string;
    stacked: string;
    constructor();
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    private innerValue;
    onChange(e: Event, value: any, status: any): void;
    value: any;
    propagateChange: (_: any) => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    autofillCategory(key: any): void;
    selectCat(item: any): void;
}
