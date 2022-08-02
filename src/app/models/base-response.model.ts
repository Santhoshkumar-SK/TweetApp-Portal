export class BaseResponse<T> {
    isSuccess:boolean;
    httpStatusCode : number;
    errorInfo : string;
    result : T;
}
