const getSuccessResponse = (response, pagination) => {
    return {
        status:true,
        errorMsg:"",
        response,
        pagination
    }
}

const getErrorResponse = (errorMsg="") => {
    return {
        status:false,
        errorMsg,
        response:{}
    }
}

module.exports = {
    getErrorResponse,
    getSuccessResponse
}