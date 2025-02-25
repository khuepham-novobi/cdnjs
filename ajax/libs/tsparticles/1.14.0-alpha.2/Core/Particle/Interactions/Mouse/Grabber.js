"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../../../../Utils/Constants");
var QuadTree_1 = require("../../../../Utils/QuadTree");
var Utils_1 = require("../../../../Utils/Utils");
var Grabber = (function () {
    function Grabber() {
    }
    Grabber.grab = function (container) {
        var options = container.options;
        var interactivity = options.interactivity;
        if (interactivity.events.onHover.enable && container.interactivity.status === Constants_1.Constants.mouseMoveEvent) {
            var mousePos = container.interactivity.mouse.position;
            if (mousePos === undefined) {
                return;
            }
            var distance = container.retina.grabModeDistance;
            var query = container.particles.quadTree.query(new QuadTree_1.Circle(mousePos.x, mousePos.y, distance));
            for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
                var particle = query_1[_i];
                var pos = {
                    x: particle.position.x + particle.offset.x,
                    y: particle.position.y + particle.offset.y,
                };
                var distance_1 = Utils_1.Utils.getDistanceBetweenCoordinates(pos, mousePos);
                if (distance_1 <= container.retina.grabModeDistance) {
                    var lineOpacity = interactivity.modes.grab.lineLinked.opacity;
                    var grabDistance = container.retina.grabModeDistance;
                    var opacityLine = lineOpacity - (distance_1 * lineOpacity) / grabDistance;
                    if (opacityLine > 0) {
                        container.canvas.drawGrabLine(particle, opacityLine, mousePos);
                    }
                }
            }
        }
    };
    return Grabber;
}());
exports.Grabber = Grabber;
