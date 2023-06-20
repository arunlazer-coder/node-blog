const db = require('../models')
const blogDb = db.blog
const { Op } = require('sequelize')
const { getErrorResponse, getSuccessResponse } = require('../util/helper')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const url = require('url')
const querystring = require('querystring')
const { search } = require('../routes/blog')

let statusData = {}

const add = async (req, res) => {
    const errors = validationResult(req)
    const { title, url, content } = req.body
    let info = { title, url, content }
    if (errors.length) {
        res.status(200).send(errors)
        return
    }
    try {
        const response = await blogDb.create(info)
        let resData = getSuccessResponse(response)
        statusData = { code: 200, resData }
    } catch (error) {
        let resData = getErrorResponse(error)
        statusData = { code: 200, resData }
    }
    res.status(statusData.code).send(statusData.resData)
}

const update = async (req, res) => {
    const errors = validationResult(req)
    const { id } = req.params
    const { title, url, content } = req.body
    let info = { title, url, content }
    if (errors.length) {
        res.status(200).send(errors)
        return
    }
    try {
        const response = await blogDb.update({ ...info }, { where: { id } })
        let resData = getSuccessResponse(response)
        statusData = { code: 200, resData }
    } catch (error) {
        console.log(error)
        let resData = getErrorResponse(error)
        statusData = { code: 200, resData }
    }
    res.status(statusData.code).send(statusData.resData)
}

const list = async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url)
        const queryParams = querystring.parse(parsedUrl.query)
        const page = parseInt(queryParams.page) || 1
        const pageSize = parseInt(queryParams.pageSize) || 10
        const search = queryParams.search || ''
        const offset = (page - 1) * pageSize
        const response = await blogDb.findAndCountAll({
            where: search
                ? {
                      title: { [Op.substring]: search },
                  }
                : '',
            offset,
            limit: pageSize,
        })
        const totalPages = Math.ceil(response.count / pageSize)
        const pagination = {
            totalElements: response.count,
            currentPage: page,
            totalPages: totalPages,
            next: page !== totalPages ? page + 1 : null,
            prev: page !== 1 ? page - 1 : null,
            pageSize
        }
        let resData = getSuccessResponse(response.rows, pagination)
        statusData = { code: 200, resData }
    } catch (error) {
        console.log(error)
        let resData = getErrorResponse(error)
        statusData = { code: 200, resData }
    }
    res.status(statusData.code).send(statusData.resData)
}

const findOne = async (req, res) => {
    try {
        const { id } = req.params
        const response = await blogDb.findOne({
            where: { id },
        })
        let resData = getSuccessResponse(response)
        statusData = { code: 200, resData }
    } catch (error) {
        console.log(error)
        let resData = getErrorResponse(error)
        statusData = { code: 200, resData }
    }
    res.status(statusData.code).send(statusData.resData)
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        const response = await blogDb.destroy({
            where: { id: JSON.parse(id) },
        })
        let resData = getSuccessResponse(response)
        statusData = { code: 200, resData }
    } catch (error) {
        let resData = getErrorResponse(error)
        statusData = { code: 200, resData }
    }
    res.status(statusData.code).send(statusData.resData)
}

module.exports = {
    add,
    list,
    findOne,
    destroy,
    update,
}
