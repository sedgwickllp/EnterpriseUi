import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TypeCode } from '../../tickets/models/type-code';
import { AllTypeCodesModel } from "app/core/typecodes/typecode.model";

@Injectable()
export class TypecodesService {
    constructor(private http: Http) {}
    getTypecodes(): Observable<AllTypeCodesModel> {
        return this.http.get('http://10.31.201.176:60497/api/typecode')
        .map(res => res.json());
    }
}