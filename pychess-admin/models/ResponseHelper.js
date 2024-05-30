class ResponseHelper {
  constructor(res) {
    this.res = res;
  }

  createResponse(code, message, data = null) {
    return {
      code,
      message,
      data
    };
  }

  success(message = 'Operation successful', data = null) {
    return this.res.status(200).json(this.createResponse(200, message, data));
  }

  warn(message = 'Warning', data = null) {
    return this.res.status(300).json(this.createResponse(300, message, data));
  }

  error(message = 'Internal Server Error', data = null) {
    return this.res.status(500).json(this.createResponse(500, message, data));
  }

  setCookie(name, value, options = {}) {
    this.res.cookie(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.COOKIE_AGE),
      ...options
    });
  }

  clearCookie(name) {
    this.res.clearCookie(name);
  }
}

module.exports = ResponseHelper;
