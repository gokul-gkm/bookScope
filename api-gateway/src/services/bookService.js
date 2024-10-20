const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const config = require('../config/config');

const PROTO_PATH = path.resolve('/usr/src/app/src/protos/book.proto');
// const PROTO_PATH = path.resolve('../book-service/src/protos/book.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const bookService = new bookProto.BookService(
  config.bookServiceUrl,
  grpc.credentials.createInsecure()
);

module.exports = bookService;
