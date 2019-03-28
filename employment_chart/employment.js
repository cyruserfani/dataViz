// Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var mainContainer = am4core.create("chartdiv", am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";

    var usData = [
        { 'industry': 'Goods Producting', 'male': [385.8, 355.0, 354.1, 346.8, 350.4, 355.9, 362.5, 365.7, 377.3, 390.2], 'female': [100.3, 86.3, 82.4, 84.9, 91.1, 86.2, 87.4, 93.3, 92.9, 101.5] },
        { 'industry': 'Construction', 'male': [188.9, 181.1, 177.3, 177.4, 172.3, 179.7, 176.1, 176.6, 186.8, 201.3], 'female': [29.2, 22.6, 21.1, 19.7, 26.3, 24.7, 24.4, 24.9, 24.5, 27.3] },
        { 'industry': 'Manufacturing', 'male': [131.2, 111.6, 114.9, 112.3, 121.2, 112.9, 119.5, 125.8, 125.3, 122.4], 'female': [46.7, 42.8, 39.7, 44.5, 43.6, 38.8, 41.8, 46.8, 44.8, 51.8] },
        { 'industry': 'Service', 'male': [804.0, 786.7, 807.2, 816.3, 819.5, 816.8, 827.1, 844.7, 862.8, 886.1], 'female': [951.8, 963.9, 979.3, 979.8, 1001.5, 1006.6, 1001.5, 1002.5, 1046.6, 1088.9] },
        { 'industry': 'Transportation', 'male': [94.9, 86.7, 89.8, 93.5, 98.1, 99.7, 100.0, 108.4, 103.9, 105.9], 'female': [28.9, 26.9, 27.9, 28.9, 31.2, 27.6, 33.8, 31.6, 33.9, 33.4] },
        { 'industry': 'Finance', 'male': [58.1, 60.5, 60.7, 62.5, 57.6, 63.7, 56.5, 57.6, 60.7, 72.6], 'female': [80.6, 72.2, 79.1, 77.1, 78.9, 75.9, 80.7, 71.0, 75.1, 83.6] },
        { 'industry': 'Technical Services', 'male': [91.4, 87.5, 88.8, 96.5, 97.3, 101.7, 99.7, 106.7, 104.9, 105.6], 'female': [74.2, 72.3, 74.3, 77.6, 72.9, 76.6, 82.7, 81.4, 90.5, 91.6] },
        { 'industry': 'Education', 'male': [54.3, 51.1, 53.8, 53.8, 60.2, 55.3, 55.8, 56.8, 52.6, 54.8], 'female': [99.0, 95.9, 98.1, 101.5, 104.4, 111.4, 110.4, 106.6, 112.4, 111.8] },
        { 'industry': 'Health Care', 'male': [48.5, 48.0, 46.5, 49.3, 51.6, 48.0, 49.5, 55.4, 53.4, 58.5], 'female': [192.7, 209.0, 217.3, 213.2, 223.6, 219.2, 220.3, 232.0, 238.2, 245.0] },
        {
            'industry': 'Arts', 'male': [61.3, 60.1, 62.0, 58.7, 62.9, 55.3, 59.3, 62.2, 73.6, 78.2], 'female': [50.9, 51.8, 50.1, 48.9, 46.0, 52.1, 48.4, 52.3, 53.0, 58.6]
        }];

    var mapChart = mainContainer.createChild(am4maps.MapChart);
    mapChart.projection = new am4maps.projections.Mercator();
    mapChart.geodata = am4geodata_canadaLow;
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zIndex = -1;

    var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries())
    polygonSeries.useGeodata = true;

    var selectedStateId = "BC";
    var selectedPolygon;
    var selectedStateName;

    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.togglable = true;

    var hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = mapChart.colors.getIndex(2);

    var activeState = polygonTemplate.states.create("active");
    activeState.properties.fill = mapChart.colors.getIndex(6);

    polygonTemplate.events.on("hit", function (event) {
        var id = event.target.dataItem.dataContext.id;
        var stateId = id.split("-")[1];
        showState(stateId, event.target.dataItem.dataContext.name, event.target);
    })


    mapChart.seriesContainer.background.events.on("over", function (event) {
        showState(selectedStateId, selectedStateName, selectedPolygon);
    });

    var label = mainContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.x = am4core.percent(12);
    label.horizontalCenter = "middle";
    label.y = 50;
    label.showOnInit = true;
    label.text = "";
    label.hiddenState.properties.dy = -100;


    var male_female_container = mainContainer.createChild(am4core.Container);
    male_female_container.layout = "vertical";
    male_female_container.width = am4core.percent(100);
    male_female_container.height = am4core.percent(100);

    var chartContainer = male_female_container.createChild(am4core.Container);
    chartContainer.layout = "horizontal";
    chartContainer.width = am4core.percent(100);
    chartContainer.height = am4core.percent(100);

    var maleChart = chartContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "industry";
    maleCategoryAxis.renderer.grid.template.location = 0;
    maleCategoryAxis.renderer.minGridDistance = 15;

    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 2000;
    maleValueAxis.strictMinMax = true;


    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "male";
    //maleSeries.dataFields.valueXShow = "percent";
    maleSeries.dataFields.categoryY = "industry";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Males, industry{categoryY}: {valueX} ({valueX}thousands)";
    //maleSeries.sequencedInterpolation = true;


    var femaleChart = chartContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data = JSON.parse(JSON.stringify(usData));

    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "industry";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;

    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 2000;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "female";
    //femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText = "Females, industry{categoryY}: {valueX} ({valueX}thousands)";
    femaleSeries.dataFields.categoryY = "industry";
    femaleSeries.interpolationDuration = 1000;


    var startYear = 2008;
    var endYear = 2017;
    var currentYear = 2013;
    var currentID;

    var yearSliderContainer = male_female_container.createChild(am4core.Container);
    yearSliderContainer.layout = "vertical";
    yearSliderContainer.padding(0, 38, 0, 38);
    yearSliderContainer.width = am4core.percent(100);

    var yearSlider = yearSliderContainer.createChild(am4core.Slider);
    yearSlider.events.on("rangechanged", function () {
        updateSliderData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
    })
    yearSlider.orientation = "horizontal";
    yearSlider.start = 0.5;
    yearSlider.exportable = false;

    var yearLabel = yearSliderContainer.createChild(am4core.Label);
    yearLabel.fill = am4core.color("#673AB7");
    yearLabel.fontSize = 30;
    yearLabel.paddingLeft = 400;
    yearLabel.text = String(currentYear);

    function updateSliderData(year) {
        if (currentYear != year) {
            currentYear = year;
            yearLabel.text = String(currentYear);
            if (currentID !== undefined) {
                var selectData = stateData[currentID];
                for (var i = 0; i < femaleChart.data.length; i++) {
                    femaleChart.data[i].female = selectData[i].female[year - startYear];
                    maleChart.data[i].male = selectData[i].male[year - startYear];
                }
                femaleChart.invalidateRawData();
                maleChart.invalidateRawData();
            }
        }
    }


    function showState(id, stateName, polygon) {
        if (selectedStateId != id) {

            var newData = stateData[id];
            currentID = id;
            console.log(id);

            if (selectedPolygon) {
                selectedPolygon.isActive = false;
            }
            for (var i = 0; i < femaleChart.data.length; i++) {
                femaleChart.data[i].female = newData[i].female[currentYear - 2008];
                maleChart.data[i].male = newData[i].male[currentYear - 2008];
            }

            femaleChart.invalidateRawData();
            maleChart.invalidateRawData();

            selectedStateName = stateName;
            selectedStateId = id;
            selectedPolygon = polygon;

            label.text = stateName + " " + "salary (male/female)";
            label.fontSize = 21;
            label.hide(0);
            label.show();
        }
    }
    var stateData = {
        'NL': [{
            'industry': 'Goods Producting',
            'male': [41.6, 38.8, 38.8, 42.9, 44.5, 46.4, 45.9, 45.1, 41.6, 38.6],
            'female': [8.9, 7.6, 8.4, 8.0, 9.1, 9.4, 8.7, 9.0, 8.8, 8.2]
        }, {
            'industry': 'Construction',
            'male': [16.1, 15.1, 15.3, 17.4, 18.7, 20.8, 20.1, 20.2, 19.7, 18.3],
            'female': [1.4, 1.6, 1.2, 1.8, 1.8, 2.0, 2.5, 2.4, 2.2, 2.4]
        }, {
            'industry': 'Manufacturing',
            'male': [9.5, 8.4, 6.9, 7.7, 8.6, 8.5, 8.3, 8.0, 7.1, 6.1],
            'female': [4.5, 3.5, 3.4, 3.0, 3.5, 3.1, 2.3, 3.5, 2.7, 2.9]
        }, {
            'industry': 'Service',
            'male': [73.0, 71.1, 73.5, 76.0, 79.7, 78.8, 76.4, 74.2, 76.2, 72.4],
            'female': [97.7, 97.7, 102.1, 105.0, 107.5, 108.2, 107.6, 107.9, 105.9, 104.9]
        }, {
            'industry': 'Transportation',
            'male': [8.6, 8.8, 9.7, 8.4, 9.1, 8.7, 9.0, 7.8, 7.2, 8.2],
            'female': [2.2, 2.7, 2.5, 2.8, 2.3, 2.5, 2.7, 2.2, 2.5, 3.0]
        }, {
            'industry': 'Finance',
            'male': [3.3, 2.7, 2.8, 3.1, 3.8, 3.6, 3.7, 3.8, 3.8, 2.3],
            'female': [4.1, 3.7, 4.1, 4.5, 4.6, 4.8, 4.9, 4.5, 4.1, 4.0]
        }, {
            'industry': 'Technical Services',
            'male': [4.7, 3.9, 4.0, 5.4, 6.1, 5.8, 6.4, 7.0, 5.5, 5.4],
            'female': [3.4, 3.5, 2.8, 3.7, 4.0, 3.6, 4.2, 4.3, 5.0, 4.4]
        }, {
            'industry': 'Education',
            'male': [6.3, 5.9, 6.9, 7.3, 7.0, 6.9, 6.3, 6.3, 5.6, 5.5],
            'female': [9.9, 10.4, 9.9, 11.0, 11.6, 11.2, 11.3, 8.8, 8.7, 9.7]
        }, {
            'industry': 'Health Care',
            'male': [6.2, 5.6, 5.9, 7.6, 7.4, 6.7, 6.5, 6.2, 6.7, 6.6],
            'female': [26.8, 29.4, 31.4, 30.2, 31.6, 32.7, 31.0, 31.4, 32.5, 32.7]
        }, {
            'industry': 'Arts',
            'male': [4.8, 5.0, 4.2, 3.8, 4.3, 4.4, 4.0, 3.2, 3.8, 3.4],
            'female': [3.9, 4.1, 3.8, 3.3, 2.9, 2.6, 3.6, 4.1, 3.3, 3.1]
        }],
        'PE': [{
            'industry': 'Goods Producting',
            'male': [14.0, 13.5, 13.3, 14.1, 14.4, 14.0, 14.4, 13.4, 13.6, 13.9],
            'female': [3.3, 3.6, 3.2, 3.2, 3.4, 3.4, 3.6, 3.8, 3.0, 3.7]
        }, {
            'industry': 'Construction',
            'male': [4.8, 4.9, 4.7, 5.0, 4.8, 5.2, 5.2, 4.8, 4.4, 4.8],
            'female': [0.5, 0.6, 0.5, 0.3, 0.4, 0.3, 0.6, 0.4, 0.3, 0.6]
        }, {
            'industry': 'Manufacturing',
            'male': [4.2, 3.7, 3.5, 3.3, 3.4, 3.2, 3.7, 3.9, 4.3, 4.5],
            'female': [1.6, 1.7, 1.5, 1.5, 1.6, 1.7, 1.9, 2.1, 1.7, 2.0]
        }, {
            'industry': 'Service',
            'male': [20.7, 21.0, 22.0, 22.0, 22.2, 23.1, 22.9, 23.5, 22.4, 23.5],
            'female': [31.0, 30.0, 31.2, 32.6, 33.1, 33.6, 33.2, 32.4, 32.6, 32.6]
        }, {
            'industry': 'Transportation',
            'male': [2.2, 1.9, 1.6, 1.8, 2.0, 2.0, 2.3, 2.0, 1.8, 2.3],
            'female': [0.5, 0.4, 0.6, 0.4, 0.7, 0.4, 0.7, 0.5, 0.6, 0.4]
        }, {
            'industry': 'Finance',
            'male': [1.2, 1.2, 1.1, 1.0, 1.1, 0.9, 0.9, 1.1, 1.2, 1.2],
            'female': [1.6, 1.3, 1.2, 1.5, 1.2, 1.3, 1.4, 1.4, 1.5, 1.5]
        }, {
            'industry': 'Technical Services',
            'male': [1.3, 1.2, 1.5, 1.7, 1.9, 1.6, 1.5, 1.9, 2.1, 2.0],
            'female': [1.1, 1.0, 1.3, 1.3, 1.4, 1.5, 1.4, 1.2, 1.5, 1.5]
        }, {
            'industry': 'Education',
            'male': [1.7, 1.5, 1.9, 2.3, 1.9, 1.8, 1.9, 1.6, 1.6, 1.5],
            'female': [3.0, 3.2, 3.7, 4.0, 3.7, 3.8, 3.7, 3.7, 3.5, 3.8]
        }, {
            'industry': 'Health Care',
            'male': [1.2, 1.3, 1.6, 1.4, 1.4, 1.8, 1.6, 1.6, 1.5, 1.7],
            'female': [7.3, 7.3, 7.0, 7.5, 8.6, 9.0, 8.9, 8.3, 8.6, 8.8]
        }, {
            'industry': 'Arts',
            'male': [1.0, 1.3, 1.4, 1.3, 1.3, 1.6, 1.3, 1.5, 1.4, 1.5],
            'female': [1.2, 1.1, 1.0, 1.2, 1.1, 1.3, 1.3, 0.9, 1.2, 1.2]
        }],
        'NS': [{
            'industry': 'Goods Producting',
            'male': [75.6, 71.2, 72.4, 71.7, 71.1, 71.9, 69.4, 67.4, 67.6, 66.8],
            'female': [16.7, 17.1, 15.0, 15.4, 15.4, 14.9, 14.6, 15.6, 13.6, 14.5]
        }, {
            'industry': 'Construction',
            'male': [28.7, 27.3, 29.5, 29.7, 29.0, 31.2, 29.8, 30.0, 29.7, 28.5],
            'female': [2.4, 3.0, 3.1, 3.2, 3.3, 3.5, 4.2, 3.6, 3.2, 3.1]
        }, {
            'industry': 'Manufacturing',
            'male': [28.4, 25.8, 25.0, 25.5, 24.7, 22.9, 23.0, 20.5, 21.7, 23.6],
            'female': [10.5, 9.5, 7.6, 7.6, 8.1, 7.8, 6.9, 8.2, 7.4, 7.4]
        }, {
            'industry': 'Service',
            'male': [151.4, 153.5, 154.7, 156.2, 158.2, 154.8, 155.6, 157.4, 155.1, 156.3],
            'female': [207.9, 207.6, 209.1, 209.7, 212.9, 211.1, 208.0, 207.7, 209.9, 211.4]
        }, {
            'industry': 'Transportation',
            'male': [14.0, 15.0, 15.0, 15.9, 16.1, 14.1, 16.4, 16.7, 16.0, 15.5],
            'female': [4.3, 4.9, 4.5, 4.9, 4.8, 5.5, 4.5, 3.8, 4.3, 4.0]
        }, {
            'industry': 'Finance',
            'male': [8.5, 8.5, 9.3, 8.7, 9.0, 8.3, 9.2, 9.3, 9.9, 9.8],
            'female': [12.9, 12.4, 12.4, 13.8, 12.8, 12.5, 13.0, 14.2, 13.7, 13.0]
        }, {
            'industry': 'Technical Services',
            'male': [12.4, 11.8, 12.3, 12.8, 14.0, 14.6, 15.3, 16.6, 15.9, 17.0],
            'female': [8.2, 8.7, 8.7, 9.7, 9.9, 12.0, 10.9, 11.2, 11.6, 11.4]
        }, {
            'industry': 'Education',
            'male': [11.2, 12.3, 10.9, 11.0, 12.0, 12.3, 12.0, 12.3, 11.8, 13.2],
            'female': [22.1, 23.3, 22.5, 22.1, 23.6, 22.2, 23.4, 24.1, 24.9, 23.2]
        }, {
            'industry': 'Health Care',
            'male': [10.6, 10.7, 12.4, 10.2, 11.0, 11.4, 11.1, 12.7, 13.9, 12.1],
            'female': [52.3, 55.0, 55.6, 58.1, 59.6, 58.4, 58.1, 59.7, 61.0, 59.9]
        }, {
            'industry': 'Arts',
            'male': [10.7, 9.5, 10.3, 10.3, 10.8, 10.1, 11.1, 9.1, 8.7, 7.8],
            'female': [8.6, 7.9, 9.3, 8.9, 8.9, 8.2, 8.1, 8.4, 7.4, 8.2]
        }],
        'NB': [{
            'industry': 'Goods Producting',
            'male': [63.7, 64.3, 66.3, 66.5, 62.1, 63.4, 62.5, 59.1, 59.7, 59.2],
            'female': [16.2, 15.1, 13.8, 14.2, 13.6, 14.4, 13.7, 13.6, 13.2, 14.1]
        }, {
            'industry': 'Construction',
            'male': [22.8, 23.8, 27.4, 28.8, 25.2, 26.2, 26.0, 22.3, 21.6, 22.0],
            'female': [2.3, 2.0, 2.3, 1.9, 2.2, 2.6, 2.2, 2.4, 2.5, 2.8]
        }, {
            'industry': 'Manufacturing',
            'male': [23.6, 22.9, 22.9, 23.1, 21.0, 20.2, 20.8, 21.8, 23.3, 23.9],
            'female': [9.6, 8.7, 7.0, 8.3, 7.6, 8.0, 7.2, 7.9, 7.1, 7.8]
        }, {
            'industry': 'Service',
            'male': [119.1, 120.0, 116.7, 114.3, 117.3, 115.9, 116.8, 118.4, 117.2, 120.0],
            'female': [161.7, 160.6, 161.3, 160.4, 160.1, 160.8, 160.9, 160.7, 161.4, 159.7]
        }, {
            'industry': 'Transportation',
            'male': [14.9, 13.1, 13.6, 14.2, 13.7, 13.5, 11.5, 14.0, 15.0, 13.2],
            'female': [5.4, 5.7, 4.7, 4.2, 4.5, 4.3, 4.8, 5.1, 4.1, 4.2]
        }, {
            'industry': 'Finance',
            'male': [6.6, 5.9, 5.8, 5.7, 6.4, 5.6, 6.5, 5.0, 6.7, 7.5],
            'female': [8.7, 9.2, 9.1, 10.2, 9.6, 9.8, 8.4, 9.6, 10.2, 9.5]
        }, {
            'industry': 'Technical Services',
            'male': [9.7, 9.1, 8.6, 8.6, 7.7, 9.0, 9.7, 9.5, 8.9, 9.1],
            'female': [7.7, 7.6, 7.6, 7.0, 7.5, 6.0, 7.7, 7.1, 6.1, 6.4]
        }, {
            'industry': 'Education',
            'male': [9.0, 9.6, 9.2, 8.3, 8.0, 8.3, 8.4, 8.7, 8.4, 8.5],
            'female': [16.6, 16.5, 15.9, 15.1, 17.1, 17.0, 17.2, 18.7, 17.0, 17.7]
        }, {
            'industry': 'Health Care',
            'male': [9.3, 9.0, 8.1, 8.3, 8.2, 9.0, 8.5, 7.6, 8.0, 9.5],
            'female': [41.5, 43.1, 46.0, 44.1, 45.5, 45.3, 43.5, 44.3, 45.5, 48.3]
        }, {
            'industry': 'Arts',
            'male': [6.0, 5.3, 5.8, 6.4, 6.2, 6.1, 6.5, 7.0, 6.8, 5.9],
            'female': [5.5, 5.6, 5.8, 5.3, 5.7, 5.8, 4.5, 4.7, 5.6, 4.9]
        }],
        'QC': [{
            'industry': 'Goods Producting',
            'male': [672.4, 660.1, 660.9, 660.8, 672.4, 692.7, 670.6, 652.9, 650.2, 656.3],
            'female': [207.7, 201.1, 195.9, 204.9, 197.9, 192.9, 192.2, 184.1, 194.2, 200.0]
        }, {
            'industry': 'Construction',
            'male': [190.2, 192.4, 209.4, 222.3, 224.6, 245.3, 229.0, 207.4, 207.4, 214.1],
            'female': [25.5, 20.9, 24.6, 27.9, 27.3, 26.9, 26.6, 27.2, 28.6, 31.7]
        }, {
            'industry': 'Manufacturing',
            'male': [381.8, 370.3, 356.5, 346.2, 357.4, 353.6, 352.8, 353.9, 356.3, 355.8],
            'female': [151.6, 148.2, 144.0, 145.0, 139.8, 140.6, 137.0, 134.7, 136.8, 136.3]
        }, {
            'industry': 'Service',
            'male': [1363.6, 1341.3, 1395.7, 1422.7, 1420.4, 1430.1, 1435.7, 1484.0, 1498.3, 1556.9],
            'female': [1639.1, 1651.7, 1685.4, 1687.2, 1715.3, 1745.1, 1761.2, 1776.1, 1790.4, 1810.0]
        }, {
            'industry': 'Transportation',
            'male': [143.9, 131.6, 126.6, 138.9, 141.7, 140.2, 147.8, 156.0, 147.5, 166.0],
            'female': [39.9, 42.0, 38.1, 40.2, 38.8, 42.8, 37.8, 40.5, 48.1, 40.8]
        }, {
            'industry': 'Finance',
            'male': [98.1, 94.0, 98.2, 102.1, 95.9, 92.9, 100.4, 91.9, 99.5, 100.9],
            'female': [131.1, 139.6, 134.8, 125.0, 124.6, 124.1, 117.8, 123.2, 116.6, 132.8]
        }, {
            'industry': 'Technical Services',
            'male': [148.3, 156.0, 174.7, 176.5, 174.7, 179.9, 174.6, 178.7, 179.5, 188.1],
            'female': [114.1, 111.8, 121.8, 124.0, 126.9, 126.9, 124.1, 136.9, 132.4, 140.1]
        }, {
            'industry': 'Education',
            'male': [86.6, 85.0, 83.8, 93.9, 95.2, 97.6, 85.9, 94.1, 90.2, 93.4],
            'female': [164.3, 170.3, 178.1, 170.3, 185.3, 182.4, 188.1, 183.9, 190.0, 199.7]
        }, {
            'industry': 'Health Care',
            'male': [95.1, 90.4, 101.6, 96.0, 92.2, 99.1, 106.3, 111.5, 104.7, 106.9],
            'female': [376.6, 396.2, 404.6, 421.3, 434.2, 454.7, 462.9, 465.0, 477.1, 470.8]
        }, {
            'industry': 'Arts',
            'male': [94.6, 84.2, 91.5, 95.4, 102.3, 100.9, 95.0, 91.8, 100.1, 108.5],
            'female': [74.6, 82.6, 82.2, 76.1, 74.6, 79.5, 86.9, 79.5, 79.5, 76.7]
        }],
        'ON': [{
            'industry': 'Goods Producting',
            'male': [1146.0, 1040.1, 1067.5, 1079.4, 1088.9, 1083.4, 1074.1, 1094.9, 1087.8, 1110.1],
            'female': [355.9, 324.9, 313.1, 329.2, 326.5, 314.1, 308.0, 306.6, 330.4, 322.5]
        }, {
            'industry': 'Construction',
            'male': [384.0, 368.7, 396.3, 405.3, 406.6, 408.5, 412.1, 437.1, 445.4, 449.6],
            'female': [48.7, 46.1, 45.3, 49.3, 51.8, 50.6, 55.3, 50.2, 58.3, 62.9]
        }, {
            'industry': 'Manufacturing',
            'male': [624.5, 541.5, 543.2, 535.9, 546.5, 545.2, 537.8, 530.7, 525.3, 550.3],
            'female': [258.7, 232.1, 220.3, 237.0, 232.7, 221.8, 210.8, 213.9, 226.2, 219.0]
        }, {
            'industry': 'Service',
            'male': [2299.0, 2260.7, 2296.2, 2371.0, 2382.6, 2439.4, 2493.1, 2512.2, 2548.1, 2590.8],
            'female': [2809.3, 2807.0, 2861.1, 2878.7, 2904.7, 2986.5, 3002.8, 3009.5, 3033.3, 3104.6]
        }, {
            'industry': 'Transportation',
            'male': [238.2, 239.8, 234.7, 239.7, 236.1, 243.3, 246.9, 241.0, 254.1, 258.4],
            'female': [82.6, 77.6, 76.6, 82.9, 76.4, 93.0, 82.1, 80.3, 73.1, 83.0]
        }, {
            'industry': 'Finance',
            'male': [213.2, 206.2, 215.3, 217.9, 215.8, 232.6, 236.3, 259.5, 258.6, 267.7],
            'female': [255.9, 274.1, 265.4, 279.3, 279.8, 277.8, 275.8, 284.0, 296.7, 292.8]
        }, {
            'industry': 'Technical Services',
            'male': [291.8, 261.8, 288.7, 307.5, 306.3, 297.1, 315.5, 332.3, 348.2, 351.7],
            'female': [197.0, 218.2, 223.2, 222.4, 224.0, 245.7, 244.4, 247.3, 246.4, 277.3]
        }, {
            'industry': 'Education',
            'male': [159.6, 147.8, 150.7, 152.9, 153.0, 156.8, 154.5, 169.6, 169.7, 153.2],
            'female': [313.4, 303.1, 305.7, 305.9, 312.1, 326.5, 340.2, 345.3, 333.1, 343.9]
        }, {
            'industry': 'Health Care',
            'male': [114.3, 116.2, 121.6, 133.1, 135.9, 136.5, 135.6, 141.6, 143.1, 156.5],
            'female': [568.6, 587.0, 608.3, 618.2, 632.9, 654.2, 662.6, 670.9, 695.3, 712.9]
        }, {
            'industry': 'Arts',
            'male': [156.8, 163.2, 168.3, 181.1, 173.2, 167.2, 173.2, 172.0, 171.1, 165.4],
            'female': [154.3, 148.8, 151.4, 153.6, 146.5, 144.4, 143.3, 137.5, 146.9, 147.5]
        }],
        'MB': [{
            'industry': 'Goods Producting',
            'male': [119.4, 114.0, 114.0, 115.5, 116.8, 120.4, 119.1, 117.0, 120.5, 122.9],
            'female': [28.5, 25.8, 25.7, 25.3, 25.1, 26.2, 27.8, 30.4, 30.8, 29.2]
        }, {
            'industry': 'Construction',
            'male': [35.7, 35.1, 36.3, 39.1, 40.9, 41.0, 40.0, 41.2, 41.5, 43.6],
            'female': [2.5, 3.4, 3.7, 3.9, 3.5, 4.0, 3.9, 4.4, 5.6, 4.6]
        }, {
            'industry': 'Manufacturing',
            'male': [51.0, 46.2, 44.6, 45.2, 46.6, 48.0, 47.6, 47.7, 47.0, 47.7],
            'female': [18.0, 14.7, 14.5, 14.1, 15.0, 14.6, 16.2, 16.9, 16.6, 16.2]
        }, {
            'industry': 'Service',
            'male': [201.5, 205.4, 208.7, 208.0, 214.4, 211.9, 214.3, 219.8, 214.7, 217.3],
            'female': [252.1, 255.3, 260.5, 262.8, 265.3, 267.3, 265.2, 269.0, 267.6, 274.7]
        }, {
            'industry': 'Transportation',
            'male': [28.5, 29.5, 28.8, 28.1, 29.6, 29.7, 30.2, 31.3, 27.6, 29.5],
            'female': [6.8, 7.5, 6.7, 6.8, 7.0, 7.4, 7.3, 7.2, 7.9, 7.1]
        }, {
            'industry': 'Finance',
            'male': [15.1, 12.8, 14.0, 14.0, 13.1, 13.4, 14.8, 13.9, 14.4, 14.9],
            'female': [20.8, 21.5, 20.5, 21.9, 21.4, 19.9, 19.0, 18.9, 19.6, 22.2]
        }, {
            'industry': 'Technical Services',
            'male': [14.1, 12.1, 13.4, 12.7, 14.5, 15.9, 13.3, 13.4, 14.8, 14.4],
            'female': [11.6, 12.0, 10.8, 11.3, 12.2, 10.8, 11.4, 12.0, 12.8, 13.8]
        }, {
            'industry': 'Education',
            'male': [14.6, 16.5, 15.6, 16.0, 15.3, 14.3, 16.0, 17.8, 17.5, 16.4],
            'female': [31.5, 30.6, 31.6, 29.3, 30.3, 31.6, 33.4, 34.5, 32.6, 34.6]
        }, {
            'industry': 'Health Care',
            'male': [15.9, 15.1, 17.7, 19.9, 19.7, 18.5, 19.2, 20.5, 18.0, 20.0],
            'female': [66.6, 68.1, 72.4, 75.5, 75.2, 77.4, 79.9, 81.5, 83.8, 82.2]
        }, {
            'industry': 'Arts',
            'male': [12.1, 12.3, 11.5, 12.0, 12.0, 13.3, 11.7, 11.9, 12.6, 14.0],
            'female': [9.9, 10.5, 10.2, 10.0, 10.8, 11.2, 10.1, 10.6, 10.7, 9.9]
        }],
        'SK': [{
            'industry': 'Goods Producting',
            'male': [116.1, 116.8, 119.7, 120.9, 122.9, 128.6, 136.4, 129.9, 124.5, 120.4],
            'female': [22.8, 24.3, 26.3, 23.1, 25.7, 29.9, 28.1, 26.8, 25.5, 25.8]
        }, {
            'industry': 'Construction',
            'male': [32.2, 35.3, 39.0, 38.6, 42.7, 46.3, 51.2, 49.9, 46.3, 44.5],
            'female': [3.5, 3.6, 4.7, 5.0, 5.5, 7.1, 6.0, 6.3, 5.0, 6.2]
        }, {
            'industry': 'Manufacturing',
            'male': [25.0, 25.0, 23.3, 23.1, 22.3, 23.6, 21.8, 20.7, 20.8, 22.2],
            'female': [6.6, 5.2, 6.8, 4.5, 5.4, 5.9, 7.1, 5.5, 4.9, 5.7]
        }, {
            'industry': 'Service',
            'male': [161.1, 162.9, 165.3, 168.9, 176.2, 179.7, 175.5, 180.6, 183.9, 186.0],
            'female': [217.4, 221.8, 219.7, 222.9, 223.6, 227.2, 231.0, 236.3, 234.6, 235.3]
        }, {
            'industry': 'Transportation',
            'male': [20.0, 19.7, 19.8, 21.2, 21.9, 21.8, 22.7, 22.5, 22.2, 22.6],
            'female': [5.5, 4.8, 5.3, 5.8, 5.9, 6.4, 6.5, 7.0, 5.7, 6.0]
        }, {
            'industry': 'Finance',
            'male': [10.4, 9.7, 11.2, 10.9, 11.5, 11.1, 12.2, 12.2, 11.7, 11.8],
            'female': [17.8, 18.8, 18.6, 18.4, 17.1, 16.4, 17.7, 18.5, 16.8, 15.6]
        }, {
            'industry': 'Technical Services',
            'male': [11.4, 12.2, 13.2, 12.4, 13.0, 14.8, 15.4, 13.7, 15.1, 16.1],
            'female': [9.7, 10.0, 9.9, 11.4, 10.3, 11.4, 11.0, 11.4, 13.0, 14.1]
        }, {
            'industry': 'Education',
            'male': [12.9, 10.5, 10.8, 12.9, 12.7, 13.4, 13.0, 12.9, 12.5, 13.8],
            'female': [25.1, 27.9, 28.3, 26.1, 27.9, 28.7, 30.5, 30.6, 28.4, 27.2]
        }, {
            'industry': 'Health Care',
            'male': [9.4, 9.0, 10.4, 9.2, 11.8, 13.0, 10.2, 12.5, 13.0, 12.5],
            'female': [54.2, 58.0, 57.4, 59.1, 59.2, 61.5, 63.3, 65.5, 65.8, 63.9]
        }, {
            'industry': 'Arts',
            'male': [10.2, 9.8, 8.9, 9.4, 9.7, 8.6, 8.3, 9.9, 10.6, 10.2],
            'female': [9.8, 9.4, 9.7, 9.6, 9.3, 9.3, 8.2, 9.0, 9.8, 10.4]
        }],
        'AB': [{
            'industry': 'Goods Producting',
            'male': [464.8, 430.3, 431.8, 454.1, 487.4, 502.6, 521.8, 508.1, 464.2, 465.5],
            'female': [120.8, 110.1, 102.4, 120.2, 135.4, 139.5, 136.4, 133.6, 113.7, 112.6]
        }, {
            'industry': 'Construction',
            'male': [187.2, 174.5, 175.6, 189.1, 201.7, 205.1, 218.5, 223.5, 219.7, 207.8],
            'female': [29.3, 27.5, 24.7, 28.9, 34.3, 38.9, 37.8, 36.4, 32.2, 33.1]
        }, {
            'industry': 'Manufacturing',
            'male': [104.9, 95.4, 95.6, 98.7, 103.9, 106.3, 112.5, 104.9, 87.3, 92.3],
            'female': [35.3, 28.0, 29.6, 35.1, 33.7, 36.4, 32.0, 35.0, 28.2, 26.9]
        }, {
            'industry': 'Service',
            'male': [672.3, 676.5, 672.7, 694.2, 701.5, 716.6, 734.1, 754.4, 769.3, 782.0],
            'female': [795.9, 812.8, 816.8, 831.0, 848.2, 867.5, 882.3, 905.1, 916.5, 926.8]
        }, {
            'industry': 'Transportation',
            'male': [78.5, 79.7, 82.9, 85.0, 86.9, 89.6, 95.3, 100.8, 100.0, 109.1],
            'female': [29.7, 26.2, 24.8, 25.8, 30.4, 30.2, 34.5, 38.5, 31.7, 31.0]
        }, {
            'industry': 'Finance',
            'male': [43.9, 46.8, 45.3, 41.7, 38.4, 44.4, 46.9, 46.0, 46.6, 46.7],
            'female': [69.1, 66.0, 64.9, 56.7, 59.0, 59.8, 57.8, 57.5, 59.4, 60.9]
        }, {
            'industry': 'Technical Services',
            'male': [95.5, 88.3, 87.1, 93.1, 93.9, 102.1, 106.5, 98.9, 103.0, 102.5],
            'female': [66.0, 60.9, 63.3, 69.0, 72.4, 74.0, 77.8, 74.2, 76.3, 76.2]
        }, {
            'industry': 'Education',
            'male': [39.8, 39.5, 39.7, 38.3, 42.3, 38.6, 36.3, 44.0, 46.8, 44.8],
            'female': [82.7, 90.2, 89.1, 88.2, 85.9, 86.3, 88.4, 93.9, 102.7, 108.2]
        }, {
            'industry': 'Health Care',
            'male': [31.5, 30.7, 35.8, 33.3, 36.9, 38.9, 43.2, 44.1, 45.9, 49.0],
            'female': [161.6, 172.7, 179.8, 188.7, 194.4, 194.4, 197.3, 220.0, 223.5, 225.1]
        }, {
            'industry': 'Arts',
            'male': [37.4, 36.5, 40.8, 38.0, 35.1, 37.1, 36.2, 41.5, 39.8, 36.9],
            'female': [35.8, 38.3, 34.7, 38.8, 35.3, 37.8, 36.3, 33.4, 36.5, 36.7]
        }],
        'BC': [{
            'industry': 'Goods Producting',
            'male': [385.8, 355.0, 354.1, 346.8, 350.4, 355.9, 362.5, 365.7, 377.3, 390.2],
            'female': [100.3, 86.3, 82.4, 84.9, 91.1, 86.2, 87.4, 93.3, 92.9, 101.5]
        }, {
            'industry': 'Construction',
            'male': [188.9, 181.1, 177.3, 177.4, 172.3, 179.7, 176.1, 176.6, 186.8, 201.3],
            'female': [29.2, 22.6, 21.1, 19.7, 26.3, 24.7, 24.4, 24.9, 24.5, 27.3]
        }, {
            'industry': 'Manufacturing',
            'male': [131.2, 111.6, 114.9, 112.3, 121.2, 112.9, 119.5, 125.8, 125.3, 122.4],
            'female': [46.7, 42.8, 39.7, 44.5, 43.6, 38.8, 41.8, 46.8, 44.8, 51.8]
        }, {
            'industry': 'Service',
            'male': [804.0, 786.7, 807.2, 816.3, 819.5, 816.8, 827.1, 844.7, 862.8, 886.1],
            'female': [951.8, 963.9, 979.3, 979.8, 1001.5, 1006.6, 1001.5, 1002.5, 1046.6, 1088.9]
        }, {
            'industry': 'Transportation',
            'male': [94.9, 86.7, 89.8, 93.5, 98.1, 99.7, 100.0, 108.4, 103.9, 105.9],
            'female': [28.9, 26.9, 27.9, 28.9, 31.2, 27.6, 33.8, 31.6, 33.9, 33.4]
        }, {
            'industry': 'Finance',
            'male': [58.1, 60.5, 60.7, 62.5, 57.6, 63.7, 56.5, 57.6, 60.7, 72.6],
            'female': [80.6, 72.2, 79.1, 77.1, 78.9, 75.9, 80.7, 71.0, 75.1, 83.6]
        }, {
            'industry': 'Technical Services',
            'male': [91.4, 87.5, 88.8, 96.5, 97.3, 101.7, 99.7, 106.7, 104.9, 105.6],
            'female': [74.2, 72.3, 74.3, 77.6, 72.9, 76.6, 82.7, 81.4, 90.5, 91.6]
        }, {
            'industry': 'Education',
            'male': [54.3, 51.1, 53.8, 53.8, 60.2, 55.3, 55.8, 56.8, 52.6, 54.8],
            'female': [99.0, 95.9, 98.1, 101.5, 104.4, 111.4, 110.4, 106.6, 112.4, 111.8]
        }, {
            'industry': 'Health Care',
            'male': [48.5, 48.0, 46.5, 49.3, 51.6, 48.0, 49.5, 55.4, 53.4, 58.5],
            'female': [192.7, 209.0, 217.3, 213.2, 223.6, 219.2, 220.3, 232.0, 238.2, 245.0]
        }, {
            'industry': 'Arts',
            'male': [61.3, 60.1, 62.0, 58.7, 62.9, 55.3, 59.3, 62.2, 73.6, 78.2],
            'female': [50.9, 51.8, 50.1, 48.9, 46.0, 52.1, 48.4, 52.3, 53.0, 58.6]
        }]
    }

    var state_data_2 = {
        "Manufacturing": [{
            "province": "NS",
            "male": [28.4, 25.8, 25.0, 25.5, 24.7, 22.9, 23.0, 20.5, 21.7, 23.6],
            "female": [10.5, 9.5, 7.6, 7.6, 8.1, 7.8, 6.9, 8.2, 7.4, 7.4]
        }, {
            "province": "NL",
            "male": [9.5, 8.4, 6.9, 7.7, 8.6, 8.5, 8.3, 8.0, 7.1, 6.1],
            "female": [4.5, 3.5, 3.4, 3.0, 3.5, 3.1, 2.3, 3.5, 2.7, 2.9]
        }, {
            "province": "AB",
            "male": [104.9, 95.4, 95.6, 98.7, 103.9, 106.3, 112.5, 104.9, 87.3, 92.3],
            "female": [35.3, 28.0, 29.6, 35.1, 33.7, 36.4, 32.0, 35.0, 28.2, 26.9]
        }, {
            "province": "SK",
            "male": [25.0, 25.0, 23.3, 23.1, 22.3, 23.6, 21.8, 20.7, 20.8, 22.2],
            "female": [6.6, 5.2, 6.8, 4.5, 5.4, 5.9, 7.1, 5.5, 4.9, 5.7]
        }, {
            "province": "OT",
            "male": [624.5, 541.5, 543.2, 535.9, 546.5, 545.2, 537.8, 530.7, 525.3, 550.3],
            "female": [258.7, 232.1, 220.3, 237.0, 232.7, 221.8, 210.8, 213.9, 226.2, 219.0]
        }, {
            "province": "PE",
            "male": [4.2, 3.7, 3.5, 3.3, 3.4, 3.2, 3.7, 3.9, 4.3, 4.5],
            "female": [1.6, 1.7, 1.5, 1.5, 1.6, 1.7, 1.9, 2.1, 1.7, 2.0]
        }, {
            "province": "MB",
            "male": [51.0, 46.2, 44.6, 45.2, 46.6, 48.0, 47.6, 47.7, 47.0, 47.7],
            "female": [18.0, 14.7, 14.5, 14.1, 15.0, 14.6, 16.2, 16.9, 16.6, 16.2]
        }, {
            "province": "BC",
            "male": [131.2, 111.6, 114.9, 112.3, 121.2, 112.9, 119.5, 125.8, 125.3, 122.4],
            "female": [46.7, 42.8, 39.7, 44.5, 43.6, 38.8, 41.8, 46.8, 44.8, 51.8]
        }, {
            "province": "NB",
            "male": [23.6, 22.9, 22.9, 23.1, 21.0, 20.2, 20.8, 21.8, 23.3, 23.9],
            "female": [9.6, 8.7, 7.0, 8.3, 7.6, 8.0, 7.2, 7.9, 7.1, 7.8]
        }, {
            "province": "QC",
            "male": [381.8, 370.3, 356.5, 346.2, 357.4, 353.6, 352.8, 353.9, 356.3, 355.8],
            "female": [151.6, 148.2, 144.0, 145.0, 139.8, 140.6, 137.0, 134.7, 136.8, 136.3]
        }],
        "Goods-producing sector": [{
            "province": "NS",
            "male": [75.6, 71.2, 72.4, 71.7, 71.1, 71.9, 69.4, 67.4, 67.6, 66.8],
            "female": [16.7, 17.1, 15.0, 15.4, 15.4, 14.9, 14.6, 15.6, 13.6, 14.5]
        }, {
            "province": "NL",
            "male": [41.6, 38.8, 38.8, 42.9, 44.5, 46.4, 45.9, 45.1, 41.6, 38.6],
            "female": [8.9, 7.6, 8.4, 8.0, 9.1, 9.4, 8.7, 9.0, 8.8, 8.2]
        }, {
            "province": "AB",
            "male": [464.8, 430.3, 431.8, 454.1, 487.4, 502.6, 521.8, 508.1, 464.2, 465.5],
            "female": [120.8, 110.1, 102.4, 120.2, 135.4, 139.5, 136.4, 133.6, 113.7, 112.6]
        }, {
            "province": "SK",
            "male": [116.1, 116.8, 119.7, 120.9, 122.9, 128.6, 136.4, 129.9, 124.5, 120.4],
            "female": [22.8, 24.3, 26.3, 23.1, 25.7, 29.9, 28.1, 26.8, 25.5, 25.8]
        }, {
            "province": "OT",
            "male": [1146.0, 1040.1, 1067.5, 1079.4, 1088.9, 1083.4, 1074.1, 1094.9, 1087.8, 1110.1],
            "female": [355.9, 324.9, 313.1, 329.2, 326.5, 314.1, 308.0, 306.6, 330.4, 322.5]
        }, {
            "province": "PE",
            "male": [14.0, 13.5, 13.3, 14.1, 14.4, 14.0, 14.4, 13.4, 13.6, 13.9],
            "female": [3.3, 3.6, 3.2, 3.2, 3.4, 3.4, 3.6, 3.8, 3.0, 3.7]
        }, {
            "province": "MB",
            "male": [119.4, 114.0, 114.0, 115.5, 116.8, 120.4, 119.1, 117.0, 120.5, 122.9],
            "female": [28.5, 25.8, 25.7, 25.3, 25.1, 26.2, 27.8, 30.4, 30.8, 29.2]
        }, {
            "province": "BC",
            "male": [385.8, 355.0, 354.1, 346.8, 350.4, 355.9, 362.5, 365.7, 377.3, 390.2],
            "female": [100.3, 86.3, 82.4, 84.9, 91.1, 86.2, 87.4, 93.3, 92.9, 101.5]
        }, {
            "province": "NB",
            "male": [63.7, 64.3, 66.3, 66.5, 62.1, 63.4, 62.5, 59.1, 59.7, 59.2],
            "female": [16.2, 15.1, 13.8, 14.2, 13.6, 14.4, 13.7, 13.6, 13.2, 14.1]
        }, {
            "province": "QC",
            "male": [672.4, 660.1, 660.9, 660.8, 672.4, 692.7, 670.6, 652.9, 650.2, 656.3],
            "female": [207.7, 201.1, 195.9, 204.9, 197.9, 192.9, 192.2, 184.1, 194.2, 200.0]
        }],
        "Services-producing sector": [{
            "province": "NS",
            "male": [151.4, 153.5, 154.7, 156.2, 158.2, 154.8, 155.6, 157.4, 155.1, 156.3],
            "female": [207.9, 207.6, 209.1, 209.7, 212.9, 211.1, 208.0, 207.7, 209.9, 211.4]
        }, {
            "province": "NL",
            "male": [73.0, 71.1, 73.5, 76.0, 79.7, 78.8, 76.4, 74.2, 76.2, 72.4],
            "female": [97.7, 97.7, 102.1, 105.0, 107.5, 108.2, 107.6, 107.9, 105.9, 104.9]
        }, {
            "province": "AB",
            "male": [672.3, 676.5, 672.7, 694.2, 701.5, 716.6, 734.1, 754.4, 769.3, 782.0],
            "female": [795.9, 812.8, 816.8, 831.0, 848.2, 867.5, 882.3, 905.1, 916.5, 926.8]
        }, {
            "province": "SK",
            "male": [161.1, 162.9, 165.3, 168.9, 176.2, 179.7, 175.5, 180.6, 183.9, 186.0],
            "female": [217.4, 221.8, 219.7, 222.9, 223.6, 227.2, 231.0, 236.3, 234.6, 235.3]
        }, {
            "province": "OT",
            "male": [2299.0, 2260.7, 2296.2, 2371.0, 2382.6, 2439.4, 2493.1, 2512.2, 2548.1, 2590.8],
            "female": [2809.3, 2807.0, 2861.1, 2878.7, 2904.7, 2986.5, 3002.8, 3009.5, 3033.3, 3104.6]
        }, {
            "province": "PE",
            "male": [20.7, 21.0, 22.0, 22.0, 22.2, 23.1, 22.9, 23.5, 22.4, 23.5],
            "female": [31.0, 30.0, 31.2, 32.6, 33.1, 33.6, 33.2, 32.4, 32.6, 32.6]
        }, {
            "province": "MB",
            "male": [201.5, 205.4, 208.7, 208.0, 214.4, 211.9, 214.3, 219.8, 214.7, 217.3],
            "female": [252.1, 255.3, 260.5, 262.8, 265.3, 267.3, 265.2, 269.0, 267.6, 274.7]
        }, {
            "province": "BC",
            "male": [804.0, 786.7, 807.2, 816.3, 819.5, 816.8, 827.1, 844.7, 862.8, 886.1],
            "female": [951.8, 963.9, 979.3, 979.8, 1001.5, 1006.6, 1001.5, 1002.5, 1046.6, 1088.9]
        }, {
            "province": "NB",
            "male": [119.1, 120.0, 116.7, 114.3, 117.3, 115.9, 116.8, 118.4, 117.2, 120.0],
            "female": [161.7, 160.6, 161.3, 160.4, 160.1, 160.8, 160.9, 160.7, 161.4, 159.7]
        }, {
            "province": "QC",
            "male": [1363.6, 1341.3, 1395.7, 1422.7, 1420.4, 1430.1, 1435.7, 1484.0, 1498.3, 1556.9],
            "female": [1639.1, 1651.7, 1685.4, 1687.2, 1715.3, 1745.1, 1761.2, 1776.1, 1790.4, 1810.0]
        }],
        "Professional, scientific and technical services": [{
            "province": "NS",
            "male": [12.4, 11.8, 12.3, 12.8, 14.0, 14.6, 15.3, 16.6, 15.9, 17.0],
            "female": [8.2, 8.7, 8.7, 9.7, 9.9, 12.0, 10.9, 11.2, 11.6, 11.4]
        }, {
            "province": "NL",
            "male": [4.7, 3.9, 4.0, 5.4, 6.1, 5.8, 6.4, 7.0, 5.5, 5.4],
            "female": [3.4, 3.5, 2.8, 3.7, 4.0, 3.6, 4.2, 4.3, 5.0, 4.4]
        }, {
            "province": "AB",
            "male": [95.5, 88.3, 87.1, 93.1, 93.9, 102.1, 106.5, 98.9, 103.0, 102.5],
            "female": [66.0, 60.9, 63.3, 69.0, 72.4, 74.0, 77.8, 74.2, 76.3, 76.2]
        }, {
            "province": "SK",
            "male": [11.4, 12.2, 13.2, 12.4, 13.0, 14.8, 15.4, 13.7, 15.1, 16.1],
            "female": [9.7, 10.0, 9.9, 11.4, 10.3, 11.4, 11.0, 11.4, 13.0, 14.1]
        }, {
            "province": "OT",
            "male": [291.8, 261.8, 288.7, 307.5, 306.3, 297.1, 315.5, 332.3, 348.2, 351.7],
            "female": [197.0, 218.2, 223.2, 222.4, 224.0, 245.7, 244.4, 247.3, 246.4, 277.3]
        }, {
            "province": "PE",
            "male": [1.3, 1.2, 1.5, 1.7, 1.9, 1.6, 1.5, 1.9, 2.1, 2.0],
            "female": [1.1, 1.0, 1.3, 1.3, 1.4, 1.5, 1.4, 1.2, 1.5, 1.5]
        }, {
            "province": "MB",
            "male": [14.1, 12.1, 13.4, 12.7, 14.5, 15.9, 13.3, 13.4, 14.8, 14.4],
            "female": [11.6, 12.0, 10.8, 11.3, 12.2, 10.8, 11.4, 12.0, 12.8, 13.8]
        }, {
            "province": "BC",
            "male": [91.4, 87.5, 88.8, 96.5, 97.3, 101.7, 99.7, 106.7, 104.9, 105.6],
            "female": [74.2, 72.3, 74.3, 77.6, 72.9, 76.6, 82.7, 81.4, 90.5, 91.6]
        }, {
            "province": "NB",
            "male": [9.7, 9.1, 8.6, 8.6, 7.7, 9.0, 9.7, 9.5, 8.9, 9.1],
            "female": [7.7, 7.6, 7.6, 7.0, 7.5, 6.0, 7.7, 7.1, 6.1, 6.4]
        }, {
            "province": "QC",
            "male": [148.3, 156.0, 174.7, 176.5, 174.7, 179.9, 174.6, 178.7, 179.5, 188.1],
            "female": [114.1, 111.8, 121.8, 124.0, 126.9, 126.9, 124.1, 136.9, 132.4, 140.1]
        }],
        "Finance, insurance, real estate, rental and leasing": [{
            "province": "NS",
            "male": [8.5, 8.5, 9.3, 8.7, 9.0, 8.3, 9.2, 9.3, 9.9, 9.8],
            "female": [12.9, 12.4, 12.4, 13.8, 12.8, 12.5, 13.0, 14.2, 13.7, 13.0]
        }, {
            "province": "NL",
            "male": [3.3, 2.7, 2.8, 3.1, 3.8, 3.6, 3.7, 3.8, 3.8, 2.3],
            "female": [4.1, 3.7, 4.1, 4.5, 4.6, 4.8, 4.9, 4.5, 4.1, 4.0]
        }, {
            "province": "AB",
            "male": [43.9, 46.8, 45.3, 41.7, 38.4, 44.4, 46.9, 46.0, 46.6, 46.7],
            "female": [69.1, 66.0, 64.9, 56.7, 59.0, 59.8, 57.8, 57.5, 59.4, 60.9]
        }, {
            "province": "SK",
            "male": [10.4, 9.7, 11.2, 10.9, 11.5, 11.1, 12.2, 12.2, 11.7, 11.8],
            "female": [17.8, 18.8, 18.6, 18.4, 17.1, 16.4, 17.7, 18.5, 16.8, 15.6]
        }, {
            "province": "OT",
            "male": [213.2, 206.2, 215.3, 217.9, 215.8, 232.6, 236.3, 259.5, 258.6, 267.7],
            "female": [255.9, 274.1, 265.4, 279.3, 279.8, 277.8, 275.8, 284.0, 296.7, 292.8]
        }, {
            "province": "PE",
            "male": [1.2, 1.2, 1.1, 1.0, 1.1, 0.9, 0.9, 1.1, 1.2, 1.2],
            "female": [1.6, 1.3, 1.2, 1.5, 1.2, 1.3, 1.4, 1.4, 1.5, 1.5]
        }, {
            "province": "MB",
            "male": [15.1, 12.8, 14.0, 14.0, 13.1, 13.4, 14.8, 13.9, 14.4, 14.9],
            "female": [20.8, 21.5, 20.5, 21.9, 21.4, 19.9, 19.0, 18.9, 19.6, 22.2]
        }, {
            "province": "BC",
            "male": [58.1, 60.5, 60.7, 62.5, 57.6, 63.7, 56.5, 57.6, 60.7, 72.6],
            "female": [80.6, 72.2, 79.1, 77.1, 78.9, 75.9, 80.7, 71.0, 75.1, 83.6]
        }, {
            "province": "NB",
            "male": [6.6, 5.9, 5.8, 5.7, 6.4, 5.6, 6.5, 5.0, 6.7, 7.5],
            "female": [8.7, 9.2, 9.1, 10.2, 9.6, 9.8, 8.4, 9.6, 10.2, 9.5]
        }, {
            "province": "QC",
            "male": [98.1, 94.0, 98.2, 102.1, 95.9, 92.9, 100.4, 91.9, 99.5, 100.9],
            "female": [131.1, 139.6, 134.8, 125.0, 124.6, 124.1, 117.8, 123.2, 116.6, 132.8]
        }],
        "Educational services": [{
            "province": "NS",
            "male": [11.2, 12.3, 10.9, 11.0, 12.0, 12.3, 12.0, 12.3, 11.8, 13.2],
            "female": [22.1, 23.3, 22.5, 22.1, 23.6, 22.2, 23.4, 24.1, 24.9, 23.2]
        }, {
            "province": "NL",
            "male": [6.3, 5.9, 6.9, 7.3, 7.0, 6.9, 6.3, 6.3, 5.6, 5.5],
            "female": [9.9, 10.4, 9.9, 11.0, 11.6, 11.2, 11.3, 8.8, 8.7, 9.7]
        }, {
            "province": "AB",
            "male": [39.8, 39.5, 39.7, 38.3, 42.3, 38.6, 36.3, 44.0, 46.8, 44.8],
            "female": [82.7, 90.2, 89.1, 88.2, 85.9, 86.3, 88.4, 93.9, 102.7, 108.2]
        }, {
            "province": "SK",
            "male": [12.9, 10.5, 10.8, 12.9, 12.7, 13.4, 13.0, 12.9, 12.5, 13.8],
            "female": [25.1, 27.9, 28.3, 26.1, 27.9, 28.7, 30.5, 30.6, 28.4, 27.2]
        }, {
            "province": "OT",
            "male": [159.6, 147.8, 150.7, 152.9, 153.0, 156.8, 154.5, 169.6, 169.7, 153.2],
            "female": [313.4, 303.1, 305.7, 305.9, 312.1, 326.5, 340.2, 345.3, 333.1, 343.9]
        }, {
            "province": "PE",
            "male": [1.7, 1.5, 1.9, 2.3, 1.9, 1.8, 1.9, 1.6, 1.6, 1.5],
            "female": [3.0, 3.2, 3.7, 4.0, 3.7, 3.8, 3.7, 3.7, 3.5, 3.8]
        }, {
            "province": "MB",
            "male": [14.6, 16.5, 15.6, 16.0, 15.3, 14.3, 16.0, 17.8, 17.5, 16.4],
            "female": [31.5, 30.6, 31.6, 29.3, 30.3, 31.6, 33.4, 34.5, 32.6, 34.6]
        }, {
            "province": "BC",
            "male": [54.3, 51.1, 53.8, 53.8, 60.2, 55.3, 55.8, 56.8, 52.6, 54.8],
            "female": [99.0, 95.9, 98.1, 101.5, 104.4, 111.4, 110.4, 106.6, 112.4, 111.8]
        }, {
            "province": "NB",
            "male": [9.0, 9.6, 9.2, 8.3, 8.0, 8.3, 8.4, 8.7, 8.4, 8.5],
            "female": [16.6, 16.5, 15.9, 15.1, 17.1, 17.0, 17.2, 18.7, 17.0, 17.7]
        }, {
            "province": "QC",
            "male": [86.6, 85.0, 83.8, 93.9, 95.2, 97.6, 85.9, 94.1, 90.2, 93.4],
            "female": [164.3, 170.3, 178.1, 170.3, 185.3, 182.4, 188.1, 183.9, 190.0, 199.7]
        }],
        "Transportation and warehousing": [{
            "province": "NS",
            "male": [14.0, 15.0, 15.0, 15.9, 16.1, 14.1, 16.4, 16.7, 16.0, 15.5],
            "female": [4.3, 4.9, 4.5, 4.9, 4.8, 5.5, 4.5, 3.8, 4.3, 4.0]
        }, {
            "province": "NL",
            "male": [8.6, 8.8, 9.7, 8.4, 9.1, 8.7, 9.0, 7.8, 7.2, 8.2],
            "female": [2.2, 2.7, 2.5, 2.8, 2.3, 2.5, 2.7, 2.2, 2.5, 3.0]
        }, {
            "province": "AB",
            "male": [78.5, 79.7, 82.9, 85.0, 86.9, 89.6, 95.3, 100.8, 100.0, 109.1],
            "female": [29.7, 26.2, 24.8, 25.8, 30.4, 30.2, 34.5, 38.5, 31.7, 31.0]
        }, {
            "province": "SK",
            "male": [20.0, 19.7, 19.8, 21.2, 21.9, 21.8, 22.7, 22.5, 22.2, 22.6],
            "female": [5.5, 4.8, 5.3, 5.8, 5.9, 6.4, 6.5, 7.0, 5.7, 6.0]
        }, {
            "province": "OT",
            "male": [238.2, 239.8, 234.7, 239.7, 236.1, 243.3, 246.9, 241.0, 254.1, 258.4],
            "female": [82.6, 77.6, 76.6, 82.9, 76.4, 93.0, 82.1, 80.3, 73.1, 83.0]
        }, {
            "province": "PE",
            "male": [2.2, 1.9, 1.6, 1.8, 2.0, 2.0, 2.3, 2.0, 1.8, 2.3],
            "female": [0.5, 0.4, 0.6, 0.4, 0.7, 0.4, 0.7, 0.5, 0.6, 0.4]
        }, {
            "province": "MB",
            "male": [28.5, 29.5, 28.8, 28.1, 29.6, 29.7, 30.2, 31.3, 27.6, 29.5],
            "female": [6.8, 7.5, 6.7, 6.8, 7.0, 7.4, 7.3, 7.2, 7.9, 7.1]
        }, {
            "province": "BC",
            "male": [94.9, 86.7, 89.8, 93.5, 98.1, 99.7, 100.0, 108.4, 103.9, 105.9],
            "female": [28.9, 26.9, 27.9, 28.9, 31.2, 27.6, 33.8, 31.6, 33.9, 33.4]
        }, {
            "province": "NB",
            "male": [14.9, 13.1, 13.6, 14.2, 13.7, 13.5, 11.5, 14.0, 15.0, 13.2],
            "female": [5.4, 5.7, 4.7, 4.2, 4.5, 4.3, 4.8, 5.1, 4.1, 4.2]
        }, {
            "province": "QC",
            "male": [143.9, 131.6, 126.6, 138.9, 141.7, 140.2, 147.8, 156.0, 147.5, 166.0],
            "female": [39.9, 42.0, 38.1, 40.2, 38.8, 42.8, 37.8, 40.5, 48.1, 40.8]
        }],
        "Health care and social assistance": [{
            "province": "NS",
            "male": [10.6, 10.7, 12.4, 10.2, 11.0, 11.4, 11.1, 12.7, 13.9, 12.1],
            "female": [52.3, 55.0, 55.6, 58.1, 59.6, 58.4, 58.1, 59.7, 61.0, 59.9]
        }, {
            "province": "NL",
            "male": [6.2, 5.6, 5.9, 7.6, 7.4, 6.7, 6.5, 6.2, 6.7, 6.6],
            "female": [26.8, 29.4, 31.4, 30.2, 31.6, 32.7, 31.0, 31.4, 32.5, 32.7]
        }, {
            "province": "AB",
            "male": [31.5, 30.7, 35.8, 33.3, 36.9, 38.9, 43.2, 44.1, 45.9, 49.0],
            "female": [161.6, 172.7, 179.8, 188.7, 194.4, 194.4, 197.3, 220.0, 223.5, 225.1]
        }, {
            "province": "SK",
            "male": [9.4, 9.0, 10.4, 9.2, 11.8, 13.0, 10.2, 12.5, 13.0, 12.5],
            "female": [54.2, 58.0, 57.4, 59.1, 59.2, 61.5, 63.3, 65.5, 65.8, 63.9]
        }, {
            "province": "OT",
            "male": [114.3, 116.2, 121.6, 133.1, 135.9, 136.5, 135.6, 141.6, 143.1, 156.5],
            "female": [568.6, 587.0, 608.3, 618.2, 632.9, 654.2, 662.6, 670.9, 695.3, 712.9]
        }, {
            "province": "PE",
            "male": [1.2, 1.3, 1.6, 1.4, 1.4, 1.8, 1.6, 1.6, 1.5, 1.7],
            "female": [7.3, 7.3, 7.0, 7.5, 8.6, 9.0, 8.9, 8.3, 8.6, 8.8]
        }, {
            "province": "MB",
            "male": [15.9, 15.1, 17.7, 19.9, 19.7, 18.5, 19.2, 20.5, 18.0, 20.0],
            "female": [66.6, 68.1, 72.4, 75.5, 75.2, 77.4, 79.9, 81.5, 83.8, 82.2]
        }, {
            "province": "BC",
            "male": [48.5, 48.0, 46.5, 49.3, 51.6, 48.0, 49.5, 55.4, 53.4, 58.5],
            "female": [192.7, 209.0, 217.3, 213.2, 223.6, 219.2, 220.3, 232.0, 238.2, 245.0]
        }, {
            "province": "NB",
            "male": [9.3, 9.0, 8.1, 8.3, 8.2, 9.0, 8.5, 7.6, 8.0, 9.5],
            "female": [41.5, 43.1, 46.0, 44.1, 45.5, 45.3, 43.5, 44.3, 45.5, 48.3]
        }, {
            "province": "QC",
            "male": [95.1, 90.4, 101.6, 96.0, 92.2, 99.1, 106.3, 111.5, 104.7, 106.9],
            "female": [376.6, 396.2, 404.6, 421.3, 434.2, 454.7, 462.9, 465.0, 477.1, 470.8]
        }],
        "Information, culture and recreation": [{
            "province": "NS",
            "male": [10.7, 9.5, 10.3, 10.3, 10.8, 10.1, 11.1, 9.1, 8.7, 7.8],
            "female": [8.6, 7.9, 9.3, 8.9, 8.9, 8.2, 8.1, 8.4, 7.4, 8.2]
        }, {
            "province": "NL",
            "male": [4.8, 5.0, 4.2, 3.8, 4.3, 4.4, 4.0, 3.2, 3.8, 3.4],
            "female": [3.9, 4.1, 3.8, 3.3, 2.9, 2.6, 3.6, 4.1, 3.3, 3.1]
        }, {
            "province": "AB",
            "male": [37.4, 36.5, 40.8, 38.0, 35.1, 37.1, 36.2, 41.5, 39.8, 36.9],
            "female": [35.8, 38.3, 34.7, 38.8, 35.3, 37.8, 36.3, 33.4, 36.5, 36.7]
        }, {
            "province": "SK",
            "male": [10.2, 9.8, 8.9, 9.4, 9.7, 8.6, 8.3, 9.9, 10.6, 10.2],
            "female": [9.8, 9.4, 9.7, 9.6, 9.3, 9.3, 8.2, 9.0, 9.8, 10.4]
        }, {
            "province": "OT",
            "male": [156.8, 163.2, 168.3, 181.1, 173.2, 167.2, 173.2, 172.0, 171.1, 165.4],
            "female": [154.3, 148.8, 151.4, 153.6, 146.5, 144.4, 143.3, 137.5, 146.9, 147.5]
        }, {
            "province": "PE",
            "male": [1.0, 1.3, 1.4, 1.3, 1.3, 1.6, 1.3, 1.5, 1.4, 1.5],
            "female": [1.2, 1.1, 1.0, 1.2, 1.1, 1.3, 1.3, 0.9, 1.2, 1.2]
        }, {
            "province": "MB",
            "male": [12.1, 12.3, 11.5, 12.0, 12.0, 13.3, 11.7, 11.9, 12.6, 14.0],
            "female": [9.9, 10.5, 10.2, 10.0, 10.8, 11.2, 10.1, 10.6, 10.7, 9.9]
        }, {
            "province": "BC",
            "male": [61.3, 60.1, 62.0, 58.7, 62.9, 55.3, 59.3, 62.2, 73.6, 78.2],
            "female": [50.9, 51.8, 50.1, 48.9, 46.0, 52.1, 48.4, 52.3, 53.0, 58.6]
        }, {
            "province": "NB",
            "male": [6.0, 5.3, 5.8, 6.4, 6.2, 6.1, 6.5, 7.0, 6.8, 5.9],
            "female": [5.5, 5.6, 5.8, 5.3, 5.7, 5.8, 4.5, 4.7, 5.6, 4.9]
        }, {
            "province": "QC",
            "male": [94.6, 84.2, 91.5, 95.4, 102.3, 100.9, 95.0, 91.8, 100.1, 108.5],
            "female": [74.6, 82.6, 82.2, 76.1, 74.6, 79.5, 86.9, 79.5, 79.5, 76.7]
        }],
        "Construction": [{
            "province": "NS",
            "male": [28.7, 27.3, 29.5, 29.7, 29.0, 31.2, 29.8, 30.0, 29.7, 28.5],
            "female": [2.4, 3.0, 3.1, 3.2, 3.3, 3.5, 4.2, 3.6, 3.2, 3.1]
        }, {
            "province": "NL",
            "male": [16.1, 15.1, 15.3, 17.4, 18.7, 20.8, 20.1, 20.2, 19.7, 18.3],
            "female": [1.4, 1.6, 1.2, 1.8, 1.8, 2.0, 2.5, 2.4, 2.2, 2.4]
        }, {
            "province": "AB",
            "male": [187.2, 174.5, 175.6, 189.1, 201.7, 205.1, 218.5, 223.5, 219.7, 207.8],
            "female": [29.3, 27.5, 24.7, 28.9, 34.3, 38.9, 37.8, 36.4, 32.2, 33.1]
        }, {
            "province": "SK",
            "male": [32.2, 35.3, 39.0, 38.6, 42.7, 46.3, 51.2, 49.9, 46.3, 44.5],
            "female": [3.5, 3.6, 4.7, 5.0, 5.5, 7.1, 6.0, 6.3, 5.0, 6.2]
        }, {
            "province": "OT",
            "male": [384.0, 368.7, 396.3, 405.3, 406.6, 408.5, 412.1, 437.1, 445.4, 449.6],
            "female": [48.7, 46.1, 45.3, 49.3, 51.8, 50.6, 55.3, 50.2, 58.3, 62.9]
        }, {
            "province": "PE",
            "male": [4.8, 4.9, 4.7, 5.0, 4.8, 5.2, 5.2, 4.8, 4.4, 4.8],
            "female": [0.5, 0.6, 0.5, 0.3, 0.4, 0.3, 0.6, 0.4, 0.3, 0.6]
        }, {
            "province": "MB",
            "male": [35.7, 35.1, 36.3, 39.1, 40.9, 41.0, 40.0, 41.2, 41.5, 43.6],
            "female": [2.5, 3.4, 3.7, 3.9, 3.5, 4.0, 3.9, 4.4, 5.6, 4.6]
        }, {
            "province": "BC",
            "male": [188.9, 181.1, 177.3, 177.4, 172.3, 179.7, 176.1, 176.6, 186.8, 201.3],
            "female": [29.2, 22.6, 21.1, 19.7, 26.3, 24.7, 24.4, 24.9, 24.5, 27.3]
        }, {
            "province": "NB",
            "male": [22.8, 23.8, 27.4, 28.8, 25.2, 26.2, 26.0, 22.3, 21.6, 22.0],
            "female": [2.3, 2.0, 2.3, 1.9, 2.2, 2.6, 2.2, 2.4, 2.5, 2.8]
        }, {
            "province": "QC",
            "male": [190.2, 192.4, 209.4, 222.3, 224.6, 245.3, 229.0, 207.4, 207.4, 214.1],
            "female": [25.5, 20.9, 24.6, 27.9, 27.3, 26.9, 26.6, 27.2, 28.6, 31.7]
        }]
    }