/* eslint-disable import/no-commonjs */
module.exports = {
  "POST /wx/login": (req, res) => {
    return res.json({
      code: 0,
      message: "",
      data: {
        token: "TOKEN",
      },
    });
  },
};
