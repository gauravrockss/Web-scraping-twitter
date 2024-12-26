import express from 'express';

express.response.success = function (res) {
    if (typeof res === 'string')
        return this.json({
            success: true,
            message: res,
        });

    if (typeof res === 'number') return this.status(res).send(); // No Content

    return this.json({
        success: true,
        ...res,
    });
};

express.response.error = function (res) {
    if (typeof res === 'string' || Array.isArray(res))
        return this.json({
            errors: Array.isArray(res) ? res : [res],
            success: false,
        });

    return this.json({
        success: false,
        ...res,
    });
};
