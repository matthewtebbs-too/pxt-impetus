/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path='../node_modules/pxt-core/localtypings/pxtblockly.d.ts'/>

namespace impetus {
    export class FieldKey extends Blockly.FieldTextInput implements Blockly.FieldCustom {
        // tslint:disable-next-line:variable-name
        public isFieldCustom_: boolean = true;

        constructor(text: string, params: any, validator?: () => void) {
            super(text, validator);
        }
    }
}
