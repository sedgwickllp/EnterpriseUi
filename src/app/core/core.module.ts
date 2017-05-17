import { TypecodesActions } from './typecodes/typecodes-actions';
import { TypecodesEffects } from './typecodes/typecodes-effect';
import { EffectsModule } from '@ngrx/effects';
import { TypecodesService } from './typecodes/typecodes.service';
import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';

@NgModule({
    imports: [ CommonModule,
     EffectsModule.run(TypecodesEffects)],
    declarations: [],
    providers: [ TypecodesService, TypecodesActions ]
})

export class CoreModule { }