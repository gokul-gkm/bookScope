const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');
const { viewAllReviews, viewReview, addReview, editReview, deleteReview,getReviewsByBookId } = require('./controllers/reviewController');

const PROTO_PATH = path.resolve(__dirname, './protos/review.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const reviewProto = grpc.loadPackageDefinition(packageDefinition).review;

const server = new grpc.Server();

server.addService(reviewProto.ReviewService.service, {
  ViewAllReviews: viewAllReviews,
  ViewReview: viewReview,
  AddReview: addReview,
  EditReview: editReview,
  DeleteReview: deleteReview,
  GetReviewsByBookId: getReviewsByBookId,
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