var lf = pxt.Util.lf;
var impetus;
(function (impetus) {
    var defaultToolboxXml = "";
    function initExtensionsAsync(opts) {
        var result = {
            toolboxOptions: {},
        };
        return Promise.resolve(result);
    }
    impetus.initExtensionsAsync = initExtensionsAsync;
})(impetus || (impetus = {}));
pxt.editor.initExtensionsAsync = impetus.initExtensionsAsync;
