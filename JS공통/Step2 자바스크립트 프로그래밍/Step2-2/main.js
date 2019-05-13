const area = require("./area");

console.log(area.getArea('circle', 3));
console.log(area.getArea('circle', 1, 5));
console.log(area.getArea('rect', 4, 10));
console.log(area.getArea('trapezoid', 4, 10, 6));
area.printExecutionSequence();
// console.log(area.getArea('circl', 3));


// console.log(area.circle('3'));
// console.log(area.square('아', 5));
// console.log(area.trapezoid(5, 3, '3'));
// console.log(area.cylindrical(2));