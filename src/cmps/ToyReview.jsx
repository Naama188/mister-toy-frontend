import { ReviewList } from './ReviewList'

export function ToyReview({
    review,
    reviews,
    handleChange,
    onSaveReview,
    onRemoveReview,
}) {
    const { txt } = review

    return (
        <div className="review-container">
            <h1>Toy reviews:</h1>
            <form className="login-form" onSubmit={onSaveReview}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Enter Your Review"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <button className="btn">Send</button>
            </form>
            <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
        </div>
    )
}
