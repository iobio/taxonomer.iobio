function gaugeD3() {
   var radius = 90,
       thickness = 7;

   var arc = d3.svg.arc();
   var color = d3.scale.category20c();
   
   var formatter = d3.format(",.1f"); 
   var commaFormatter = d3.format(",0f"); 

   function my(selection) {
      arc = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - thickness);

      selection.each(function(data) {
         var svg = d3.select(this);


         var bbox = this.getBoundingClientRect();      
         var g = svg.selectAll("g").data([0])
            .enter().append('g')     
               .attr('transform', "translate("+ bbox.width/2 + "," + bbox.height + ") rotate(-90)")                         

         var gArc = g.selectAll('.arc')
               .data(data)
            .enter().append("g")
               .attr("class", "arc")

         gArc.append("path")
            .attr("d", arc)         
            .style('fill', function(d,i) { return color(i) });        
            
          
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

