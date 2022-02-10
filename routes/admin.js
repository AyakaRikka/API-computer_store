const express = require("express")
const bodyParser = require("body-parser")
const md5 = require("md5")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const models = require('../models/index')
const req = require("express/lib/request")
const res = require("express/lib/response")
const admin = models.admin
 
//end-point disini

//get data admin
app.get("/", (req,res) => {
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//post menyimpan data admin
app.post("/", (req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }
    admin.create(data)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//endpoint untuk mengupdate data admin, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message  : error.message
        })
    })
})
//endpoint untuk menghapus data admin,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where: param})
    .then(result => {
        res.json({
            massege : "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: "error.message"
        })
    })
})

module.exports = app