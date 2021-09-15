module.exports = (res, status, message, data,count) => {
    res.status(status).send({
        status: status,
        message, message,
        data: data,
        count: count
    });
}