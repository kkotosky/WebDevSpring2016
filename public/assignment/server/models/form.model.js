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

    var formSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("Form", formSchema);

    return api;

    function findFormByUserId(userId) {
        var def = q.defer();
        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function createForm(form) {
        var def = q.defer();

        FormModel.create(form, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function deleteForm(id) {
        var def = q.defer();
        FormModel.remove({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function deleteFieldById(formId, fieldId){
        var def = q.defer();
        var found = false;
        var fields = null;
        FormModel.find({_id:formId}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                for (var j = 0; j < doc.fields.length; j++) {
                    if (""+doc.fields[j]._id === fieldId) {
                        doc.fields.splice(i,i+1);
                    }
                }
                FormModel.update({formId:formId}, doc, {}, function (err, doc) {
                    if (err) {
                        def.reject(err);
                    } else {
                        def.resolve(doc);
                    }
                });
            }
        });
        return def.promise;
    };
    function updateFieldById(formId, fieldId, field) {
        var def = q.defer();
        var found = false;
        var fields = null;

        FormModel.find({_id:formId}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                for (var j = 0; j < doc.fields.length; j++) {
                    if (""+doc.fields[j]._id === fieldId) {
                        doc.fields = field;
                    }
                }
                FormModel.update({formId:formId}, doc, {}, function (err, doc) {
                    if (err) {
                        def.reject(err);
                    } else {
                        def.resolve(doc);
                    }
                });
            }
        });
        return def.promise;
    };
    function createFieldById (id, field){
        var def = q.defer();

        FormModel.find({_id:formId}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                for (var j = 0; j < doc.fields.length; j++) {
                    if (""+doc.fields[j]._id === fieldId) {
                        doc.fields.push(field);
                    }
                }
                FormModel.update({formId:formId}, doc, {}, function (err, doc) {
                    if (err) {
                        def.reject(err);
                    } else {
                        def.resolve(doc);
                    }
                });
            }
        });
        return def.promise;
    }
    function findAll() {
        var def = q.defer();
        FormModel.find({}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function findById(id) {
        var def = q.defer();
        FormModel.find({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function updateForm(id, form) {
        var def = q.defer();
        FormModel.update({_id:id}, form, {}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function findFormByTitle(title) {
        var def = q.defer();
        FormModel.update({title:title}, form, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
}