const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const config = require('../config/config');

const PROTO_PATH = path.resolve('/usr/src/app/src/protos/review.proto');
// const PROTO_PATH = path.resolve('../review-service/src/protos/review.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const reviewProto = grpc.loadPackageDefinition(packageDefinition).review;

const reviewService = new reviewProto.ReviewService(
  config.reviewServiceUrl,
  grpc.credentials.createInsecure()
);

module.exports = reviewService;
