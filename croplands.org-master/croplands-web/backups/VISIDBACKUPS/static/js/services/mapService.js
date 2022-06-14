app.factory('mapService', ['leafletLayers', function (leafletLayers) {
    leafletLayers.set('google', {
        createLayer: function (params) {
            var type;
            type = params.type || 'SATELLITE';

            return new L.Google(type, params.options);
        }
    });
    var map = {
        center: {
            lat: 0,
            lng: 0,
            zoom: 2
        },
        layers: {
            baselayers: {
                googleHybrid: {
                    name: 'Satellite',
                    params: {
                        type: 'HYBRID'
                    },
                    type: 'google',
                    visible: true
                },
                googleTerrain: {
                    name: 'Terrain',
                    params: {
                        type: 'TERRAIN'
                    },
                    type: 'google',
                    visible: false
                },
                googleRoadmap: {
                    name: 'Streets',
                    params: {
                        type: 'ROADMAP'
                    },
                    type: 'google',
                    visible: false
                }
            },
            overlays: {
                Global_1000m_L3_v20150101: {
                    name: 'Global GCE 1km Multi-study Cropland Mask Product',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc'
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/JustinPoehnelt/products&id=Global_1000m_L3_v20150101&band={band}'
                    },
                    legend: [
                        {label: 'Croplands, Irrigation major', color: '#FF00FF'},
                        {label: 'Croplands, Irrigation minor', color: '#00FF00'},
                        {label: 'Croplands, Rainfed', color: '#FFFF00'},
                        {label: 'Croplands, Rainfed minor fragments', color: '#00FFFF'},
                        {label: 'Croplands, Rainfed very minor fragments', color: '#D2B58C'}
                    ],
                    attribution: '<a href="http://geography.wr.usgs.gov/science/croplands/docs/Teluguntla-thenkabail-xiong-etal-global-croplands-mask.pdf">Teluguntla et al., 2015</a> <p><a href="https://lpdaac.usgs.gov/dataset_discovery/measures/measures_products_table/gfsad1kcm_v0011">Download Data</a></p>'
                },
                Global_1000m_L4_v20120101: {
                    name: 'Global GCE 1km Cropland Dominance and Other Products',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc'
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/JustinPoehnelt/products&id=Global_1000m_L4_v20120101&band={band}'
                    },
                    legend: [
                        {label: 'Irrigated: Wheat and Rice Dominant', color: '#0000FF'},
                        {label: 'Irrigated: Mixed Crops 1: Wheat, Rice, Barley, Soybeans', color: '#A020EF'},
                        {label: 'Irrigated: Mixed Crops 2: Corn, Wheat, Rice, Cotton, Orchards', color: '#FF00FF'},
                        {label: 'Rainfed: Wheat, Rice, Soybeans, Sugarcane, Corn, Cassava', color: '#00FFFF'},
                        {label: 'Rainfed: Wheat and Barley Dominant', color: '#FFFF00'},
                        {label: 'Rainfed: Corn and Soybeans Dominant', color: '#007A0B'},
                        {label: 'Rainfed: Mixed Crops 1: Wheat, Corn, Rice, Barley, Soybeans', color: '#00FF00'},
                        {label: 'Minor Fractions of Mixed Crops: Wheat, Maize, Rice, Barley, Soybeans', color: '#505012'},
                        {label: 'Other Classes', color: '#B2B2B2'}
                    ],
                    attribution: '<a href="https://geography.wr.usgs.gov/science/croplands/docs/02-GLOBAL-CROPLANDS-PAPER-PE&RS-Special-Issue-thenkabail-2012-Final.pdf">Thenkabail et al., 2012</a><p><a href="https://lpdaac.usgs.gov/dataset_discovery/measures/measures_products_table/gfsad1kcd_v001">Download Data</a></p>'
                },
                SouthAsia_250m_L4_v20151201: {
                    name: 'South Asia 250m Croplands 2010-2011 from ACCA',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(37.0985, 60.895), L.latLng(6.006, 97.416))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/JustinPoehnelt/products&id=SouthAsia_250m_L4_v20151201&band={band}'
                    },
                    legend: [
                        {label: "Irrigated-SW/GW-DC-rice-wheat", color: "#006400"},
                        {label: "Irrigated-SW/GW-DC-rice-rice", color: "#00ff00"},
                        {label: "Irrgated-SW-DC-beans/cotton-wheat", color: "#a0c27c"},
                        {label: "Irrigated-SW-DC-Sugarcane/rice-rice/Plantations", color: "#7e9e65"},
                        {label: "Irrigated-DC-fallows/pulses-rice-fallow", color: "#c5e5a4"},
                        {label: "Irrigated-GW-DC-rice-maize/chickpea", color: "#7fffd4"},
                        {label: "Irrgated-TC-rice-mixedcrops-mixedcrops", color: "#40e0d0"},
                        {label: "Irrigated-GW-DC-millet/sorghum/potato-wheat/mustartd", color: "#cfe09c"},
                        {label: "Irrigated-SW-DC-cotton/chilli/maize-fallow/pulses", color: "#00ffff"},
                        {label: "Rainfed-DC-rice-fallows-jute/rice/mixed crops", color: "#ffff00"},
                        {label: "Rainfed-SC-rice-fallow/pulses", color: "#ffd700"},
                        {label: "Rainfed-DC-millets-chickpea/Fallows", color: "#cdad00"},
                        {label: "Rainfed-SC-cotton/pigeonpea/mixedcrops", color: "#8b6913"},
                        {label: "Rainfed-SC-groundnut/millets/sorghum", color: "#cd853f"},
                        {label: "Rainfed-SC-pigeonpea/mixedcrops", color: "#ee9a49"},
                        {label: "Rainfed-SC-millet-fallows/mixedcrops-", color: "#d8a585"},
                        {label: "Rainfed-SC-fallow-chickpea-", color: "#e6bc8a"},
                        {label: "Rainfed-SC-millets/fallows-LS", color: "#e0cab4"},
                        {label: "Rainfed-SC-mixedcrops/Plantations", color: "#bd5e4d"},
                        {label: "Shrublands/trees/Rainfed-mixedcrops30%", color: "#a020f0"},
                        {label: "Other LULC", color: "#c0c0c0"}
                    ]
                },
                Global_30m_L1_v20170605: {
                    name: 'Global 30m Cropland Extent 2015',
                    visible: true,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(47.450556, 35.556675), L.latLng(6.828526, 96.111119))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=World30m_30m_L1_v20170722&band={band}'
                    },
                    legend: [
                        {label: 'Croplands', color: '#00FF00'}
                    ]
                },

                HumanDevelopment_30m_L1_v20170612: {
                    name: 'Human Settlement Layer (Source: European Commission)',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(47.450556, 35.556675), L.latLng(6.828526, 96.111119))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=Human_Settlement_v5',

                    },
                    legend: [
                        {label: 'Human Settlement', color: '#c2b280'}
                    ],
                    attribution: '<a href="http://ghsl.jrc.ec.europa.eu/datasets.php">(Source: European Commission)</a>'
                },
                WaterOccurrence_30m_L1_v20170620: {
                    name: 'Water Occurrence Layer (Source: European Commission)',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(47.450556, 35.556675), L.latLng(6.828526, 96.111119))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=WaterOccurrence_20170620',

                    },
                    legend: [
                        {label: 'Always Water', color: '#0000ff'},
                        {label: 'Sometimes Water', color:'#aa0055'}
                    ],
                    attribution: '<a href="https://global-surface-water.appspot.com/">(Source: 2016 EC JRC/Google)</a>'
                },
                SouthAsia_30m_IrrRain_v20170628: {
                    name: 'South Asia, Iran, & Afghanistan Irrigated vs Rainfed 30-m',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(41.835258, 43.441505), L.latLng(23.763314, 85.189551))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=SA_IA_IvsRF_20170628'
                    },
                    legend: [
                        {label: 'Irrigated', color: '#ff00ff'},
                        {label: 'Rainfed', color: '#ffff00'},
                        {label: 'Water Bodies', color: '#0000cc'},
                    ]
                },
                Australia_rainfedvsirrigated_30m_color_20170803: {
                    name: 'Australia Irrigated vs Rainfed 30-m',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(41.835258, 43.441505), L.latLng(23.763314, 85.189551))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=Australia_30m_ivsr_20170803'
                    },
                    legend: [
                        {label: 'Irrigated', color: '#ff00ff'},
                        {label: 'Rainfed', color: '#ffff00'},
                    ]
                },
                UnitedStates_250m_L5_v20170322_2001: {
                    name: '2001',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            //bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2001&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'}//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2002: {
                    name: '2002',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2002&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2003: {
                    name: '2003',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2003&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2004: {
                    name: '2004',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2004&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2005: {
                    name: '2005',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2005&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2006: {
                    name: '2006',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2006&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2007: {
                    name: '2007',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2007&band={band}'
                    },
                    legend: [
                        {label: 'Corn-Soybean', color: '#FFFF00'},//1
                        {label: 'Wheat-Barley', color: '#FF0000'},//2
                    ]
                },
                UnitedStates_250m_L5_v20170322_2008: {
                    name: '2008',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2008&band={band}'
                    },
                    legend: [
                        // {label: 'Not Classified', color: '#000000'},//0
                    {label: 'Corn-Soybean', color: '#FFFF00'},//1
                    {label: 'Wheat-Barley', color: '#FF0000'},//2
                    {label: 'Potato', color: '#663300'},//3
                    {label: 'Alfalfa', color: '#00FF00'},//4
                    {label: 'Cotton', color: '#00FFFF'},//5
                    {label: 'Rice', color: '#0000FF'},//6
                    {label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                UnitedStates_250m_L5_v20170322_2010: {
                    name: '2010',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2010&band={band}'
                    },
                    legend: [
                        // {label: 'Not Classified', color: '#000000'},//0
                    {label: 'Corn-Soybean', color: '#FFFF00'},//1
                    {label: 'Wheat-Barley', color: '#FF0000'},//2
                    {label: 'Potato', color: '#663300'},//3
                    {label: 'Alfalfa', color: '#00FF00'},//4
                    {label: 'Cotton', color: '#00FFFF'},//5
                    {label: 'Rice', color: '#0000FF'},//6
                    {label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                UnitedStates_250m_L5_v20170322_2012: {
                    name: '2012',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2012&band={band}'
                    },
                    legend: [
                        // {label: 'Not Classified', color: '#000000'},//0
                    {label: 'Corn-Soybean', color: '#FFFF00'},//1
                    {label: 'Wheat-Barley', color: '#FF0000'},//2
                    {label: 'Potato', color: '#663300'},//3
                    {label: 'Alfalfa', color: '#00FF00'},//4
                    {label: 'Cotton', color: '#00FFFF'},//5
                    {label: 'Rice', color: '#0000FF'},//6
                    {label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                UnitedStates_250m_L5_v20170322_2009: {
                    name: '2009',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2009&band={band}'
                    },
                    legend: [
                  // {label: 'Not Classified', color: '#000000'},//0
                {label: 'Corn-Soybean', color: '#FFFF00'},//1
                {label: 'Wheat-Barley', color: '#FF0000'},//2
                //{label: 'Potato', color: '#663300'},//3
                {label: 'Alfalfa', color: '#00FF00'},//4
                {label: 'Cotton', color: '#00FFFF'},//5
                //{label: 'Rice', color: '#0000FF'},//6
                //{label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                UnitedStates_250m_L5_v20170322_2011: {
                    name: '2011',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2011&band={band}'
                    },
                    legend: [
                  // {label: 'Not Classified', color: '#000000'},//0
                {label: 'Corn-Soybean', color: '#FFFF00'},//1
                {label: 'Wheat-Barley', color: '#FF0000'},//2
                //{label: 'Potato', color: '#663300'},//3
                {label: 'Alfalfa', color: '#00FF00'},//4
                {label: 'Cotton', color: '#00FFFF'},//5
                //{label: 'Rice', color: '#0000FF'},//6
                //{label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                UnitedStates_250m_L5_v20170322_2013: {
                    name: '2013',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(49.4043, -124.5835), L.latLng(24.5025008881642, -66.8524020590759))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/croplandsdev/products&id=UnitedStates_250m_L5_v20170322_2013_1&band={band}'
                    },
                    legend: [
                  // {label: 'Not Classified', color: '#000000'},//0
                {label: 'Corn-Soybean', color: '#FFFF00'},//1
                {label: 'Wheat-Barley', color: '#FF0000'},//2
                //{label: 'Potato', color: '#663300'},//3
                {label: 'Alfalfa', color: '#00FF00'},//4
                {label: 'Cotton', color: '#00FFFF'},//5
                //{label: 'Rice', color: '#0000FF'},//6
                //{label: 'Other Crops', color: '#FF6600'}//7
                    ]
                },
                Australia_250m_L3_v20160701: {
                    name: 'Australia 250m Cropland Products 2000 to Present from ACCA',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            year: 2015,
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(-9.83464522447101, 110.000125), L.latLng(-45.00754522447101, 158.961625))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/JustinPoehnelt/products&id=Australia_250m_L3_v20160701&band={band}&year={year}'
                    },
                    legend: [
//                        {label: '0 Not Croplands', color: '#000000'},
                        {label: 'Croplands, rainfed, SC (Season 1 & 2), all crops', color: '#FFFF00'},
                        {label: 'Croplands, rainfed, SC, pastures', color: '#66FFFF'},
                        {label: 'Croplands, irrigated, SC, DC (Season 1 & 2), all crops', color: '#FF66FF'},
                        {label: 'Croplands, irrigated, SC, pastures', color: '#00B0F0'},
                        {label: 'Croplands, irrigated, continuous, orchards ', color: '#00B050'},
                        {label: 'Croplands,  fallow ', color: '#FBD4B4'}
                    ],
                    years: [2000,2001,2002,2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,2015],
                    attribution: '<a href="http://dx.doi.org/10.1080/17538947.2016.1267269">Teluguntla et al., 2017</a>'
                },
                Africa_250m_L2_v20160601: {
                    name: 'Africa GCE 250m Cropland Products 2003 to 2014 from ACCA',
                    visible: false,
                    type: 'xyz',
                    params: {
                        options: {
                            year: 2014,
                            band: 'class',
                            subdomains: 'abc',
                            bounds: L.latLngBounds(L.latLng(37.3494, -25.3695), L.latLng(-34.83026000000001, 63.50536000000001))
                        },
                        url: '//{s}.tiles.croplands.org/{z}/{x}/{y}/tile.png?collection=users/JustinPoehnelt/products&band={band}&id=Africa_250m_L2_v20160601&year={year}'
                    },
                    years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
                    legend: [
                        {label: 'Irrigated, SC, season 2', color: '#e41a1c'},
                        {label: 'Irrigated, SC, season 1', color: '#8dd3c7'},
                        {label: 'Irrigated, DC', color: '#377eb8'},
                        {label: 'Irrigated, Continuous', color: '#4daf4a'},
                        {label: 'Rainfed, SC, season 2', color: '#984ea3'},
                        {label: 'Rainfed, SC, season 1', color: '#bebada'},
                        {label: 'Rainfed, DC', color: '#ff7f00'},
                        {label: 'Rainfed, Continuous', color: '#ffff33'},
                        {label: 'Fallow-lands', color: '#e2e2e2'},
                        {label: 'Not Cropland', color: '#000000'}
                    ],
                    attribution: '<a href="https://geography.wr.usgs.gov/science/croplands/docs/Xiong-ACM2016.pdf">Xiong, J. et al., 2017</a>'
                }
            }
        }
    };
    map.zoom = function (lat, lon, zoom) {
        if (zoom) {
            map.center.zoom = zoom;
        }
        map.center.lat = lat;
        map.center.lng = lon;
    };
    map.zoomIn = function () {
        this.center.zoom += 1;
    };
    map.zoomOut = function () {
        this.center.zoom -= 1;
    };
    return map;
}])
;