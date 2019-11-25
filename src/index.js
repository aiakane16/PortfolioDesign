import './theme/base.sass'
import 'waypoints/lib/noframework.waypoints.min.js'
import { World, Particle, CanvasSpace, Pt, Group, Rectangle, Num, Circle, Triangle, Line, Create} from "pts"

function rainDrops(){
  
  var space = new CanvasSpace("#introduction").setup({ bgcolor: "#765D69" });
      var form = space.getForm();
  
      var angle = -(window.innerWidth * 0.5);
      var line = new Line(0, angle)
  
      var world;
  
    space.add( {
  
      start: (bound, space) => {
  
        // Create world and 100 random points
        world = new World( space.innerBound, 1, 0 );
        let pts = Create.distributeRandom( space.innerBound, 100 );
        
        // Create particles and hit them with a random impulse
        for (let i=0, len=pts.length; i<len; i++) {
          let p = new Particle( pts[i] ).size( (i===0) ? 30 : 3+Math.random()*space.size.x/50 );
          p.hit( Num.randomRange(-50,50), Num.randomRange(-25, 25) );
          world.add( p );
        }
  
        world.particle( 0 ).lock = true; // lock it to move it by pointer later on
  
      },
  
  
      animate: (time, ftime) => {
        world.drawParticles( (p, i) => {
          let color = (i===0) ? "#fff" : ["#8FB9A8", "#FEFAD4", "#FCD0BA", "#F1828D"][i%4];
          form.fillOnly( color ).point( p, p.radius, "circle" ) 
        });
  
        world.update( ftime );
      },
  
  
      action:( type, px, py) => {
        if (type == "move") {
          world.particle( 0 ).position = new Pt(px, py);
        }
      },
  
      resize: (bound, evt) => {
        if (world) world.bound = space.innerBound;
      }
    });
    
    space.play();
  
}

$(document).ready(function(){
  
  new Waypoint({
    element: document.getElementById('checkpoint-1'),
    handler: function(direction) {
      if(direction === 'down'){
        $('#checkpoint-1').addClass('is-fixed-top navbar-attached');
      }else{
        $('#checkpoint-1').removeClass('is-fixed-top navbar-attached');
      }
    }
  })
  
  new Waypoint({
    element: document.getElementById('checkpoint-3'),
    handler: function(direction) {
      if(direction === 'down'){
       document.getElementById('checkpoint-1').setAttribute('style','border-bottom: 4px solid #8A4D76;')
      }else{
       document.getElementById('checkpoint-1').setAttribute('style','')
      }
    }
  })
  
  new Waypoint({
    element: document.getElementById('checkpoint-4'),
    handler: function(direction) {
      if(direction === 'down'){
       document.getElementById('checkpoint-1').setAttribute('style','')
      }else{
       document.getElementById('checkpoint-1').setAttribute('style','border-bottom: 4px solid #8A4D76;')
      }
    }
  })

  var speed = 700;
  
  window.smoothScroll = function(target) {
      var scrollContainer = target;
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);
      
      var targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);
      
      scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 1);
      }
      // start scrolling
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
  }
  
  $('.home').on('click',function(){
    $('html, body').animate({
        scrollTop: ($('#checkpoint-0').offset().top)
    },speed)
  })

  $('.about').on('click',function(){
    $('html, body').animate({
        scrollTop: ($('#checkpoint-2').offset().top)
    },speed)
  })

  $('.designs').on('click',function(){
    $('html, body').animate({
        scrollTop: ($('#checkpoint-3').offset().top)
    },speed)
  })

  $('.contact').on('click',function(){
    $('html, body').animate({
        scrollTop: ($('#checkpoint-4').offset().top)
    },speed)
  })

  $('.image').on('click',function(){
    $('#project-1').toggleClass('is-active')
  })

  $('#project-1-close').on('click',function(){
    $('#project-1').toggleClass('is-active')
  })

  rainDrops()
})



