/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts"/>

namespace impetus {
    const defaultToolboxXml = ``;

    export function initExtensionsAsync(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        const result: pxt.editor.ExtensionResult = {
        };

        return Promise.resolve(result);
    }
}

pxt.editor.initExtensionsAsync = impetus.initExtensionsAsync;
