const { Controller } = require("uni-cloud-router");
module.exports = class TestController extends (
  Controller
) {
  sayHello() {
    return 'this.service.hello.sayHello();'
  }
};