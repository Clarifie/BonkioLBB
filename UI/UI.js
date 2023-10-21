// ==UserScript==
// @name         LBB_DB
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a keytable to bonk.io
// @author       BZD
// @license MIT
// @match        https://bonk.io/gameframe-release.html
// @run-at       none
// @grant        none
// ==/UserScript==

//This project uses modifications code from [https://greasyfork.org/en/scripts/445890-bonk-keytable]
//which is available under the MIT license. 

const left = "0";
const top = "0";
const width = "172px";
const height = "100px";
 
window.keyStyle = (keyname) => {
    if (document.getElementById(keyname).innerHTML == 'false') {
        document.getElementById(keyname).innerHTML = (keyname)
        document.getElementById(keyname).style.backgroundColor = '#333333';
 
    } else if (document.getElementById(keyname).innerHTML == 'true') {
        document.getElementById(keyname).innerHTML = (keyname)
        document.getElementById(keyname).style.backgroundColor = '#808080';
    }
}
//sets colors for keys when pressed/released
 
window.keyTableReset = () => {
    var keys = ['←', '↑', '→', '↓', 'Heavy', 'Special'];
    for (let i = 0; i < keys.length; i++) {
        document.getElementById(keys[i]).style.backgroundColor = '#333333';
    }
}
//(Re)sets all keys to gray
 
function setup() {
    let keyTable = document.createElement("table");
    document.getElementById("pagecontainer").appendChild(keyTable);
    keyTable.outerHTML = `<table id="bonk_keytable" style="background-color:#3c3c3c; bottom:${top}; right: ${left}; width: ${width}; height: ${height}; position: absolute; font-family: 'futurept_b1'; z-index: 10; cursor: all-scroll;">
            <tbody>
                <tr>
                    <td id="Special" style="width: 34%;text-align: center;color: #ccc;">Special</td>
                    <td id="↑" style="width: 34%;text-align: center;color: #ccc;">↑</td>
                    <td id="Heavy" style="width: 34%;text-align: center;color: #ccc;">Heavy</td>
                </tr>
                <tr>
                    <td id="←" style="width: 34%;text-align: center;color: #ccc;">←</td>
                    <td id="↓" style="width: 34%;text-align: center;color: #ccc;">↓</td>
                    <td id="→" style="width: 34%;text-align: center;color: #ccc;">→</td>
                </tr>
            </tbody>
        </table>`;
 
    const el = document.getElementById("bonk_keytable");
    let x1 = left, y1 = top, x2, y2;
    el.onmousedown = dragMouseDown;
 
    function dragMouseDown(e) {
        e = e || window.event;
 
        x2 = e.clientX;
        y2 = e.clientY;
 
        document.onmousemove = function(e) {
            e = e || window.event;
 
            x1 = x2 - e.clientX;
            y1 = y2 - e.clientY;
            x2 = e.clientX;
            y2 = e.clientY;
            el.style.top = (el.offsetTop - y1) + "px";
            el.style.left = (el.offsetLeft - x1) + "px";
        }
        document.onmouseup = function() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        };
    }
 
    window.keyTableReset();
}
//adds keytable!