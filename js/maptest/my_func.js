//获取点位坐标并展示到面板上
function getCoordinateToPanel (DJdom, point) {
    var panel = DJdom.byId('showPointPanel');
    panel.innerHTML = '点位坐标为：' + point.x + ', ' + point.y + ' <br/>&emsp;使用的参考系wkid为：' + point.spatialReference.wkid;
}

//添加标记至地图
function addmaker() {
    for (var i = 0; i < arguments.length; i++) {
        map.graphics.add(arguments[i]);
    }
};