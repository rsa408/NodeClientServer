/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/knockout.d.ts" />
declare var localUrl: string;
declare function sendAjaxPost(targetUrl: string, postData: object, callback: (isSuccess: boolean, result: object) => any): void;
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
