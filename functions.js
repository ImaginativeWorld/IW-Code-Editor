"use strict";

window.addEventListener('resize', loadDesign);

function loadDesign() {
    var freeHeight = window.innerHeight - document.getElementById('toolbar').clientHeight;
    var freeWidth = window.innerWidth;

    document.getElementById('editor').style.height = (freeHeight / 2 - 22) + 'px';
    document.getElementById('preview').style.height = (freeHeight / 2 - 22) + 'px';

    document.getElementById('editor').style.width = (freeWidth - 42) + 'px';
    document.getElementById('preview').style.width = (freeWidth - 40) + 'px';

}

var LS = window.localStorage;
var codeConvert = false;

//===============================================================
function specialChar(str) {
    switch (str) {
    case '<':
        insertAtCaret('editor', '&lt;');
        break;
    case '>':
        insertAtCaret('editor', '&gt;');
        break;
    case 'q': //"
        insertAtCaret('editor', '&quot;');
        break;
    case '&':
        insertAtCaret('editor', '&#38;');
        break;
    case '#':
        insertAtCaret('editor', '&#35;');
        break;
    default:
        ;
    }
}
//===============================================================
function autoText(event) {
    if (event.defaultPrevented) {
        return;
    }
    if (codeConvert === true) {
        switch (event.which) {
        case 60: //<
            event.preventDefault();
            insertAtCaret('editor', '&lt;');
            break;
        case 62: //>
            event.preventDefault();
            insertAtCaret('editor', '&gt;');
            break;
        case 34: //"
            event.preventDefault();
            insertAtCaret('editor', '&quot;');
            break;
        case 38: //&
            event.preventDefault();
            insertAtCaret('editor', '&#38;');
            break;
        case 35: //#
            event.preventDefault();
            insertAtCaret('editor', '&#35;');
            break;
        default:
            return;
        }
    }
}
//===============================================================
function autoTextDown(event) {
    if (event.defaultPrevented) {
        return;
    }
    if (codeConvert === true) {
        switch (event.which) {
        case 9: //<
            event.preventDefault();
            insertAtCaret('editor', '    ');
            break;
        }
    }
}
//===============================================================
function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}
//===============================================================
function ready() {
    document.getElementById('editor').value = '<p>Salam world!</p>\n\
<div class="questions"><p>IW Code Editor v0.2 [Open-source under MPL 2.0]</p></div>\n\
<p><strong>Rules and Examples:</strong></p>\n\
<p>Every line must be in between <span class="blue">&lt;p&gt;&lt;/p&gt;</span> tag.</p>\n\
<p><span class="red">All u write here automatically save inside the browser. So, don\'t need to save separately.</span></p>\n\
<p><strong>After completing the post copy-paste the code in a notepad and save it as <span class="blue">.txt</span> file with <span class="red">UTF-8</span> Encoding.</strong></p>\n\
<div class="caution"><p><p>Don\'t <span class="red">clear </span>the <strong>cache </strong>in your browser without <span class="blue">saving </span>the code separately. <span class="red">It will clear save codes!</span> :(</p></p></div>\n\
<p>Code example:</p>\n\
<pre><code class="language-c">#include&lt;stdio.h&gt;\n\
\n\
int main()\n\
{\n\
    printf(&quot;Salam world!&quot;);\n\
    return 0;\n\
}</code></pre>\n\
\n\
<div class="tips"><p>কোড লিখার সময় <span class="key">$ → &#38;&#35;36;</span> বাটনটি অন রাখলে স্বয়ংক্রিয় স্পেশাল চিহ্ন গুলো কোডে পরিবর্তিত হবে।</p></div>\n\
<div class="mark"><p>What you think just <span class="key">Enter</span>.</p>\n\
<p>Bast of luck.. :)</p></div>';
    preview();
}
//===============================================================
//site messages insert
function insCode() {
    insertSnippet('<pre><code class="language-c">', '</code></pre>');
    preview();
}

function insCaution() {
    insertSnippet('<div class="caution"><p>', '</p></div>');
    preview();
}

function insQues() {
    insertSnippet('<div class="questions"><p>', '</p></div>');
    preview();
}

function insMark() {
    insertSnippet('<div class="mark"><p>', '</p></div>');
    preview();
}

function insInfo() {
    insertSnippet('<div class="info"><p>', '</p></div>');
    preview();
}

function insTips() {
    insertSnippet('<div class="tips"><p>', '</p></div>');
    preview();
}
//===============================================================
//common control
function bTxt() {
    insertSnippet('<strong>', '</strong>');
    preview();
}

function iTxt() {
    insertSnippet('<em>', '</em>');
    preview();
}

function uTxt() {
    insertSnippet('<u>', '</u>');
    preview();
}

function pTxt() {
    insertSnippet('<p>', '</p>');
    preview();
}

function h1Txt() {
    insertSnippet('<h1>', '</h1>');
    preview();
}

function h2Txt() {
    insertSnippet('<h2>', '</h2>');
    preview();
}

function h3Txt() {
    insertSnippet('<h3>', '</h3>');
    preview();
}

function h4Txt() {
    insertSnippet('<h4>', '</h4>');
    preview();
}

function redTxt() {
    insertSnippet('<span class="red">', '</span>');
    preview();
}

function blueTxt() {
    insertSnippet('<span class="blue">', '</span>');
    preview();
}

function keyTxt() {
    insertSnippet('<span class="key">', '</span>');
    preview();
}

function egTxt() {
    insertSnippet('<p class="egno">', '</p>');
    preview();
}
//===============================================================
function insertSnippet(startStr, endStr) {
    var position, txt;
    txt = document.getElementById('editor').value;
    position = getCaret(document.getElementById('editor'));

    var selStart = document.getElementById('editor').selectionStart,
        selEnd = document.getElementById('editor').selectionEnd;

    if (selStart === selEnd) {
        var newtxt = txt.slice(0, position) + startStr + 'textHere' + endStr + txt.slice(position, txt.length);
    } else {
        var newtxt = txt.slice(0, selStart) + startStr + txt.slice(selStart, selEnd) + endStr + txt.slice(selEnd, txt.length);
    }
    document.getElementById('editor').value = newtxt;
}
//===============================================================
function smiley(txt) {
    var txt = document.getElementById('editor').value;
    var newtext = txt;
    for (var i = 0; txt.length >= i; i++) {
        var newtext = newtext.replace(":)", "");
        newtext = newtext.replace(":(", "");
    }
    return newtext;
}
//===============================================================
function codeConverter() {
    if (codeConvert === true) {
        codeConvert = false;
        document.getElementById("codeConvBtn").style.backgroundColor = "#eee";
        document.getElementById("codeConvBtn").style.color = "#000";
        document.getElementById("codeConvBtn").style.textShadow = "1px 1px 0 #fff";
    } else {
        codeConvert = true;
        document.getElementById("codeConvBtn").style.backgroundColor = "#D94A38";
        document.getElementById("codeConvBtn").style.color = "#fff";
        document.getElementById("codeConvBtn").style.textShadow = "none";
    }
}
//===============================================================
// Functions
function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();

        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }

        var re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);

        return rc.text.length;
    }
    return 0;
}
//===============================================================
//Preview function
function preview() {
    document.getElementById('preview').srcdoc =
        '<!doctype html><html><head>\
<meta charset="utf-8">\
<link href="frame.min.css" rel="stylesheet">\
<link href="solarized_light.css" rel="stylesheet" />\
<script src="highlight.pack.js"></script>\
<script src="prefixfree.min.js"></script>\
<script>hljs.initHighlightingOnLoad();</script>\
</head><body><section class="section">' + smiley(document.getElementById('editor').value) + "</section></body></html>";
    saveDraft();
}
//===============================================================
function bigTxt() {
    var txt = document.getElementById('editor').style.fontSize;
    var val = txt.substring(0, 2);
    if (val < 32) {
        txt = Number(val) + 1;
        changeFontSize(txt);
        setCookie('fontSize', txt, 365);
    } else showMessage("This is the Max Font size.");

}

function smallTxt() {
    var txt = document.getElementById('editor').style.fontSize;
    var val = txt.substring(0, 2);
    if (val > 10) {
        txt = Number(val) - 1;
        changeFontSize(txt);
        setCookie('fontSize', txt, 365);
    } else showMessage("This is the Min Font size.");
}

function changeFontSize(size) {
    document.getElementById('editor').style.fontSize = size + 'px';
    document.getElementById('showFontSize').innerHTML = size + 'px';
}
//===============================================================
//Show message function
function showMessage(strText) {
    alert("Message:\n\n" + strText);
}

//===============================================================
// Cookie functions [For future use]
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "='" + cvalue + "'; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var doc = getCookie("fontSize");
    if (doc !== "") {

    }
}
//===============================================================
function saveDraft() {
    var content = document.getElementById('editor').value;
    LS.setItem('iwcode-draft', JSON.stringify(content));
}

function loadDraft() {
    var content = JSON.parse(LS.getItem('iwcode-draft'));
    document.getElementById('editor').value = content;
    preview();
}