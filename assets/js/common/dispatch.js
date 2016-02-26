//dispatch.js
define([
    'backbone'
], function(
    Backbone
){
    //clone Bakbone.Events to handle "on" and "trigger"
    var dispatch = _.clone(Backbone.Events);
    //dispatch.handlers is an object, keys are the handler names, value is the function
    dispatch.handlers = {};
    //i couldn't find a way to work out the arguments array  . . fuck it . . 10 params are plenty
    dispatch.request = function(event, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10){
        if(dispatch.handlers[event]){
            try{
                var response = dispatch.handlers[event](p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
            } catch(err){
                var response = err;
            }
            return response;
        }else{
            return undefined;
        }
    };
    dispatch.setHandler = function(event, ftn){
        if(typeof ftn == 'function'){
            dispatch.handlers[event] = ftn;
        }else{
            throw "error: dispatch.setHandler expects a function as the second parameter";
        }
    };
    return dispatch;

});