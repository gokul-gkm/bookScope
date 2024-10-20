const express = require('express');
const reviewService = require('../services/reviewService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  reviewService.ViewAllReviews({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response.reviews);
  });
});

router.get('/:id', (req, res) => {
  reviewService.ViewReview({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.details });
    }
    res.json(response.review);
  });
});

router.post('/', authMiddleware, (req, res) => {
  const reviewData = { ...req.body, userId: req.user.id };
  console.log(reviewData)
  reviewService.AddReview(reviewData, (error, response) => {
    if (error) {
      console.log("error in add review route");
      return res.status(500).json({ error: error.details });
    }
    console.log("no error in route")
    res.status(201).json(response.review);
  });
});


router.put('/:id', authMiddleware, async (req, res) => {
  console.log("Editing review...");

  const reviewRequest = { id: req.params.id };
  console.log("Review Request Data:", reviewRequest);

  try {
      
      const existingReviewResponse = await new Promise((resolve, reject) => {
          reviewService.ViewReview(reviewRequest, (error, response) => {
              if (error) {
                  return reject(error);
              }
              resolve(response);
          });
      });

     
      if (!existingReviewResponse || !existingReviewResponse.review) {
          return res.status(404).json({ error: 'Review not found' });
      }

      const existingReview = existingReviewResponse.review; 
      console.log("Existing Review:", existingReview);

     
      const updateData = {
          id: req.params.id,
          userId: req.user.id,
          bookId: existingReview.bookId, 
          comment: req.body.comment || existingReview.comment, 
          rating: req.body.rating !== undefined ? req.body.rating : existingReview.rating 
      };

      console.log("Update Data:", updateData);

      reviewService.EditReview(updateData, (error, response) => {
          if (error) {
              console.log("Error in edit review route:", error);
              return res.status(500).json({ error: error.details });
          }
          res.json(response.review);
      });
  } catch (error) {
      console.error("Error in edit review route:", error);
      return res.status(500).json({ error: 'Error fetching review' });
  }
});


router.delete('/:id', authMiddleware, (req, res) => {
  const deleteData = { id: req.params.id, userId: req.user.id };
  console.log("delete Data : ",deleteData)
  reviewService.DeleteReview(deleteData, (error, response) => {
    if (error) {
      console.log("Error in delete review route:", error);
      return res.status(500).json({ error: error.details });
    }
    res.json({ message: 'Review deleted successfully' });
  });
});

router.get('/book/:id', (req, res) => {
  const bookId = req.params.id;

  const request = { bookId }; 

  reviewService.GetReviewsByBookId(request, (error, response) => {
      if (error) {
          console.error('Error fetching reviews:', error);
          return res.status(500).json({ message: 'Error fetching reviews' });
      }
      res.json(response.reviews); 
  });
});

module.exports = router;
