(function (global) {

    // 通用大屏布局
    Vue.component('common-layout', {
        template: `\
        <div class="common-layout-container" :style="{width:width,height:height}">\
           
            <div class="center-bottom">
            <div class="center-bottom-left">
                <div class="canvasArea">
                    <component :is="centerBottomItem[0].component"></component>
                </div>
            </div>
        </div>
            <div class="header">{{title}}</div>\
            <div class="body" ref="containerBody">\
                <div class="side left" :style="{width:sideWidth+\'px\'}">\
                    <div class="side-item" v-for="item in leftSideItem"  :style="{height:item.height,backgroundImage:\'url(\' +item.background +\')\'}">\
                        <component :is="item.component"></component>\
                    </div>\
                </div>\
                <div class="center" :style="{width:centerWidth}" id="centerMapChartContainer">
                    
                </div>\
             
                <div class="side right" :style="{width:sideWidth+\'px\'}">\
                    <div class="side-item" v-for="item in rightSideItem" :style="{height:item.height,backgroundImage:\'url(\' +item.background +\')\'}">\
                        <component :is="item.component"></component>\
                    </div>\
                </div>\
            </div>\
            
        </div>\
        `,
        props: ['title', 'width', 'height', 'sideWidth'],
        data: function () {
            return {
                leftSideItem: [
                    {
                        component: 'mirror-overview',
                        height: '260px',
                        background: './static/images/rootafternew/left1-bg.png'
                    },
                    {
                        component: 'mirror-total-coverage',
                        height: '502px',
                        background: './static/images/rootafternew/left2-bg.png'
                    },
                    {component: 'left-three', height: '501px', background: './static/images/rootafternew/left4-bg.png'},
                    {
                        component: 'mirror-node-total',
                        height: '502px',
                        background: './static/images/rootafternew/left3-bg.png'
                    },
                ],
                rightSideItem: [{
                    component: 'data-search-count-chart',
                    height: '1383px',
                    background: './static/images/rootafternew/right1-bg.png'
                }, {
                    component: 'right2',
                    height: '500px',
                    background: './static/images/rootafternew/right2-bg.png'
                }],
                centerBottomItem: [
                    {component: 'center-bottom-left',},
                    // {component: 'center-bottom-right'},
                ],
                centerWidth: 0
            }
        },
        methods: {
            setMapCharOption: function (data) {
                var centerMapChartContainer = echarts.init(document.getElementById('centerMapChartContainer'));
                var option = {
                    tooltip: {
                        backgroundColor: 'transparent',
                        triggerOn: 'mousemove',
                        formatter: function (params, ticket, callback) {
                            /*var htmlContext = '';
                            if (params.data && params.data.otherData) {
                                var nodeArr = params.data.otherData;
                                var length = nodeArr.length;
                                var degDivider = 360 / length;
                                var currentDeg = -90;
                                var circleLineDiv = '';
                                var circlePopDiv = '';

                                var radius = 100;
                                var ahd = degDivider * Math.PI / 180;

                                var rootDiv = "";
                                var rootNumDiv="";
                                for (var i = 0; i < length; i++) {
                                    rootDiv += "<span style='font-size: 35px;'>" + params.data.otherData[i] + "</span>";
                                    rootNumDiv += "<span style='font-size: 35px;'>" + 1 + "</span>";
                                    circleLineDiv = circleLineDiv + '<div class="display-line" style="transform-origin:1px 100px;transform: rotate(' + currentDeg + 'deg);"></div>'
                                    var bottom = Math.sin((ahd * i)) * radius + radius - 38;
                                    var right = Math.cos((ahd * i)) * radius + radius - 26;
                                    circlePopDiv = circlePopDiv + '<div class="display-pop" style="bottom: ' + bottom + 'px;right:' + right + 'px">' + nodeArr[i] + '</div>';
                                    currentDeg = currentDeg + degDivider;
                                }
                                var circleLineContainer = '<div class="circle-line-container">' + circleLineDiv + '</div>';
                                var circlePopContainer = '<div class="circle-pop-container">' + circlePopDiv + '</div>'
                                var circleNumContainer = '<div class="display-center">' + length + '</div>'
                                htmlContext = '<div class="map-tooltip-container">' + circleNumContainer + circlePopContainer + circleLineContainer + '</div>'
                            }*/
                            var flag = 0;
                            if (params.data && params.data.otherData) {
                                var nodeArr = params.data.otherData;
                                var length = nodeArr.length;
                                var rootDiv = "";
                                var rootNumDiv = "";

                                for (var i = 0; i < length; i++) {
                                    var rootStr = params.data.otherData[i];
                                    var rootNum = 1;
                                    if (params.data.name == '浙江') {
                                        rootNum = 2;
                                    }
                                    rootDiv += "<span style='font-size: 35px;'>" + rootStr + "</span>";
                                    rootNumDiv += "<span style='font-size: 35px;'>" + rootNum + "</span>";
                                }
                                if (length == 0) {
                                    flag = 1;
                                } else {
                                    flag = 0;
                                }
                            }
                            var txtCon = '\
                            <div class="center-map-chart-tooltip-container" style="height: 200px;" >\
                                <div class="tooltip-content">\
                                    <div class="value-content">\
                                        <div style=\'font-size: 35px;margin-top: 25px\'>根镜像引入类型</div>\
                                        <div style=\'font-size: 35px;margin-top: 50px\'>根镜像引入数量</div>\
                                    </div>\
                                    <div class="value-content" style="margin-left: 25px;">\
                                       <div class="before">' + rootDiv + '</div>\
                                        <div class="after">' + rootNumDiv + '</div>\
                                    </div>\
                                </div>\
                            </div>\
                            ';
                            return flag == 0 ? txtCon : "";
                        }
                    },
                    geo: {
                        map: 'china',
                        aspectScale: 0.75, //长宽比
                        zoom: 1.2,
                        roam: true,
                        itemStyle: {
                            // areaColor: 'rgb(1,219,225)',
                            // shadowColor: 'rgb(41,72,120)',
                            shadowOffsetX: 5,
                            shadowOffsetY: 5
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: '#2ab8ff',
                                borderWidth: 0,
                                color: 'rgb(1,219,225)',
                                label: {
                                    show: false
                                }
                            }
                        },
                        regions: [{
                            name: '南海诸岛',
                            itemStyle: {
                                areaColor: 'rgba(0, 10, 52, 1)',
                                borderColor: 'rgba(0, 10, 52, 1)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 0,
                            },
                        }],
                    },
                    visualMap: {
                        min: 0,
                        max: 1500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        inRange: {
                            color: ['rgb(32,79,162)', 'rgb(23,66,149)', 'rgb(17,56,131)']
                        },
                        show: false
                    },
                    series: [{
                        type: 'map',
                        zoom: 1.2,
                        map: 'china',
                        roam: true,
                        scaleLimit: {
                            min: 0.8,
                            max: 4
                        },
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 25,
                                color: 'GhostWhite'
                            },
                            formatter: function (params) {
                                var provName = params.name;
                                var formatterArr = [];
                                if (params.data && params.data.otherData) {
                                    var length = params.data.otherData.length;
                                    if (length == 0) {
                                        return;
                                    }
                                    if (params.data.name == '浙江') {
                                        length = 2;
                                    }
                                    formatterArr.push('{num|' + length + '}');
                                }
                                return provName + formatterArr;

                            },
                            rich: {
                                num: {
                                    color: '#071540',
                                    backgroundColor: {
                                        image: './static/images/rootafternew/map-num.png'
                                    },
                                    // padding: [0, 15],
                                    lineHeight: 30,
                                    height: 100,
                                    width: 100,
                                    fontSize: 35,
                                    borderRadius: 40
                                },

                            }

                        },

                        itemStyle: {
                            borderColor: 'rgb(147, 235, 248)',
                            borderWidth: 1,
                            areaColor: 'rgb(32,79,162)',
                        },// 鼠标聚焦时显示内容
                        emphasis: {
                            label: {
                                show: false,
                                textStyle: {
                                    color: "#000",
                                    fontSize: 30
                                },
                                // backgroundColor: '#F3B329',
                                rich: {
                                    num: {
                                        color: '#071540',
                                        backgroundColor: {
                                            image: './static/images/rootafternew/map-num.png'
                                        },
                                        // padding: [0, 15],
                                        lineHeight: 30,
                                        height: 100,
                                        width: 100,
                                        fontSize: 35,
                                        borderRadius: 40
                                    },
                                }
                            },
                            itemStyle: {
                                areaColor: 'rgb(5,167,222,0.9)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: data

                    }]
                };
                if (centerMapChartContainer) {
                    centerMapChartContainer.setOption(option);
                    centerMapChartContainer.resize();
                    centerMapChartContainer.on('georoam', function (params) {
                        var option = centerMapChartContainer.getOption();//获得option对象
                        if (params.zoom != null && params.zoom != undefined) { //捕捉到缩放时
                            option.geo[0].zoom = option.series[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
                            option.geo[0].center = option.series[0].center;//下层的geo的中心位置随着上层geo一起改变
                        } else {//捕捉到拖曳时
                            option.geo[0].center = option.series[0].center;//下层的geo的中心位置随着上层geo一起改变
                        }
                        centerMapChartContainer.setOption(option);//设置option
                    });

                }
            }
        },
        mounted: function () {
            this.centerWidth = this.$refs.containerBody.offsetWidth - this.sideWidth * 2 - 120 + 'px';
            var self = this;
            setTimeout(function () {
                self.setMapCharOption([
                    /*{name: "南海诸岛", value: 1, otherData: ['A', 'B']},
                    {name: '陕西', value: 3, otherData: ['A', 'B', 'C']},
                    {name: '天津', value: 6, otherData: ['A', 'B', 'C', 'D', 'E', 'F']},
                    {name: '四川', value: 8, otherData: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']},
                    {name: "黑龙江", value: 0, otherData: []},
                    {name: "内蒙古", value: 0, otherData: []},
                    {name: "吉林", value: 0, otherData: []},
                    {name: "西藏", value: 0, otherData: []},
                    {name: "新疆", value: 0, otherData: []},
                    {name: "甘肃", value: 0, otherData: []},
                    {name: "山西", value: 0, otherData: []},
                    {name: "山东", value: 0, otherData: []},
                    {name: "宁夏", value: 0, otherData: []},
                    {name: "河北", value: 0, otherData: []},
                    {name: "江苏", value: 0, otherData: []},
                    {name: "安徽", value: 0, otherData: []},
                    {name: "广东", value: 0, otherData: []},
                    {name: "广西", value: 0, otherData: []},
                    {name: "云南", value: 0, otherData: []},
                    {name: "福建", value: 0, otherData: []},
                    {name: "江西", value: 0, otherData: []},
                    {name: "海南", value: 0, otherData: []},
                    {name: "上海", value: 0, otherData: []},
                    {name: "辽宁", value: 0, otherData: []},
                    {name: "湖南", value: 0, otherData: []},
                    {name: "湖北", value: 0, otherData: []},
                    {name: "重庆", value: 0, otherData: []},
                    {name: "河南", value: 0, otherData: []},
                    {name: "贵州", value: 0, otherData: []},
                    {name: "浙江", value: 0, otherData: []},
                    {name: "青海", value: 0, otherData: []},
                    {name: "北京", value: 0, otherData: []},
                    {name: "台湾", value: 0, otherData: []},*/
                    // 真实数据
                    {name: "南海诸岛", value: 0, otherData: []},
                    {name: '陕西', value: 0, otherData: []},
                    {name: '天津', value: 0, otherData: []},
                    {name: '四川', value: 0, otherData: []},
                    {name: "黑龙江", value: 0, otherData: []},
                    {name: "内蒙古", value: 0, otherData: []},
                    {name: "吉林", value: 0, otherData: []},
                    {name: "西藏", value: 0, otherData: []},
                    {name: "新疆", value: 0, otherData: []},
                    {name: "甘肃", value: 0, otherData: []},
                    {name: "山西", value: 0, otherData: []},
                    {name: "山东", value: 0, otherData: []},
                    {name: "宁夏", value: 0, otherData: []},
                    {name: "河北", value: 0, otherData: []},
                    {name: "江苏", value: 0, otherData: []},
                    {name: "安徽", value: 0, otherData: []},
                    {name: "广东", value: 1, otherData: ['K']},
                    {name: "广西", value: 0, otherData: []},
                    {name: "云南", value: 0, otherData: []},
                    {name: "福建", value: 0, otherData: []},
                    {name: "江西", value: 0, otherData: []},
                    {name: "海南", value: 0, otherData: []},
                    {name: "上海", value: 1, otherData: ['L']},
                    {name: "辽宁", value: 0, otherData: []},
                    {name: "湖南", value: 0, otherData: []},
                    {name: "湖北", value: 1, otherData: ['L']},
                    {name: "重庆", value: 0, otherData: []},
                    {name: "河南", value: 1, otherData: ['L']},
                    {name: "贵州", value: 1, otherData: ['K']},
                    {name: "浙江", value: 2, otherData: ['F']},
                    {name: "青海", value: 1, otherData: ['L']},
                    {name: "北京", value: 6, otherData: ['I', 'F', 'K', 'L', 'J', 'L']},
                    {name: "台湾", value: 0, otherData: []},
                ]);
            });
        },
    });

    // 通用大屏的左侧内容
    Vue.component('common-layout-side-item', {
        props: ['title', 'btnName'],
        data: function () {

        },
        computed: {
            showHeader: function () {
                return this.title != null && this.title != '';
            }
        },
        template: '\
            <div class="common-layout-side-item">\
                <div v-if="showHeader" class="header">{{title}}</div>\
                <div class="body" :style="{height:showHeader?\'calc(100% - 60px)\':\'100%\'}">\
                    <slot></slot>\
                </div>\
            </div>\
        '
    });

    // 通用大屏的内容 带单位
    Vue.component('common-layout-side-item-unit', {
        props: ['title', 'unitStr'],
        data: function () {

        },
        computed: {
            showHeader: function () {
                return this.title != null && this.title != '';
            }
        },
        template: '\
            <div class="common-layout-side-item">\
                <div v-if="showHeader" class="header">{{title}}<span style="font-size: 24px">({{unitStr}})</span></div>\
                <div class="body" :style="{height:showHeader?\'calc(100% - 60px)\':\'100%\'}">\
                    <slot></slot>\
                </div>\
            </div>\
        '
    });


    // 全国根镜像引入总数
    Vue.component('mirror-overview', {
        template: '\
        <common-layout-side-item title="全国根镜像引入总数">\
            <div class="mirror-overview-container">\
                <div class="detail-btn" @click="showOverviewDetail">详情</div>\
                <flip-number :value="overviewValue" :speed="700"></flip-number>\
                <transition name="slide-fade">\
                    <div class="detail-container" v-if="detailShowFlag">\
                    <el-scrollbar style="height:100%">\
                        <el-table\
                        :header-cell-style="{background:\'#163D70\', fontSize: \'28px\', color:\'#A9E0FF\'}"\
                        :cell-style="{background:\'#163D70\', fontSize: \'28px\', color:\'#A9E0FF\',lineHeight:\'30px\'}"\
                        :data="detailDataList"\
                        height="725px" \
                        stripe\
                        fit\
                        style="width: 100%;"\
                        >\
                        <el-table-column\
                          prop="code"\
                          label="编号" \
                          sortable\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="mirror"\
                          label="根镜像"\
                          sortable\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="org"\
                          label="引入机构"\
                          sortable\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="operators"\
                          label="运营商"\
                          sortable\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="area"\
                          label="引入地点"\
                          sortable\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="time"\
                          label="引入时间"\
                          sortable\
                          >\
                        </el-table-column>\
                      </el-table> \
                    </el-scrollbar>\
                    </div>\
                </transition>\
            </div>\
        </common-layout-side-item>\
        ',
        data: function () {
            return {
                overviewValue: '',
                detailShowFlag: false,
                detailDataList: [],
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                $.ajax({
                    url: "afternew/getrootnum",
                    async: false,
                    success: function (result) {
                        self.overviewValue = 14;
                    },
                    error: function () {
                    }
                });
                setTimeout(function () {
                    $.ajax({
                        url: "afternew/getRootIntroduceInfo",
                        async: false,
                        success: function (result) {
                            var temp = {};
                            result.push(temp);
                            self.detailDataList = result;
                        }
                    });
                });

            }, 500)
        },
        methods: {

            showOverviewDetail: function () {
                this.detailShowFlag = !this.detailShowFlag;
            }
        }
    });

    // 全国根镜像所在区域分布
    Vue.component('mirror-total-coverage', {
        template: `\
        <common-layout-side-item-unit title="全国根镜像所在区域分布" unitStr="个">\
            <div class="mirror-total-coverage-container">\
                <div class="left-chart-body" id="mirror-total-coverage-pie-chart"></div>\
                <div class="right-table-body">\
                    <el-table\
                        :header-cell-style="{background:\'#163D70\', fontSize: \'30px\', color:\'#A9E0FF\'}"\
                        :cell-style="{background:\'#163D70\', fontSize: \'30px\', color:\'#A9E0FF\'}"\
                        :data="dataList"\
                        height="400px" \
                        >\
                        <el-table-column\
                          prop="province"\
                          label="省份" \
                          sortable\
                          width="190px"\
                          >\
                        </el-table-column>\
                        <el-table-column\
                          prop="number"\
                          label="数量"\
                          sortable\
                          width="190px"\
                          >\
                          </el-table-column>\
                    </el-table>\
                </div>\
            </div>\
        </common-layout-side-item-unit>\
        `,
        data: function () {
            return {
                dataList: []
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                $.ajax({
                    url: "afternew/getrootdeploybyprovince",
                    async: false,
                    success: function (result) {
                        self.dataList = result.provinceinfo;
                        self.setChartOption(result.areainfo);
                    },
                    error: function () {
                    }
                });
            });
        },
        methods: {
            setChartOption: function (data) {
                var chart = echarts.getInstanceByDom(document.getElementById('mirror-total-coverage-pie-chart'));
                var option = {
                    color: [{
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: 'rgba(124, 192, 194, 1)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(20, 117, 119, 1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }, {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0, color: 'rgba(117, 188, 255, 1)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(32, 105, 174, 1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }],
                    title: {
                        show: false,
                    },
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{c}%',
                        formatter: '{b} : {c}',
                        show: true
                    },
                    legend: {
                        orient: 'horizontal',
                        left: '60',
                        bottom: '0',
                        data: ['华东', '华南', '华北', '华中', '西南', '西北', '东北'],
                        itemWidth: 20,
                        itemHeight: 20,
                        itemGap: 24,
                        textStyle: {
                            color: '#2FACD5',
                            fontSize: 20
                        },
                        icon: 'circle',
                        selectedMode: false
                    },
                    color: ['#9F88C9', '#CD6A73', '#CD8675', '#CDB65A',
                        '#80BFA3', '#4E93DC', '#04af6a'],
                    series: [
                        {
                            name: '覆盖情况总览',
                            type: 'pie',
                            radius: ['65px', '140px'],
                            center: ['50%', '42%'],
                            label: {
                                position: 'inside',
                                formatter: '{d}%',
                                color: '#FFF',
                                fontSize: 18
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                itemStyle: {
                                    borderWidth: 20,
                                    borderColor: 'red'
                                }
                            },
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                if (!chart) {
                    chart = echarts.init(document.getElementById('mirror-total-coverage-pie-chart'));
                }
                chart.dispatchAction({
                    type: 'pieSelect',
                    // 可选，系列 index，可以是一个数组指定多个系列
                    seriesIndex: '0',
                    // 可选，系列名称，可以是一个数组指定多个系列
                    seriesName: '华南',
                    // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                    dataIndex: 1,

                });
                chart.setOption(option);
                chart.resize();
            }
        }
    })


    //全国根镜像所在网络分布
    Vue.component('left-three', {
        template: '\
        <common-layout-side-item-unit title="全国根镜像所在网络分布" unitStr="个">\
            <div class="mirror-node-total-container">\
                <div class="left-chart-body" id="left-three-bar-chart"></div>\
            </div>\
        </common-layout-side-item-unit>\
        ',
        data: function () {
            return {
                dataList: []
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                self.dataList = [{nodeName: '01A', count: 3}, {nodeName: '02A', count: 3}, {
                    nodeName: '03A',
                    count: 3
                }, {nodeName: '04A', count: 3}, {nodeName: '05A', count: 3}, {nodeName: '06A', count: 3}, {
                    nodeName: '07A',
                    count: 3
                }, {nodeName: '08A', count: 3}, {nodeName: '09A', count: 3}, {nodeName: '10A', count: 3}, {
                    nodeName: '11A',
                    count: 3
                }, {nodeName: '12A', count: 3}, {nodeName: '13A', count: 3}, {nodeName: '14A', count: 3}]

                // self.setChartOption(['移动网', '电信网', '联通网', '科技网', '教育网'], [6, 6, 9, 9, 5]);
                self.setChartOption(['移动网', '电信网', '联通网', '科技网', '教育网'], [2, 7, 3, 2, 0]);
            })
        },
        methods: {
            setChartOption: function (xAxisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById('left-three-bar-chart'));
                var option = {
                    color: ['#73AEFE'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: {
                        // text: '单位：个',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 20,
                        },
                        left: 0,
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            show: true,
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 20
                            }

                        }
                    ],
                    yAxis: [
                        {
                            show: true,
                            type: 'value',
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(120, 221, 255, 1)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 30
                            },
                            splitLine: {
                                show: false
                            },
                        }
                    ],
                    series: [
                        {
                        name: 'a',
                        tooltip: {
                            show: false
                        },
                        type: 'bar',
                        barWidth: 30,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#0B4EC3" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "#138CEB" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#17AAFE" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: data,
                        barGap: 0,
                            // barMinHeight:1,
                    },
                        {
                        type: 'bar',
                        barWidth: 8,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#09337C" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "#0761C0" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#0575DE" // 100% 处的颜色
                                }], false)
                            }
                        },
                        barGap: 0,
                            // barMinHeight:1,
                        tooltip: {
                            show: false
                        },
                        data: data
                    },
                        {
                        name: 'b',
                        tooltip: {
                            show: false
                        },
                            barMinHeight:1,
                        type: 'pictorialBar',
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "rgba(7, 199, 222, 1)",
                                fontSize: 24
                            },
                            formatter: function(params) {
                                if (params.value > 0) {
                                    return params.value;
                                } else {
                                    return " 0";
                                }
                            },
                        },
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#0571D5',
                            color: '#1779E0'
                        },
                        symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                        symbolSize: ['30', '12'],
                        symbolOffset: ['0', '-11'],
                        //symbolRotate: -5,
                        symbolPosition: 'end',
                        data: data,
                        z: 3
                    }]
                };


                if (!chart) {
                    chart = echarts.init(document.getElementById('left-three-bar-chart'));
                }
                chart.setOption(option);
                chart.resize();
            }
        },
        computed: {
            verticalLineCount: function () {
                var count = 0;
                if (this.dataList.length % 7 == 0) {
                    count = this.dataList.length % 7;
                } else {
                    count = parseInt(this.dataList.length / 7) + 1;
                }
                return count;
            }
        }
    })


    // 全国根镜像所属类型分布
    Vue.component('mirror-node-total', {
        template: '\
        <common-layout-side-item-unit title="全国根镜像所属类型分布" unitStr="个">\
            <div class="mirror-node-total-container">\
                <div class="left-chart-body" id="mirror-node-total-bar-chart"></div>\
            </div>\
        </common-layout-side-item-unit>\
        ',
        data: function () {
            return {
                dataList: []
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                self.dataList = [{nodeName: 'A', count: 0}, {nodeName: 'B', count: 0}, {
                    nodeName: 'C',
                    count: 0
                }, {nodeName: 'D', count: 0}, {nodeName: 'E', count: 0}, {nodeName: 'F', count: 3}, {
                    nodeName: 'G',
                    count: 0
                }, {nodeName: 'H', count: 0}, {nodeName: 'I', count: 1}, {nodeName: 'J', count: 1}, {
                    nodeName: 'K',
                    count: 3
                }, {nodeName: 'L', count: 6}, {nodeName: 'M', count: 0}]

                self.setChartOption(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'], [0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 3, 6, 0]);
                /*$.ajax({
                    url: "afternew/getrootdeploybytype",
                    async: false,
                    success: function (result) {
                        self.setChartOption(result.xdata, result.ydata);
                    },
                    error: function () {
                    }
                });*/

            })
        },
        methods: {
            setChartOption: function (xAxisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById('mirror-node-total-bar-chart'));
                var option = {
                    color: ['#73AEFE'],
                    tooltip: {
                        show: false,
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: {
                        // text: '单位：个',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 20,
                        },
                        left: 0,
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '1%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            show: true,
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 30
                            }

                        }
                    ],
                    yAxis: [
                        {
                            show: true,
                            type: 'value',
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(120, 221, 255, 1)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 30
                            },
                            splitLine: {
                                show: false
                            },
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: 15,
                            label: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "rgba(7, 199, 222, 1)",
                                    fontSize: 24
                                }
                            },
                            itemStyle: {
                                barBorderRadius: 7,
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(7, 199, 222, 1)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(5, 86, 164, 1)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },

                            data: data
                        }
                    ]
                };


                if (!chart) {
                    chart = echarts.init(document.getElementById('mirror-node-total-bar-chart'));
                }
                chart.setOption(option);
                chart.resize();
            }
        },
        computed: {
            verticalLineCount: function () {
                var count = 0;
                if (this.dataList.length % 7 == 0) {
                    count = this.dataList.length % 7;
                } else {
                    count = parseInt(this.dataList.length / 7) + 1;
                }
                return count;
            }
        }
    })

    // 中间下部区域
    // 中间下部左侧区域
    // 全国根镜像访问流量变化趋势
    Vue.component('center-bottom-left', {
        template: `
            <common-layout-side-item-unit :title="\'全国根镜像访问流量变化趋势\'" unitStr="万次">\
            <el-date-picker
                class="timeSelect"
                v-model="month1"
                type="month"
                align="center"
                placeholder="开始时间">
            </el-date-picker>
            
            <div class="fenge">-</div>
            
            <el-date-picker
                class="timeSelect timeSelect-two"
                v-model="month2"
                type="month"
                placeholder="结束时间">
            </el-date-picker>
            
            <el-select v-model="value" class="dark-mode-select smallSelect" popper-class="dark-mode-select-popper" placeholder="请选择">\
                <el-option\
                v-for="item in selectOption"\
                :key="item.value"\
                :label="item.label"\
                :value="item.value">\
                </el-option>\
            </el-select>\
                <div class="mirror-flow-trend-container">\
                    <div class="carousel-chart-container" v-for="item in dataList" :key="item" :style="{height:value==item.nodeName?'100%':0}"> \
                        <div v-show="value==item.nodeName"  class="chart-item" :id="item.nodeName + \'-center-bottom-left\'">\
                    </div>\
                </div>\
            </common-layout-side-item-unit>\
        `,
        data: function () {
            return {
                currentDataMode: 'week',
                dataList: [],
                value: 'F',
                currentNodeIndex: 0,
                month1: '',
                month2: '',
                selectOption: [{value: 'A', label: 'A'}, {value: 'B', label: 'B'}, {
                    value: 'C',
                    label: 'C'
                }, {value: 'D', label: 'D'}, {value: 'E', label: 'E'},
                    {value: 'F', label: 'F'}, {value: 'G', label: 'G'}, {value: 'H', label: 'H'}, {
                        value: 'I',
                        label: 'I'
                    }, {value: 'J', label: 'J'},
                    {value: 'K', label: 'K'}, {value: 'L', label: 'L'}, {value: 'M', label: 'M'}],
            }
        },
        methods: {
            handleDataFilterClick: function (mode) {
                this.currentDataMode = mode;
                this.getNodeDataList();
            },
            getNodeDataList: function () {
                var self = this;
                setTimeout(function () {
                    var AData = [];
                    var BData = [];
                    var CData = [];
                    var DData = [];
                    var EData = [];
                    var FData = [];
                    var GData = [];
                    var HData = [];
                    var IData = [];
                    var JData = [];
                    var KData = [];
                    var LData = [];
                    var MData = [];
                    FData = [
                        {
                            name: 'JX001F',
                            data: [20, 10, 15, 5, 30, 8, 6],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgba(1, 219, 225, 1)'
                            },
                        },
                        {
                            name: 'JX002F',
                            data: [15, 11, 16, 8, 20, 11, 25],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(1,128,225)'
                            },
                        }];
                    IData = [
                        {
                            name: 'JX003I',
                            data: [5, 8, 10, 15, 20, 25, 30],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgba(1, 219, 225, 1)'
                            },
                        }];
                    JData = [
                        {
                            name: 'JX011J',
                            data: [11, 3, 7, 15, 8, 8, 10],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgba(1, 219, 225, 1)'
                            },
                        }, {
                            name: 'JX011J',
                            data: [11, 14, 12, 8, 22, 15, 21],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(1,128,225)'
                            },
                        }];
                    KData = [
                        {
                            name: 'JX004K',
                            data: [20, 10, 15, 5, 30, 8, 6],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgba(1, 219, 225, 1)'
                            },
                        }, {
                            name: 'JX010K',
                            data: [14, 19, 12, 17, 30, 10, 5],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(1,128,225)'
                            },
                        }, {
                            name: 'JX012K',
                            data: [15, 12, 16, 8, 28, 22, 12],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(21,136,73)'
                            },
                        }];
                    LData = [
                        {
                            name: 'JX005L',
                            data: [15, 1, 16, 5, 20, 11, 30],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',
                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgba(1, 219, 225, 1)'
                            },
                        }, {
                            name: 'JX006L',
                            data: [11, 5, 11, 9, 25, 16, 25],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(1,128,225)'
                            },
                        }, {
                            name: 'JX007L',
                            data: [20, 10, 15, 5, 30, 8, 6],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(21,136,73)'
                            },
                        }, {
                            name: 'JX008L',
                            data: [14, 12, 16, 8, 28, 22, 12],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(163,122,10)'
                            },
                        }, {
                            name: 'JX009L',
                            data: [4, 5, 12, 7, 28, 16, 23],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(221,204,16)'
                            },
                        }, {
                            name: 'JX013L',
                            data: [7, 9, 14, 9, 21, 20, 25],
                            type: 'line',
                            symbol: 'circle',
                            symbolSize: 15,
                            smooth: true,
                            itemStyle: {
                                color: '#fff',

                            },
                            lineStyle: {
                                width: 5,
                                color: 'rgb(105,66,168)'
                            },
                        }];


                    self.dataList = [
                        {
                            nodeName: 'A',
                            data: {
                                xAxisData: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7'],
                                data: AData
                            }
                        }, {
                            nodeName: 'B',
                            data: {
                                xAxisData: ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7'],
                                data: BData
                            }
                        }, {
                            nodeName: 'C',
                            data: {
                                xAxisData: ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'],
                                data: CData
                            }
                        }, {
                            nodeName: 'D',
                            data: {
                                xAxisData: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
                                data: DData
                            }
                        }, {
                            nodeName: 'E',
                            data: {
                                xAxisData: ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7'],
                                data: EData
                            }
                        }, {
                            nodeName: 'F',
                            data: {
                                xAxisData: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7'],
                                data: FData
                            }
                        }, {
                            nodeName: 'G',
                            data: {
                                xAxisData: ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7'],
                                data: GData
                            }
                        }, {
                            nodeName: 'H',
                            data: {
                                xAxisData: ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'],
                                data: HData
                            }
                        }, {
                            nodeName: 'I',
                            data: {
                                xAxisData: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
                                data: IData
                            }
                        }, {
                            nodeName: 'J',
                            data: {
                                xAxisData: ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7'],
                                data: JData
                            }
                        }, {
                            nodeName: 'K',
                            data: {
                                xAxisData: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7'],
                                data: KData
                            }
                        }, {
                            nodeName: 'L',
                            data: {
                                xAxisData: ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7'],
                                data: LData
                            }
                        }, {
                            nodeName: 'M',
                            data: {
                                xAxisData: ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'],
                                data: MData
                            }
                        }]
                })
            },
            setChartOption: function (chartId, xAxisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById(chartId));
                var option = {
                    color: ['#25C125'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '15%',
                        containLabel: true,
                    },
                    title: {
                        // text: '单位：万次',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 20,
                        },
                        left: 0,
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            color: 'rgba(120, 221, 255, 1)',
                            fontSize: 30
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#78DDFF'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#78DDFF'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#78DDFF'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(120, 221, 255, 1)',
                            fontSize: 30
                        }
                    },
                    series: data
                };

                if (!chart) {
                    chart = echarts.init(document.getElementById(chartId));
                }
                chart.setOption(option);
                chart.resize();

            },
            carouselChange: function (index) {
                this.currentNodeIndex = index;
            }
        },
        mounted: function () {
            var self = this;
            this.getNodeDataList();
        },
        updated: function () {
            for (var i = 0; i < this.dataList.length; i++) {
                var item = this.dataList[i];
                // 方法的后面两个参数可以通过 item.data 获取
                this.setChartOption(item.nodeName + '-center-bottom-left', item.data.xAxisData, item.data.data)
            }
        },
        computed: {
            currentNode: function () {
                if (this.dataList.length > 0) {
                    return this.dataList[this.currentNodeIndex];
                } else {
                    return {}
                }
            }
        },
    })

    // 中间下部右侧区域 已引入根镜像解析流量统计
    Vue.component('center-bottom-right', {
        template: `\
        <common-layout-side-item title="已引入根镜像解析流量统计(万次)">\
            <el-date-picker
            class="timeSelect center-b-r-s"
            v-model="selectTime"
            type="month"
            placeholder="本月">
            </el-date-picker>
            <div class="mirror-node-total-container">\
                <div class="left-chart-body" id="center-bottom-right-bar-chart"></div>\
            </div>\
        </common-layout-side-item>\
        `,
        data: function () {
            return {
                dataList: [],
                selectTime: '',
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                self.dataList = [{nodeName: '01A', count: 3}, {nodeName: '02A', count: 3}, {
                    nodeName: '03A',
                    count: 3
                }, {nodeName: '04A', count: 3}, {nodeName: '05A', count: 3}, {nodeName: '06A', count: 3}, {
                    nodeName: '07A',
                    count: 3
                }, {nodeName: '08A', count: 3}, {nodeName: '09A', count: 3}, {nodeName: '10A', count: 3}, {
                    nodeName: '11A',
                    count: 3
                }, {nodeName: '12A', count: 3}, {nodeName: '13A', count: 3}, {nodeName: '14A', count: 3}]

                self.setChartOption(['01A', '02A', '03A', '04A', '05A', '06A', '07A', '08A', '09A', '10A', '11A', '12A', '13A', '14A'], [16, 9, 12, 14, 11, 17, 8, 16, 11, 20, 4, 11, 5, 15]);
            })
        },
        methods: {
            setChartOption: function (xAxisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById('center-bottom-right-bar-chart'));
                var option = {
                    color: ['#73AEFE'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    title: {
                        // text: '单位：万次',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 20,
                        },
                        left: 0,
                    },
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            boundaryGap: false,
                            show: true,
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#78DDFF'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 18
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false,
                                alignWithLabel: true
                            },

                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: 'rgba(120, 221, 255, 1)'
                                }
                            },
                            axisLabel: {
                                color: 'rgba(120, 221, 255, 1)',
                                fontSize: 30,
                                margin: 20
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#78DDFF'
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            showBackground: true,

                            backgroundStyle: {
                                color: 'rgba(22,208,144,0.15)',
                                borderWidth: 150

                            },
                            name: '',
                            type: 'bar',
                            barWidth: 12,
                            // label:{
                            //     show:true,
                            //     position:"top",
                            //     textStyle:{
                            //         color:"rgba(7, 199, 222, 1)",
                            //         fontSize:24
                            //     }
                            // },
                            itemStyle: {
                                barBorderRadius: 7,
                                color: '#29dadf',
                            },

                            data: data
                        }
                    ]
                };


                if (!chart) {
                    chart = echarts.init(document.getElementById('center-bottom-right-bar-chart'));
                }
                chart.setOption(option);
                chart.resize();
            }
        },
        computed: {
            verticalLineCount: function () {
                var count = 0;
                if (this.dataList.length % 7 == 0) {
                    count = this.dataList.length % 7;
                } else {
                    count = parseInt(this.dataList.length / 7) + 1;
                }
                return count;
            }
        }
    })


    // 查询
    Vue.component("data-search-count-chart", {
        template: `\
        <common-layout-side-item title="">\
            <div class="data-search-count-chart-container">\
                <div class="search-container">\
                    <div class="condition-item">\
                        <div class="name" style="width: 80px;margin-right: 10px">省份</div>\
                        <div class="input-item" style="width:calc(100% - 90px)">\
                            <el-select v-model="params.area" class="dark-mode-select largeSelect" popper-class="dark-mode-select-popper" placeholder="请选择">\
                                <el-option\
                                  v-for="item in areaOption"\
                                  :key="item.code"\
                                  :label="item.name"\
                                  :value="item.code">\
                                </el-option>\
                            </el-select>\
                        </div>\
                    </div>\
                    <div class="condition-item">\
                        <div class="name" style="width:120px;margin-right: 10px">运营商</div>\
                        <div class="input-item" style="width: calc(100% - 130px)">\
                            <el-select v-model="params.operator" class="dark-mode-select largeSelect" popper-class="dark-mode-select-popper" placeholder="请选择">\
                                <el-option\
                                  v-for="item in operatorOption"\
                                  :key="item.code"\
                                  :label="item.name"\
                                  :value="item.code">\
                                </el-option>\
                            </el-select>\
                        </div>\
                    </div>\
                    <div class="condition-item">\
                        <div class="name" style="width: 200px;margin-right: 10px">访问根类型</div>\
                        <div class="input-item" style="width:calc(100% - 210px)">\
                             <el-select v-model="params.node" class="dark-mode-select largeSelect" popper-class="dark-mode-select-popper" placeholder="请选择">\
                                <el-option\
                                  v-for="item in nodeOption"\
                                  :key="item.code"\
                                  :label="item.name"\
                                  :value="item.code">\
                                </el-option>\
                            </el-select>\
                        </div>\
                    </div>\
                </div>\
                <div class="chart-compare-container">\
                <div class="nowValue"><span class="nowValue-first"></span><span class="nowValue-second">当前值</span><span class="nowValue-value">{{nowValue}}</span></div>
                    <div class="compare-title">访问时延变化趋势<span style="font-size: 24px">(ms)</span></div>\
                    <div class="compare-charts" id="timeout-line-chart-container">\
                    
                    </div>\
                </div>\
                <div class="chart-compare-container">\
                <div class="nowValue"><span class="nowValue-first"></span><span class="nowValue-second">当前值</span><span class="nowValue-value">{{nowValue}}</span></div>
                    <div class="compare-title">出境流量变化趋势<span style="font-size: 24px">(万次)</span></div>\
                    <div class="compare-charts" id="flow-line-chart-container">\
                   
                    </div>\\
                </div>
            </div>\
        </common-layout-side-item>\
        `,
        data: function () {
            return {
                params: {
                    node: 'A',
                    area: '北京',
                    operator: 'yd',
                },
                nowValue: 340,
                nodeOption: [],
                areaOption: [],
                operatorOption: [{name: '全部', code: 'qb'}, {name: '移动', code: 'yd'}, {
                    name: '电信',
                    code: 'dx'
                }, {name: '联通', code: 'lt'}]
            }
        },
        methods: {
            setChartOption: function (chartId, xAxisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById(chartId));
                var option = {
                    grid: {
                        show: false,
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true,
                    },
                    /*title: {
                        text: '单位：Mbps',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 30,
                        },
                        left: 0
                    },*/
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisTick: {
                            show: true,
                        },
                        axisLabel: {
                            color: 'rgba(120, 221, 255, 1)',
                            margin: 20,
                            fontSize: 17
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#78DDFF'
                            }
                        },
                        boundaryGap: false
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: true
                        },
                        axisTick: {
                            show: true,
                            length: 10,
                            lineStyle: {
                                color: '#78DDFF',
                                width: 5
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#78DDFF'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(120, 221, 255, 1)',
                            fontSize: 20,
                            margin: 20
                        }
                    },
                    series: [{
                        data: data,
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 15,
                        smooth: false,
                        itemStyle: {
                            color: '#fff',

                        },
                        lineStyle: {
                            width: 5,
                            color: 'rgba(1, 219, 225, 1)'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(0, 218, 224, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(3, 83, 154, 1)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }],
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        },
                        formatter: '{c}',
                    }

                };
                if (!chart) {
                    chart = echarts.init(document.getElementById(chartId));
                }
                chart.setOption(option);
                chart.resize();

            },

        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                self.nodeOption = [{name: '全部', code: 'all'}, {name: 'A', code: 'A'}, {
                    name: 'B',
                    code: 'B'
                }, {name: 'C', code: 'C'}, {
                    name: 'D',
                    code: 'D'
                }, {name: 'E', code: 'E'}, {name: 'F', code: 'F'}, {name: 'G', code: 'G'}, {
                    name: 'H',
                    code: 'H'
                }, {name: 'I', code: 'I'}, {name: 'J', code: 'J'}, {name: 'K', code: 'K'}, {
                    name: 'L',
                    code: 'L'
                }, {name: 'M', code: 'M'}];
                self.areaOption = [{name: '全国', code: '全国'}, {name: '广东', code: '广东'}, {
                    name: '四川',
                    code: '四川'
                }, {name: '上海', code: '上海'},
                    {name: '陕西', code: '陕西'}, {name: '江苏', code: '江苏'}, {name: '福建', code: '福建'}, {
                        name: '浙江',
                        code: '浙江'
                    },
                    {name: '辽宁', code: '辽宁'}, {name: '河南', code: '河南'}, {name: '山东', code: '山东'}, {
                        name: '湖北',
                        code: '湖北'
                    },
                    {name: '广西', code: '广西'}, {name: '湖南', code: '湖南'}, {name: '重庆', code: '重庆'}, {
                        name: '江西',
                        code: '江西'
                    },
                    {name: '贵州', code: '贵州'}, {name: '安徽', code: '安徽'}, {name: '海南', code: '海南'}, {
                        name: '甘肃',
                        code: '甘肃'
                    },
                    {name: '新疆', code: '新疆'}, {name: '黑龙江', code: '黑龙江'}, {name: '宁夏', code: '宁夏'}, {
                        name: '北京',
                        code: '北京'
                    },
                    {name: '云南', code: '云南'}, {name: '吉林', code: '吉林'}, {name: '内蒙古', code: '内蒙古'}, {
                        name: '天津',
                        code: '天津'
                    }, {name: '山西', code: '山西'}, {name: '青海', code: '青海'}, {name: '河北', code: '河北'}, {
                        name: '西藏',
                        code: '西藏'
                    }];
                /*self.nodeOption = [{name: 'A', code: 'A'}, {name: 'B', code: 'B'}, {name: 'C', code: 'D'}];
                self.areaOption = [{name: '北京', code: 'beijing'}, {name: '广东', code: 'guangdong'}];*/
                self.setChartOption('timeout-line-chart-container', ["2018-09", '2018-10', '2018-11', '2018-12', '2019-02', '2019-02', '2019-03'], [15, 25, 35, 80, 20, 49, 20])
                self.setChartOption('flow-line-chart-container', ["2018-09", '2018-10', '2018-11', '2018-12', '2019-02', '2019-02', '2019-03'], [15, 25, 35, 80, 20, 49, 20])
            })
        }
    })

    // 顶部图例部分
    Vue.component('top-legend', {
        data: function () {
            return {}
        },
        template: '<div class="top-legend-container"><div class="legend-item"><div class="color" style="background-color:#938A0B "></div><div class="text" style="color:#CBBF16 ">引入前</div></div><div class="legend-item"><div class="color" style="background-color:#25C125 "></div><div class="text" style="color:#25C125 ">引入后</div></div></div>'
    });

    // 右下方筛选条件
    Vue.component('bottom-filter', {
        data: function () {
            return {}
        },
        template: '<div class="bottom-filter-container"><div class="filter-item"><div class="color blue"></div><div class="text">引入前高时延TOP5省份</div></div><div class="filter-item"><div class="color yellow"></div><div class="text">引入前出镜流量TOP5省份</div></div></div>'
    });

    Vue.component('right2', {
        data: function () {
            return {}
        },
        template: '\
            <common-layout-side-item-unit title="全国根镜像抗流量攻击指标变化趋势" unitStr="Mbps">\
                <div class="right2-container" id="anti-attack-flow-bar-chart">\
                </div>\
            </common-layout-side-item-unit>\
        ',

        methods: {
            setOption: function (axisData, data) {
                var chart = echarts.getInstanceByDom(document.getElementById("anti-attack-flow-bar-chart"));
                if (!chart) {
                    chart = echarts.init(document.getElementById("anti-attack-flow-bar-chart"));
                }
                var option = {
                    legend: {
                        show: false,
                        data: ['before', 'after']
                    },
                    title: {
                        // text: '单位：Mbps',
                        textStyle: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 20,
                        },
                        left: 0
                    },
                    xAxis: {
                        data: axisData,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 30,
                            interval: 0
                        }
                    },
                    grid: {
                        top: 60,
                        right: 20,
                        left: 80,
                        bottom: 50
                    },
                    yAxis: [{
                        // name: '单位:Mbps',
                        // nameTextStyle: {
                        //     color: 'rgba(84, 179, 234, 1)',
                        //     fontSize: 20,
                        //     align: 'center'
                        // },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#FFFFFF'
                            }
                        },
                        axisLabel: {
                            color: 'rgba(84, 179, 234, 1)',
                            fontSize: 30
                        },
                    }],
                    series: [
                        {
                            // 内
                            type: "bar",
                            barWidth: 30,
                            name: 'after',
                            label: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 30
                                }
                            },
                            legendHoverLink: false,
                            silent: true,
                            itemStyle: {

                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(220, 238, 255, 1)" // 0% 处的颜色
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(52, 59, 76, 1)" // 100% 处的颜色
                                        }
                                    ]
                                }
                            },
                            data: data,
                            z: 1,
                            animationEasing: "elasticOut"
                        },
                        {
                            // 分隔
                            type: "pictorialBar",
                            name: 'after',
                            barWidth: 30,
                            itemStyle: {
                                color: "#0D234E"
                            },
                            symbolRepeat: "fixed",
                            symbolMargin: 5,
                            symbol: "rect",
                            symbolClip: true,
                            symbolSize: [30, 5],
                            symbolPosition: "start",
                            symbolOffset: [1, -1],
                            symbolBoundingData: this.total,
                            data: data,
                            z: 2,
                            animationEasing: "elasticOut"
                        },

                    ]
                };
                chart.setOption(option);
                chart.resize();
            }
        },
        mounted: function () {
            var self = this;
            setTimeout(function () {
                self.setOption(['F', 'I', 'J', 'K', 'L'], [120, 200, 150, 80, 70])
            });
        }

    })

})(window)