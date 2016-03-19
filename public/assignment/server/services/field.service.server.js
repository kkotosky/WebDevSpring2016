module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function getFieldsByFormId(req, res) {
        var id = req.params.formId;
        model.findById(id).then(function(resp){
            res.json(resp.fields);
        }, function (e) {
            res.status(404).send(e);
        });
    }

    function getFieldByFieldId(req, res) {
        var id = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findById(id).then(function(resp){
            for (var i = 0; i < resp.fields.length; i++) {
                if (""+resp.fields[i]._id === fieldId) {
                    res.json(resp.fields[i]);
                }
            }
            res.status(404).send("Not found");
        }, function (e) {
            res.status(404).send(e);
        });
    }

    function deleteFieldById(req, res) {
        var id = req.params.id;
        var fieldId = req.params.fieldId;
        model.deleteFieldById(id, fieldId).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(404).send(e);
        });
    }

    function createField(req, res) {
        var id = req.params.id;
        var fieldId = req.params.fieldId;
        var form = req.body;
        form._id = generateUUID();
        model.createFieldById(id, form).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(404).send(e);
        });
    }

    function updateField(req, res) {
        var id = req.params.id;
        var fieldId = req.params.fieldId;
        var field = req.body;
        form._id = generateUUID();
        model.createFieldById(id, fieldId, field).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(404).send(e);
        });
    }
};