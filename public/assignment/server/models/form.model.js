var mock = require("./form.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {


    var api = {
        createForm: createForm,
        updateForm: updateForm,
        findAll:findAll,
        findById: findById,
        findFormByTitle: findFormByTitle,
        deleteForm: deleteForm,
        findFormByUserId:findFormByUserId,
        deleteFieldById:deleteFieldById,
        createFieldById:createFieldById,
        updateFieldById:updateFieldById
    };
    return api;

    function findFormByUserId(userId) {
        var def = q.defer();
        var found = false;
        var forms = [];
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i].userId === ""+userId) {
                forms.push(mock.data[i]);
                break;
            }
        }
        def.resolve(forms);
        return def.promise;
    }
    function createForm(form) {
        var def = q.defer();
        mock.data.push(form);
        def.resolve(form);
        return def.promise;
    }
    function deleteForm(id) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i]._id === ""+id) {
                mock.data.splice(i, i+1);
                found = true;
                break;
            }
        }
        if (found) {
            def.resolve(mock.data);
        } else {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function deleteFieldById(formId, fieldId){
        var def = q.defer();
        var found = false;
        var fields = null;
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i]._id === ""+formId) {
                for (var j = 0; j < mock.data[i].fields.length; j++) {
                    if (""+mock.data.fields[j]._id === fieldId) {
                        mock.data.fields.splice(i,i+1);
                        found = true;
                        break;
                    }
                }
            }
        }
        if (found) {
            def.resolve(mock.data);
        } else {
            def.reject("Not Found");
        }
        return def.promise;
    };
    function updateFieldById(formId, fieldId, field) {
        var def = q.defer();
        var found = false;
        var fields = null;
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i]._id === ""+formId) {
                for (var j = 0; j < mock.data[i].fields.length; j++) {
                    if (""+mock.data.fields[j]._id === fieldId) {
                        mock.data.fields = field;
                        found = true;
                        def.resolve(mock.data[i]);
                        break;
                    }
                }
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    };
    function createFieldById (id, field){
        var def = q.defer();
        var found = false;
        var fields = null;
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i]._id === ""+id) {
                mock.data[i].fields.push(field);
                found = true;
                def.resolve(mock.data[i]);
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function findAll() {
        var def = q.defer();
        if (mock.data.length > 0) {
            def.resolve(mock.data);
        } else {
            def.reject("No Forms Exist");
        }
        return def.promise;
    }
    function findById(id) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (""+mock.data[i]._id === ""+id) {
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function updateForm(id, form) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i]._id === id) {
                mock.data[i] = form;
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function findFormByTitle(title) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i].title === title) {
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
}