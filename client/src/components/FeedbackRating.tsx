import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle, 
  X,
  MapPin,
  Clock,
  IndianRupee,
  User,
  Camera,
  Shield,
  Zap
} from "lucide-react";

interface FeedbackRatingProps {
  booking: {
    id: string;
    spotName: string;
    vendorName: string;
    amount: number;
    duration: number;
    completedAt: string;
  };
  onClose: () => void;
  onSubmit: (feedback: {
    rating: number;
    review: string;
    categories: string[];
  }) => void;
}

export default function FeedbackRating({ booking, onClose, onSubmit }: FeedbackRatingProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'accessibility', label: 'Easy Access', icon: '🚗' },
    { id: 'value', label: 'Value for Money', icon: '💰' },
    { id: 'location', label: 'Great Location', icon: '📍' },
    { id: 'service', label: 'Excellent Service', icon: '⭐' }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        review,
        categories: selectedCategories
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-6" /> {/* Spacer */}
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div>
            <CardTitle className="text-xl">Parking Completed!</CardTitle>
            <p className="text-muted-foreground mt-2">
              How was your parking experience?
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{booking.spotName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking.vendorName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.duration}h duration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">₹{booking.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Star Rating */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Rate Your Experience</h3>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-primary">
                {getRatingText(hoverRating || rating)}
              </p>
            </div>
          </div>

          {/* Category Selection */}
          {rating > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">What did you like? (Optional)</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category.id)}
                    className="justify-start h-auto p-3"
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span className="text-xs">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Written Review */}
          {rating > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Share Your Experience (Optional)</h4>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell others about your parking experience..."
                rows={3}
                maxLength={500}
              />
              <div className="text-right text-xs text-muted-foreground">
                {review.length}/500
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
              className="w-full h-12"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Feedback'
              )}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full"
              disabled={isSubmitting}
            >
              Skip for Now
            </Button>
          </div>

          {/* Incentive Message */}
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <span className="font-medium">💰 Earn ₹5 cashback</span> for leaving a review!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
