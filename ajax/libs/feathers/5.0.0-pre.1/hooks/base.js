"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.assignArguments = void 0;
const commons_1 = require("@feathersjs/commons");
const assignArguments = (context, next) => {
    const { service, method } = context;
    const parameters = service.methods[method];
    context.arguments.forEach((value, index) => {
        context[parameters[index]] = value;
    });
    if (!context.params) {
        context.params = {};
    }
    return next();
};
exports.assignArguments = assignArguments;
const validate = (context, next) => {
    const { service, method, path } = context;
    const parameters = service.methods[method];
    if (parameters.includes('id') && context.id === undefined) {
        throw new Error(`An id must be provided to the '${path}.${method}' method`);
    }
    if (parameters.includes('data') && !commons_1._.isObjectOrArray(context.data)) {
        throw new Error(`A data object must be provided to the '${path}.${method}' method`);
    }
    return next();
};
exports.validate = validate;
//# sourceMappingURL=base.js.map