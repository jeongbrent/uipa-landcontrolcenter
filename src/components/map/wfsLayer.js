var wfsSource = new ol.source.Vector();
var wfs_layer;
var shipSource = new ol.source.Vector();
var shipDetailSource = new ol.source.Vector();
var ship_layer;
var shipDetail_layer;
function vectorInit(){
	//항로계획
	const plan_p = new ol.layer.Vector({
        id: "route_p",
        source: new ol.source.Vector(),
        style: new ol.style.Style({
        	fill: new ol.style.Fill({
                color: 'rgba(255, 228, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#FF007F',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#ffcc33'
                })
              })
      	}),
      	zIndex : 9999
    });
	map.addLayer(plan_p);
    
	const plan_l = new ol.layer.Vector({
        id: "route_l",
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255,0, 0, 0.8)',
                width: 3
            })
      	})
    });
	map.addLayer(plan_l);
    
    //선박 벡터레이어
    ship_layer = new ol.layer.Vector({
    	id: "shipLayer",
		source: shipSource,
		style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 228, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#FF007F',
                width: 2
            }),
        }),
        zIndex : 9999
	});
	map.addLayer(ship_layer);
	
	//선박선택 벡터레이어
    shipDetail_layer = new ol.layer.Vector({
    	id: "shipDetailLayer",
		source: shipDetailSource,
		style: new ol.style.Style({
            image: new ol.style.Icon({
		          	src: 'images/emap/shipIconSelect.png',
		          	anchor: [0.8, 0.8],				          	
        		})
        }),
        zIndex : 9999
	});
    map.addLayer(shipDetail_layer);
    
    //항적 벡터레이어
    wfs_layer = new ol.layer.Vector({
    	id: "shipMoveLayer",
		source: wfsSource,
		style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 228, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#FF007F',
                width: 2
            }),
        }),
        zIndex : 9999
	});
	map.addLayer(wfs_layer);
    
    
	//항로범위
    const mapSearch2 = new ol.layer.Vector({
        id: "mapSearch2",
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255,0, 0, 0.8)',
                width: 3,
                lineDash: [.1, 5]
            })
      	})
    });
	map.addLayer(mapSearch2);
    /*
    //항로검색용
    const mapSearch1 = new ol.layer.Vector({
        id: "mapSearch1",
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({                
                color: '#FF000000'
            }),
            stroke: new ol.style.Stroke({                
                color: '#ff0000ff',
                width: 2
            })
      	})
    });
    map.addLayer(mapSearch1);    
    
    //항적 벡터레이어
    wfs_layer = new ol.layer.Vector({
    	id: "shipMoveLayer",
		source: wfsSource,
		style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 228, 0, 0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#FF007F',
                width: 2
            }),
        }),
        zIndex : 9999
	});
    map.addLayer(wfs_layer);    
    
    //선박상세 벡터레이어
    shipDetail_layer = new ol.layer.Vector({
    	id: "shipDetailLayer",
		source: shipDetailSource,
		style: new ol.style.Style({
            image: new ol.style.Icon({
		          	src: 'images/emap/shipIconSelect.png',
		          	anchor: [0.8, 0.8],				          	
        		})
        }),
        zIndex : 9999
	});
    map.addLayer(shipDetail_layer);
    */
    //testFeat1();
}

function testFeat1(){
	var pointFeature = new ol.Feature({
		geometry: new ol.geom.Point([Number(129.3005359),Number(35.5468629)])
	});				
	let c_geometry = pointFeature.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
	
	pointFeature.setStyle(
		new ol.style.Style({		            
            image: new ol.style.Icon({
	          	src: 'images/emap/shipIcon.png',
	          	anchor: [0.8, 0.8],	
	          	rotateWithView: true,
				rotation: 0,			          	
    		}),
            text: new ol.style.Text({
                textAlign: 'center',
                font:  'bold '+shipStyle.font+'px Arial',
                fill: new ol.style.Fill({color: shipStyle.color}),
                stroke: new ol.style.Stroke({color:'#ffffff', width:0}),
                text: "111111",
                offsetX: 0,
                offsetY: -25,
                overflow:true,
            })
      	})
	);	
	ship_layer.getSource().addFeature(pointFeature);	
}