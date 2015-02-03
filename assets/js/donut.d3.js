function donutD3() {
   var radius = 90,
       thickness = 7,
       labelr = radius + 30;

   var arc = d3.svg.arc();
   var color = d3.scale.category20c();
   var options = { text:true }
   var click = function() { return; };
   
   var formatter = d3.format(",.1f"); 
   var commaFormatter = d3.format(",0f");    

   function my(selection, opts) {
      options = $.extend(options, opts); 
      labelr = radius + 20;
      arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness);

      var bbox = selection[0].parentNode.getBoundingClientRect();
      
      var g = selection.enter().append("g")
         .attr("class", "arc")
         .attr("transform", "translate("+ bbox.width/2 + "," + bbox.height/2 + ")");

      // if ( g.data()[0] != undefined )
      //    var total = g.data()[0].data + g.data()[1].data
      // else
      //    var total = selection.data()[0].data + selection.data()[1].data

      g.append("path")
         .attr("d", arc)         
         .style('fill', function(d,i) { return color(d) })
         .on('click', function(d){
            click(d.data);
         })
         .on("mouseover", function(d,i) {           
             div.transition()        
                .duration(200)      
                .style("opacity", .9);      
             div.html(d.data.name + ' ' + d.value)                                 
          .style("left", (d3.event.pageX) + "px") 
          .style("text-align", 'left')    
          .style("top", (d3.event.pageY - 24) + "px");    
          })                  
          .on("mouseout", function(d) {       
             div.transition()        
                .duration(500)      
                .style("opacity", 0);   
          });;
         
      selection.exit().remove();
      if (options.text) {         
         g.append("text")
           .attr("transform", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    // pythagorean theorem for hypotenuse
                    h = Math.sqrt(x*x + y*y);
                return "translate(" + (x/h * labelr) +  ',' +
                   (y/h * labelr) +  ")"; 
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                // are we past the center?
                return (d.endAngle + d.startAngle)/2 > Math.PI ?
                    "end" : "start";
            })
            // .attr("dy", "1.9em")
            // .style("text-anchor", "middle")            
            .text(function(d,i) { return d.data.name; });         
      }

      selection.select('text').transition()
        .duration(200)
        .attr("transform", function(d) {
            var c = arc.centroid(d),
                x = c[0],
                y = c[1],
                // pythagorean theorem for hypotenuse
                h = Math.sqrt(x*x + y*y);
            return "translate(" + (x/h * labelr) +  ',' +
               (y/h * labelr) +  ")"; 
        })        
        .attr("text-anchor", function(d) {
            // are we past the center?
            return (d.endAngle + d.startAngle)/2 > Math.PI ?
                "end" : "start";
        })             
         
      selection.select("path")
         .attr("d", arc)
   }
   

   my.radius = function(value) {
      if (!arguments.length) return radius;
      radius = value;
      return my;
   }

   my.thickness = function(value) {
      if (!arguments.length) return thickness;
      thickness = value;      
      return my;
   }   

   my.color = function(value) {
      if (!arguments.length) return color;
      color = value;      
      return my;
   }  

  my.click = function(_) {
    if (!arguments.length) return click;
    click = _;
    return my;
  } 

   my.klass = function(value) {
      if (!arguments.length) return klass;
      klass = value;
      return my;
   };
   
   return my;
}

