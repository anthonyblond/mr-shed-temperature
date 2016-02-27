/*Taken from https://github.com/Tafkas/my-raspberry-pi-site/blob/master/source/javascripts/chart.js */

/*
Copyright (c) 2012 Christian Stade-Schuldt
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

options = {
    chart: {
        renderTo: 'content',
        type: 'spline'
    },
    title: {
        text: 'Temperatures of the last 24h'
    },
    subtitle: {
        text: ''
    },
    colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H. %M',
        }
    },
    yAxis: {
        title: {
            text: 'T (°C)'
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%H:%M', this.x) + ': ' + this.y.toFixed(1) + '°C';
        }
    },

    plotOptions: {
        series: {
            marker: {
                radius: 2
            }
        }
    },

    lineWidth: 1,

    series: []
}


/**
 * @return {string}
 */
function GetUrlPath() {
    var urlPath;
    urlPath = window.location.pathname.split(".")[0].substring(1).split("/")[1];
    if (urlPath == "humidity") {
        return "humid"
    } else {
        return "temps"
    }
}
urlPath = GetUrlPath();

// return everything after the question mark
/**
 * @return {string}
 */
function GetUrlParameter() {
    var idx = window.location.href.indexOf("?");
    if (idx < 0) return "";
    return window.location.href.substring(idx + 1);
}
urlParameter = GetUrlParameter();

/**
 * @return {string}
 */
function GetChartXml() {
    switch (urlParameter) {
        case "3h":
        case "48h":
        case "1w":
        case "1m":
        case "3m":
        case "1y":
        case "1yminmax":
            return "data/" + urlPath + urlParameter + ".xml";
    }
    return "data/" + urlPath + "24h.xml";
}

/**
 * @return {string}
 */
function GetChartTitle() {

    var type = "Temperatures";
    if (urlPath == "humid") {
        type = "Humidity"
    }
    switch (urlParameter) {
        case "3h":
            return type + " of the last 3 hours";
        case "48h":
            return type + " of the last 48 hours";
        case "1w":
            return type + " of the last week";
        case "1m":
            return type + " of the last month";
        case "3m":
            return type + " of the last 3 month";
        case "1y":
            return type + " of the last year";
        case "1yminmax":
            return "Min-Max " + type + " of the last year";
    }
    return type + " of the last 24 hours";
}
;

