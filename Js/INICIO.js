//FUEGOS ARTIFICIALES

var bits = 200;
var intensity = 5;
var speed = 15;
var colours = new Array("#FF8000", "#5FB404", "#084B8A", "#DF0101", "#FF0080", "#00ffea", "#eeff00");
var dx, xpos, ypos, bangheight;
var Xpos = new Array();
var Ypos = new Array();
var dX = new Array();
var dY = new Array();
var decay = new Array();
var colour = 0;
var swide = 1000;
var shigh = 800;
var on = false;

function div(id, w, h) {
    if (on) {
        var d = document.createElement("div");
        d.style.position = "absolute";
        d.style.overflow = "hidden";
        d.style.width = w + "px";
        d.style.height = h + "px";
        d.setAttribute("id", id);
        return (d);
    } else {
        return "";
    }
}
function bang() {
    if (on) {
        var i, X, Y, Z, A = 0;
        for (i = 0; i < bits; i++) {
            X = Math.round(Xpos[i]); Y = Math.round(Ypos[i]);
            Z = document.getElementById("bg" + i).style;
            if ((X >= 0) && (X < swide) && (Y >= 0) && (Y < shigh)) { Z.left = X + "px"; Z.top = Y + "px"; }
            if ((decay[i] -= 1) > 14) { Z.width = "3px"; Z.height = "3px"; }
            else if (decay[i] > 7) { Z.width = "2px"; Z.height = "2px"; }
            else if (decay[i] > 3) { Z.width = "1px"; Z.height = "1px"; }
            else if (++A) Z.visibility = "hidden";
            Xpos[i] += dX[i];
            Ypos[i] += (dY[i] += 0.1 / intensity);
        }
        if (A != bits) setTimeout("bang()", speed);
    } else {
        return "";
    }
}

window.onscroll = set_scroll;
function set_scroll() {
    if (on) {
        var sleft, sdown;
        if (typeof (self.pageYOffset) == "number") {
            sdown = self.pageYOffset;
            sleft = self.pageXOffset;
        }
        else if (document.body.scrollTop || document.body.scrollLeft) {
            sdown = document.body.scrollTop;
            sleft = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            sleft = document.documentElement.scrollLeft;
            sdown = document.documentElement.scrollTop;
        }
        else { sdown = 0; sleft = 0; }
        var s = document.getElementById("bod").style;
        s.top = sdown + "px";
        s.left = sleft + "px";
    } else {
        return "";
    }
}
window.onresize = set_width;
//Apagar efecto
function apagar() {
    if (on) {
        on = false;
        document.getElementById("bod").remove();
        clearInterval('stepthrough()');
    }
}