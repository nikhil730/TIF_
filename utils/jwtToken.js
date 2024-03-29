const sendToken = async (user, statusCode, res) => {
  console.log("here");
  const token = user.getJwtToken();
  console.log(token);
  //   const option = {
  //     expire: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   };
  const option = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, option)
    .send({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
        meta: {
          access_token: token,
        },
      },
    });
};

module.exports = sendToken;
