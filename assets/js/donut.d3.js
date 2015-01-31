function donutD3() {
   var radius = 90,
       thickness = 7;

   var arc = d3.svg.arc();
   var color = d3.scale.category20c();
   var options = { text:true }
   
   var formatter = d3.format(",.1f"); 
   var commaFormatter = d3.format(",0f");    

   function my(selection, options) {
      arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness);

      var bbox = selection[0].parentNode.getBoundingClientRect();
      
      var g = selection.enter().append("g")
         .attr("class", "arc")
         .attr("transform", "translate("+ bbox.width/2 + "," + bbox.height/2 + ")");

      if ( g.data()[0] != undefined )
         var total = g.data()[0].data + g.data()[1].data
      else
         var total = selection.data()[0].data + selection.data()[1].data

      g.append("path")
         .attr("d", arc)         
         .style('fill', function(d,i) { return color(d) })
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
            .attr("dy", "0.3em")
            .style("text-anchor", "middle")
            .attr("class", "percent")
            .text(function(d,i) { if(i==0) return formatter(d.data / total * 100) + "%"; });
         g.append("text")
            .attr("dy", "1.9em")
            .style("text-anchor", "middle")
            .attr("class", "total")
            .text(function(d,i) { if(i==0) return commaFormatter(d.data); });
      }
         
      selection.select("path")
         .attr("d", arc)
      

      selection.select(".percent")
         .text(function(d,i) { 
            if(i==0) return formatter(d.data / total * 100) + "%"; 
         });
         
      selection.select(".total")
         .text(function(d,i) { 
            if(i==0) return commaFormatter(d.data); 
         });
      
      
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

   my.klass = function(value) {
      if (!arguments.length) return klass;
      klass = value;
      return my;
   };
   
   return my;
}

