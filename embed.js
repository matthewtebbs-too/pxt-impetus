(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-Impetus/",
    "workerjs": "/pxt-Impetus/worker.js",
    "tdworkerjs": "/pxt-Impetus/tdworker.js",
    "monacoworkerjs": "/pxt-Impetus/monacoworker.js",
    "pxtVersion": "3.8.1",
    "pxtRelId": "",
    "pxtCdnUrl": "/pxt-Impetus/",
    "commitCdnUrl": "/pxt-Impetus/",
    "blobCdnUrl": "/pxt-Impetus/",
    "cdnUrl": "/pxt-Impetus/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "impetus",
    "simUrl": "/pxt-Impetus/simulator.html",
    "partsUrl": "/pxt-Impetus/siminstructions.html",
    "runUrl": "/pxt-Impetus/run.html",
    "docsUrl": "/pxt-Impetus/docs.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-Impetus/highlight.js/highlight.pack.js",
        "/pxt-Impetus/bluebird.min.js",
        "/pxt-Impetus/typescript.js",
        "/pxt-Impetus/semantic.js",
        "/pxt-Impetus/marked/marked.min.js",
        "/pxt-Impetus/lzma/lzma_worker-min.js",
        "/pxt-Impetus/blockly/blockly_compressed.js",
        "/pxt-Impetus/blockly/blocks_compressed.js",
        "/pxt-Impetus/blockly/msg/js/en.js",
        "/pxt-Impetus/pxtlib.js",
        "/pxt-Impetus/pxtcompiler.js",
        "/pxt-Impetus/pxtblocks.js",
        "/pxt-Impetus/pxteditor.js",
        "/pxt-Impetus/pxtsim.js",
        "/pxt-Impetus/target.js",
        "/pxt-Impetus/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-Impetus/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
