const responseHttp = async (doc, res, msgError) => {
    if (!doc || doc.length == 0) {
        return res.status(404).json({ msg: msgError });
    } else {
        return res.status(200).json(doc);
    }
};

module.exports = responseHttp;
