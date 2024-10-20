const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');
const { viewAllBooks, viewBook, addBook, editBook, deleteBook } = require('./controllers/bookController');

const PROTO_PATH = path.resolve(__dirname, './protos/book.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

const server = new grpc.Server();

server.addService(bookProto.BookService.service, {
  ViewAllBooks: viewAllBooks,
  ViewBook: viewBook,
  AddBook: addBook,
  EditBook: editBook,
  DeleteBook: deleteBook,
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