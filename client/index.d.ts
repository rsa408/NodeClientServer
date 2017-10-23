/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/knockout.d.ts" />
/**
 * General purpose AJAX exchange function that sends and receives JSON objects.
 */
declare function sendAjaxPost(postData: object, callback: (isSuccess: boolean, result: object) => any): void;
/******************************************************************************
 *
 * View model.
 *
 ******************************************************************************/
declare class CalcData {
    fcn: string;
    arg: number[];
}
declare class ExampleViewModel {
    value1: KnockoutObservable<string>;
    value2: KnockoutObservable<string>;
    value3: KnockoutObservable<string>;
    result: KnockoutObservable<string>;
    constructor();
    onClick(): void;
}
declare var exampleViewModel: ExampleViewModel;
