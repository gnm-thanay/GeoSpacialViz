// dimension of the page
const window_dims = {
    width: window.innerWidth,
    height: window.innerHeight
};
const svgWidth = window_dims.width/2;
const svgHeight = window_dims.width/3;
// Append an SVG element to body, then append a path for the boundaries
// a topojson file containing population of each town in different years
const towns = "https://raw.githubusercontent.com/umassdgithub/Fall-2023-DataViz/main/Major-Assignment-2/data/towns.topojson"
// gini index per county
const gini_I = "https://raw.githubusercontent.com/umassdgithub/Fall-2023-DataViz/main/Major-Assignment-2/data/gini_index.csv"


// open both files
Promise.all([
    d3.json(towns),
    d3.csv(gini_I)
]).then(data =>
{
    // topology data
    const topojson_data = data[0];
    // gini index data
    const gini_data = data[1];

    const Map1 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);


        const geojson = topojson.feature(topo_data, topo_data.objects.ma);

        const projections = [
            d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
            d3.geoAlbersUsa(), // USA conic projection
            d3.geoAlbers(), // equal-area conic projection
            d3.geoMercator(), // cylindrical projection
            d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
            d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
            d3.geoConicEqualArea(), //equal-area conic projection
            d3.geoEquirectangular(), //Cylindrical Projections
            d3.geoOrthographic()
        ]
        const geoPath_generator = d3.geoPath()
            .projection(projections[3].fitSize([width-margin,height-margin], geojson))
        const colorInterpolator = d3.interpolateRgbBasis(['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'])

        // if the data is scaled using linear scale
        const linearScale = d3.scaleLinear()
            .domain(d3.extent(geojson.features, (d) => {
                return d['properties']['POP1980']
            }))
        const tooltip = d3.select("#tooltip");

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", d => geoPath_generator(d))
            .attr("fill", d => colorInterpolator(linearScale(d['properties']['POP1980'])))
            .on("mouseenter", (m, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                tooltip.html(`
                    Town:\n${d['properties']['TOWN']}<br> 
                    Population:\n${d['properties']['POP1980']}`)
                    .style("left", m.clientX + "px")
                    .style("top", m.clientY + "px");
            })
            .on("mousemove", (m, d) => {
                tooltip.style("opacity", .5)
            })
            .on("mouseout", (m, d) => {
                tooltip.transition()
                    .duration(400)
                    .style("opacity", 0)
            })

    }

    const Map2 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);


        // if topojson file is imported we need to
        // convert topology data to geojson
        const geojson = topojson.feature(topo_data, topo_data.objects.ma);


        const projections = [
            d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
            d3.geoAlbersUsa(), // USA conic projection
            d3.geoAlbers(), // equal-area conic projection
            d3.geoMercator(), // cylindrical projection
            d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
            d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
            d3.geoConicEqualArea(), //equal-area conic projection
            d3.geoEquirectangular(), //Cylindrical Projections
            d3.geoOrthographic()
        ]


        const geoPath_generator = d3.geoPath()
            .projection(projections[3].fitSize([width-margin,height-margin], geojson))

        const colorInterpolator = d3.interpolateRgbBasis(['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'])

        const linearScale = d3.scaleLinear()
            .domain(d3.extent(geojson.features, (d) => {
                return d['properties']['POPCH00_10']
            }))

        const tooltip = d3.select("#tooltip");

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", d => geoPath_generator(d))
            .attr("fill", d => colorInterpolator(linearScale(d['properties']['POPCH00_10'])))
            .on("mouseenter", (m, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                tooltip.html(`
                    Town:\n${d['properties']['TOWN']} <br> 
                    PopulationDifference:\n${d['properties']['POPCH00_10']}`)
                    .style("left", m.clientX  + "px")
                    .style("top", m.clientY + 500 + "px");
            })
            .on("mousemove", (m, d) => {
                tooltip.style("opacity", .5)
            })
            .on("mouseout", (m, d) => {
                tooltip.transition()
                    .duration(400)
                    .style("opacity", 0)
            })

    }

    const Map3 = (topo_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);


        // if topojson file is imported we need to
        // convert topology data to geojson
        const geojson = topojson.feature(topo_data, topo_data.objects.ma);


        const projections = [
            d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
            d3.geoAlbersUsa(), // USA conic projection
            d3.geoAlbers(), // equal-area conic projection
            d3.geoMercator(), // cylindrical projection
            d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
            d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
            d3.geoConicEqualArea(), //equal-area conic projection
            d3.geoEquirectangular(), //Cylindrical Projections
            d3.geoOrthographic()
        ]

        const geoPath_generator = d3.geoPath()
            .projection(projections[3].fitSize([width-margin,height-margin], geojson))

        const tooltip = d3.select("#tooltip");

        const County=[
            { "county": "Barnstable County", "fips_code": 25001 },
            { "county": "Berkshire County", "fips_code": 25003 },
            { "county": "Bristol County", "fips_code": 25005 },
            { "county": "Dukes County", "fips_code": 25007 },
            { "county": "Essex County", "fips_code": 25009 },
            { "county": "Franklin County", "fips_code": 25011 },
            { "county": "Hampden County", "fips_code": 25013 },
            { "county": "Hampshire County", "fips_code": 25015 },
            { "county": "Middlesex County", "fips_code": 25017 },
            { "county": "Nantucket County", "fips_code": 25019 },
            { "county": "Norfolk County", "fips_code": 25021 },
            { "county": "Plymouth County", "fips_code": 25023 },
            { "county": "Suffolk County", "fips_code": 25025 },
            { "county": "Worcester County", "fips_code": 25027 }]
        const FIPSToCounty = {};

        County.forEach(entry => {
            FIPSToCounty[entry.fips_code] = entry.county;
        });
        const dat1=Object.values(County.map(d => d.fips_code));

// Define a color scale using D3's ordinal scale
        const colorScale = d3.scaleOrdinal()
            //.domain(County.map(d => d.county))
            .domain(dat1)
            .range(d3.schemeCategory10);

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", d => geoPath_generator(d))
            // In your generateMap function:

            .attr("fill", d => {
                const town = d['properties']['FIPS_STCO']; // Assuming 'TOWN' is the town name property
                const county2 = FIPSToCounty[town];
                console.log(county2)
                //console.log(town)
                return colorScale(county2);
            })
            .on("mouseenter", (m, d) => {
                const town = d['properties']['FIPS_STCO'];
                const county2 = FIPSToCounty[town];
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                tooltip.html(`<div>
                            County: ${county2}<br>
                            Town: ${d['properties']['TOWN']}<br>
                            FIPS Code: ${d['properties']['FIPS_STCO']}
                            </div>`)
                    .style("left", m.clientX + "px")
                    .style("top", m.clientY+ 1000 + "px");
            })
            .on("mousemove", (m, d) => {
                tooltip.style("opacity", .5)
            })
            .on("mouseout", (m, d) => {
                tooltip.transition()
                    .duration(400)
                    .style("opacity", 0)
            })

    }

    const GiniIndexMap = (topo_data,csv_data,containerName,width,height,margin=30)=> {
        const svg = d3.select(containerName).append("svg")
            .attr("width", width)
            .attr("height", height);


        // if topojson file is imported we need to
        // convert topology data to geojson
        const geojson = topojson.feature(topo_data, topo_data.objects.ma);


        const projections = [
            d3.geoAzimuthalEqualArea(), //Azimuthal projections project the sphere directly onto a plane.
            d3.geoAlbersUsa(), // USA conic projection
            d3.geoAlbers(), // equal-area conic projection
            d3.geoMercator(), // cylindrical projection
            d3.geoNaturalEarth1(), // pseudocylindrical projection designed by Tom Patterson
            d3.geoEqualEarth(), // Equal Earth projection, by Bojan Šavrič et al., 2018.
            d3.geoConicEqualArea(), //equal-area conic projection
            d3.geoEquirectangular(), //Cylindrical Projections
            d3.geoOrthographic()
        ]

        const geoPath_generator = d3.geoPath()
            .projection(projections[3].fitSize([width - margin, height - margin], geojson))

        const tooltip = d3.select("#tooltip");

        const County = [
            {"county": "Barnstable County", "fips_code": 25001},
            {"county": "Berkshire County","fips_code": 25003},
            {"county": "Bristol County", "fips_code": 25005},
            {"county": "Dukes County","fips_code": 25007},
            {"county": "Essex County", "fips_code": 25009},
            {"county": "Franklin County","fips_code": 25011},
            {"county": "Hampden County", "fips_code": 25013},
            {"county": "Hampshire County","fips_code": 25015},
            {"county": "Middlesex County", "fips_code": 25017},
            {"county": "Nantucket County","fips_code": 25019},
            {"county": "Norfolk County", "fips_code": 25021},
            {"county": "Plymouth County","fips_code": 25023},
            {"county": "Suffolk County", "fips_code": 25025},
            {"county": "Worcester County", "fips_code": 25027}]
        const FIPSToCounty = {};

        County.forEach(entry => {
            FIPSToCounty[entry.fips_code] = entry.county;
        });

        d3.csv(gini_I).then(data=>{
            data = data.filter(d => d.year == 2017);
            const giniByCounty = {};
            data.forEach(d => {
                const countyID = d.id.slice(-5);
                const giniIndex = +d['Estimate!!Gini Index'];
                giniByCounty[countyID] = giniIndex;
            });

            // Define a color scale based on Gini index
            const giniExtent = d3.extent(Object.values(giniByCounty));
            const colorScale = d3.scaleSequential(d3.interpolateGreens)
                .domain(giniExtent);

            svg.selectAll("path")
                .data(geojson.features)
                .enter()
                .append("path")
                .attr("d", d => geoPath_generator(d))
                .attr("fill", d => {
                    const countyID = d['properties']['FIPS_STCO'];
                    console.log(countyID)
                    const giniIndex = giniByCounty[countyID];
                    return colorScale(giniIndex);
                })

                .on("mouseenter", (m, d) => {
                    const countyID = d['properties']['FIPS_STCO'];
                    const giniIndex = giniByCounty[countyID];
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9)
                    tooltip.html(`<div>
                            County ID: ${countyID}<br>
                            Gini Index 2017: ${giniIndex}<br>
                            </div>`)
                        .style("left", m.clientX + "px")
                        .style("top", m.clientY + 1900 + "px");
                })
                .on("mousemove", (m, d) => {
                    tooltip.style("opacity", .5)
                })
                .on("mouseout", (m, d) => {
                    tooltip.transition()
                        .duration(400)
                        .style("opacity", 0)
                })

        })
    }

    Map1(topojson_data,".map1",svgWidth,svgHeight)
    Map2(topojson_data,".map2",svgWidth,svgHeight)
    Map3(topojson_data,".map3",svgWidth,svgHeight)
    GiniIndexMap(topojson_data,gini_data,".map4",svgWidth,svgHeight)
})