/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>

/// <reference path="field_key.ts" />

namespace impetus {
    const defaultToolboxXml = ``;

    export function initFieldExtensionsAsync(opts: pxt.editor.FieldExtensionOptions): Promise<pxt.editor.FieldExtensionResult> {
        const result: pxt.editor.FieldExtensionResult = {
            fieldEditors: [{
                editor: FieldKey,
                selector: 'key',
            }],
        };

        return Promise.resolve(result);
    }
}

pxt.editor.initFieldExtensionsAsync = impetus.initFieldExtensionsAsync;
