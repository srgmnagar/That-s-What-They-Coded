import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const candidateReviews = [
  {
    id: 1,
    text: "Sed ut perspiciatis unde omnis error sit. Ut enim ad minima veniam, quis nostrum. Neque porro quisquam est, qui dolorem. Quis autem vel eum iure reprehenderit.",
    rating: 5
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
    rating: 4
  },
  {
    id: 3,
    text: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
    rating: 5
  }
];

const recruiterReviews = [
  {
    id: 1,
    text: "Sed ut perspiciatis unde omnis error sit. Ut enim ad minima veniam, quis nostrum. Neque porro quisquam est, qui dolorem. Quis autem vel eum iure reprehenderit.",
    rating: 5
  },
  {
    id: 2,
    text: "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.",
    rating: 4
  },
  {
    id: 3,
    text: "Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum.",
    rating: 5
  }
];

const ReviewsSection = () => {
  const [currentCandidateReview, setCurrentCandidateReview] = useState(0);
  const [currentRecruiterReview, setCurrentRecruiterReview] = useState(0);

  const nextCandidateReview = () => {
    setCurrentCandidateReview((prev) => 
      prev === candidateReviews.length - 1 ? 0 : prev + 1
    );
  };

  const prevCandidateReview = () => {
    setCurrentCandidateReview((prev) => 
      prev === 0 ? candidateReviews.length - 1 : prev - 1
    );
  };

  const nextRecruiterReview = () => {
    setCurrentRecruiterReview((prev) => 
      prev === recruiterReviews.length - 1 ? 0 : prev + 1
    );
  };

  const prevRecruiterReview = () => {
    setCurrentRecruiterReview((prev) => 
      prev === 0 ? recruiterReviews.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl py-20 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Candidate Reviews */}
        <div className="relative p-8 rounded-3xl backdrop-blur-sm" 
          style={{
            background: "radial-gradient(circle at 50% 60%, rgba(74, 155, 212, 0.3) 0%, rgba(10, 16, 37, 0.1) 100%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(74, 155, 212, 0.1)"
          }}>
          <h2 className="text-3xl font-Exo text-[#4A9BD4] mb-6 text-center mtext-center">
            Candidate reviews
          </h2>
          
          <div className="flex items-center ">
            <button 
              onClick={prevCandidateReview}
              className="p-2 text-[#4A9BD4] hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1 min-h-[200px] font-Exo">
              <p className="text-gray-300 mb-4margin-auto leading-relaxed">
                {candidateReviews[currentCandidateReview].text}
              </p>
              <div className="flex justify-center mt-4">
                {renderStars(candidateReviews[currentCandidateReview].rating)}
              </div>
            </div>
            
            <button 
              onClick={nextCandidateReview}
              className="p-2 text-[#4A9BD4] hover:text-white transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Recruiter Reviews */}
        <div className="relative p-8 rounded-3xl backdrop-blur-sm" 
          style={{
            background: "radial-gradient(circle at 50% 60%, rgba(105, 45, 162, 0.3) 0%, rgba(10, 16, 37, 0.1) 100%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            border: "1px solid rgba(166, 123, 212, 0.1)"
          }}>
          <h2 className="text-3xl font-['Orbitron', sans-serif] text-[#a67bd4] mb-6 text-center md:text-right">
            Recruiter reviews
          </h2>
          
          <div className="flex items-center">
            <button 
              onClick={prevRecruiterReview}
              className="p-2 text-[#a67bd4] hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1 min-h-[200px]">
              <p className="text-gray-300 italic mb-4 leading-relaxed">
                {recruiterReviews[currentRecruiterReview].text}
              </p>
              <div className="flex justify-center mt-4">
                {renderStars(recruiterReviews[currentRecruiterReview].rating)}
              </div>
            </div>
            
            <button 
              onClick={nextRecruiterReview}
              className="p-2 text-[#a67bd4] hover:text-white transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
