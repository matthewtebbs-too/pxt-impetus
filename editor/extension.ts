/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

/// <reference types='pxt-core/built/pxteditor'/>

namespace impetus {
    const defaultToolboxXml = ``;

    export function initExtensionsAsync(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        const result: pxt.editor.ExtensionResult = {
        };

        return Promise.resolve(result);
    }
}

pxt.editor.initExtensionsAsync = impetus.initExtensionsAsync;
