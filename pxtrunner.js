var pxt;!function(o){!function(e){e.startDebuggerAsync=function(e){new n(e).start()};var n=function(){function n(e){this.container=e,this.pkgLoaded=!1,this.intervalRunning=!1}return n.prototype.start=function(){var e=this;this.initializeWebsocket(),this.intervalRunning||(this.intervalRunning=!0,this.intervalId=setInterval(function(){if(!e.ws)try{e.initializeWebsocket()}catch(e){console.warn("Connection to server failed, retrying in "+n.RETRY_MS+" ms")}},n.RETRY_MS)),this.session=new pxsim.SimDebugSession(this.container),this.session.start(this)},n.prototype.initializeWebsocket=function(){var t=this;o.Cloud.isLocalHost()&&o.Cloud.localToken&&(o.debug("initializing debug pipe"),this.ws=new WebSocket("ws://localhost:3234/"+o.Cloud.localToken+"/simdebug"),this.ws.onopen=function(e){o.debug("debug: socket opened")},this.ws.onclose=function(e){o.debug("debug: socket closed"),t.closeListener&&t.closeListener(),t.session.stopSimulator(),t.ws=void 0},this.ws.onerror=function(e){o.debug("debug: socket closed due to error"),t.errorListener&&t.errorListener(e.type),t.session.stopSimulator(),t.ws=void 0},this.ws.onmessage=function(e){var n;try{n=JSON.parse(e.data)}catch(e){o.debug("debug: could not parse message")}n&&("runner"===n.type?t.handleRunnerMessage(n):("request"===n.type&&"launch"===n.command&&t.sendRunnerMessage("configure",{projectDir:n.arguments.projectDir}),t.dataListener(n)))})},n.prototype.send=function(e){this.ws.send(e)},n.prototype.onData=function(e){this.dataListener=e},n.prototype.onError=function(e){this.errorListener=e},n.prototype.onClose=function(e){this.closeListener=e},n.prototype.close=function(){this.session&&this.session.stopSimulator(!0),this.intervalRunning&&(clearInterval(this.intervalId),this.intervalId=void 0),this.ws&&this.ws.close()},n.prototype.handleRunnerMessage=function(e){switch(e.subtype){case"ready":this.sendRunnerMessage("ready");break;case"runcode":this.runCode(e)}},n.prototype.runCode=function(e){var n=[];e.breakpoints.forEach(function(e){n.push([e.id,{verified:!0,line:e.line,column:e.column,endLine:e.endLine,endColumn:e.endColumn,source:{path:e.fileName}}])}),this.session.runCode(e.code,e.usedParts,e.usedArguments,new pxsim.BreakpointMap(n),o.appTarget.simulator.boardDefinition)},n.prototype.sendRunnerMessage=function(e,n){void 0===n&&(n={}),n.subtype=e,n.type="runner",this.send(JSON.stringify(n))},n.RETRY_MS=2500,n}();e.DebugRunner=n}(o.runner||(o.runner={}))}(pxt||(pxt={})),function(y){!function(e){function b(e,n){e.append($('<div class="ui content blocks"/>').append(n))}function w(e,n,t){e.append($('<div class="ui content js"/>').append(n)),"undefined"!=typeof hljs&&n.find("code.highlight").each(function(e,n){hljs.highlightBlock(n)})}function d(t,e,o,n,i,a){void 0===a&&(a={});y.webConfig.commitCdnUrl;var r=$('<div class="ui bottom attached tabular icon small compact menu hideprint"> <div class="right icon menu"></div></div>'),s=$('<div class="ui top attached segment nobreak"></div>'),c=r.find(".right.menu"),l=y.appTarget.appTheme||{};if(a.showEdit&&!l.hideDocsEdit){var d=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("edit")+'"><i role="presentation" aria-hidden="true" class="edit icon"></i></a>').click(function(){i.package.compressToFileAsync(t.showJavaScript?y.JAVASCRIPT_PROJECT_NAME:y.BLOCKS_PROJECT_NAME).done(function(e){return window.open((t.pxtUrl||y.appTarget.appTheme.homeUrl||"").replace(/\/$/,"")+"/#project:"+ts.pxtc.encodeBase64(y.Util.uint8ArrayToString(e)),"pxt")})});c.append(d)}if(t.showJavaScript||!n){if(s.append(o),n){var p=$('<a class="item blocks" role="button" tabindex="0" aria-label="'+lf("Blocks")+'"><i role="presentation" aria-hidden="true" class="puzzle icon"></i></a>').click(function(){s.find(".blocks")[0]?s.find(".blocks").remove():b(o?o.parent():s,n)});c.append(p)}}else if(s.append(n),a.showJs)w(s,o);else{var u=$('<a class="item js" role="button" tabindex="0" aria-label="'+lf("JavaScript")+'"><i role="presentation" aria-hidden="true" class="align left icon"></i></a>').click(function(){s.find(".js")[0]?s.find(".js").remove():w(n?n.parent():s,o)});c.append(u)}if(a.run&&!l.hideDocsSimulator){var m=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("run")+'"><i role="presentation" aria-hidden="true" class="play icon"></i></a>').click(function(){if(s.find(".sim")[0])s.find(".sim").remove();else{var e="81.97%";y.appTarget.simulator&&(e=100/y.appTarget.simulator.aspectRatio+"%");var n=$('<div class="ui card sim"><div class="ui content"><div style="position:relative;height:0;padding-bottom:'+e+';overflow:hidden;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="'+x(t)+"#nofooter=1&code="+encodeURIComponent(o.text())+'" allowfullscreen="allowfullscreen" sandbox="allow-popups allow-forms allow-scripts allow-same-origin" frameborder="0"></iframe></div></div></div>');s.append(n)}});c.append(m)}if(a.hexname&&a.hex){var f=$('<a class="item" role="button" tabindex="0" aria-label="'+lf("download")+'"><i role="presentation" aria-hidden="true" class="download icon"></i></a>').click(function(){y.BrowserUtils.browserDownloadBinText(a.hex,a.hexname,y.appTarget.compile.hexMimeType)});c.append(f)}var g=[s];if(c.children().length&&g.push(r),e.replaceWith(g),t.downloadScreenshots&&a.hexname){y.debug("Downloading screenshot for: "+a.hexname);var h=a.hexname.substr(0,a.hexname.lastIndexOf(".")),v=(window.getComputedStyle(n.get(0).getElementsByClassName("blocklyText").item(0)).getPropertyValue("font-size"),n.get(0)),k=n.get(0).getBoundingClientRect();y.blocks.layout.svgToPngAsync(v,0,0,k.width,k.height,4).done(function(e){e&&y.BrowserUtils.browserDownloadDataUri(e,(name||(y.appTarget.nickname||y.appTarget.id)+"-"+h)+".png")})}}function a(n,t,o){if(!n)return Promise.resolve();var i=$("."+n).first();return i[0]?(o.emPixels||(o.emPixels=14),o.layout||(o.layout=y.blocks.BlockLayout.Flow),y.runner.decompileToBlocksAsync(i.text(),o).then(function(e){try{t(i,e)}catch(e){console.error("error while rendering "+i.html()),i.append($("<div/>").addClass("ui segment warning").text(e.message))}return i.removeClass(n),Promise.delay(1,a(n,t,o))})):Promise.resolve()}function m(e){if(!e||e.kind!=ts.SyntaxKind.ExpressionStatement)return null;var n=e;return n.expression&&n.expression.kind==ts.SyntaxKind.CallExpression?n.expression.callInfo:null}function n(e,n,t,u){return a(n,function(e,d){if(d.compileJS){var n=d.compileJS.ast.getSourceFile("main.ts").statements.slice(0).reverse(),i=$("<div />").addClass("ui cards");i.attr("role","listbox");var p=function(e){if(e){var n=/^\/(v\d+)/.exec(e.url),t=/^\/(v\d+)/.exec(window.location.pathname),o=/#doc/i.test(window.location.href);e.url&&!n&&t&&!o&&(e.url="/"+t[1]+"/"+e.url),i.append(y.docs.codeCard.render(e,{hideHeader:!0,shortName:!0}))}};n.forEach(function(e){var n=m(e);if(n&&d.apiInfo&&d.apiInfo.byQName[n.qName]){var t=d.apiInfo.byQName[n.qName].attributes,o=Blockly.Blocks[t.blockId];if(u){var i=d.compileBlocks.blocksInfo.apis.byQName[n.qName],a=d.compileBlocks.blocksInfo.apis.byQName[i.namespace];p({name:a.attributes.blockNamespace||a.name,url:a.attributes.help||"reference/"+(a.attributes.blockNamespace||a.name).toLowerCase(),description:a.attributes.jsDoc,blocksXml:o&&o.codeCard?o.codeCard.blocksXml:t.blockId?'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="'+t.blockId+'"></block></xml>':void 0})}else if(o){var r=y.U.clone(o.codeCard);r&&p(r)}else p({name:n.qName,description:t.jsDoc,url:t.help||void 0})}else switch(e.kind){case ts.SyntaxKind.ExpressionStatement:var s=e;switch(s.expression.kind){case ts.SyntaxKind.TrueKeyword:case ts.SyntaxKind.FalseKeyword:p({name:"Boolean",url:"blocks/logic/boolean",description:lf("True or false values"),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></xml>'});break;default:y.debug("card expr kind: "+s.expression.kind)}break;case ts.SyntaxKind.IfStatement:p({name:u?"Logic":"if",url:"blocks/logic"+(u?"":"/if"),description:u?lf("Logic operators and constants"):lf("Conditional statement"),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_if"></block></xml>'});break;case ts.SyntaxKind.WhileStatement:p({name:u?"Loops":"while",url:"blocks/loops"+(u?"":"/while"),description:u?lf("Loops and repetition"):lf("Repeat code while a condition is true."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="device_while"></block></xml>'});break;case ts.SyntaxKind.ForOfStatement:p({name:u?"Loops":"for of",url:"blocks/loops"+(u?"":"/for-of"),description:u?lf("Loops and repetition"):lf("Repeat code for each item in a list."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_for_of"></block></xml>'});break;case ts.SyntaxKind.ForStatement:var c=e,l=!0;3==c.condition.getChildCount()&&(l=!("0"==c.condition.getChildAt(0).getText()||c.condition.getChildAt(1).kind==ts.SyntaxKind.LessThanToken)),p(l?{name:u?"Loops":"for",url:"blocks/loops"+(u?"":"/for"),description:u?lf("Loops and repetition"):lf("Repeat code for a given number of times using an index."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_simple_for"></block></xml>'}:{name:u?"Loops":"repeat",url:"blocks/loops"+(u?"":"/repeat"),description:u?lf("Loops and repetition"):lf("Repeat code for a given number of times."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_repeat_ext"></block></xml>'});break;case ts.SyntaxKind.VariableStatement:p({name:u?"Variables":"variable declaration",url:"blocks/variables"+(u?"":"/assign"),description:u?lf("Variables"):lf("Assign a value to a named variable."),blocksXml:'<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set"></block></xml>'});break;default:y.debug("card kind: "+e.kind)}}),t&&(e=e.parent()),e.replaceWith(i)}},{package:e.package,aspectRatio:e.blocksAspectRatio})}function s(e,n){if(!e)return Promise.resolve();var t,o=$("."+e).first();if(!o[0])return Promise.resolve();o.removeClass(e);try{var i=JSON.parse(o.text());Array.isArray(i)||(i=[i]),t=i}catch(e){console.error("error while rendering "+o.html()),o.append($("<div/>").addClass("ui segment warning").text(e.messageText))}return n.snippetReplaceParent&&(o=o.parent()),function(e,n,r){if(!n||0==n.length)return Promise.resolve();if(0==n.length){var t=y.docs.codeCard.render(n[0],r);e.replaceWith(t)}else{var s=document.createElement("div");s.className="ui cards",s.setAttribute("role","listbox"),n.forEach(function(n){var e=/^\/(v\d+)/.exec(n.url),t=/^\/(v\d+)/.exec(window.location.pathname),o=/#doc/i.test(window.location.href);n.url&&!e&&t&&!o&&(n.url="/"+t[1]+n.url);var i=y.docs.codeCard.render(n,r);if(s.appendChild(i),"package"==n.cardType){var a=y.github.parseRepoId((n.url||"").replace(/^\/pkg\//,""));a&&y.packagesConfigAsync().then(function(e){switch(y.github.repoStatus(a,e)){case y.github.GitRepoStatus.Banned:i.remove();break;case y.github.GitRepoStatus.Approved:n.imageUrl=y.github.mkRepoIconUrl(a),s.insertBefore(y.docs.codeCard.render(n,r),i),i.remove()}}).catch(function(e){y.debug("failed to load repo "+n.url)})}}),e.replaceWith(s)}return Promise.resolve()}(o,t,{hideHeader:!0}).then(function(){return Promise.delay(1,s(e,n))})}function x(e){return e.pxtUrl?e.pxtUrl+"/--run":y.webConfig&&y.webConfig.runUrl?y.webConfig.runUrl:"/--run"}(y.runner||(y.runner={})).renderAsync=function(r){var i;return r||(r={}),r.pxtUrl&&(r.pxtUrl=r.pxtUrl.replace(/\/$/,"")),r.showEdit&&(r.showEdit=!y.BrowserUtils.isIFrame()),(i=r).packageClass&&$("."+i.packageClass).each(function(e,n){var t=$(n),o=t.text().split("\n").map(function(e){return e.replace(/\s*/g,"")}).filter(function(e){return!!e}).join(",");i.package=i.package?i.package+","+o:o,i.snippetReplaceParent&&(t=t.parent()),t.remove()}),r.simulatorClass&&$("."+r.simulatorClass).each(function(e,n){var t=$(n),o="81.97%";y.appTarget.simulator&&(o=100/y.appTarget.simulator.aspectRatio+"%");var i=$('<div class="ui centered card"><div class="ui content">\n                    <div style="position:relative;height:0;padding-bottom:'+o+';overflow:hidden;">\n                    <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" allowfullscreen="allowfullscreen" frameborder="0" sandbox="allow-popups allow-forms allow-scripts allow-same-origin"></iframe>\n                    </div>\n                    </div></div>');i.find("iframe").attr("src",x(r)+"#nofooter=1&code="+encodeURIComponent(t.text().trim())),r.snippetReplaceParent&&(t=t.parent()),t.replaceWith(i)}),function(o){var i={showEdit:!!o.showEdit,run:!!o.simulator};function t(e,n){"undefined"!=typeof hljs&&($(e).text($(e).text().replace(/^\s*\r?\n/,"")),hljs.highlightBlock(e));var t=y.U.clone(i);n&&(t.run=!1,t.showEdit=!1),d(o,$(e).parent(),$(e),void 0,void 0,t)}$("code.lang-typescript").each(function(e,n){t(n,!1),$(n).removeClass("lang-typescript")}),$("code.lang-typescript-ignore").each(function(e,n){t(n,!0),$(n).removeClass("lang-typescript-ignore")})}(r),Promise.resolve().then(function(){return e=r,"core"==y.appTarget.id?Promise.resolve():y.runner.decompileToBlocksAsync("",e).then(function(e){var o={},i=e.compileBlocks.blocksInfo;i.blocks.forEach(function(e){var n=(e.attributes.blockNamespace||e.namespace).split(".")[0];if(!o[n]){var t=i.apis.byQName[n];t&&t.attributes.color&&(o[n]=t.attributes.color)}});var t="";return Object.keys(o).forEach(function(e){var n=o[e]||"#dddddd";t+="\n                        span.docs."+e.toLowerCase()+" {\n                            background-color: "+n+" !important;\n                            border-color: "+y.toolbox.fadeColor(n,.1,!1)+" !important;\n                        }\n                    "}),t}).then(function(t){return Object.keys(y.toolbox.blockColors).forEach(function(e){var n=y.toolbox.blockColors[e];t+="\n                        span.docs."+e.toLowerCase()+" {\n                            background-color: "+n+" !important;\n                            border-color: "+y.toolbox.fadeColor(n,.1,!1)+" !important;\n                        }\n                    "}),t}).then(function(e){var n=document.createElement("style");n.id="namespaceColors",n.type="text/css",(document.head||document.getElementsByTagName("head")[0]).appendChild(n),n.appendChild(document.createTextNode(e))});var e}).then(function(){return function(d){(d=y.Util.clone(d)).emPixels=18,d.snippetMode=!0;var p=$(":not(pre) > code"),u=0;return function i(){if(u>=p.length)return Promise.resolve();var a=$(p[u++]),e=a.text(),n=/^(\|+)([^\|]+)\|+$/.exec(e);if(n){var t=/^(([^\:\.]*?)[\:\.])?(.*)$/.exec(n[2]),o=t[2]?t[2].trim().toLowerCase():"",r=1==n[1].length?"docs inlinebutton "+o:"docs inlineblock "+o,s=t[3].trim();return a.replaceWith($('<span class="'+r+'"/>').text(y.U.rlf(s))),i()}var c=/^\[([^\]]+)\]$/.exec(e);if(!c)return i();var l=c[1];return y.runner.decompileToBlocksAsync(l,d).then(function(e){if(e.blocksSvg){var n=$('<span class="block"/>').append(e.blocksSvg),t=m(e.compileJS.ast.getSourceFile("main.ts").statements[0]);if(t&&e.apiInfo){var o=e.apiInfo.byQName[t.qName];o&&o.attributes.help&&(n=$('<a class="ui link"/>').attr("href","/reference/"+o.attributes.help).append(n))}a.replaceWith(n)}return Promise.delay(1,i())})}()}(r)}).then(function(){return n(r,r.linksClass,r.snippetReplaceParent,!1)}).then(function(){return n(r,r.namespacesClass,r.snippetReplaceParent,!0)}).then(function(){return a((l=r).signatureClass,function(e,n){if(n.compileJS){var t=m(n.compileJS.ast.getSourceFile("main.ts").statements[0]);if(t&&n.apiInfo){var o=n.apiInfo.byQName[t.qName];if(o){var i=Blockly.Blocks[o.attributes.blockId],a=i&&i.codeCard?i.codeCard.blocksXml:void 0,r=a?$(y.blocks.render(a)):n.compileBlocks&&n.compileBlocks.success?$(n.blocksSvg):void 0,s=t.decl.getText().replace(/^export/,"");s=s.slice(0,s.indexOf("{")).trim()+";";var c=$('<code class="lang-typescript highlight"/>').text(s);l.snippetReplaceParent&&(e=e.parent()),d(l,e,c,r,n,{showJs:!0,hideGutter:!0})}}}},{package:l.package,snippetMode:!0,aspectRatio:l.blocksAspectRatio});var l}).then(function(){return s(r.codeCardClass,r)}).then(function(){return function(s){if(s.tutorial)return a(s.snippetClass,function(e,n){var t=n.blocksSvg;s.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:s.package,snippetMode:!1,aspectRatio:s.blocksAspectRatio});var c=0;return a(s.snippetClass,function(e,n){var t=n.compileBlocks&&n.compileBlocks.success?$(n.blocksSvg):void 0,o=$('<code class="lang-typescript highlight"/>').text(e.text().trim());s.snippetReplaceParent&&(e=e.parent());var i=n.compileJS&&n.compileJS.success,a=s.hex&&i&&n.compileJS.outfiles[pxtc.BINARY_HEX]?n.compileJS.outfiles[pxtc.BINARY_HEX]:void 0,r=(y.appTarget.nickname||y.appTarget.id)+"-"+(s.hexName||"")+"-"+c+++".hex";d(s,e,o,t,n,{showEdit:s.showEdit,run:s.simulator&&i,hexname:r,hex:a})},{package:s.package,aspectRatio:s.blocksAspectRatio})}(r)}).then(function(){return a((i=r).blocksClass,function(e,n){var t=n.blocksSvg;i.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:i.package,snippetMode:!0,aspectRatio:i.blocksAspectRatio});var i}).then(function(){return(i=r).blocksXmlClass?function n(t,o,i){var a=$("."+t).first();return a[0]?(i.emPixels||(i.emPixels=14),y.runner.compileBlocksAsync(a.text(),i).then(function(e){try{o(a,e)}catch(e){console.error("error while rendering "+a.html()),a.append($("<div/>").addClass("ui segment warning").text(e.message))}return a.removeClass(t),Promise.delay(1,n(t,o,i))})):Promise.resolve()}(i.blocksXmlClass,function(e,n){var t=n.blocksSvg;i.snippetReplaceParent&&(e=e.parent());var o=$('<div class="ui segment"/>').append(t);e.replaceWith(o)},{package:i.package,snippetMode:!0,aspectRatio:i.blocksAspectRatio}):Promise.resolve();var i}).then(function(){return(a=r).projectClass?function e(){var n=$("."+a.projectClass).first(),t=n[0];if(!t)return Promise.resolve();n.removeClass(a.projectClass);var o=y.Cloud.parseScriptId(t.innerText);if(o){if(a.snippetReplaceParent){t=t.parentElement;var i=document.createElement("div");t.parentElement.insertBefore(i,t),t.parentElement.removeChild(t),t=i}return y.runner.renderProjectAsync(t,o).then(function(){return e()})}return e()}():Promise.resolve();var a})}}()}(pxt||(pxt={})),function(x){!function(l){var d,e,i=function(){function e(e,n){this.ksPkg=e,this.topPkg=n,this.files={}}return e.prototype.getKsPkg=function(){return this.ksPkg},e.prototype.getPkgId=function(){return this.ksPkg?this.ksPkg.id:this.id},e.prototype.isTopLevel=function(){return this.ksPkg&&0==this.ksPkg.level},e.prototype.setFiles=function(e){this.files=e},e.prototype.getAllFiles=function(){return x.Util.mapMap(this.files,function(e,n){return n})},e}(),s=function(){function e(){this.githubPackageCache={}}return e.prototype.readFile=function(e,n){var t=c(e);return x.U.lookup(t.files,n)},e.prototype.writeFile=function(e,n,t){if(n!=x.CONFIG_NAME)throw x.Util.oops("trying to write "+e+" / "+n)},e.prototype.getHexInfoAsync=function(e){return x.hex.getHexInfoAsync(this,e)},e.prototype.cacheStoreAsync=function(e,n){return Promise.resolve()},e.prototype.cacheGetAsync=function(e){return Promise.resolve(null)},e.prototype.downloadPackageAsync=function(o){var i=this,a=o.verProtocol(),r=void 0;"github"==a&&(r=this.githubPackageCache[o._verspec]);var s=c(o);return(r?Promise.resolve(r):o.commonDownloadAsync()).then(function(e){if(e)return"github"!=a||r||(i.githubPackageCache[o._verspec]=x.Util.clone(e)),s.setFiles(e),Promise.resolve();if("empty"==a)return s.setFiles(p()),Promise.resolve();if("docs"==a){var n=p(),t=JSON.parse(n[x.CONFIG_NAME]);return o.verArgument().split(",").forEach(function(e){var n=/^([a-zA-Z0-9_-]+)(=(.+))?$/.exec(e);n?t.dependencies[n[1]]=n[3]||"*":console.warn("unknown package syntax "+e)}),t.yotta||(t.yotta={}),t.yotta.ignoreConflicts=!0,n[x.CONFIG_NAME]=JSON.stringify(t,null,4),s.setFiles(n),Promise.resolve()}return Promise.reject("Cannot download "+o.version()+"; unknown protocol")})},e}();function c(e){var n=e._editorPkg;if(n)return n;var t=null;e!=l.mainPkg&&(t=c(l.mainPkg));var o=new i(e,t);return e==l.mainPkg&&(o.topPkg=o),e._editorPkg=o}function p(){var e=x.appTarget.tsprj,n=x.U.clone(e.files);return n[x.CONFIG_NAME]=JSON.stringify(e.config,null,4)+"\n",n["main.blocks"]="",n}function n(){x.setAppTarget(window.pxtTargetBundle),x.Util.assert(!!x.appTarget);var e=/PXT_LANG=(.*?)(?:;|$)/.exec(document.cookie),n=/(live)?(force)?lang=([a-z]{2,}(-[A-Z]+)?)/i.exec(window.location.href),t=n?n[3]:e&&e[1]||x.appTarget.appTheme.defaultLocale||navigator.userLanguage||navigator.language,o=!x.appTarget.appTheme.disableLiveTranslations||n&&!!n[1],i=!!n&&!!n[2],a=x.appTarget.versions;$&&$.fn&&$.fn.embed&&$.fn.embed.settings&&$.fn.embed.settings.sources&&$.fn.embed.settings.sources.youtube&&($.fn.embed.settings.sources.youtube.url="//www.youtube.com/embed/{id}?rel=0");var r=x.webConfig;return x.Util.updateLocalizationAsync(x.appTarget.id,!0,r.commitCdnUrl,t,a?a.pxtCrowdinBranch:"",a?a.targetCrowdinBranch:"",o,i).then(function(){l.mainPkg=new x.MainPackage(new s)})}function o(e){console.error(e)}function t(e,t){var n=l.mainPkg.host();return l.mainPkg=new x.MainPackage(n),l.mainPkg._verspec=e?/\w+:\w+/.test(e)?e:"pub:"+e:"empty:tsprj",n.downloadPackageAsync(l.mainPkg).then(function(){return n.readFile(l.mainPkg,x.CONFIG_NAME)}).then(function(e){return e?l.mainPkg.installAllAsync().then(function(){if(t){var e=c(l.mainPkg);e.files["main.ts"]=t;var n=JSON.parse(e.files[x.CONFIG_NAME]);n.name=window.location.href.split("/").pop().split(/[?#]/)[0],e.files[x.CONFIG_NAME]=JSON.stringify(n,null,4),l.mainPkg.config.name=n.name,-1==l.mainPkg.config.files.indexOf("main.blocks")&&l.mainPkg.config.files.push("main.blocks")}}).catch(function(e){o(lf("Cannot load extension: {0}",e.message))}):Promise.resolve()})}function a(e){var n=l.mainPkg.getTargetOptions();return n.isNative=!!e,n.hasHex=!!e,l.mainPkg.getCompileOptionsAsync(n)}function r(e,t){return a().then(function(e){t&&t(e);var n=pxtc.compile(e);return n.diagnostics&&0<n.diagnostics.length&&n.diagnostics.forEach(function(e){console.error(e.messageText)}),n})}function u(e,n){if(l.languageMode=e,n!=l.editorLocale){var t=/^live-/;return l.editorLocale=n,x.Util.updateLocalizationAsync(x.appTarget.id,!0,x.webConfig.commitCdnUrl,l.editorLocale.replace(t,""),x.appTarget.versions.pxtCrowdinBranch,x.appTarget.versions.targetCrowdinBranch,t.test(l.editorLocale))}return Promise.resolve()}function m(e){var n=e.data;if(n)switch(n.type){case"fileloaded":var t=n,o=t.name;u(/\.ts$/i.test(o)?d.TypeScript:d.Blocks,t.locale).done();break;case"popout":var i=/((\/v[0-9+])\/)?[^\/]*#(doc|md):([^&?:]+)/i.exec(window.location.href);if(i){var a=x.webConfig.docsUrl||"/--docs",r=i[2]||"",s="doc"==i[3]?""+i[4]:a+"?md="+i[4];window.open(x.BrowserUtils.urlJoin(r,s),"_blank"),window.parent&&window.parent.postMessage({type:"popoutcomplete"},"*")}break;case"localtoken":var c=n;c&&c.localToken&&(x.Cloud.localToken=c.localToken,w.forEach(function(e){return e()}),w=[])}}function f(){var e=Promise.resolve();if(x.appTarget.appTheme&&x.appTarget.appTheme.extendFieldEditors){var n={};e=e.then(function(){return x.BrowserUtils.loadBlocklyAsync()}).then(function(){return x.BrowserUtils.loadScriptAsync("fieldeditors.js")}).then(function(){return x.editor.initFieldExtensionsAsync(n)}).then(function(e){e.fieldEditors&&e.fieldEditors.forEach(function(e){x.blocks.registerFieldEditor(e.selector,e.editor,e.validator)})})}return e}function g(n,t,o){return void 0===o&&(o="blocks"),x.Cloud.privateGetTextAsync(t+"/text").then(function(e){return JSON.parse(e)}).then(function(e){return h(n,e,t,o)})}function h(e,n,t,o,i){void 0===t&&(t=null),void 0===o&&(o="blocks"),void 0===i&&(i=!1);var a=JSON.parse(n[x.CONFIG_NAME])||{},r="# "+a.name+" "+(a.version?a.version:"")+"\n\n",s=t?x.appTarget.appTheme.shareUrl||"https://makecode.com/"+t:x.appTarget.appTheme.homeUrl;i&&(s="`"+s+"`"),r+="* "+s+"\n\n        ";var c="README.md";n[c]&&(r+=n[c].replace(/^#+/,"$0#")+"\n"),a.files.filter(function(e){return e!=x.CONFIG_NAME&&e!=c}).forEach(function(e){r+="\n## "+e+"\n",/\.ts$/.test(e)?r+="```typescript\n"+n[e]+"\n```\n":/\.blocks?$/.test(e)?r+="```blocksxml\n"+n[e]+"\n```\n":r+="```"+e.substr(e.indexOf("."))+"\n"+n[e]+"\n```\n"}),a&&a.dependencies&&(r+="\n## Packages\n\n"+Object.keys(a.dependencies).map(function(e){return"* "+e+", "+a.dependencies[e]}).join("\n")+"\n\n```package\n"+Object.keys(a.dependencies).map(function(e){return e+"="+a.dependencies[e]}).join("\n")+"\n```\n");return k(e,r,{print:!0})}l.initFooter=function(e,n){if(e){var t=x.appTarget.appTheme,o=$("body"),i=$(e),a=$("<a/>").attr("href",t.homeUrl).attr("target","_blank");i.append(a),t.organizationLogo?a.append($("<img/>").attr("src",x.Util.toDataUri(t.organizationLogo))):a.append(lf("powered by {0}",t.title)),o.mouseenter(function(e){return i.fadeOut()}),o.mouseleave(function(e){return i.fadeIn()})}},l.showError=o,l.generateHexFileAsync=function(n){return t(n.id).then(function(){return r(0,function(e){n.code&&(e.fileSystem["main.ts"]=n.code)})}).then(function(e){return e.diagnostics&&0<e.diagnostics.length&&console.error("Diagnostics",e.diagnostics),e.outfiles[pxtc.BINARY_HEX]})},l.simulateAsync=function(s,c){return t(c.id).then(function(){return r(0,function(e){c.code&&(e.fileSystem["main.ts"]=c.code)})}).then(function(e){e.diagnostics&&0<e.diagnostics.length&&console.error("Diagnostics",e.diagnostics);var n=e.outfiles[pxtc.BINARY_JS];if(n){var t=new pxsim.SimulatorDriver(s,{}),o=e.usedArguments,i=x.appTarget.simulator.boardDefinition,a=pxtc.computeUsedParts(e,!0),r={boardDefinition:i,parts:a,fnArgs:o,cdnUrl:x.webConfig.commitCdnUrl,localizedStrings:x.Util.getLocalizedStrings(),highContrast:c.highContrast,light:c.light};x.appTarget.simulator&&(r.aspectRatio=a.length&&x.appTarget.simulator.partsAspectRatio?x.appTarget.simulator.partsAspectRatio:x.appTarget.simulator.aspectRatio),t.run(n,r)}})},(e=d=l.LanguageMode||(l.LanguageMode={}))[e.Blocks=0]="Blocks",e[e.TypeScript=1]="TypeScript",l.languageMode=d.Blocks,l.editorLocale="en",l.setEditorContextAsync=u,l.startRenderServer=function(){x.tickEvent("renderer.ready");var o=[],i=void 0;f().done(function(){window.addEventListener("message",function(e){var n=e.data;"renderblocks"==n.type&&(o.push(n),function n(){if(!i){var t=o.shift();t&&(x.tickEvent("renderer.job"),i=x.BrowserUtils.loadBlocklyAsync().then(function(){return l.decompileToBlocksAsync(t.code,t.options)}).then(function(e){return e.blocksSvg?x.blocks.layout.blocklyToSvgAsync(e.blocksSvg,0,0,e.blocksSvg.viewBox.baseVal.width,e.blocksSvg.viewBox.baseVal.height):void 0}).then(function(e){window.parent.postMessage({source:"makecode",type:"renderblocks",id:t.id,width:e?e.width:void 0,height:e?e.height:void 0,svg:e?e.svg:void 0,uri:e?e.xml:void 0,css:e?e.css:void 0},"*"),i=void 0,n()}))}}())},!1),window.parent.postMessage({source:"makecode",type:"renderready"},"*")})},l.startDocsServer=function(e,c){function n(r,s){x.debug("rendering "+r),$(c).hide(),$(e).show(),Promise.delay(100).then(function(){switch(r){case"print":var e=window.localStorage.printjob;return delete window.localStorage.printjob,h(c,JSON.parse(e),void 0,void 0,!0).then(function(){return pxsim.print(1e3)});case"project":return h(c,JSON.parse(s)).then(function(){return pxsim.print(1e3)});case"projectid":return g(c,JSON.parse(s)).then(function(){return pxsim.print(1e3)});case"doc":return i=c,a=(a=s).replace(/^\//,""),x.Cloud.downloadMarkdownAsync(a,l.editorLocale,x.Util.localizeLive).then(function(e){return k(i,e,{path:a})});case"book":return t=c,n=(n=s).replace(/^\//,""),x.tickEvent("book",{id:n}),x.log("rendering book from "+n),$("#loading").find(".loader").addClass("text").text(lf("Compiling your book (this may take a minute)")),Promise.delay(100).then(function(){return x.Cloud.downloadMarkdownAsync(n,l.editorLocale,x.Util.localizeLive)}).then(function(e){o=x.docs.buildTOC(e),x.log("TOC: "+JSON.stringify(o,null,2));var t=[];return x.docs.visitTOC(o,function(n){/^\//.test(n.path)&&!/^\/pkg\//.test(n.path)&&t.push(x.Cloud.downloadMarkdownAsync(n.path,l.editorLocale,x.Util.localizeLive).then(function(e){n.markdown=e},function(e){n.markdown="_"+n.path+" failed to load._"}))}),Promise.all(t)}).then(function(e){var n=o[0].name;return x.docs.visitTOC(o,function(e){e.markdown&&(n+="\n\n"+e.markdown)}),k(t,n)});default:return k(c,s)}var t,n,o,i,a}).catch(function(e){$(c).html('\n                    <img style="height:4em;" src="'+x.appTarget.appTheme.docsLogo+'" />\n                    <h1>'+lf("Oops")+"</h1>\n                    <h3>"+lf("We could not load the documentation, please check your internet connection.")+'</h3>\n                    <button class="ui button primary" id="tryagain">'+lf("Try Again")+"</button>"),$(c).find("#tryagain").click(function(){n(r,s)}),window.parent&&window.parent.postMessage({type:"docfailed",docType:r,src:s},"*")}).finally(function(){$(e).hide(),$(c).show()}).done(function(){})}function t(){var e=/^#(doc|md|tutorial|book|project|projectid|print):([^&?:]+)(:([^&?:]+):([^&?:]+))?/i.exec(window.location.hash);e&&(e[4]?u(/^blocks$/.test(e[4])?d.Blocks:d.TypeScript,e[5]):Promise.resolve()).then(function(){return n(e[1],decodeURIComponent(e[2]))})}x.tickEvent("docrenderer.ready"),f().done(function(){window.addEventListener("message",m,!1),window.addEventListener("hashchange",function(){t()},!1),parent.postMessage({type:"sidedocready"},"*"),setTimeout(function(){return t()},1)})},l.renderProjectAsync=g,l.renderProjectFilesAsync=h;var v='\n<aside id=button class=box>\n   <a class="ui primary button" href="@ARGS@">@BODY@</a>\n</aside>\n\n<aside id=vimeo>\n<div class="ui two column stackable grid container">\n<div class="column">\n    <div class="ui embed mdvid" data-source="vimeo" data-id="@ARGS@" data-placeholder="/thumbnail/1024/vimeo/@ARGS@" data-icon="video play">\n    </div>\n</div></div>\n</aside>\n\n<aside id=youtube>\n<div class="ui two column stackable grid container">\n<div class="column">\n    <div class="ui embed mdvid" data-source="youtube" data-id="@ARGS@" data-placeholder="https://img.youtube.com/vi/@ARGS@/0.jpg">\n    </div>\n</div></div>\n</aside>\n\n<aside id=section>\n    \x3c!-- section @ARGS@ --\x3e\n</aside>\n\n<aside id=hide class=box>\n    <div style=\'display:none\'>\n        @BODY@\n    </div>\n</aside>\n\n<aside id=avatar class=box>\n    <div class=\'avatar @ARGS@\'>\n        <div class=\'avatar-image\'></div>\n        <div class=\'ui compact message\'>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n<aside id=hint class=box>\n    <div class="ui icon green message">\n        <div class="content">\n            <div class="header">Hint</div>\n            @BODY@\n        </div>\n    </div>\n</aside>\n\n\x3c!-- wrapped around ordinary content --\x3e\n<aside id=main-container class=box>\n    <div class="ui text">\n        @BODY@\n    </div>\n</aside>\n\n\x3c!-- used for \'column\' box - they are collected and wrapped in \'column-container\' --\x3e\n<aside id=column class=aside>\n    <div class=\'column\'>\n        @BODY@\n    </div>\n</aside>\n<aside id=column-container class=box>\n    <div class="ui three column stackable grid text">\n        @BODY@\n    </div>\n</aside>\n@breadcrumb@\n@body@';function k(e,n,t){void 0===t&&(t={});(t.path||"").split("/");var o=x.docs.renderMarkdown({template:v,markdown:n,theme:x.appTarget.appTheme}),i=t.blocksAspectRatio||window.innerHeight<window.innerWidth?1.62:1/1.62;$(e).html(o),$(e).find("a").attr("target","_blank");var a={blocksAspectRatio:i,snippetClass:"lang-blocks",signatureClass:"lang-sig",blocksClass:"lang-block",blocksXmlClass:"lang-blocksxml",simulatorClass:"lang-sim",linksClass:"lang-cards",namespacesClass:"lang-namespaces",codeCardClass:"lang-codecard",packageClass:"lang-package",projectClass:"lang-project",snippetReplaceParent:!0,simulator:!0,hex:!0,tutorial:!!t.tutorial,showJavaScript:l.languageMode==d.TypeScript,hexName:x.appTarget.id};return t.print&&(a.showEdit=!1,a.simulator=!1),x.runner.renderAsync(a).then(function(){$(e).find('a[href^="/"]').removeAttr("target").each(function(e,n){$(n).attr("href","#doc:"+$(n).attr("href").replace(/^\//,""))}),$(e).find(".ui.embed").embed()})}l.renderMarkdownAsync=k,l.decompileToBlocksAsync=function(n,i){return t(i&&i.packageId?"pub:"+i.packageId:i&&i.package?"docs:"+i.package:null,n).then(function(){return a(!!x.appTarget.compile&&x.appTarget.compile.hasHex)}).then(function(e){n&&(e.fileSystem["main.ts"]=n),e.ast=!0;var t=pxtc.compile(e);if(t.diagnostics&&0<t.diagnostics.length&&t.diagnostics.forEach(function(e){return console.error(e.messageText)}),!t.success)return Promise.resolve({package:l.mainPkg,compileJS:t});var o=pxtc.getApiInfo(e,t.ast);return ts.pxtc.localizeApisAsync(o,l.mainPkg).then(function(){var e=pxtc.getBlocksInfo(o);x.blocks.initializeAndInject(e);var n=pxtc.decompiler.decompileToBlocks(e,t.ast.getSourceFile("main.ts"),{snippetMode:i&&i.snippetMode});return n.diagnostics&&0<n.diagnostics.length&&n.diagnostics.forEach(function(e){return console.error(e.messageText)}),n.success?(x.debug(n.outfiles["main.blocks"]),{package:l.mainPkg,compileJS:t,compileBlocks:n,apiInfo:o,blocksSvg:x.blocks.render(n.outfiles["main.blocks"],i)}):{package:l.mainPkg,compileJS:t,compileBlocks:n,apiInfo:o}})})},l.compileBlocksAsync=function(o,i){return t(i&&i.packageId?"pub:"+i.packageId:i&&i.package?"docs:"+i.package:null,"").then(function(){return a(!!x.appTarget.compile&&x.appTarget.compile.hasHex)}).then(function(e){e.ast=!0;var n=pxtc.compile(e),t=pxtc.getApiInfo(e,n.ast);return ts.pxtc.localizeApisAsync(t,l.mainPkg).then(function(){var e=pxtc.getBlocksInfo(t);return x.blocks.initializeAndInject(e),{package:l.mainPkg,blocksSvg:x.blocks.render(o,i),apiInfo:t}})})};var b,w=[];l.initCallbacks=[],l.init=function(){n().done(function(){for(var e=0;e<l.initCallbacks.length;++e)l.initCallbacks[e]()})},(b=window.ksRunnerWhenLoaded)&&b()}(x.runner||(x.runner={}))}(pxt||(pxt={}));