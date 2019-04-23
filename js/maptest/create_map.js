require([
    "esri/map",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureFillSymbol",
    "esri/InfoTemplate",
    "esri/graphic",
    "dojo/dom",
    "dojo/_base/Color",
    "dojo/domReady!"
], function(Map, Point, Polyline, Polygon, Extent, SR, SLS, SMS, PMS, SFS, PFS, IT, graphic, DJdom, Color) {

    var centerPoint = new Point(map_center[0], map_center[1], new SR({ wkid: my_wkid }));  //中心坐标 //SpatialReference参考系

    var sls = new SLS(SLS.STYLE_SOLID, new Color([0, 122, 204, 0.8]), 2);  //SimpleLineSymbol
    var sms = new SMS(SMS.STYLE_CIRCLE, 15, sls, new Color([255, 255, 255, 0.6]));  //SimpleMarkerSymbol
    var pms = new PMS('./img/close.png', 20, 20);  //PictureMarkerSymbol
    var sfs = new SFS(SFS.STYLE_SOLID, sls, new Color([0, 0, 0, 0.4]));  //SimpleFillSymbol
    var pfs = new PFS('./img/close.png', sls, 20, 20);  //PictureFillSymbol
    var it = new IT("点位信息","经度: ${Xcoord} <br/>纬度: ${Ycoord} <br/>点位名称:${Plant}");

    var markers = [];
    for (var i = 0; i < some_point.length; i++) {
        var point = new Point(some_point[i][0], some_point[i][1], new SR({ wkid: my_wkid }));
        var attr = {
            "Xcoord": some_point[i][0],
            "Ycoord": some_point[i][1],
            "Plant": "点位" + (i + 1)
        };
        markers[i] = new graphic(point, sms, attr, it);  //Point
    };

    var myPolyline = new Polyline(new SR({ wkid: my_wkid }));
    myPolyline.addPath(some_point);
    var myPolylineGraphic = new graphic(myPolyline, sls);  //Polyline  //也可以添加弹窗和属性

    var myPolygon = new Polygon(new SR({ wkid: my_wkid }));
    myPolygon.addRing(triangle_point);
    var myPolygonGraphic = new graphic(myPolygon, pfs);  //Polyline  //也可以添加弹窗和属性

    var myExtent = new Extent(13518769.321040172, 3662424.0349548776, 13519390.37189499, 3664277.6328907902, new SR({ wkid: my_wkid }));
    var myExtentGraphic = new graphic(myExtent, sfs);  //Polyline  //也可以添加弹窗和属性

    // console.log(marker);

    //生成地图
    map = new Map("viewDiv", {
        basemap: my_basemap,
        center: centerPoint,
        zoom: 14
    });
    
    // console.log(map);

    //添加标记
    map.on("load", function() {
        for (var i = 0; i < markers.length; i++) {
            addmaker(markers[i]);
        }
        addmaker(myPolylineGraphic);
        addmaker(myPolygonGraphic);
        addmaker(myExtentGraphic);
    });

    getCoordinateToPanel(DJdom, centerPoint);
    // console.log(centerPoint)
    map.on("click", myClick);
    function myClick (evt) {
        getCoordinateToPanel(DJdom, evt.mapPoint);
        // console.log(evt);
    }
});