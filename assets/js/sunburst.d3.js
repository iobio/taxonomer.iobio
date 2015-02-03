function sunburstD3() {
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 200,
      height = 200,
      options = {klass:'', 'text' : true, 'click': true, 'mouseover': true, 'idPrefix': ''},
      color = d3.scale.category20c(),
      radius = Math.min(width, height) / 2,            
      x = d3.scale.linear().range([0, 2 * Math.PI]),
      y = d3.scale.sqrt().range([0, radius]),       
      arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  var partition = d3.layout.partition().value(function(d) { return d.count; });

  var click = function() { return; };
      
  function chart(selection, opts) {
    // merge options and defaults
    options = $.extend(options, opts);    
    var innerHeight = height - margin.top - margin.bottom;
    // recalc radius & y scale & arc
    radius = Math.min(width, height) / 2;              
    y = d3.scale.sqrt().range([0, radius]);
    arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    // process selection
    selection.each(function(data) {
      // set svg element
      var svg = d3.select(this);

      // Select the g element, if it exists.
      var g = svg.selectAll("g").data([0]);

      // Otherwise, create the skeletal chart.
      var gEnter = g.enter().append("g")
          .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");                      

      var path = g.selectAll(".path")
              .data(partition.nodes(data), function(d) { return d.id; })            

      // exit
      path.exit().remove();

      // enter
      var gPath = path.enter().append('g')
              .attr('class', 'path');

      gPath.append("path")            
            .attr("d", arc)
            .attr('id', function(d) { return options.idPrefix + d.id; })
            .style("fill", function(d,i) { 
              if(i == 0) return 'white';
              else return color((d.children ? d : d.parent)); })
            .on("click", clickHandler)
            .on("mouseover", function(d,i) {
              if(i == 0 || !options.mouseover) return;  
                div.transition()        
                   .duration(200)      
                   .style("opacity", .9);      
                div.html(d.name + ' - ' + d.value)                                 
             .style("left", (d3.event.pageX) + "px") 
             .style("text-align", 'left')    
             .style("top", (d3.event.pageY - 24) + "px");    
             })                  
             .on("mouseout", function(d) {       
                div.transition()        
                   .duration(500)      
                   .style("opacity", 0);   
             });
      
      if (options.text) {
        var text = gPath.append('text')                       
              .attr('x', function(d) { return x(d.x); })
              .attr('dy', function(d) {return (y(d.y + d.dy) - y(d.y))/2;})        
              .attr('dx', function(d) {
                var sa = x(d.x);
                var ea = x(d.x + d.dx);
                var angle = ea - sa;
                var r = y(d.y) + (y(d.y + d.dy) - y(d.y))/2;
                if (d.id == 'b136') {
                  console.log('b136 dx = ' + (angle*r)/2 );
                }
                return (angle*r)/2 ;
              })
              // .on("mouseover", function(d) {  
              //     div.transition()        
              //        .duration(200)      
              //        .style("opacity", .9);      
              //     div.html(d.name + ' - ' + d.value)                                 
              //  .style("left", (d3.event.pageX) + "px") 
              //  .style("text-align", 'left')    
              //  .style("top", (d3.event.pageY - 24) + "px");    
              //  })                  
              //  .on("mouseout", function(d) {       
              //     div.transition()        
              //        .duration(500)      
              //        .style("opacity", 0);   
              //  });                       

        // text.filter(function(d,i){
        //   if (i == 0) return false;
        //   return d.value > 7000;
        // })
        text.append("textPath")   
            .attr('id', function(d) { return d.id + '-text'})     
            .attr('class', 'textpath')       
            .attr("xlink:href",function(d) { return '#' + d.id; })
            .attr('alignment-baseline', "middle")
            .attr('text-anchor', "middle")
            .style('height', '10px')
            .text(function(d,i) {               
              var pathId = d.id.split('-text')[0];
              var name = d.name.split(':')[1];              
              this.innerHTML = name;
              if (i==0 || this.getComputedTextLength() > document.getElementById(pathId).getBBox().width)            
                return ''              
              else         
                return name;                      
            });
      }

      // update
      g.selectAll('.path').select('path').transition()
        .duration(750)
        .attr('d', arc)
        .attrTween("d", arcTween( partition.nodes(data)[0] ) )
        // .each('interrupt', function(){
      g.selectAll('.path').select('text').transition()
          .duration(750)
          .attr('x', function(d) { return x(d.x); })
          .attr('dy', function(d) {return (y(d.y + d.dy) - y(d.y))/2;})        
          .attr('dx', function(d) {
            var sa = x(d.x);
            var ea = x(d.x + d.dx);
            var angle = ea - sa;
            var r = y(d.y) + (y(d.y + d.dy) - y(d.y))/2;
            return (angle*r)/2 ;
          })

      g.selectAll('.path').select('.textpath').transition()
        .duration('750')
        .text(function(d,i) {
          var pathId = d.id.split('-text')[0];
          var name = d.name.split(':')[1];              
          this.innerHTML = name;
          if (i==0 || this.getComputedTextLength() > document.getElementById(pathId).getBBox().width)               
            return ''              
          else         
            return name;              
      })    
      //});
      


      d3.select(self.frameElement).style("height", height + "px");    
      
    }); // end selection.each
  
    // click hanlder
    function clickHandler(d) {      
      if (options.click) {
        
        // if(y(d.y) <= 20) {return} // do nothing for center rings
        // selection.selectAll('text').remove();
        selection.selectAll('path').transition()
          .duration(750)
          .attrTween("d", arcTween(d))
          .call(endall, function() { 
            click(d); 
            selection.selectAll('.textpath')
              .text(function(d,i) {             
                if (d.x < x.domain()[0] || d.x >= x.domain()[1])
                  return '';
                
                var pathId = d.id.split('-text')[0];
                var name = d.name.split(':')[1];              
                this.innerHTML = name;
                if (i==0 || this.getComputedTextLength() > document.getElementById(pathId).getBBox().width)               
                  return ''              
                else         
                  return name;
              })
          });
        
      }
    }
    // Interpolate the scales!
    function arcTween(d) {            
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);          
      return function(d, i) {                    
        return  i
            ? function(t) { return arc(d); }
            : function(t) {              
              x.domain(xd(t)); 
              y.domain(yd(t)).range(yr(t));               
              return arc(d);};         
      };
    }
    // end of transition solution
    function endall(transition, callback) { 
      var n = 0; 
      transition 
          .each(function() { ++n; }) 
          .each("end", function() { if (!--n) callback.apply(this, arguments); }); 
    }
  } // end chart function   

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };
  
  chart.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.click = function(_) {
    if (!arguments.length) return click;
    click = _;
    return chart;
  }

  return chart;
}