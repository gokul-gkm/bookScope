const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');
const { register, login, viewProfile } = require('./controllers/userController');

const PROTO_PATH = path.resolve(__dirname, './protos/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  Register: register,
  Login: login,
  ViewProfile: viewProfile,
});

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    server.bindAsync(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error('Error starting server:', error);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${port}`);
      server.start();
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
