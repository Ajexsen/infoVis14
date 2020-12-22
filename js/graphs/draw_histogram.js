function draw_histogram(param) {
    const container = $(param.target)
    const margin = {top: 0, right: 50, bottom: 20, left: 40}
    let width = container.innerWidth() - margin.left - margin.right,
        height = container.innerHeight() - margin.top - margin.bottom

    let barPadding = 10;
    let svg = d3.selectAll(param.target)
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    d3.csv(param.src, function(data){
        return {
            month: d3.timeParse("%m")(data.month),
            value: data.new_case,
        }
    }).then(function(d){
        console.log(d)
        const d_length = 11
        const month_tag = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        let x = d3.scaleBand()
            .domain(month_tag)
            .range([0, width])
            
        let y = d3.scaleLinear()
            .domain([0, d3.max(d, function(d) { return +d.value; })])
            .range([height, 0])

        svg.selectAll("rect")
            .data(d)
            .enter()
            .append("rect")
            .attr("x", function(d, i){return x(month_tag[i]) + (barPadding/2)})
            .attr("y", function(d){return y(d.value)})
            .attr("fill", "#5D001E")
            .attr("width", width / d_length - barPadding)
            .attr("height", function(d){return height - y(d.value);});

        svg.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .attr("class", "tick")
            .call(d3.axisBottom(x)
                .tickSizeInner(0)
                .tickSizeOuter(2)
                .tickPadding(10)
            )

    })
}