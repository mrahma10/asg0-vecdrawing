// asg0.js
console.log("Main function started");

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Test: Fill background to confirm canvas is rendering
  ctx.fillStyle = "black"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw x and y axes for reference
  drawAxes(ctx);

  // Create a vector using Vector3
  let v1 = new Vector3([2.25, 2.25, 0]);  // Wrapped in array to match class constructor

  // Log vector info
  console.log("Vector v1:", v1.elements);

  // Draw the red vector v1
  drawVector(v1, "red", ctx);
}

// Function to draw a vector
function drawVector(v, color, ctx) {
  ctx.save();
  ctx.translate(200, 200);  // Move origin to center

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(v.elements[0] * 20, -v.elements[1] * 20);  // Flip Y-axis for canvas
  ctx.stroke();

  ctx.restore();
}

// Optional: draw coordinate axes for context
//Initially used this for debuging 
function drawAxes(ctx) {
  ctx.save();
  ctx.translate(200, 200);
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(-200, 0);
  ctx.lineTo(200, 0);
  ctx.moveTo(0, -200);
  ctx.lineTo(0, 200);
  ctx.stroke();
  ctx.restore();
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
  
    // Clear and redraw 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAxes(ctx);
  
    // input v1 values and draw
    var x1 = parseFloat(document.getElementById('xInput').value);
    var y1 = parseFloat(document.getElementById('yInput').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red", ctx);
  
    // input v2 values and draw
    var x2 = parseFloat(document.getElementById('x2Input').value);
    var y2 = parseFloat(document.getElementById('y2Input').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue", ctx);
  }

  function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
  
    // Clear and redraw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAxes(ctx);
  
    // Get v1 & v2
    let x1 = parseFloat(document.getElementById('xInput').value);
    let y1 = parseFloat(document.getElementById('yInput').value);
    let v1 = new Vector3([x1, y1, 0]);
  
    let x2 = parseFloat(document.getElementById('x2Input').value);
    let y2 = parseFloat(document.getElementById('y2Input').value);
    let v2 = new Vector3([x2, y2, 0]);
  
    drawVector(v1, "red", ctx);
    drawVector(v2, "blue", ctx);
  
    // Get operation and scalar
    let operation = document.getElementById("operation").value;
    let scalar = parseFloat(document.getElementById("scalarInput").value);
  
    // Perform selected operation
    if (operation === "add") {
        let v3 = new Vector3(v1).add(v2);
        drawVector(v3, "green", ctx);
      } else if (operation === "sub") {
        let v3 = new Vector3(v1).sub(v2);
        drawVector(v3, "green", ctx);
      } else if (operation === "mul") {
        let v3 = new Vector3(v1).mul(scalar);
        let v4 = new Vector3(v2).mul(scalar);
        drawVector(v3, "green", ctx);
        drawVector(v4, "green", ctx);
      } else if (operation === "div") {
        let v3 = new Vector3(v1).div(scalar);
        let v4 = new Vector3(v2).div(scalar);
        drawVector(v3, "green", ctx);
        drawVector(v4, "green", ctx);
      } else if (operation === "magnitude") {
        console.log("Magnitude v1:", v1.magnitude());
        console.log("Magnitude v2:", v2.magnitude());
      } else if (operation === "normalize") {
        let v3 = new Vector3(v1.elements).normalize();
        let v4 = new Vector3(v2.elements).normalize();
        drawVector(v3, "green", ctx);
        drawVector(v4, "green", ctx);
      } else if (operation === "angle") {
        let angle = angleBetween(v1, v2);
        console.log("Angle between v1 and v2:", angle.toFixed(2), "degrees");
      }
      else if (operation === "area") {
        let area = areaTriangle(v1, v2);
        console.log("Area of triangle formed by v1 and v2:", area.toFixed(2));
      }
      
      
  }
  function angleBetween(v1, v2) {
    let dot = Vector3.dot(v1, v2);
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();
    if (mag1 === 0 || mag2 === 0) return 0;  // no division by zero
    let cosTheta = dot / (mag1 * mag2);
    // Clamp to handle floating-point errors
    cosTheta = Math.min(Math.max(cosTheta, -1), 1);
    return Math.acos(cosTheta) * (180 / Math.PI);  // Convert to degrees
  }
  function areaTriangle(v1, v2) {
    let cross = Vector3.cross(v1, v2);         // cross product
    let area = cross.magnitude() / 2;          // half the area of the parallelogram
    return area;
  }
  
  
