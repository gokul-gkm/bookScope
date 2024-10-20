const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const config = require('../config/config');

const PROTO_PATH = path.resolve('/usr/src/app/src/protos/user.proto');
// const PROTO_PATH = path.resolve('../user-service/src/protos/user.proto');
console.log(PROTO_PATH)

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const userService = new userProto.UserService(
  config.userServiceUrl,
  grpc.credentials.createInsecure()
);

module.exports = userService;
