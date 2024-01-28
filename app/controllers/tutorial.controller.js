const db = require("../models");
const Tutorial = db.tutorials;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            "message": "Content can't be empty",
        });

        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    });

    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial.",
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Not found tutorial with id: ${id}`,
                });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving tutorial with id: ${id} (${err})`,
            });
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can't be empty!",
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Can't update tutorial with id: ${id}, maybe not found`,
                })
            }
            else {
                res.send({
                    message: "Tutorial was updated successfully",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error update tutorial with id: ${id} (${err})`,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Can't delete tutorial with id: ${id}, maybe not found`,
                });
            }
            else {
                res.send({
                    message: "Tutorial was deleted successfully",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error delete tutorial with id: ${id} (${err})`,
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} tutorials were deleted successfully`,
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials.",
            });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};