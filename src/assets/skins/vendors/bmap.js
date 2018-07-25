$(function() {
    var myChart;
    var map;
    var container;
    var BMapExt;
    var jsonPath;
    var series = [];
    var arrLegend = [];
    var arrMarkLine = [];
    var SubPoint = [];
    var objSelected = {};
    var strJson;
    var baseSi;
    var BlockBmapRender;
    var initShowLine = false;
    var initShowMainMarkPoint = true;
    var initShowSubMarkPoint = false;
    var MainPoint;
    var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
    var cl = 0;
    var arrColorName = {};


    var geoCoord = {};
    var companyClass = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data2Arr = [];
    var data2TypeArr = [];
    var data3Arr = [];
    $.ajaxSetup({ async: false });
    $.getJSON('http://219.239.97.111:10075/api/995/all', function(data) {
        var Data = data.result;
        $.each(Data, function(index, value) {
            geoCoord[value.com_name] = [value.lon, value.lat];

            companyClass.push(value.com_type);
        })
        companyClass = $.unique(companyClass);
    });


    $.getJSON('http://219.239.97.111:10075/api/994/all', function(data) {
        var Data = data.result;
        $.each(Data, function(index, value) {
            data1.push(
                [{
                        "name": value.part_ent_name
                    },
                    {
                        "name": value.whole_ent_name,
                        "value": 30
                    }
                ]
            );

            if ($.inArray(value.part_ent_name, data2Arr) < 0) {
                data2Arr.push(value.part_ent_name);
                data2.push({
                    "name": value.part_ent_name,
                    "value": 0,
                    "subType": value.part_ent_type
                });
            }
            if ($.inArray(value.whole_ent_name, data3Arr) < 0) {
                data3Arr.push(value.whole_ent_name);
                data3.push({
                    "name": value.whole_ent_name,
                    "value": 80
                });
            }
        })
    });




    var series_list = [{
            "name": "MarkLineLayer",
            "type": "markLine",
            "data": data1
        },
        {
            "name": "markPoint",
            "type": "markPoint",
            "data": data2
        },
        {
            "name": "markPointSub",
            "type": "markPointSub",
            "data": data3
        }
    ];

    $.each(companyClass, function(index, value) {
        series_list.push({
            "name": value,
            "type": "markSerie"
        });
    })

    jsonPath = {
        geoCoord: geoCoord,
        series: series_list
    }
    console.log(jsonPath);




    var geoCoordMap = jsonPath.geoCoord;
    jsonPath.series.forEach(function(item, i) {
        var newSi = {};
        var arrSiRender = [];

        if (item.type == "markLine") {
            var newSiRender = {};

            newSi = {
                name: item.name,
                type: 'lines',
                large: true,
                coordinateSystem: 'bmap',
                zlevel: 3,
                effect: {
                    show: true,
                    period: 10,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        width: 0,
                        curveness: 0.2
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 10,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                }
            };
            newSiRender = {
                name: item.name,
                type: 'lines',
                coordinateSystem: 'bmap',
                lineStyle: {
                    normal: {
                        color: '#26ff00',
                        width: 2,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                zlevel: 1
            };

            arrSiRender.push(newSiRender);
            if (initShowLine) {
                newSi.data = convertDataLine(item.data);
                newSiRender.data = convertDataLine(item.data);
            } else {
                newSi.data = [];
                newSiRender.data = [];
            }

            item.data.forEach(function(objP, j) {
                var newMl = {};

                newMl.start = objP[0].name;
                newMl.end = objP[1].name;
                newMl.data = objP;

                arrMarkLine.push(newMl);
            });
        } else if (item.type == "markPoint") {
            newSi = {
                name: item.name,
                type: 'scatter',
                coordinateSystem: 'bmap',
                zlevel: 3,
                symbol: 'pin',
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return arrColorName[MainPoint.data[params.dataIndex].subType];
                        },
                        borderColor: '#87cefa',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#1e90ff',
                        borderWidth: 2
                    }
                }
            }
            if (initShowMainMarkPoint) {
                newSi.data = convertData(item.data);
            } else {
                newSi.data = [];
            }
            MainPoint = item;
        } else if (item.type == "markPointSub") {
            newSi = {
                name: item.name,
                type: 'scatter',
                coordinateSystem: 'bmap',
                zlevel: 3,
                symbol: 'pin',
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return arrColorName[MainPoint.data[params.dataIndex].subType];
                        },
                        borderColor: '#87cefa',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#1e90ff',
                        borderWidth: 2
                    }
                }
            }
            if (initShowMainMarkPoint) {
                newSi.data = convertData(item.data);
            } else {
                newSi.data = [];
            }
            SubPoint = item;
        } else if (item.type == "markSerie") {
            arrLegend.push(item.name);
            newSi = {
                name: item.name,
                type: 'scatter',
                coordinateSystem: 'bmap',
                itemStyle: {
                    normal: {
                        color: color[cl]
                    }
                }
            };
            arrColorName[item.name] = color[cl];
            cl++;
            if (cl > 10) {
                cl = 0;
            }
        }

        series.push(newSi);
        arrSiRender.forEach(function(render) {
            series.push(render);
        });
    });


    var dom = document.getElementById("bmap_charts");
    myChart = echarts.init(dom);
    option = null;

    option = {
        title: {
            text: '新能源汽车企业关联关系',
            textStyle: {
                color: '#fff'
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(v, a, b, g, h, j, k) {
                var title = "";

                if (v.seriesType == 'lines') {
                    title = v.data.fromName + " > " + v.data.toName;
                } else {
                    title = v.name;
                }

                return title;
            }
        },
        legend: {
            show: true,
            orient: 'vertical',
            top: 'top',
            left: 'left',
            data: arrLegend,
            textStyle: {
                color: '#fff'
            },
            selectedMode: false
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 4,
            roam: true,
            mapStyle: {
                styleJson: [{
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "transparent"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#2b2b2b"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#cccccc"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#005b96",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#cccccc"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    }
                ]
            }
        },
        series: series
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    myChart.on("click", mapClick);

    function mapClick(param) {
        if (param.seriesType == "scatter" || param.seriesType == "effectScatter") {
            HideMainPoint();
            HideSubPoint();
            var arrSubP = [];
            var arrMainP = [];
            var arrAddSub = [];
            var arrAddMain = [];
            var arrSubD = [];
            var arrMainD = [];

            if (param.seriesName == "markPoint") {
                arrMainP.push(param.name);
            }
            if (param.seriesName == "markPointSub") {
                arrSubP.push(param.name);
            }
            arrMarkLine.forEach(function(obj, i) {
                if (obj.start == param.name) {
                    arrSubP.push(obj.end);
                } else if (obj.end == param.name) {
                    arrMainP.push(obj.start);
                }
            });


            arrMainP.forEach(function(obj, i) {
                MainPoint.data.forEach(function(objs, j) {
                    if (objs.name == obj) {
                        arrMainD.push(objs);
                        return false;
                    }
                });
            });
            arrSubP.forEach(function(obj, i) {
                SubPoint.data.forEach(function(objs, j) {
                    if (objs.name == obj) {
                        arrSubD.push(objs);
                        return false;
                    }
                });
            });

            myChart.setOption({
                series: [{
                        name: "markPoint",
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    return arrColorName[GetMainPoint(params.name).subType];
                                },
                                borderColor: '#87cefa',
                                borderWidth: 1
                            },
                            emphasis: {
                                borderColor: '#1e90ff',
                                borderWidth: 2
                            }
                        },
                        data: convertData(arrMainD)
                    },
                    {
                        name: "markPointSub",
                        data: convertData(arrSubD)
                    }
                ]
            }, false, false);
            ShowLine(param.name);
        }
    }

    function convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                var obj = {
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                };
                res.push(obj);
            }
        }
        return res;
    }

    function convertDataLine(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };

    function ShowLine(name) {
        var markData = [];
        var markDataEnd = [];

        HideLine();


        markData = GetMdStart(name);
        markDataEnd = GetMdEnd(name);
        markDataEnd.forEach(function(obj, j) {
            markData.push(obj);
        });
        myChart.setOption({
            series: [{
                    name: "MarkLineLayer",
                    data: convertDataLine(markData)
                },
                {
                    name: "MarkLineLayer",
                    data: convertDataLine(markData)
                }
            ]
        }, false, false);
    }

    function HideLine() {
        BlockBmapRender = true;
        myChart.setOption({
            series: [{
                    name: "MarkLineLayer",
                    data: []
                },
                {
                    name: "MarkLineLayer",
                    data: []
                }
            ]
        }, false, false);

        BlockBmapRender = false;
    }

    function HideSubPoint() {
        myChart.setOption({
            series: [{
                name: "markPointSub",
                data: []
            }]
        }, false, true);
    }

    function HideMainPoint() {
        myChart.setOption({
            series: [{
                name: "markPoint",
                data: []
            }]
        }, false, true);
    }

    function Test() {
        arrMarkLine.forEach(function(obj, j) {
            var markData;

            markData = GetMd(obj.start, obj.end);
            myChart.addMarkLine(1, {
                data: [markData]
            });
        });
        myChart.refresh()
    }

    function GetMd(start, end) {
        var markData;

        arrMarkLine.forEach(function(obj, j) {
            if (obj.start == start && obj.end == end) {
                markData = obj.data;
                return;
            }
        });

        return markData;
    }

    function GetMdStart(start) {
        var markData = [];

        arrMarkLine.forEach(function(obj, j) {
            if (obj.start == start && HavePoint(obj.end)) {
                markData.push(obj.data);
            }
        });

        return markData;
    }

    function GetMdEnd(end) {
        var markData = [];

        arrMarkLine.forEach(function(obj, j) {
            if (obj.end == end && HavePoint(obj.start)) {
                markData.push(obj.data);
            }
        });

        return markData;
    }

    function HavePoint(name) {
        var have = false;

        myChart._model.getSeriesByName("markPointSub")[0].option.data.forEach(function(obj, i) {
            if (obj.name == name) {
                have = true;
                return false;
            }
        });
        myChart._model.getSeriesByName("markPoint")[0].option.data.forEach(function(obj, i) {
            if (obj.name == name) {
                have = true;
                return false;
            }
        });

        return have;
    }

    function ResetMap() {
        if (option && typeof option === "object") {
            myChart.setOption(option, true, false);
        }
    }

    function GetMainPoint(name) {
        var item;
        MainPoint.data.forEach(function(obj, i) {
            if (obj.name == name) {
                item = obj;
            }
        });
        return item;
    }


})