"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmoothLine = exports.arrSum = exports.RandReal = exports.getRadialVertices = exports.arrayRotate = exports.sumPointValues = exports.maxPoint = exports.minPoint = exports.minMaxPoint = exports.Round = void 0;
exports.Round = (N, acc = 100000) => {
    return Math.round(N * acc) / acc;
};
// export var rgbToHex = (r:number, g:number, b:number) => '#' + [r, g, b].map(x => {
//   const hex = x.toString(16)
//   return hex.length === 1 ? '0' + hex : hex
// }).join('')
exports.minMaxPoint = (array) => {
    let min = 100000;
    let max = -100000;
    let min_index = -1;
    let max_index = -1;
    let min_point = null;
    let max_point = null;
    array.forEach((point, i) => {
        if (point.value > max) {
            max = point.value;
            max_index = i;
            max_point = point;
        }
        if (point.value < min) {
            min = point.value;
            min_index = i;
            min_point = point;
        }
    });
    return {
        min_index: min_index,
        max_index: max_index,
        min_point: min_point,
        max_point: max_point,
    };
};
exports.minPoint = (array) => {
    let min = 100000;
    let min_index = -1;
    let min_point = null;
    array.forEach((point, i) => {
        if (point.value < min) {
            min = point.value;
            min_index = i;
            min_point = point;
        }
    });
    return {
        min_index: min_index,
        min_point: min_point,
    };
};
exports.maxPoint = (array) => {
    let max = -100000;
    let max_index = -1;
    let max_point = null;
    array.forEach((point, i) => {
        if (point.value > max) {
            max = point.value;
            max_index = i;
            max_point = point;
        }
    });
    return {
        max_index: max_index,
        max_point: max_point,
    };
};
exports.sumPointValues = (array) => {
    return array.map(point => point.value)
        .reduce((next_value, sum) => {
        return (next_value + sum);
    }, 0);
};
function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}
exports.arrayRotate = arrayRotate;
function getRadialVertices(origin, radius, vertices = 4, rotation = 0) {
    let angle = Math.PI * 2 / vertices;
    let points = [];
    let orientation = Math.PI / vertices; // -> pointy top : 0 -> flat top
    rotation = rotation / (Math.PI * 2);
    for (let a = -angle; a < Math.PI * 2 * (1 - 1 / vertices); a += angle) {
        let sx = origin.x + Math.cos(a + orientation + rotation) * radius;
        let sy = origin.y + Math.sin(a + orientation + rotation) * radius;
        points.push({ x: exports.Round(sx), y: exports.Round(sy) });
    }
    return points;
}
exports.getRadialVertices = getRadialVertices;
function RandReal(min, max, decimalPlaces = 0) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
}
exports.RandReal = RandReal;
function arrSum(array) {
    return array.reduce((sum, num) => sum + (Array.isArray(num) ? arrSum(num) : num * 1), 0);
}
exports.arrSum = arrSum;
function SmoothLine(line, total_iters, current_iter, dist_ratio) {
    if (total_iters == current_iter) {
        return line;
    }
    else {
        let sm_line = [];
        for (let i = 0; i < line.length - 1; i++) {
            sm_line.push({
                x: line[i].x + (dist_ratio) * (line[i + 1].x - line[i].x),
                y: line[i].y + (dist_ratio) * (line[i + 1].y - line[i].y)
            });
            sm_line.push({
                x: line[i].x + (1 - dist_ratio) * (line[i + 1].x - line[i].x),
                y: line[i].y + (1 - dist_ratio) * (line[i + 1].y - line[i].y)
            });
        }
        return SmoothLine(sm_line, total_iters, current_iter + 1, dist_ratio);
    }
}
exports.SmoothLine = SmoothLine;
//# sourceMappingURL=helpers.js.map